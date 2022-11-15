/// <reference types="cypress" />
describe("Testing Suace Demo Login Functionality",()=>{
    let locator
    let cred
    beforeEach(()=>{
        //opens sauce demo website
        cy.OpenSauceDemo()
        //loading all the locators from locators.json to variable locator
        cy.fixture("locators.json").then((locators)=>{
            locator=locators
        })
        //loading all the login data from login_data.json to variable cred
        cy.fixture("login_data.json").then((credentials)=>{
            cred=credentials
        })
    })
    //test case for logging in with valid credentials 
    it("login with valid data",()=>{
        cy.loginVal(locator,cred)
    })
    //test case for logging in with invalid credentials
    it("login with invalid data",()=>{
        cy.loginInval(locator,cred)
    })
})

    