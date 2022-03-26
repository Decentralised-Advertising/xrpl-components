import { ESLintUtils } from '@typescript-eslint/experimental-utils';
import {
  getProjectForFile,
  hasProjectGotMatchingTags,
  safelyReadCachedProjectGraph,
  updateImplicitDependencies,
} from '../utils/utils';
import { normalizePath } from '@nrwl/devkit';

type Options = [];
export type MessageIds = 'storybookDependency' | 'reactNpmPackageDependency';

const REACT_NPM_PACKAGE_PROJECT_NAME = 'react-npm-package';
const STORYBOOK_PROJECT_NAME = 'storybook';

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/dependency-checks"
export const RULE_NAME = 'dependency-checks';

export const rule = ESLintUtils.RuleCreator(() => __filename)<
  Options,
  MessageIds
>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: `
        This repo contains projects which depend on other projects which they don't import directly/statically.
        In those cases, to construct an accurate dependency graph, some projects need to be added as implicit dependencies
        of other projects. This rule asserts the following:
          - libraries that define Storybook .stories files next to the implementation are depedencies of the "${STORYBOOK_PROJECT_NAME}" project;
          - libraries that have the "xrpl-components-react" tag are dependencies of the "${REACT_NPM_PACKAGE_PROJECT_NAME}" project.
      `,
      recommended: 'error',
    },
    fixable: 'code',
    schema: [],
    messages: {
      storybookDependency: `This lib contains .stories files so should be added as a dependency of the "${STORYBOOK_PROJECT_NAME}" project`,
      reactNpmPackageDependency: `This lib has the "xrpl-components-react" tag, therefore it should be a dependency of the "${REACT_NPM_PACKAGE_PROJECT_NAME}"`,
    },
  },
  defaultOptions: [],
  create(context) {
    // Nothing more can be done if there is no project graph available yet (meaning no nx commands have been run yet)
    const projectGraph = safelyReadCachedProjectGraph();
    if (!projectGraph) {
      return {};
    }

    const filename = normalizePath(context.getFilename());

    /**
     * Determine which project from the workspace we are currently linting
     */
    const projectName = getProjectForFile(projectGraph, filename);
    if (!projectName) {
      // Could not locate the project name for the filename for some reason
      return {};
    }

    /**
     * Check if this lib has a .stories.ts or .stories.tsx file in it
     */
    const hasStoriesFile = !!projectGraph.nodes[projectName].data.files.find(
      ({ file }) =>
        file.endsWith('.stories.ts') || file.endsWith('.stories.tsx')
    );

    /**
     * Check if this lib is an implicit dep of storybook
     */
    const isDependencyOfStorybookProject = !!projectGraph.dependencies[
      STORYBOOK_PROJECT_NAME
    ].find(({ target }) => target === projectName);

    /**
     * Check if current project has the "xrpl-components-react" tag
     */
    const projectHasReactNpmPackageTag = hasProjectGotMatchingTags(
      projectGraph,
      projectName,
      ['xrpl-components-react']
    );

    /**
     * Check if current project is a dependency of "react-npm-package"
     */
    const isDependencyOfReactNpmPackage = !!projectGraph.dependencies[
      REACT_NPM_PACKAGE_PROJECT_NAME
    ].find(({ target }) => target === projectName);

    return {
      Program: (node) => {
        if (
          hasStoriesFile &&
          filename.includes('libs/react') &&
          !isDependencyOfStorybookProject
        ) {
          context.report({
            node,
            messageId: 'storybookDependency',
            fix: () => {
              updateImplicitDependencies(
                projectGraph,
                STORYBOOK_PROJECT_NAME,
                (deps) => [...deps, projectName]
              );

              return [];
            },
          });
        }
        if (projectHasReactNpmPackageTag && !isDependencyOfReactNpmPackage) {
          context.report({
            node,
            messageId: 'reactNpmPackageDependency',
            data: {
              projectName: REACT_NPM_PACKAGE_PROJECT_NAME,
            },
            fix: () => {
              updateImplicitDependencies(
                projectGraph,
                REACT_NPM_PACKAGE_PROJECT_NAME,
                (deps) => [...deps, projectName]
              );

              return [];
            },
          });
        }
      },
    };
  },
});
