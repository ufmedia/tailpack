# Tailpack

A collection of scripts and tools for rapid front-end development including Tailwindcss which can be used optionally. 

These scripts are an extension of the [Wordpress Scripts](https://www.npmjs.com/package/@wordpress/scripts) package.

The intention is that these scripts can be used during static (serverless) development and once you migrate (if you migrate) onto a hosted platform - PHP/Wordpress, for example. As such, webpack-dev-server has been swapped out for BrowserSync which can serve the static files and also proxy the site if hosted locally on wamp/lamp/docker etc. 

## Configuration

### Entry & Output

By default webpack will look for the entry point pulic/src/js/index.js your sass and any additional JS can be imported into this file for complilation:

```
import '../scss/style.scss'
//import any other js files here

```

By default webpack will output all compiled JS and CSS into the public/build folder.

You can alter the entry and output points within the webpack.config.js file:

```
entry: {
    index: path.resolve(process.cwd(), 'public/src/js/', 'index.js')
  },
  output: {
    path: path.resolve(process.cwd(), 'public/build')
  },
```

### Tailwindcss

[Tailwindcsss](https://tailwindcss.com/) and [Tailwind Elements](https://tailwind-elements.com/) are included with this repo to help with rapid development, it's entirely optional and can be easily excluded from your compiled CSS and JS by removing the imports within the public/src/scss/style.scss file:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### BrowserSync

Within the webpack.config.js you can toggle the comment on the following two lines accordingly - by default BrowserSync is configured to serve as it's likely you're starting a new project.

```
//proxy: 'http://localhost/' //Use a proxy when using an existing local server.
server: { baseDir: ['public'] } //Use BrowserSync's server when not using an existing local server.
```

### Watching for file changes

Webpack watch by default will only watch files which are children of the entry point directory (by default this is public/src/). This is most likely fine for new static projects but if you're working on an existing application or, for example, developing a wordpress plugin or theme, you can add additional file globs to be watched. These will then trigger a reload within the browser once changed. Within the webpack.config.js:

```
new WatchExternalFilesPlugin({
      files: [
        './**/*.php',
        './**/*.twig',
        '!./src/**/*',
        '!./node_modules/**/*',
        '!./build/**/*',
      ]
    })
```

## Usage 

### Installation

```
npm install
```

### Development

```
npm run watch
```


### Production

```
npm run build
```

## Todo

This is a work in progress and will evolve as more use cases are added, however, the goal here is to keep things clean and simple for reusability across multiple, similar projects. Complex functionality required for a single project shouldn't make it into this repo in favour of this ethos.

With this in mind, the following additions are being explored:

- Image optimisation
