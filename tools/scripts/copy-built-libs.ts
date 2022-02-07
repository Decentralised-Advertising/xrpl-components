import { appRootPath } from '@nrwl/tao/src/utils/app-root';
import { unlinkSync } from 'fs';
import { copySync } from 'fs-extra';
import { join, relative } from 'path';

const workspaceJson = require('../../workspace.json');

const FINAL_OUTPUT_DIR = join(
  __filename,
  '../../../',
  'dist/react-npm-package'
);

(async function main() {
  try {
    for (const name of Object.keys(workspaceJson.projects)) {
      const projectPath = workspaceJson.projects[name];
      let tags = [];
      let projectOutputDir: string | undefined;

      // Not migrated out of workspace.json to project.json yet
      if (typeof projectPath !== 'string') {
        tags = workspaceJson.projects[name].tags || [];
        if (!tags.includes('xrpl-components-react')) {
          continue;
        }

        projectOutputDir =
          workspaceJson.projects[name].targets.build.outputs[0];

        // Special Nx outputs syntax
        if (projectOutputDir.startsWith('{')) {
          if (projectOutputDir !== '{options.outputPath}') {
            throw new Error(
              `Unsupported Nx output syntax: ${projectOutputDir}`
            );
          }
          projectOutputDir =
            workspaceJson.projects[name].targets.build.options.outputPath;
        }
      } else {
        if (!projectPath) {
          continue;
        }
        const projectJsonPath = join(
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

        projectOutputDir = projectJson.targets.build.outputs[0];

        // Special Nx outputs syntax
        if (projectOutputDir.startsWith('{')) {
          if (projectOutputDir !== '{options.outputPath}') {
            throw new Error(
              `Unsupported Nx output syntax: ${projectOutputDir}`
            );
          }
          projectOutputDir = projectJson.targets.build.options.outputPath;
        }
      }

      if (!projectOutputDir) {
        throw new Error(
          `Could not determine build output directory for project "${name}"`
        );
      }

      const finalOutputPath = join(
        FINAL_OUTPUT_DIR,
        relative(
          join(appRootPath, 'dist/libs/react'),
          join(appRootPath, projectOutputDir)
        )
      );
      copySync(projectOutputDir, finalOutputPath);
      console.log(
        `\n✨ Copied build output for project "${name}" from ${projectOutputDir} to ${finalOutputPath}\n`
      );

      // Remove the currently unneeded README.md files for the nested lib outputs
      unlinkSync(join(finalOutputPath, 'README.md'));

      console.log(`✨ Cleaned up outputs in ${finalOutputPath}\n`);
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();
