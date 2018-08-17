const remark = require('remark');
const plugin = require('../index');

const runTestWithPluginOptions = (code, options = {}) => {
  const markdownAST = remark.parse(code);
  plugin({ markdownAST }, options);
  expect(markdownAST).toMatchSnapshot();
};

describe('remark atom highlights plugin', () => {
  it('generates highlighted code', () => {
    const code = '```js\n// Atom Highlights\n```';
    runTestWithPluginOptions(code);
  });

  it('does not blast off when no lang is provided', () => {
    const code = '```\n// Atom Highlights\n```';
    runTestWithPluginOptions(code);
  });

  it('highlight code when language name is provided', () => {
    const code = '```javascript\n// Atom Highlights\n```';
    runTestWithPluginOptions(code);
  });

  it('highlight code when filename name is provided', () => {
    const code = '```test.js\n// Atom Highlights\n```';
    runTestWithPluginOptions(code);
  });

  it('inline scopePrefix', () => {
    const code = '```js{scopePrefix: "source--"}\n// Atom Highlight\n```';
    runTestWithPluginOptions(code);
  });

  it('highlight codes from scope when scope is provided; it would try to use js even if rs is provided', () => {
    const code = '```rs{scopeName: "source.js"}\n// Atom Highlight\n```';
    runTestWithPluginOptions(code);
  });

  it('highlight codes from addition langs when passed in inline config', () => {
    const code = '```rs{languagePackage: "language-rust"}\n// Atom Highlight\n```';
    runTestWithPluginOptions(code);
  });

  it('loads grammars from inline config', () => {
    const code = '```rs{languagePackage: "language-rust"}\n// Atom Highlight\n```';
    runTestWithPluginOptions(code);
  });

  it('highlight codes from scope when scope is provided and languagePackage is provided', () => {
    const code = '```html{scopeName:"source.hugo", languagePackage:"language-hugo"}\n<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<title>{{ block "title" . }}\n{{ .Site.Title }}\n{{ end }}\n</title>\n</head>\n<body>\n{{ block "main" . }}\n{{ end }}\n</body>\n</html>\n```';
    runTestWithPluginOptions(code);
  });

  it('should highlight line numbers', () => {
    const code = '```html{scopeName:"source.hugo", languagePackage:"language-hugo", highlightLines: (1-2, 5)}\n<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<title>{{ block "title" . }}\n{{ .Site.Title }}\n{{ end }}\n</title>\n</head>\n<body>\n{{ block "main" . }}\n{{ end }}\n</body>\n</html>\n```';
    runTestWithPluginOptions(code);
  });

  it('highlight when inline config is provided in single quote', () => {
    const code = '```js{scopePrefix: \'source--\'}\n// Atom Highlight\n```';
    runTestWithPluginOptions(code);
  });

  it('should replace pre class from inlineconfig', () => {
    const code = '```js{ preClass: { removeClass: true } }\n// Atom Highlight with fileName\n```';
    runTestWithPluginOptions(code);
  });

  it('has codewraps when inline codewrapping is enabled', () => {
    const code = '```js{ codeWrap: true }\n// Atom Highlights\n```';
    runTestWithPluginOptions(code);
  });

  it('has codewraps and fileicons when enabled in inline config', () => {
    const code = '```js{ codeWrap: true, showFileIcon: true  }\n// Atom Highlights\n```';
    runTestWithPluginOptions(code);
  });

  it('highlight codes from addition langs from plugin config', () => {
    const code = '```rs\n// Atom Highlights\n```';
    const options = { additionalLangs: ['language-rust'] };
    runTestWithPluginOptions(code, options);
  });

  it('has codewraps when codewrapping is enabled', () => {
    const code = '```js\n// Atom Highlights\n```';
    const options = { codeWrap: true };
    runTestWithPluginOptions(code, options);
  });

  it('has codewraps with specific class when codewrapping is enabled', () => {
    const code = '```js\n// Atom Highlights\n```';
    const options = { codeWrap: { className: 'midnight' } };
    runTestWithPluginOptions(code, options);
  });

  it('override scopePrefix from config when inline config is provided', () => {
    const code = '```js{scopePrefix: ""}\n// Atom Highlight\n```';
    const options = { scopePrefix: 'source--' };
    runTestWithPluginOptions(code, options);
  });

  it('should show filename', () => {
    const code = '```js\n// Atom Highlight with fileName\n```';
    const options = { showFileName: true };
    runTestWithPluginOptions(code, options);
  });

  it('should show fileicon', () => {
    const code = '```js\n// Atom Highlight with fileName\n```';
    const options = { showFileIcon: true };
    runTestWithPluginOptions(code, options);
  });

  it('should replace pre class from config', () => {
    const code = '```js\n// Atom Highlight with fileName\n```';
    const options = { preClass: { removeClass: true } };
    runTestWithPluginOptions(code, options);
  });

  it('should set custom pre class from config', () => {
    const code = '```js\n// Atom Highlight with fileName\n```';
    const options = { preClass: { className: 'foo bar' } };
    runTestWithPluginOptions(code, options);
  });
});
