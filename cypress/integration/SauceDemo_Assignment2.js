/// <reference types="cypress" />
describe("Testing Add and Remove Product Functionality",()=>{
    let locator
    let credential
    beforeEach(()=>{
        //opens sauce demo website
        cy.OpenSauceDemo()
        //loading all the locators from locators.json to variable locator
        cy.fixture("locators.json").then((locators)=>{
            locator=locators
        })
        //loading all the login data from login_data.json to variable cred
        cy.fixture("login_data.json").then((credentials)=>{
            credential=credentials
        })
    })
    //test case for adding product and verifying cart
    it("add and remove product and verify cart",()=>{
        cy.login(locator,credential.valid_data[0].loginUsername,credential.valid_data[0].loginPass)
        cy.addProductToCart(locator)
        cy.verifyProduct(locator)
        cy.wait(1000)
        cy.moveFromCartToProductPage(locator)
        cy.wait(1000)
        cy.removeItem(locator)
    })
})