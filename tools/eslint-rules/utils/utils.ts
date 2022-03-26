import type { ProjectGraph } from '@nrwl/devkit';
import { appRootPath } from '@nrwl/tao/src/utils/app-root';
import { readCachedProjectGraph } from '@nrwl/workspace/src/core/project-graph';
import { getProjectNameFromDirPath } from '@nrwl/workspace/src/utilities/project-graph-utils';
import { writeFileSync } from 'fs';
import { dirname, join, relative } from 'path';
import { format, resolveConfig } from 'prettier';

/**
 * If no nx commands have been run in the workspace there will be no cached project graph
 * to access the readCachedProjectGraph() will throw. Rather than breaking the linting,
 * which can be noisy in an IDE for example, we simple ignore it and return null, knowing
 * that by the time nx lint (or any other nx command) is next run there will be a project
 * graph available.
 */
export const safelyReadCachedProjectGraph = (): ProjectGraph | null => {
  try {
    return readCachedProjectGraph();
  } catch {
    return null;
  }
};

export const getProjectForFile = (
  projectGraph: ProjectGraph<any>,
  filePath: string
) => {
  const filenameRelativeToWorkspaceRoot = relative(
    appRootPath,
    dirname(filePath)
  );
  try {
    return getProjectNameFromDirPath(
      filenameRelativeToWorkspaceRoot,
      projectGraph
    );
  } catch (e) {
    return null;
  }
};

function requireUncached(module: string) {
  delete require.cache[require.resolve(module)];
  return require(module);
}

export const hasProjectGotMatchingTags = (
  projectGraph: ProjectGraph<any>,
  projectName: string,
  tagsToCheck: string[]
) => {
  const projectRoot = projectGraph.nodes[projectName].data.root;
  if (!projectRoot) {
    return false;
  }
  let projectTags = [];
  try {
    const projectJson = requireUncached(
      join(appRootPath, projectRoot, `project.json`)
    );
    projectTags = projectJson.tags || [];
  } catch {
    const workspaceJson = requireUncached(join(appRootPath, `workspace.json`));
    projectTags = workspaceJson.projects[projectName].tags || [];
  }
  return tagsToCheck.every((tag: any) => projectTags.includes(tag));
};

export const updateImplicitDependencies = (
  projectGraph: ProjectGraph<any>,
  projectName: string,
  mapFn: (implicitDeps: string[]) => string[]
) => {
  const projectRoot = projectGraph.nodes[projectName].data.root;
  if (!projectRoot) {
    return;
  }
  try {
    const fileName = join(appRootPath, projectRoot, 'project.json');
    const projectJson = requireUncached(fileName);
    projectJson.implicitDependencies = mapFn(
      projectJson.implicitDependencies || []
    );
    updateJsonFile(fileName, projectJson);
  } catch {
    const fileName = join(appRootPath, `workspace.json`);
    const workspaceJson = requireUncached(fileName);
    workspaceJson.projects[projectName].implicitDependencies = mapFn(
      workspaceJson.projects[projectName].implicitDependencies || []
    );
    updateJsonFile(fileName, workspaceJson);
  }
  return;
};

function updateJsonFile(fileName: string, json: Record<string, unknown>) {
  writeFileSync(
    fileName,
    format(JSON.stringify(json, null, 2), {
      ...resolveConfig.sync(fileName),
      parser: 'json',
    })
  );
}
