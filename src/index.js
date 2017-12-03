const visit = require(`unist-util-visit`);
const Highlights = require(`highlights`);
var _ = require(`lodash`);

const scopeNameFromLang = (highlighter, lang, additionalLangs) => {
	lang = lang.toLowerCase();

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

	var grammar = _.pickBy(
		highlighter.registry.grammarsByScopeName,
		(val, key) =>
			val.name.toLowerCase() === lang ||
			val.fileTypes.map(fileType => fileType.toLowerCase()).includes(lang)
	);

	if (Object.keys(grammar).length) {
		return Object.keys(grammar)[0];
	}

	var name = `source.${lang}`;

	return name;
};

module.exports = ({ markdownAST }, pluginOptions) => {
	const defaults = {
		additionalLangs: null,
		scopePrefix: null
	};

	const { additionalLangs, scopePrefix } = _.defaults(pluginOptions, defaults);

	const highlighter = new Highlights({ scopePrefix });

	visit(markdownAST, `code`, node => {
		const fileContents = node.value;
		const scopeName =
			(node.lang && scopeNameFromLang(highlighter, node.lang, additionalLangs)) || '';

		node.type = `html`;
		node.value = highlighter.highlightSync({ fileContents, scopeName });
	});
};
