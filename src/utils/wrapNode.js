const { defaults, includes } = require(`lodash`);
const getIcon = require(`./getIcon`);
const rangeParser = require(`parse-numeric-range`);

const highlightLine = (node, highlightRange) =>
	node
		.split(`<div class="line">`)
		.map((s, i) => {
			if (i === 0) {
				return s;
			}

			if (includes(highlightRange, i)) {
				return `<div class="line highlighted-line">${s}`;
			} else {
				return `<div class="line">${s}`;
			}
		})
		.join('');

module.exports = (node, config) => {
	let wrappedNode = node;

	const { lang, codeWrap, showFileName, showFileIcon, wrapAll, preClass } = config;

	let fileNameInSideCodeWrap, fileIconInSideCodeWrap;
	if (!!codeWrap && !!showFileName) {
		// if showoFileName exits
		fileNameInSideCodeWrap = showFileName.insideCodeWrap;
	}

	if (!!codeWrap && !!showFileIcon) {
		fileIconInSideCodeWrap = showFileIcon.insideCodeWrap;
	}

	if (!!config.highlightLines) {
		const highlightRange = rangeParser.parse(config.highlightLines).filter(n => n > 0);
		wrappedNode = highlightLine(wrappedNode, highlightRange);
	}

	if (!!showFileName && !!fileNameInSideCodeWrap) {
		//Show the file name inside the codewrap
		wrappedNode = `<div class='highlighted-file-name'>${lang}</div>${wrappedNode}`;
	}

	if (!!showFileIcon && !!fileIconInSideCodeWrap) {
		const fileIconArray = getIcon(lang);
		wrappedNode = `<div class='highlighted-file-icon ${fileIconArray[0]}'></div>${wrappedNode}`;
	}

	if (!!codeWrap) {
		//CodeWrap is enabled

		const { className } = defaults(codeWrap, { className: `highlight` });

		wrappedNode = `<div class='${className}'>${wrappedNode}</div>`;
	}

	if (!!showFileName && !fileNameInSideCodeWrap) {
		wrappedNode = `<div class='highlighted-file-name'>${lang}</div>${wrappedNode}`;
	}

	if (!!showFileIcon && !fileIconInSideCodeWrap) {
		const fileIconArray = getIcon(lang);
		wrappedNode = `<div class='highlighted-file-icon ${fileIconArray[0]}'></div>${wrappedNode}`;
	}

	if (!!wrapAll) {
		wrappedNode = `<div class='highlight-wrapper'>${wrappedNode}</div>`;
	}

	if (!!preClass) {
		if (!!preClass.removeClass || !!preClass.remove) {
			wrappedNode = wrappedNode.replace(`pre class="editor editor-colors"`, `pre`);
		} else if (!!preClass.className || !!preClass.class) {
			wrappedNode = wrappedNode.replace(
				`pre class="editor editor-colors"`,
				`pre class="${preClass.className}"`
			);
		}
	}

	return wrappedNode;
};
