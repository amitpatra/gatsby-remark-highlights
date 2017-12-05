const scopeNameFromLang = require(`./scopeNameFromLang`);
let scopeName = '';

module.exports = (highlighter, lang, fileContents) => {
	if (!!lang && !!(scopeName = scopeNameFromLang(highlighter, lang))) {
		// Check whether it is a language name
		return highlighter.highlightSync({
			fileContents,
			scopeName
		});
	} else {
		// Ok it is a file extension or a file
		return highlighter.highlightSync({
			fileContents,
			filePath: `fake_file_.${lang}`
		});
	}
};
