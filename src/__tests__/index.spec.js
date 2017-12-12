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

	it(`highlight codes from scope when scope is provided; it would try to use js even if rs is provided`, () => {
		const code = `\`\`\`rs{scopeName: source.js}\n// Atom Highlight\n\`\`\``;
		const markdownAST = remark.parse(code);
		plugin({ markdownAST });
		expect(markdownAST).toMatchSnapshot();
	});

	it(`highlight codes from scope when scope is provided and languagePackage is provided`, () => {
		const code = `\`\`\`html{scopeName:source.hugo, languagePackage:language-hugo}\n<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<title>{{ block "title" . }}\n{{ .Site.Title }}\n{{ end }}\n</title>\n</head>\n<body>\n{{ block "main" . }}\n{{ end }}\n</body>\n</html>\n\`\`\``;
		const markdownAST = remark.parse(code);
		plugin({ markdownAST });
		expect(markdownAST).toMatchSnapshot();
	});

	it(`inline scopePrefix`, () => {
		const code = `\`\`\`js{scopePrefix: source--}\n// Atom Highlight\n\`\`\``;
		const markdownAST = remark.parse(code);
		plugin({ markdownAST });
		expect(markdownAST).toMatchSnapshot();
	});

	it(`override scopePrefix`, () => {
		const code = `\`\`\`js{scopePrefix: }\n// Atom Highlight\n\`\`\``;
		const markdownAST = remark.parse(code);
		plugin({ markdownAST }, { scopePrefix: `source--` });
		expect(markdownAST).toMatchSnapshot();
	});
});
