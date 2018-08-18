const { pickBy } = require('lodash');

module.exports = (highlighter, _lang) => {
  const lang = _lang.toLowerCase();

  const grammar = pickBy(highlighter.registry.grammarsByScopeName,
    (val, key) => !!val.name && val.name.toLowerCase() === lang); // eslint-disable-line

  if (Object.keys(grammar).length) {
    return Object.keys(grammar)[0];
  }

  return null;
};
