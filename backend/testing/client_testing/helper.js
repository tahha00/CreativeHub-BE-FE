const path = require('path')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const renderDOM = async(home) => {
  const filePath = path.join(process.cwd(), home)
  const dom = await JSDOM.fromFile(filePath, {
    runScripts: 'dangerously',
    resources: 'usable'
  })

  return new Promise((resolve, _) => {
    dom.window.document.addEventListener('DOMContentLoaded', () => {
      resolve(dom)
    })
  })
}

module.exports = { renderDOM }
