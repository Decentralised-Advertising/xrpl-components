const rootMain = require('../../../.storybook/main');

module.exports = {
  ...rootMain,

  core: { ...rootMain.core, builder: 'webpack5' },

  stories: [
    ...rootMain.stories,
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    // Bring in stories from all libs in the workspace
    '../../../libs/**/*.stories.mdx',
    '../../../libs/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [...rootMain.addons, '@nrwl/react/plugins/storybook'],
  staticDirs: ['../src/assets'],
  webpackFinal: async (config, { configType }) => {
    // apply any global webpack configs that might have been specified in .storybook/main.js
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType });
    }

    // add your own webpack tweaks if needed

    return config;
  },
};
