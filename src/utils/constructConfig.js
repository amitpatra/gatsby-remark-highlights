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
		preClass: false,
		wrapAll: false
	};

	let config = defaults(pluginOptions, defaultPluginOptions);

	if (!!lang && lang.split(`{`).length > 1) {
		let x = lang.substring(lang.indexOf(`(`) + 1);
		let y = x.substring(0, x.indexOf(`)`));

		let z = y.replace(`,`, `&`);

		const newLang = lang.replace(y, z);

		const splitedLang = newLang.split(`{`);

		const inlineConfig = newLang.substring(newLang.indexOf('{'));
		const parsedConfig = parseConfig(inlineConfig)
			.replace('(', `"`)
			.replace(`)`, `"`);

		config = Object.assign(config, JSON.parse(parsedConfig));
		if (!!config.highlightLines) {
			config.highlightLines = config.highlightLines.replace(`&`, `,`).replace(` `, ``);
		}
		console.log('Config is', config);
		lang = splitedLang[0];
	}

	config.lang = lang;
	return config;
};
