//commands for Sauce Demo

//function for opening sauce demo website
Cypress.Commands.add('OpenSauceDemo', () => {
    cy.visit("https://www.saucedemo.com/")
})
//function to enter login credential in text boxes and clicking login butotn
Cypress.Commands.add('login',(locator,userName,pass)=>{
    cy.get(locator.login.username).type(userName)
    cy.get(locator.login.password).type(pass)
    cy.get(locator.login.loginBtn).click()
})
//function for checking login for each valid credential
Cypress.Commands.add('loginVal',(locator,cred)=>{
    for(let i=0;i<cred.valid_data.length;i++){
        cy.login(locator,cred.valid_data[i].loginUsername,cred.valid_data[i].loginPass)
        cy.checkValLogin(locator)
    }
})
//function to validate that after entering valid credentials the user has been directed to Products page then returning to login page
Cypress.Commands.add('checkValLogin',(locator)=>{
    cy.url().should('eq','https://www.saucedemo.com/inventory.html')
    cy.get(locator.logout.menuBtn).click()
    cy.get(locator.logout.logoutBtn).click()
})
//function for checking login for each invalid credential
Cypress.Commands.add('loginInval',(locator,cred)=>{
    for(let i=0;i<cred.invalid_data.length;i++){
        cy.login(locator,cred.invalid_data[i].loginUsername,cred.invalid_data[i].loginPass)
        cy.checkInvalLogin(locator)
    }
})
//function to validate that after entering invalid credentials the user stays on the same page 
Cypress.Commands.add('checkInvalLogin',(locator)=>{
    cy.url().should('eq','https://www.saucedemo.com/')
    cy.get(locator.login.username).clear()
    cy.get(locator.login.password).clear()
})
//function to add product into cart
Cypress.Commands.add('addProductToCart',(locator)=>{
    cy.get(locator.productPage.addToCartBtn).click()
    cy.get(".inventory_item_name").eq(0).invoke('text').as('itemName1')
    cy.get(".inventory_item_price").eq(0).invoke('text').as('itemCost1')
})
//function to verify added product
Cypress.Commands.add('verifyProduct',(locator)=>{
    cy.get(locator.productPage.cartBtn).click()
    cy.get('@itemName1').then((itemName)=>{
        let Item_name=itemName
        cy.contains(Item_name)
    })
    cy.get('@itemCost1').then((itemCost)=>{
        let Item_cost=itemCost
        cy.contains(Item_cost)
    })
})
//function to move back to product page from cart
Cypress.Commands.add('moveFromCartToProductPage',(locator)=>{
    cy.get(locator.cartPage.continueShopping).click()
})
//function to remove item from cart
Cypress.Commands.add('removeItem',(locator)=>{
    cy.contains('Remove').should('be.visible').click()
    cy.get(locator.productPage.cartBtn).click()
    cy.get(locator.cartPage.cartList).should("not.have.class",locator.cartPage.cartItem)
})


//CORRECT THE LOCATOR FORMAT