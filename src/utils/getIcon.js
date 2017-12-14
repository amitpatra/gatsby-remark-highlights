const iconsDb = require('./iconsDb');

const sortIconsArrayByPriority = (a, b) => {
	if (!!a[b] && !!b[2]) {
		return a[2] < b[2];
	} else if (!!a[2] && !b[2]) {
		return a[2] < 1;
	} else if (!a[2] && !!b[2]) {
		return 1 < b[2];
	}
};

const containsMatchingRegExp = lang => array =>
	!!array.filter(item => item instanceof RegExp && item.test(lang)).length;

const getIcon = lang => {
	const icon = iconsDb.filter(containsMatchingRegExp(lang)).sort(sortIconsArrayByPriority)[0];

	if (!!icon) {
		return icon;
	}
	return ['null-icon', ['medium-grey', 'medium-grey']];
};

module.exports = getIcon;
