/// <reference types="cypress" />
describe('Testing Automation Exercise Website',()=>{
    let locator, data
    var email, pass
    beforeEach(()=>{
        cy.openAutomationExercise()
        cy.fixture("locatorsAutomationExercise.json").then((locators)=>{
            locator=locators
        })
        cy.fixture("dataAutomationExercise.json").then((details)=>{
            data=details
        }) 
    })
    beforeEach(()=>{
        cy.openSignupLoginPage(locator)
        cy.verifyText(locator.signup_login.signupform,"New User Signup!",1)
        email=''
        var strValues="abcdefghijklmnopqrstuvwxyz0123456789"
        var strTmp 
        for (var i=0;i<10;i++) { 
        strTmp = strValues.charAt(Math.round(strValues.length*Math.random())); 
        email = email + strTmp; 
        } 
        strTmp = ""; 
        email = email + "@"; 
        for (var j=0;j<8;j++) { 
        strTmp = strValues.charAt(Math.round(strValues.length*Math.random())); 
        email = email + strTmp; 
        } 
        email = email + ".com" 
        pass=''
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
                    'abcdefghijklmnopqrstuvwxyz0123456789@#$';
              
            for (let i = 1; i <= 8; i++) {
                var char = Math.floor(Math.random()
                            * str.length + 1);
                  
                pass += str.charAt(char)
            }
        cy.openSignupLoginPage(locator)
        cy.fillSignUpForm(locator,data,email)
        cy.verifyText(locator.signup_login.accountinfotext,"Enter Account Information",2)
        cy.fillAccountInformation(locator,data,pass)
        cy.get(locator.signup_login.createaccount).click()
    })
    it("Register User",()=>{
        cy.verifyText(locator.signup_login.accountcreated,"Account Created!",3)
        cy.get(locator.signup_login.continue).click()
        cy.verifyText(locator.homepage.loggedinasusername,data.signup_data[0].username,4)
        cy.contains("Delete Account").click()
        cy.verifyText(locator.homepage.accountdeleted,"Account Deleted!",5)
        cy.get(locator.homepage.continue).click()
    })
    it("Login with correct credentials",()=>{
        cy.get(locator.signup_login.continue).click()
        cy.get(locator.homepage.logoutbtn).click()
        cy.openAutomationExercise()
        cy.openSignupLoginPage(locator)
        cy.verifyText(locator.signup_login.loginform,"Login to your account",6)
        cy.fillLoginForm(locator,email,pass)
        cy.verifyText(locator.homepage.loggedinasusername,data.signup_data[0].username,4)
        cy.contains("Delete Account").click()
        cy.verifyText(locator.homepage.accountdeleted,"Account Deleted!",5)
    })
    it("Login with incorrect credentials",()=>{
        cy.get(locator.signup_login.continue).click()
        cy.get(locator.homepage.logoutbtn).click()
        cy.openAutomationExercise()
        cy.openSignupLoginPage(locator)
        cy.verifyText(locator.signup_login.loginform,"Login to your account",6)
        var pass=''
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
                    'abcdefghijklmnopqrstuvwxyz0123456789@#$';
              
            for (let i = 1; i <= 8; i++) {
                var char = Math.floor(Math.random()
                            * str.length + 1);
                  
                pass += str.charAt(char)
            }
        cy.fillLoginForm(locator,email,pass)
        cy.verifyText(locator.signup_login.loginpassword,"Your email or password is incorrect!",7)
    })
    it("Logout User",()=>{
        cy.get(locator.signup_login.continue).click()
        cy.get(locator.homepage.logoutbtn).click()
        cy.openAutomationExercise()
        cy.openSignupLoginPage(locator)
        cy.verifyText(locator.signup_login.loginform,"Login to your account",6)
        cy.fillLoginForm(locator,email,pass)
        cy.verifyText(locator.homepage.loggedinasusername,data.signup_data[0].username,4)
        cy.get(locator.homepage.logoutbtn).click()
        cy.url().should('eq','https://automationexercise.com/login')
    })
    it("Register User with existing email",()=>{
        cy.verifyText(locator.signup_login.accountcreated,"Account Created!",3)
        cy.get(locator.signup_login.continue).click()
        cy.verifyText(locator.homepage.loggedinasusername,data.signup_data[0].username,4)
        cy.get(locator.homepage.logoutbtn).click()
        cy.fillSignUpForm(locator,data,email)
        cy.verifyText(locator.signup_login.submit,'Email Address already exist!',8)
    })
})