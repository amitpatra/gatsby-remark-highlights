const { defaults } = require(`lodash`);
const objectify = require(`./objectify`);

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
		/*
		const configStr = splitedLang[1].slice(0, -1);
		
		configStr
			.split(',')
			.map(a => a.trim())
			.map(a => a.split(':'))
			.forEach(a => (config[a[0]] = a[1].trim()));
			*/
		const configStr = splitedLang[1]
			.slice(0, -1)
			.replace(/\'|`/g, '"')
			.split(',')
			.map(a => a.split(':'))
			.map(a => {
				a[1] = objectify(a[1].trim());
				a[0] = a[0].trim();
				return [`"${a[0]}"`, a[1]];
			})
			.map(a => a.join(':'))
			.join(',');

		config = { ...config, ...JSON.parse(`{${configStr}}`) };

		lang = splitedLang[0];
	}

	config.lang = lang;
	return config;
};
