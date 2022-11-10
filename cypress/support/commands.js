//commands for Sauce Demo
Cypress.Commands.add('OpenSauceDemo', () => {
    cy.visit("https://www.saucedemo.com/")
})
Cypress.Commands.add('loginVal',(locator)=>{
    for(let i=0;i<locator.data.length;i++){
        cy.login(locator.login.username,locator.data[i].loginUsername,locator.login.password,locator.data[i].loginPass,locator.login.loginBtn)
        cy.checkLogin(locator.logout.menuBtn,locator.logout.logoutBtn)
    }
})
Cypress.Commands.add('login',(userNameLoc,userName,passLoc,pass,btn)=>{
    cy.get(userNameLoc).type(userName)
    cy.get(passLoc).type(pass)
    cy.get(btn).click()
})
Cypress.Commands.add('checkLogin',(menu,logout)=>{
    cy.url().should('eq','https://www.saucedemo.com/inventory.html')
    cy.get(menu).click()
    cy.get(logout).click()
})