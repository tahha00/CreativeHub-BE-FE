/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../../../frontend/home-page/home.html'), 'utf8');
const classes = require('../../../frontend/home-page/home');

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      classes: [
        { "name": "Intermediate Pottery", "venue": "The Crafts Centre", "date": "Every_Tuesday" },
        { "name": "Introduction to Glass Blowing", "venue": "Florin Town Hall", "date": "Every_Friday" }
      ]
    })
  }))

describe('home.html',() => {
    beforeEach(() => {
      document.documentElement.innerHTML = html.toString();
    })
  
    afterEach(() => {
      jest.clearAllMocks()
    })

it('fetch is called when fetchClasses is invoked', async () => {
    await classes.fetchClasses()
    expect(fetch).toHaveBeenCalledTimes(1)
})

})
