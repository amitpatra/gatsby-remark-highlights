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
		wrappedNode = `<span class='highlighted-file-name'>${lang}</span>${wrappedNode}`;
	}

	if (!!showFileIcon && !!fileIconInSideCodeWrap) {
		const fileIconArray = getIcon(lang);
		wrappedNode = `<span class='highlighted-file-icon ${fileIconArray[0]} ${fileIconArray[1]}'></span>${wrappedNode}`;
	}

	if (!!codeWrap) {
		//CodeWrap is enabled

		const { className } = defaults({}, codeWrap, { className: `highlight` });

		wrappedNode = `<div class='${className}'>${wrappedNode}</div>`;
	}

	if (!!showFileName && !fileNameInSideCodeWrap) {
		wrappedNode = `<span class='highlighted-file-name'>${lang}</span>${wrappedNode}`;
	}

	if (!!showFileIcon && !fileIconInSideCodeWrap) {
		const fileIconArray = getIcon(lang);
		const fileIconName = fileIconArray[0];
		const fileIconColor = fileIconArray[1];
		wrappedNode = `<span class='highlighted-file-icon ${fileIconName} ${fileIconColor}'></span>${wrappedNode}`;
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
