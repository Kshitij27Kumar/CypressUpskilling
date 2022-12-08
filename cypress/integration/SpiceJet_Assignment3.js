/// <reference types="cypress" />
import moment from 'moment'
describe("Testing Search Flight Functionalities",()=>{
    let locator, travelData
    beforeEach(()=>{
        //opens spicejet website
        cy.openSpiceJet()
        cy.wait(1000)
        //loading all the locators from locatorsSpiceJet file to locator variable
        cy.fixture("locatorsSpiceJet.json").then((locators)=>{
            locator=locators
            cy.viewport(1024,635)
        })
        cy.fixture("travelDataSpiceJet.json").then((data)=>{
            travelData=data
        })
    })
    //Filling travel details for one way trip in the form visible on homepage
    it("fill travel details for one way trip",()=>{
        cy.wait(2000)
        cy.get(locator.travelDetails.oneWay).click()
        cy.selectLocation(locator.travelDetails.fromCity,travelData.travelFormData[0].fromCityShortName,travelData.travelFormData[0].fromCityFullName,0)
        cy.selectLocation(locator.travelDetails.toCity,travelData.travelFormData[0].toCityShortName,travelData.travelFormData[0].toCityFullName,1)
        const day=moment().add(8,'day').format('D')
        const month=moment().format('MMMM')
        const year=moment().format('YYYY')
        const departureDate=day+" "+month.slice(0,3)+" "+year
        cy.selectTravelDate(day,month,year,locator)
        cy.numberOfPassengers(locator,locator.travelDetails.addAdults,travelData.travelFormData[0].adults-1)
        cy.numberOfPassengers(locator,locator.travelDetails.addChildren,travelData.travelFormData[0].children)
        cy.numberOfPassengers(locator,locator.travelDetails.addInfants,travelData.travelFormData[0].infants) 
        cy.selectCurrency(travelData)
        cy.get(locator.travelDetails.searchFlight).click()
        cy.wait(2000)
        cy.verifyDetails(locator,travelData,departureDate,0,1)
        cy.countFlights(locator,travelData,1);
    })
    //Filling travel details for round trip in the form visible on homepage
    it("fill travel details for round trip",()=>{
        cy.wait(1000)
        cy.get(locator.travelDetails.roundTrip).click()
        cy.selectLocation(locator.travelDetails.fromCity,travelData.travelFormData[0].fromCityShortName,travelData.travelFormData[0].fromCityFullName,0)
        cy.selectLocation(locator.travelDetails.toCity,travelData.travelFormData[0].toCityShortName,travelData.travelFormData[0].toCityFullName,1)
        //departure date
        let day=moment().add(5,'day').format('D')
        let month=moment().format('MMMM')
        let year=moment().format('YYYY')
        cy.selectTravelDate(day,month,year,locator)
        const departureDate=day+" "+month.slice(0,3)+" "+year
        //return date
        day=moment().add(10,'day').format('D')
        month=moment().format('MMMM')
        year=moment().format('YYYY')
        const returnDate=day+" "+month.slice(0,3)+" "+year
        cy.selectTravelDate(day,month,year,locator)
        cy.numberOfPassengers(locator,locator.travelDetails.addAdults,travelData.travelFormData[0].adults-1)
        cy.numberOfPassengers(locator,locator.travelDetails.addChildren,travelData.travelFormData[0].children)
        cy.numberOfPassengers(locator,locator.travelDetails.addInfants,travelData.travelFormData[0].infants)
        cy.selectCurrency(travelData)
        cy.get(locator.travelDetails.searchFlight).click()
        cy.wait(2000)
        cy.verifyDetails(locator,travelData,departureDate,returnDate,2)
        cy.countFlights(locator,travelData,2)
    })
})