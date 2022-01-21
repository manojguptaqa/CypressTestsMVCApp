Feature: Todo List Application
    I want to create a ToDo list in the application

    Scenario: Verify placeholder text of autocomplete textbox
        Given I open the ToDo List Application
        Then I verifiy that placeholder value of the textbox is "What needs to be done?"


    Scenario: Verify that on opening the application there is no Section and Footer visible by default
        Given I open the ToDo List Application
        Then I verifiy that there is no Section and Footer visible by default

    Scenario: Verify that user is able to add new ToDo List
        Given I open the ToDo List Application
        Then I verifiy that I am able to add new ToDo list with "5" items


    Scenario: Verify that user is able to Edit an existing ToDo Item(s)
        Given I open the ToDo List Application
        Then I verifiy that I am able to add new ToDo list with "5" items
        And I edit and verify the ToDo list items added in the previous steps are updated


    Scenario: Verify that user is able to delete an existing ToDo Item(s)
        Given I open the ToDo List Application
        Then I verifiy that I am able to add new ToDo list with "10" items
        And I delete the "10" items and verify the ToDo list items are deleted

    Scenario: Verify that user is able to select all ToDo list items in single go
        Given I open the ToDo List Application
        Then I verifiy that I am able to add new ToDo list with "10" items
        And I click Toggle All button
        And I verify that all Active items are marked "completed"

    Scenario: Verify that user is able to select all ToDo list items in single go
        Given I open the ToDo List Application
        Then I verifiy that I am able to add new ToDo list with "10" items
        And I click Toggle All button
        And I verify that all Active items are marked "completed"
        Then I click Toggle button one by one on each item
        And I verify that all Active items are marked "active"

    Scenario: Verify the footer text for count of Active items
        Given I open the ToDo List Application
        Then I verifiy that I am able to add new ToDo list with "10" items
        Then I "check" "10" items one by one and verify the items count in the footer

    Scenario: Verify the footer text for count of Completed items
        Given I open the ToDo List Application
        Then I verifiy that I am able to add new ToDo list with "10" items
        And I click Toggle All button
        Then I "uncheck" "10" items one by one and verify the items count in the footer

    Scenario: Verify that user is able to bulk delete the completed items after clicking 'clear completed' button
        Given I open the ToDo List Application
        Then I verifiy that I am able to add new ToDo list with "10" items
        Then I click Toggle button one by one on each item
        Then I add new ToDo list with "2" items
        And I click on clear completed button
        Then I verify that only completd items are deleted

    Scenario: Verify that user is able to filter the Active list
        Given I open the ToDo List Application
        Then I add new ToDo list with "10" items
        Then I click Toggle button one by one on each item
        Then I add new ToDo list with "5" items
        And I click on Active filters button
        Then I verify that only Active items are displayed



    Scenario: Verify that user is able to filter the Completed list
        Given I open the ToDo List Application
        Then I add new ToDo list with "10" items
        Then I click Toggle button one by one on each item
        Then I add new ToDo list with "5" items
        And I click on Completed filters button
        Then I verify that only Completed items are displayed

    Scenario: Verify that user is able to filter the All list
        Given I open the ToDo List Application
        Then I add new ToDo list with "10" items
        Then I click Toggle button one by one on each item
        Then I add new ToDo list with "5" items
        And I click on All filters button
        Then I verify that All items are displayed

    Scenario: Verify that newly created items from Completed tab are not visible
        Given I open the ToDo List Application
        Then I add new ToDo list with "2" items
        Then I click Toggle button one by one on each item
        Then I click on Completed filters button
        Then I add new ToDo list with "5" items
        Then I verify that Active items are not displayed

    Scenario: Verify that user is able to mark any task active by unchecking it from Completed filter screen
        Given I open the ToDo List Application
        Then I add new ToDo list with "2" items
        Then I click Toggle button one by one on each item
        Then I click on Completed filters button
        Then I verify that Active items are not displayed
        Then I click Toggle button one by one on each item
        And I click on Active filters button
        Then I verify that items are moved back to Active items list




