// @ts-check
const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

async function main() {
  const token = core.getInput('repo-access-token', { required: true });
  const filePath = core.getInput('file-path', { required: true });
  const commitMessage = core.getInput('commit-message', { required: true });
  const context = github.context;

  await exec.exec(
    'git config --global user.email "github-actions[bot]@users.noreply.github.com"'
  );
  await exec.exec('git config --global user.name "github-actions[bot]"');
  await exec.exec(
    'git remote set-url origin https://x-access-token:' +
      token +
      '@github.com/' +
      context.repo.owner +
      '/' +
      context.repo.repo +
      '.git'
  );

  await exec.exec(`git add ${filePath}`);
  await exec.exec(`git commit -m "${commitMessage}"`);
  await exec.exec(`git push`);
}

main();
