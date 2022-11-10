/// <reference types="cypress" />
describe("Testing Suace Demo",()=>{
    let locator
    beforeEach(()=>{
        cy.OpenSauceDemo()
        cy.fixture("SauceDemoData.json").then((locators)=>{
            locator=locators
        })
    })
    it("login validation",()=>{
        cy.loginVal(locator)
    })
})