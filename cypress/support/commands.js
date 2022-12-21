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

//COMMANDS FOR SPICE JET
//prints runtime error
Cypress.on('uncaught:exception', (err) => {
    console.log(err);
    return false;
})
//command to open and validate url of Spice Jet
Cypress.Commands.add('openSpiceJet',()=>{
    cy.visit('https://www.spicejet.com/')
    cy.url().should('eq','https://www.spicejet.com/')
})
//command to select city
Cypress.Commands.add('selectLocation',(locator,shortName,fullName,wayOfTravel)=>{
    if(!wayOfTravel)
        cy.get(locator).type(shortName)
    else
        cy.get(locator).eq(1).type(shortName)
    cy.wait(5000)
    cy.contains(fullName).click();
})
//commad to select travel dates
Cypress.Commands.add('selectTravelDate',(day,month,year,locator)=>{
    cy.wait(2000)
    let monthYear=`div[data-testid="undefined-month-`+(`${month}`)+`-`+(`${year}`)+`"]`
    cy.get(monthYear).eq(0)
    .find(locator.travelDetails.date).children().children().children().contains(`${day}`).click()
})
//command to select number of passengers
Cypress.Commands.add('numberOfPassengers',(locator,addPassenger,number)=>{
    while(number>0)
    {
        cy.get(locator.travelDetails.passengersBtn).click()
        cy.get(addPassenger).click()
        cy.get(locator.travelDetails.passengersBtn).click()
        number--
    }
})
//command to select currency
Cypress.Commands.add('selectCurrency',(travelData)=>{
    cy.contains("INR").click();
    cy.get(".css-1dbjc4n").each(($ele) => {
    if ($ele.text() == travelData.travelFormData[0].currency) {
        cy.wrap($ele).click()
    }
})
})
//verify data
Cypress.Commands.add('verifyDetails',(locator,travelData,departureDate,returnDate,tripType)=>{
    cy.wait(2000)
    cy.get(locator.flightsPage.travelDetails).should('contain',(`${travelData.travelFormData[0].fromCityFullName}`+" to "+`${travelData.travelFormData[0].toCityFullName}`))
    cy.get(locator.flightsPage.travelDetails).should('contain',(`${departureDate}`))
    if(tripType==2)
        cy.get(locator.flightsPage.returnDate).should('contain',(`${returnDate}`))
    cy.get(locator.flightsPage.passengerDetails).should('contain',(`${travelData.travelFormData[0].adults}`+" Adults "+`${travelData.travelFormData[0].children}`+" Child  "+`${travelData.travelFormData[0].infants}`+" Infants"))
})
//count number of avaiable flights
Cypress.Commands.add('countFlights',(locator,travelData, tripType)=>{
    cy.get(locator.flightsPage.departureFlights).children(locator.flightsPage.flightListContainer)
    .find(locator.flightsPage.flightListDiv).then(listing => {
        const count = Cypress.$(listing).length;
        cy.log("Number of departure flights to "+ " "+(`${travelData.travelFormData[0].toCityFullName}`)+" = "+count)
    })  
    if(tripType==2)
    {
        cy.get(locator.flightsPage.returnFlights).children(locator.flightsPage.flightListContainer)
        .find(locator.flightsPage.flightListDiv).then(listing => {
            const count = Cypress.$(listing).length;
            cy.log("Number of returning flights to "+ " "+(`${travelData.travelFormData[0].fromCityFullName}`)+" = "+count)
        })  
    }     
})


//Commands for AUTOMATION EXERCISE

//Command to open automation exercise website and verify url
Cypress.Commands.add('openAutomationExercise',()=>{
    cy.visit('https://automationexercise.com/')
    cy.url().should('eq','https://automationexercise.com/')
})

//Command to open signup/login page
Cypress.Commands.add('openSignupLoginPage',(locator)=>{
    cy.get(locator.homepage.signuploginbtn).click()
})

