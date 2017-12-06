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

	loadGrammars(highlighter, additionalLangs);

	visit(markdownAST, `code`, node => {
		const highlightedNode = highlightNode(highlighter, node.lang, node.value);
		const wrappedNode = wrapNode(highlightedNode, codeWrap);

		node.type = `html`;
		node.value = wrappedNode;
	});
};
