const visit = require(`unist-util-visit`);
const Highlights = require('highlights');

const highlighter = new Highlights();

// Highlighing function
const highlight = (contents, lang) =>
	highlighter.highlightSync({
		fileContents: contents,
		filePath: `fake.${lang}`
	});

module.exports = ({ markdownAST }) => {
	visit(markdownAST, `code`, node => {
		node.type = `html`;
		node.value = highlight(node.value, node.lang);
	});
};
