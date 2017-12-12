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
		codeWrap: false,
		showFileName: false, // File name is actually lang
		showFileIcon: false,
		fileNameOutSideCodeWrap: true,
		fileIconOutSideCodeWrap: true,
		wrapAll: false
	};

	const config = defaults(pluginOptions, defaultPluginOptions);

	visit(markdownAST, `code`, node => {
		const highlighter = new Highlights(({ scopePrefix } = config));

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

		config.lang = lang;

		loadGrammars(highlighter, config);

		const highlightedNode = highlightNode(highlighter, config, node.value);
		const wrappedNode = wrapNode(highlightedNode, config);

		node.type = `html`;
		node.value = wrappedNode;
	});
};
