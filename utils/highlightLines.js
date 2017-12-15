const rangeParser = require(`parse-numeric-range`);
const { includes } = require(`lodash`);

module.exports = (node, config) => {
	if (!!config.highlightLines) {
		const highlightRange = rangeParser.parse(config.highlightLines).filter(n => n > 0);

		return node.split(`<div class="line">`).map((s, i) => {
			if (i === 0) {
				return s;
			}

			if (includes(highlightRange, i)) {
				return `<div class="line highlighted-line">${s}`;
			} else {
				return `<div class="line">${s}`;
			}
		}).join('');
	}

	return node;
};