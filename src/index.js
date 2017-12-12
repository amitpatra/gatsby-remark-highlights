const visit = require(`unist-util-visit`);
const Highlights = require(`highlights`);
const highlightNode = require(`./utils/highlightNode`);
const loadGrammars = require(`./utils/loadGrammars`);
const wrapNode = require(`./utils/wrapNode`);
const constructConfig = require(`./utils/constructConfig`);

module.exports = ({ markdownAST }, pluginOptions) => {
	visit(markdownAST, `code`, node => {
		const config = constructConfig(node.lang, pluginOptions);

		const highlighter = new Highlights(({ scopePrefix } = config));

		loadGrammars(highlighter, config);

		const highlightedNode = highlightNode(highlighter, config, node.value);
		const wrappedNode = wrapNode(highlightedNode, config);

		node.type = `html`;
		node.value = wrappedNode;
	});
};
