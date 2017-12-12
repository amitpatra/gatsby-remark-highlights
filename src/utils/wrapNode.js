const { defaults } = require(`lodash`);

module.exports = (node, config) => {
	let wrappedNode = node;

	const {
		lang,
		codeWrap,
		showFileName,
		showFileIcon,
		fileNameOutSideCodeWrap,
		fileIconOutSideCodeWrap,
		wrapAll
	} = config;

	if (!!showFileName && !fileNameOutSideCodeWrap) {
		//Show the file name inside the codewrap
		wrappedNode = `<div class='highlighted-file-name ${lang}'>${lang}</div>${wrappedNode}`;
	}

	if (!!showFileIcon && !fileIconOutSideCodeWrap) {
		wrappedNode = `<div class='highlighted-file-icon dummy-file-icon ${lang}'></div>${wrappedNode}`;
	}

	if (!!codeWrap) {
		//CodeWrap is enabled

		const { className } = defaults(codeWrap, { className: `highlight` });

		wrappedNode = `<div class='${className}'>${wrappedNode}</div>`;
	}

	if (!!showFileName && !!fileNameOutSideCodeWrap) {
		wrappedNode = `<div class='highlighted-file-name ${lang}'>${lang}</div>${wrappedNode}`;
	}

	if (!!showFileIcon && !!fileIconOutSideCodeWrap) {
		wrappedNode = `<div class='highlighted-file-icon dummy-file-icon ${lang}'></div>${wrappedNode}`;
	}

	if (!!wrapAll) {
		wrappedNode = `<div class='highlight-wrapper'>${wrappedNode}</div>`;
	}

	return wrappedNode;
};
