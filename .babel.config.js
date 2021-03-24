module.exports = function() {
    const plugins = [
      '@babel/plugin-syntax-dynamic-import',
    ],
  const presets = ["@babel/preset-react", "@babel/preset-stage-3"];
  return {
    presets,
    plugins
  };
  };
};
