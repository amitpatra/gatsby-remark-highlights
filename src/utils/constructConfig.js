const { defaults } = require(`lodash`);
const parseConfig = require(`simple-string-to-json`);

module.exports = (node, pluginOptions) => {
	let lang = node.lang;

	const defaultPluginOptions = {
		additionalLangs: null,
		scopePrefix: null,
		codeWrap: false,
		showFileName: false, // File name is actually lang
		showFileIcon: false,
		preClass: false,
		wrapAll: false
	};

	let config = defaults({}, pluginOptions, defaultPluginOptions);

	if (!!lang && lang.split(`{`).length > 1) {
		lang = lang.replace(`'`, `"`);
		const rangeStr = lang.substring(lang.indexOf(`(`) + 1, lang.indexOf(`)`));

		const modifiedRangeStr = rangeStr.replace(`,`, `&`).replace(` `, ``); // We are doing this since `parseConfig` use `,` to split string, we dont want to split the config string

		const modifiedLang = lang.replace(rangeStr, modifiedRangeStr);

		const inlineConfig = modifiedLang.substring(modifiedLang.indexOf('{'));
		const parsedConfig = parseConfig(inlineConfig)
			.replace('(', `"`)
			.replace(`)`, `"`) // Necessary since we gonna run JSON.parse
			.replace(`&`, `,`);

		config = Object.assign(config, JSON.parse(parsedConfig));

		lang = modifiedLang.substring(0, modifiedLang.indexOf('{'));
	}

	config.lang = lang;
	config.fileContents = node.value;
	return config;
};