Cypress.Commands.add('verifyText',(locator,text,textid)=>{
    if(textid==1)
        cy.get(locator).children().children().children().eq(2).children().children().eq(0).should('have.text',text)
    else if(textid==2)
        cy.get(locator).children().children().children().children().eq(0).children().eq(0).should('have.text',text)
    else if(textid==3)
        cy.get(locator).children().children().children().children().eq(0).should('have.text',text)
    else if(textid==4)
        cy.get(locator).children().children().children().children().eq(1).children().children().children().eq(9).children().children().should('have.text',text)
    else if(textid==5)
        cy.get(locator).children().children().children().children().eq(0).children().should('have.text',text)
    else if(textid==6)
        cy.get(locator).children().children().children().eq(0).children().children().eq(0).should('have.text',text)
    else if(textid==7)
        cy.get(locator).next().should("have.text",text)
    else if(textid==8)
        cy.get(locator).prev().should("have.text",text)
})

// Cypress.Commands.add('verifyTextAccountInformationText',(locator,text)=>{

// })

// Cypress.Commands.add('generateEmail',(email)=>{
//     var strValues="abcdefghijklmnopqrstuvwxyz0123456789"
//     var strTmp 
//     for (var i=0;i<10;i++) { 
//     strTmp = strValues.charAt(Math.round(strValues.length*Math.random())); 
//     email = email + strTmp; 
//     } 
//     strTmp = ""; 
//     email = email + "@"; 
//     for (var j=0;j<8;j++) { 
//     strTmp = strValues.charAt(Math.round(strValues.length*Math.random())); 
//     email = email + strTmp; 
//     } 
//     email = email + ".com" 
//     return email; 
// })

// Cypress.Commands.add('generatePassword',(pass)=>{
//     var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
//                     'abcdefghijklmnopqrstuvwxyz0123456789@#$';
              
//             for (let i = 1; i <= 8; i++) {
//                 var char = Math.floor(Math.random()
//                             * str.length + 1);
                  
//                 pass += str.charAt(char)
//             }
              
//     return pass;
// })

Cypress.Commands.add('fillSignUpForm',(locator,data,email)=>{
    cy.get(locator.signup_login.name).type(data.signup_data[0].username)
    cy.get(locator.signup_login.email).type(email)
    cy.get(locator.signup_login.submit).click()
})

Cypress.Commands.add('fillAccountInformation',(locator,data,pass)=>{
    cy.get(locator.signup_login.title).click()
    cy.get(locator.signup_login.password).type(pass)
    // cy.get(locator.signup_login.day).click()
    // cy.get("#days").each(($ele) => {
    //     if ($ele.text() == data.signup_data[0].day) {
    //         cy.wrap($ele).click()
    //     }
    // })    
    // // cy.get(locator.signup_login.month).click()
    // // cy.contains(data.signup_data[0].month).click()
    // // cy.get(locator.signup_login.year).click()
    // // cy.contains(data.signup_data[0].year).click()
    cy.get(locator.signup_login.firstname).type(data.signup_data[0].firstname)
    cy.get(locator.signup_login.lastname).type(data.signup_data[0].lastname)
    cy.get(locator.signup_login.company).type(data.signup_data[0].company)
    cy.get(locator.signup_login.address).type(data.signup_data[0].address)
    cy.get(locator.signup_login.state).type(data.signup_data[0].state)
    cy.get(locator.signup_login.city).type(data.signup_data[0].city)
    cy.get(locator.signup_login.zipcode).type(data.signup_data[0].zipcode)
    cy.get(locator.signup_login.mobilenumber).type(data.signup_data[0].mobilenumber)
})

Cypress.Commands.add('fillLoginForm',(locator,email,pass)=>{
    cy.get(locator.signup_login.loginemail).type(email)
    cy.get(locator.signup_login.loginpassword).type(pass)
    cy.get(locator.signup_login.loginbtn).click()
})