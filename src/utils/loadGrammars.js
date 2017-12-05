module.exports = (highlighter, additionalLangs) => {
	if (additionalLangs) {
		// requireGrammarsSync calls loadGrammarsSync
		additionalLangs.forEach(language => {
			highlighter.requireGrammarsSync({
				modulePath: require.resolve(`${language}/package.json`)
			});
		});
	} else if (Object.keys(highlighter.registry.grammarsByScopeName).length < 2) {
		// In this case only `null-grammar` is present
		// highlightSync calls loadGrammarsSync under the hood, after scopeName is resolved so need to call manually
		highlighter.loadGrammarsSync();
	}
};
