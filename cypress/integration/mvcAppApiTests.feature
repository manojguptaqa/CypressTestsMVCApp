Feature: Todo List Application API Tests
    I want to Test API calls for MVC application

    Scenario: Verify the GET users details API is working as expected
        Given I make a GET call to users details API
        Then I expect the API call to return "200" status
        And I expect the response to be an array
        And I expect the length to be "10"
        Then the Users API response body should contain all the expected attributes

    Scenario: Verify the GET ToDo items details API is working as expected
        Given I make a GET call to ToDo items details API
        Then I expect the API call to return "200" status
        And I expect the response to be an array
        And I expect the length to be "200"
        Then the Todo API response body should contain all the expected attributes

    Scenario: Verify the POST ToDo item API for a particular user
        Given I make a POST call to ToDo items details API for a particular user with id "10"
        Then I expect the API call to return "201" status
        And I expect the response to be an object
        And I expect "userId" attribute in response to be equal to "10"
        And I expect "id" attribute in response to be equal to integer value "201"
        Then the POST Todo API response body should contain all the expected attributes

    Scenario: Verify the PUT ToDo item API for a particular user
        Given I make a PUT call to ToDo items API for a particular ToDo item with id "10"
        Then I expect the API call to return "200" status
        And I expect the response to be an object
        And I expect "id" attribute in response to be equal to integer value "10"

