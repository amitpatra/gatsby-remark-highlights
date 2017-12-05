const remark = require(`remark`);
const plugin = require(`../index`);

describe(`remark atom highlights plugin`, () => {
	it(`generates highlighted code`, () => {
		const code = `\`\`\`js\n// Atom Highlights\n\`\`\``;
		const markdownAST = remark.parse(code);
		plugin({ markdownAST });
		expect(markdownAST).toMatchSnapshot();
	});

	it(`does not blast off when no lang is provided`, () => {
		const code = `\`\`\`\n// Atom Highlights\n\`\`\``;
		const markdownAST = remark.parse(code);
		plugin({ markdownAST });
		expect(markdownAST).toMatchSnapshot();
	});

	it(`highlight code when language name is provided`, () => {
		const code = `\`\`\`javascript\n// Atom Highlights\n\`\`\``;
		const markdownAST = remark.parse(code);
		plugin({ markdownAST });
		expect(markdownAST).toMatchSnapshot();
	});

	it(`highlight code when filename name is provided`, () => {
		const code = `\`\`\`test.js\n// Atom Highlights\n\`\`\``;
		const markdownAST = remark.parse(code);
		plugin({ markdownAST });
		expect(markdownAST).toMatchSnapshot();
	});

	it(`highlight codes from addition langs`, () => {
		const code = `\`\`\`rs\n// Atom Highlights\n\`\`\``;
		const markdownAST = remark.parse(code);
		plugin({ markdownAST }, { additionalLangs: [`language-rust`] });
		expect(markdownAST).toMatchSnapshot();
	});
});
