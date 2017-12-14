const { defaults, includes } = require(`lodash`);
const getIcon = require(`./getIcon`);

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
