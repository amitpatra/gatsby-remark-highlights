const visit = require(`unist-util-visit`);
const Highlights = require(`highlights`);
const { defaults } = require(`lodash`);
const highlightNode = require(`./utils/highlightNode`);
const loadGrammars = require(`./utils/loadGrammars`);
const wrapNode = require(`./utils/wrapNode`);

module.exports = ({ markdownAST }, pluginOptions) => {
	const defaultPluginOptions = {
		additionalLangs: null,
		scopePrefix: null,
		codeWrap: false
	};

	const { additionalLangs, scopePrefix, codeWrap } = defaults(
		pluginOptions,
		defaultPluginOptions
	);

	const highlighter = new Highlights({ scopePrefix });

	visit(markdownAST, `code`, node => {
		const config = {};

		let lang = node.lang;

		if (!!lang && lang.split(`{`).length > 1) {
			const splitedLang = lang.split(`{`);
			const configStr = splitedLang[1].slice(0, -1);
			configStr
				.split(',')
				.map(a => a.trim())
				.map(a => a.split(':'))
				.forEach(a => (config[a[0]] = a[1].trim()));

			lang = splitedLang[0];
		}

		const langs = !!config.language ? config.language : additionalLangs;

		loadGrammars(highlighter, langs);

		const highlightedNode = highlightNode(highlighter, lang, node.value);
		const wrappedNode = wrapNode(highlightedNode, codeWrap);

		node.type = `html`;
		node.value = wrappedNode;
	});
};
