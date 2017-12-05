const visit = require(`unist-util-visit`);
const Highlights = require(`highlights`);
const { defaults } = require(`lodash`);
const highlightNode = require(`./utils/highlightNode`);
const loadGrammars = require(`./utils/loadGrammars`);

module.exports = ({ markdownAST }, pluginOptions) => {
	const defaultPluginOptions = {
		additionalLangs: null,
		scopePrefix: null
	};

	const { additionalLangs, scopePrefix } = defaults(pluginOptions, defaultPluginOptions);

	const highlighter = new Highlights({ scopePrefix });

	loadGrammars(highlighter, additionalLangs);

	visit(markdownAST, `code`, node => {
		node.type = `html`;
		node.value = highlightNode(highlighter, node.lang, node.value);
	});
};
