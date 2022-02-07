import { joinPathFragments } from '@nrwl/devkit';
import { appRootPath } from '@nrwl/tao/src/utils/app-root';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

const workspaceJson = require('../../workspace.json');

const FINAL_OUTPUT_DIR = joinPathFragments(
  __filename,
  '../../../',
  'dist/react-npm-package'
);

(async function main() {
  try {
    const publishedPackageJson = require(joinPathFragments(
      appRootPath,
      'libs/react/npm-package/package.json'
    ));
    const rootPackageJson = require(joinPathFragments(
      appRootPath,
      'package.json'
    ));
    // Overwrite placeholder description
    publishedPackageJson.description = 'XRPL Components - React';

    for (const name of Object.keys(workspaceJson.projects)) {
      if (name === 'react-npm-package') {
        continue;
      }

      const projectPath = workspaceJson.projects[name];
      let tags = [];
      let projectRootDir: string | undefined;

      // Not migrated out of workspace.json to project.json yet
      if (typeof projectPath !== 'string') {
        tags = workspaceJson.projects[name].tags || [];
        if (!tags.includes('xrpl-components-react')) {
          continue;
        }

        projectRootDir = workspaceJson.projects[name].root;
      } else {
        if (!projectPath) {
          continue;
        }
        const projectJsonPath = joinPathFragments(
          __dirname,
          '../../',
          projectPath,
          'project.json'
        );
        const projectJson = require(projectJsonPath);
        if (!projectJson) {
          throw new Error(
            `no project.json found for project "${name}" at path: "${projectJsonPath}"`
          );
        }

        tags = projectJson.tags || [];
        if (!tags.includes('xrpl-components-react')) {
          continue;
        }

        projectRootDir = projectJson.root;
      }

      if (!projectRootDir) {
        throw new Error(
          `Could not determine root directory for project "${name}"`
        );
      }
      const projectPackageJson = require(joinPathFragments(
        appRootPath,
        projectRootDir,
        'package.json'
      ));

      publishedPackageJson.dependencies =
        publishedPackageJson.dependencies || {};

      ['swr', 'tslib', 'xrpl'].forEach((dependencyName) => {
        const version = rootPackageJson.dependencies[dependencyName];
        if (!version) {
          throw new Error(
            `@xrpl-components/react dependency "${dependencyName}" could not be found in the dependencies of the root package.json`
          );
        }

        publishedPackageJson.dependencies[dependencyName] = version;
      });

      if (projectPackageJson.dependencies) {
        for (const dependencyName of Object.keys(
          projectPackageJson.dependencies
        )) {
          if (
            publishedPackageJson.dependencies[dependencyName] &&
            publishedPackageJson.dependencies[dependencyName] !==
              projectPackageJson.dependencies[dependencyName]
          ) {
            throw new Error(
              `@xrpl-components/react dependency "${dependencyName}" is defined multiple times and with differing versions`
            );
          }
          publishedPackageJson.dependencies[dependencyName] =
            projectPackageJson.dependencies[dependencyName];
        }
      }

      if (projectPackageJson.devDependencies) {
        publishedPackageJson.devDependencies =
          publishedPackageJson.devDependencies || {};
        for (const dependencyName of Object.keys(
          projectPackageJson.devDependencies
        )) {
          if (
            publishedPackageJson.devDependencies[dependencyName] &&
            publishedPackageJson.devDependencies[dependencyName] !==
              projectPackageJson.devDependencies[dependencyName]
          ) {
            throw new Error(
              `@xrpl-components/react dev dependency "${dependencyName}" is defined multiple times and with differing versions`
            );
          }
          publishedPackageJson.devDependencies[dependencyName] =
            projectPackageJson.devDependencies[dependencyName];
        }
      }

      publishedPackageJson.peerDependencies =
        publishedPackageJson.peerDependencies || {};

      [].forEach((dependencyName) => {
        const version = rootPackageJson.dependencies[dependencyName];
        if (!version) {
          throw new Error(
            `@xrpl-components/react dependency "${dependencyName}" could not be found in the dependencies of the root package.json`
          );
        }

        publishedPackageJson.peerDependencies[dependencyName] = version;
      });

      if (projectPackageJson.peerDependencies) {
        for (const dependencyName of Object.keys(
          projectPackageJson.peerDependencies
        )) {
          if (
            publishedPackageJson.peerDependencies[dependencyName] &&
            publishedPackageJson.peerDependencies[dependencyName] !==
              projectPackageJson.peerDependencies[dependencyName]
          ) {
            throw new Error(
              `@xrpl-components/react peer dependency "${dependencyName}" is defined multiple times and with differing versions`
            );
          }
          publishedPackageJson.peerDependencies[dependencyName] =
            projectPackageJson.peerDependencies[dependencyName];
        }
      }
    }

    if (!existsSync(FINAL_OUTPUT_DIR)) {
      mkdirSync(FINAL_OUTPUT_DIR);
    }

    writeFileSync(
      joinPathFragments(FINAL_OUTPUT_DIR, 'package.json'),
      JSON.stringify(publishedPackageJson, null, 2)
    );
    console.log(`✨ Generated final package.json for @xrpl-components/react\n`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();
