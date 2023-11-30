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

it("has a h2", () => {
    const h2 = document.querySelector("h2")
    expect(h2.textContent).toContain(" Select the class that suits your needs")
  })

  it("has a dropdown set of links", () => {
    const dropdown = document.querySelector(".dropdown")
    expect(dropdown).toBeTruthy
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

  it("filter button works", () => {
    const button = document.querySelector('#filtersButton')
    button.click()
    expect(button).toBeTruthy
  })

  it("")
})
