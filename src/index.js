const visit = require(`unist-util-visit`);
const Highlights = require(`highlights`);
const highlightNode = require(`./utils/highlightNode`);
const loadGrammars = require(`./utils/loadGrammars`);
const wrapNode = require(`./utils/wrapNode`);
const constructConfig = require(`./utils/constructConfig`);
const highlightLines = require(`./utils/highlightLines`);

module.exports = ({ markdownAST }, pluginOptions) => {
	visit(markdownAST, `code`, node => {
		const config = constructConfig(node.lang, pluginOptions);

		const highlighter = new Highlights(({ scopePrefix } = config));

		loadGrammars(highlighter, config);

		const highlightedNode = highlightNode(highlighter, config, node.value);
		const highlightedLinesNode = highlightLines(highlightedNode, config);
		const wrappedNode = wrapNode(highlightedLinesNode, config);

		node.type = `html`;
		node.value = wrappedNode;
	});
};
