/// <reference types="cypress" />


import { Given, And, Then, When } from "cypress-cucumber-preprocessor/steps";

Given('I make a GET call to users details API', () => {
cy.request({
    method: "GET",
    url: "https://jsonplaceholder.typicode.com/users",
    headers: {
      accept: "application/json"
    }
  }).as('currentRequestResponse')

});


Then('I expect the API call to return {string} status', (statusCode) => {
  cy.get('@currentRequestResponse').then(response => {
    expect(response.status).to.eql(parseInt(statusCode))
  });

});


And('I expect the response to be an array', () => {
  cy.get('@currentRequestResponse').then(response => {
    assert.isArray(response.body, 'response is an array!')
  });

});

Then('the Users API response body should contain all the expected attributes', () => {
  cy.get('@currentRequestResponse').then(response => {
    let body = JSON.parse(JSON.stringify(response.body))

    body.forEach(user => {
      expect(user).to.have.all.keys("id", "name", "username", "email", "address", "phone", "website", "company");

      ['street', 'suite', 'city', 'zipcode', 'geo'].forEach(key => {
        expect(user['address']).to.have.property(key);
      });

      ['name', 'catchPhrase', 'bs'].forEach(key => {
        expect(user['company']).to.have.property(key);
      });

    });

});

});


And('I expect the length to be {string}', (length) => {
  cy.get('@currentRequestResponse').then(response => {
    expect(response.body).to.have.length.of.at.most(parseInt(length))
  });

});


Given('I make a GET call to ToDo items details API', () => {
  cy.request({
    method: "GET",
    url: "https://jsonplaceholder.typicode.com/todos",
    headers: {
      accept: "application/json"
    }
  }).as('currentRequestResponse')

});


Then('the Todo API response body should contain all the expected attributes', () => {
  cy.get('@currentRequestResponse').then(response => {
    let body = JSON.parse(JSON.stringify(response.body))

    body.forEach(user => {
      expect(user).to.have.all.keys("userId", "id", "title", "completed");

    });

  });

});



Given('I make a GET call to ToDo items details API for a particular user with id {string}', (id) => {
  cy.request({
    method: "GET",
    url: "https://jsonplaceholder.typicode.com/users/"+id+"/todos",
    headers: {
      accept: "application/json"
    }
  }).as('currentRequestResponse')

});


Given('I make a POST call to ToDo items details API for a particular user with id {string}', (id) => {
  cy.request({
    method: "POST",
    url: "https://jsonplaceholder.typicode.com/users/" + id + "/todos",
    body: {
      userId: 1,
      title:"sample ToDo List Name",
      author: "Sarah Jones",
      completed:true
    }
  }).as('currentRequestResponse')

});


And('I expect the response to be an object', () => {
  cy.get('@currentRequestResponse').then(response => {
    assert.isObject(response.body, 'response is an object!')
  });

});


And('I expect {string} attribute in response to be equal to {string}', (key,value) => {
  cy.get('@currentRequestResponse').then(response => {
    let body = JSON.parse(JSON.stringify(response.body))

    expect(body[key]).to.eql(value);

    });
  });

And('I expect {string} attribute in response to be equal to integer value {string}', (key, value) => {
  cy.get('@currentRequestResponse').then(response => {
    let body = JSON.parse(JSON.stringify(response.body))

    expect(body[key]).to.eql(parseInt(value));

  });
});


And('the POST Todo API response body should contain all the expected attributes', () => {
  cy.get('@currentRequestResponse').then(response => {

    ['userId', 'id', 'title', 'completed', 'author'].forEach(key => {
      expect(response.body).to.have.property(key);
    });
  });
});

Given('I make a PUT call to ToDo items API for a particular ToDo item with id {string}', (id) => {
  cy.request({
    method: "PUT",
    url: "https://jsonplaceholder.typicode.com/todos/"+id,
    body: {
      userId: 1,
      title: "sample ToDo List Name",
      author: "Sarah Jones",
      completed: true,
      id: id
    }
  }).as('currentRequestResponse')

});