/// <reference types="cypress" />
describe('Testing Automation Exercise Website',()=>{
    let locator, data
    var email, pass
    before(()=>{
        cy.openAutomationExercise()
        cy.fixture("locatorsAutomationExercise.json").then((locators)=>{
            locator=locators
        })
        cy.fixture("dataAutomationExercise.json").then((details)=>{
            data=details
        }) 
    }) 
    // We need to create new user account every time because after some test cases we have to delete the account as per the given requirements
    beforeEach(()=>{
        cy.get(locator.homepage.signup_loginbtn).click()
        cy.verifyText("New User Signup!")
        var num = Math.floor(1000 + Math.random() * 9000);
        email="Kshitij"+num+"@gmail.com"
        pass=''
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';
        for(let i = 1; i <= 8; i++) {
            var char = Math.floor(Math.random()* str.length + 1)
            pass += str.charAt(char)
        }
        cy.get(locator.homepage.signup_loginbtn).click()
        cy.fillSignUpForm(locator,data,email)
        cy.verifyText("Enter Account Information")
        cy.get(locator.signup_login.title).click()
        cy.get(locator.signup_login.password).type(pass)
        cy.fillDateOfBirth(data.dateofbirth)
        cy.fillPersonalDetails(data.personal_details)
        cy.get(locator.signup_login.createaccount).click()
    })
    it("Register User",()=>{
        cy.verifyText("Account Created!")
        cy.get(locator.signup_login.continue).click()
        cy.verifyText(' Logged in as '+data.signup_data[0].username)
        cy.contains("Delete Account").click()
        cy.verifyText("Account Deleted!")
        cy.get(locator.homepage.continue).click()
    })
    it("Login with correct credentials",()=>{
        cy.get(locator.signup_login.continue).click()
        cy.get(locator.homepage.logoutbtn).click()
        cy.openAutomationExercise()
        cy.get(locator.homepage.signup_loginbtn).click()
        cy.verifyText("Login to your account")
        cy.fillLoginForm(locator,email,pass)
        cy.verifyText(' Logged in as '+data.signup_data[0].username)
        cy.contains("Delete Account").click()
        cy.verifyText("Account Deleted!")
    })
    it("Login with incorrect credentials",()=>{
        cy.get(locator.signup_login.continue).click()
        cy.get(locator.homepage.logoutbtn).click()
        cy.openAutomationExercise()
        cy.get(locator.homepage.signup_loginbtn).click()
        cy.verifyText("Login to your account")
        email="a"+email
        pass=pass+'1'
        cy.fillLoginForm(locator,email,pass)
        cy.verifyText("Your email or password is incorrect!")
    })
    it("Logout User",()=>{
        cy.get(locator.signup_login.continue).click()
        cy.get(locator.homepage.logoutbtn).click()
        cy.openAutomationExercise()
        cy.get(locator.homepage.signup_loginbtn).click()
        cy.verifyText("Login to your account")
        cy.fillLoginForm(locator,email,pass)
        cy.verifyText(' Logged in as '+data.signup_data[0].username)
        cy.get(locator.homepage.logoutbtn).click()
        cy.url().should('eq','https://automationexercise.com/login')
    })
    it("Register User with existing email",()=>{
        cy.verifyText("Account Created!")
        cy.get(locator.signup_login.continue).click()
        cy.verifyText(' Logged in as '+data.signup_data[0].username)
        cy.get(locator.homepage.logoutbtn).click()
        cy.fillSignUpForm(locator,data,email)
        cy.verifyText('Email Address already exist!')
    })
})