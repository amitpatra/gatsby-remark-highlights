const { defaults } = require(`lodash`);

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

	const config = defaults(pluginOptions, defaultPluginOptions);
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
	return config;
};
