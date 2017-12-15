module.exports = (highlighter, config) => {
	const langs = !!config.languagePackage ? config.languagePackage : config.additionalLangs;
	if (typeof langs === 'string') {
		highlighter.requireGrammarsSync({
			modulePath: require.resolve(`${langs}/package.json`)
		});
	} else if (langs instanceof Array) {
		// requireGrammarsSync calls loadGrammarsSync
		langs.forEach(language => {
			highlighter.requireGrammarsSync({
				modulePath: require.resolve(`${language}/package.json`)
			});
		});
	} else if (Object.keys(highlighter.registry.grammarsByScopeName).length < 2) {
		// In this case only `null-grammar` is present
		// highlightSync calls loadGrammarsSync under the hood, after scopeName is resolved so need to call manually
		highlighter.loadGrammarsSync();
	}

	return highlighter;
};