const { defaults } = require(`lodash`);

module.exports = (node, options) => {
	if (!!options) {
		//CodeWrap is enabled
		const { className } = defaults(options, { className: `highlight` });

		return `<div class='${className}'>${node}</div>`;
	}

	return node;
};
