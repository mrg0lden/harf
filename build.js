const {
  rollup
} = require("rollup")
const typeScript = require("rollup-plugin-typescript2")
const buble = require("rollup-plugin-buble")
const pkg = require("./package.json")
const fs = require("fs")
const rimraf = require("rimraf")
const {
  minify
} = require("uglify-js")
const minifyES = require("terser").minify


const banner = `/*
* harf.js ${pkg.version}
* Copyright © ${new Date().getFullYear()} MrG0lden
* Released under MIT license
*/`

rimraf.sync("./lib")

setTimeout(() => {

  rollup({
    input: "src/index.ts",
    plugins: [
      typeScript(),
      buble({
        transforms: {
          modules: false,
          dangerousForOf: true
        },
        targets: {
          firefox: 32,
          chrome: 24,
          safari: 6,
          opera: 15,
          edge: 10,
          ie: 10
        }
      })
    ]
  }).then(bundle => {
    bundle.write({
      banner,
      format: "cjs",
      file: pkg.main
    })

    bundle.write({
      banner,
      format: "umd",
      name: pkg.name,
      file: pkg.browser
    }).then(_ => {
      const data = fs.readFileSync(pkg.browser, "utf8");

      // minification
      const {
        code
      } = minify(data, {
        mangle: {
          keep_fnames: /harf/
        }
      })
      fs.writeFileSync(pkg.browser, `${banner}\n${code}`)
    }).catch(console.error)
  }).catch(console.error)
}, 0);


rollup({
  input: "src/index.ts",
  plugins: [
    typeScript(),
    buble({
      transforms: {
        modules: true,
        dangerousForOf: true
      },
      targets: {
        firefox: 60,
        chrome: 71,
      }
    })
  ]
}).then(bundle => {

  bundle.write({
    banner,
    format: "esm",
    file: pkg.module
  })

  bundle.write({
    banner,
    file: pkg["browser:module"],
    format: "esm"
  }).then(_ => {
    const data = fs.readFileSync(pkg["browser:module"], "utf8");

    // minification
    const {
      code
    } = minifyES(data, {
      ecma: 6,
      module: true,
      mangle: {
        keep_fnames: /^harf/
      }
    })
    fs.writeFileSync(pkg["browser:module"], `${banner}\n${code}`)
  }).catch(console.error)
}).catch(console.error)