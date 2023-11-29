const { renderDOM } = require("./helper")
const fetchMock = require('jest-fetch-mock');
fetchMock.enableMocks();

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

it("drop down visibility is made visible", () => {
    const list = document.querySelector("#list")
    const showDropdown = document.querySelector("#myInput")

    if (list.style.display === "none" || list.style.display === "") {
        showDropdown.click()
        expect(list.style.display).toBe('block')
    }
  })

  it("drop down visibility is made invisible", () => {
    const list = document.querySelector("#list")
    const showDropdown = document.querySelector("#myInput")

    if (list.style.display === "block") {
        showDropdown.click()
        expect(list.style.display).toBe('none')
    }
  })



})
