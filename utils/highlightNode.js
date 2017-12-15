const scopeNameFromLang = require(`./scopeNameFromLang`);
let scopeName = '';

module.exports = (highlighter, config) => {
	let { lang, scopeName, fileContents } = config;
	if (!!lang && (!!scopeName || !!(scopeName = scopeNameFromLang(highlighter, lang)))) {
		// Check whether it is a language name
		return highlighter.highlightSync({
			fileContents,
			scopeName
		});
	}
	// Ok it is a file extension or a file
	return highlighter.highlightSync({
		fileContents,
		filePath: `fake_file_.${lang}`
	});
};