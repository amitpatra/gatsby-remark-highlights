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

	it(`has codewraps when codewrapping is enabled`, () => {
		const code = `\`\`\`js\n// Atom Highlights\n\`\`\``;
		const markdownAST = remark.parse(code);
		plugin({ markdownAST }, { codeWrap: true });
		expect(markdownAST).toMatchSnapshot();
	});

	it(`has codewraps with specific class when codewrapping is enabled`, () => {
		const code = `\`\`\`js\n// Atom Highlights\n\`\`\``;
		const markdownAST = remark.parse(code);
		plugin({ markdownAST }, { codeWrap: { className: 'midnight' } });
		expect(markdownAST).toMatchSnapshot();
	});

	it(`highlight codes from addition langs when it provided along its name`, () => {
		const code = `\`\`\`rs{languagePackage: language-rust}\n// Atom Highlight\n\`\`\``;
		const markdownAST = remark.parse(code);
		plugin({ markdownAST });
		expect(markdownAST).toMatchSnapshot();
	});
});
