# gatsby-remark-highlights
=========

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
        },
      ],
    },
  },
]
```

## Release History

* 1.0.0 Initial release





[atom-highlights]: https://github.com/atom/highlights
