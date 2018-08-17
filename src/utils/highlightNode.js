const scopeNameFromLang = require('./scopeNameFromLang');

module.exports = (highlighter, config) => {
  const { lang, fileContents } = config;
  let { scopeName } = config;

  /* eslint-disable */
  if (!!lang && (!!scopeName || !!(scopeName = scopeNameFromLang(highlighter, lang)))) {
    // Check whether it is a language name
    return highlighter.highlightSync({
      fileContents,
      scopeName,
    });
  }
  /* eslint-enable */

  // Ok it is a file extension or a file
  return highlighter.highlightSync({
    fileContents,
    filePath: `fake_file_.${lang}`,
  });
};
