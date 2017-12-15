const { pickBy } = require(`lodash`);

module.exports = (highlighter, lang) => {
	lang = lang.toLowerCase();

	const grammar = pickBy(
		highlighter.registry.grammarsByScopeName,
		(val, key) => !!val.name && val.name.toLowerCase() === lang
	);

	if (Object.keys(grammar).length) {
		return Object.keys(grammar)[0];
	}

	return null;
};
