# gatsby-remark-highlights

[![Greenkeeper badge](https://badges.greenkeeper.io/amitpatra/gatsby-remark-highlights.svg)](https://greenkeeper.io/)


[![Build Status](https://travis-ci.org/amitpatra/gatsby-remark-highlights.svg?branch=master)](https://travis-ci.org/amitpatra/gatsby-remark-highlights)


Adds syntax highlighting to code blocks in markdown files using [Atom highlights][atom-highlights]

## Install

`npm install --save gatsby-transformer-remark gatsby-remark-highlights`

## How to use

```js
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-highlights`,
          options: {
              // Additional languages, no need to add it 
              // if you don't wish to use additional languages
              additionalLangs: [`language-rust`],
              // scope prefix to use, defaults to ''
              scopePrefix: 'syntax--',
              codeWrap: {
                className: 'midnight'
              }
            }
        },
      ],
    },
  },
]
```

To use additional languages, you have to install them via `npm`
e.g to use Rust install `language-rust` package

`npm install language-rust`

It supports any language that is supported by Atom.
For language packages, please visit [Atom packages][atom-packages]

## Include CSS

To use this plugin you have to use a Atom theme. Atom themes are *less* files so you have to compile them. Rename `atom-text-editor` to `editor` and remove every instance of `syntax--` (optional; if you don't want to do that just set the scopePrefix to `syntax--`)  in the theme files.

## Release History

* 1.3.3 Enable single quote for inline configs
* 1.3.2 Fix for cases when grammar name is absent
* 1.3.1 Fix line highlight bug
* 1.3.0 Implement inline config, line highlight
* 1.2.0 Implement code wrapping
* 1.1.5 Code reorganization
* 1.1.4 Bug fix, highlight when no lang is provided
* 1.1.3 Remove highlight function
* 1.1.2 Remove console.log
* 1.1.1 Add lodash dependency(Bug fix)
* 1.1.0 Support for additional languages and scope prefix added
* 1.0.0 Initial release





[atom-highlights]: https://github.com/atom/highlights
[atom-packages]: https://atom.io/packages/
