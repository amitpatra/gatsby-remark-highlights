const { defaults } = require(`lodash`);
const parseConfig = require(`simple-string-to-json`);

module.exports = (nodeLang, pluginOptions) => {
	let lang = nodeLang;

	const defaultPluginOptions = {
		additionalLangs: null,
		scopePrefix: null,
		codeWrap: false,
		showFileName: false, // File name is actually lang
		showFileIcon: false,
		wrapAll: false
	};

	let config = defaults(pluginOptions, defaultPluginOptions);

	if (!!lang && lang.split(`{`).length > 1) {
		const splitedLang = lang.split(`{`);

		const inlineConfig = lang.substring(lang.indexOf('{'));

		config = Object.assign(config, JSON.parse(parseConfig(inlineConfig)));

		lang = splitedLang[0];
	}

	config.lang = lang;
	return config;
};
