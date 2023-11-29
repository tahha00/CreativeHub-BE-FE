const { renderDOM } = require("./helper")

let dom
let document

describe('home.html', () => {
    beforeEach(async () => {
        dom = await renderDOM(("../frontend/home-page/home.html"))
        document = await dom.window.document
    })

it('has a h1', () => {
    const h1 = document.querySelector('h1')
    expect(h1.innerHTML).toContain("Florin County")
})

it('all classes are loaded', () => {

    const classDisplay = document.querySelector('#classContainer')    
    const classes = classDisplay.querySelectorAll('.class-separator')

    expect(classes.length).toBeGreaterThan(0)
})



})

