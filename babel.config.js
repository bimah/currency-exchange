module.exports = api => {
  const presets = [
    ['@babel/preset-env', {
      modules: process.env.NODE_ENV === 'test' ? 'auto' : false,
      useBuiltIns: 'usage',
      corejs: 3,
      targets: {
        node: 'current',
        esmodules: true
      }
    }],
    '@babel/preset-react'
  ];

  const plugins = [];

  api.cache(() => process.env.NODE_ENV);

  return {
    presets,
    plugins,
  };
};
