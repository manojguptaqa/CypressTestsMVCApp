/// <reference types="cypress" />

describe("Tests for todo mvc react application", () => {

  it("Verify Placeholder of autocomplete textbox", () => {
    cy.visit("https://todomvc.com/examples/react/#/")
    cy.get('.new-todo').should('have.attr', 'placeholder')
      .and('include', 'What needs to be done?')
  });


  it("Verify that by default there is no Section and Footer visible", () => {
    cy.visit("https://todomvc.com/examples/react/#/")
    cy.get('.main').should('not.exist');
    cy.get('.footer').should('not.exist');

  });

  it("Verify that user is able to add a new ToDo Item", () => {
    cy.visit("https://todomvc.com/examples/react/#/")
    var initialCount = 0;
    for (var i = 0; i < 5; i++) {
      cy.get('.new-todo').type("First item").type('{enter}');
      cy.get('.todo-list').find('li').should('have.length', initialCount + 1)
      initialCount++;
    }

  });

  it("Verify that user is able to Edit an existing ToDo Item(s)", () => {
    cy.visit("https://todomvc.com/examples/react/#/")
    for (var i = 0; i < 5; i++) {
      cy.get('.new-todo').type(Math.random().toString(36).substring(2)).type('{enter}');
    }

    cy.get('.todo-list').find('li').each(($el, index, $list) => {

      const initialText = $el.find('label').text();
      const newText = initialText + 'New';

      cy.wrap($el).trigger('mouseover').dblclick()
      cy.wrap($el).find('.edit')
        .clear()
        .type(newText)
        .type('{enter}')

      cy.wrap($el).should('have.text', newText)

    })
  })

  

  it("Verify that user is able to delete an existing ToDo Item(s)", () => {
    cy.visit("https://todomvc.com/examples/react/#/")
    for (var i = 0; i < 5; i++) {
      cy.get('.new-todo').type(Math.random().toString(36).substring(2)).type('{enter}');
    }
    cy.get('.todo-list').find('li').each(($el, index, $list) => {

      const initialText = $el.find('label').text();
      const newText = initialText + 'New';

      cy.wrap($el).trigger('mouseover').find('.destroy').eq(0).click({ force: true });

      if (index < 4) {
        cy.get('.todo-list').find('li').then(li => {
          expect(li).to.have.length(4 - index);

        })
      }



    })

  });

  it("Verify that user is able to select all lists in single go", () => {
    cy.visit("https://todomvc.com/examples/react/#/")
    for (var i = 0; i < 5; i++) {
      cy.get('.new-todo').type(Math.random().toString(36).substring(2)).type('{enter}');
    }

    cy.get('.main > label').click();

    cy.get('.todo-list').find('li').each(($el, index, $list) => {
      expect($el).to.have.prop('class', 'completed')

    })
  });


  it("Verify the footer text on selecting all items", () => {
    cy.visit("https://todomvc.com/examples/react/#/")
    for (var i = 0; i < 5; i++) {
      cy.get('.new-todo').type(Math.random().toString(36).substring(2)).type('{enter}');
    }

    cy.get('.main > label').click();

    cy.get('.todo-list').find('li').each(($el, index, $list) => {
      expect($el).to.have.prop('class', 'completed')

    })

    cy.get('.todo-count').should('have.text', '0 items left')
    cy.get('.clear-completed').should('have.text', 'Clear completed')

  });


  it("Verify that user is able to check items one by one", () => {
    cy.visit("https://todomvc.com/examples/react/#/")
    var item_count = 5;
    for (var i = 0; i < item_count; i++) {
      cy.get('.new-todo').type(Math.random().toString(36).substring(2)).type('{enter}');
    }

    cy.get('.todo-count').should('have.text', '5 items left')


    cy.get('.todo-list').find('li').each(($el, index, $list) => {

      cy.wrap($el).trigger('mouseover').find('.toggle').click({ force: true });


      if ((item_count - (index + 1)) == 1)
        cy.get('.todo-count').should('have.text', 5 - (index + 1) + ' item left')
      else
        cy.get('.todo-count').should('have.text', 5 - (index + 1) + ' items left')



    })

  });

  it("Verify that user is able to bulk delete the completed items", () => {
    cy.visit("https://todomvc.com/examples/react/#/")
    var completed_item_count = 5;
    for (var i = 0; i < completed_item_count; i++) {
      cy.get('.new-todo').type(Math.random().toString(36).substring(2)).type('{enter}');
    }

    cy.get('.todo-list').find('li').each(($el, index, $list) => {
    cy.wrap($el).trigger('mouseover').find('.toggle').click({ force: true });
    })

    cy.get('.todo-list > .completed').should('have.length', completed_item_count)

    var new_items=['first','second','third'];

    new_items.forEach(e=>
      {
      cy.get('.new-todo').type(e).type('{enter}');
    });

    cy.get('.clear-completed').click();

    cy.get('.todo-list > li').should('have.length', new_items.length).then(($el) => {
      return (
        Cypress.$.makeArray($el)
          .map((el) => el.innerText)
      )
    }).should('deep.equal', new_items)
  });

  it("Verify that user is able to filter the list based on task status", () => {
    cy.visit("https://todomvc.com/examples/react/#/")
    var completedTaskList = ['firstTask', 'secondTask', 'thirdTask'];
    completedTaskList.forEach(e => {
      cy.get('.new-todo').type(e).type('{enter}');
    });

    cy.get('.todo-list').find('li').each(($el, index, $list) => {
      cy.wrap($el).trigger('mouseover').find('.toggle').click({ force: true });
    })

    cy.get('.todo-list > .completed').should('have.length', completedTaskList.length)

    var nonCompletedTaskList = ['fourthTask', 'fifthTask', 'sixthTask'];

    nonCompletedTaskList.forEach(e => {
      cy.get('.new-todo').type(e).type('{enter}');
    });

    cy.log('Check if \'All filters\' option is working as expected')

    cy.get('.filters > li:nth-of-type(1) > a').click() //all
    cy.get('.todo-list > li').should('have.length', completedTaskList.length + nonCompletedTaskList.length).then(($el) => {
      return (
        Cypress.$.makeArray($el)
          .map((el) => el.innerText)
      )
    }).should('deep.equal', completedTaskList.concat(nonCompletedTaskList))
    cy.get('.filters > li:nth-of-type(1) > a').should('have.class', 'selected')

    cy.log('Check if \'Active filters\' option is working as expected')

    cy.get('.filters > li:nth-of-type(2) > a').click() //active
    cy.get('.todo-list > li').should('have.length', nonCompletedTaskList.length).then(($el) => {
      return (
        Cypress.$.makeArray($el)
          .map((el) => el.innerText)
      )
    }).should('deep.equal', nonCompletedTaskList)
    cy.get('.filters > li:nth-of-type(2) > a').should('have.class', 'selected')


    cy.log('Check if \'Completed filters\' option is working as expected')

    cy.get('.filters > li:nth-of-type(3) > a').click() //completed
    cy.get('.todo-list > li').should('have.length', completedTaskList.length).then(($el) => {
      return (
        Cypress.$.makeArray($el)
          .map((el) => el.innerText)
      )
    }).should('deep.equal', completedTaskList)
    cy.get('.filters > li:nth-of-type(3) > a').should('have.class', 'selected')
  });

  it("Verify that new added tasks from Completed filter screen are not visible", () => {
    cy.visit("https://todomvc.com/examples/react/#/")
    var completedTaskList = ['firstTask', 'secondTask', 'thirdTask'];
    completedTaskList.forEach(e => {
      cy.get('.new-todo').type(e).type('{enter}');
    });

    cy.get('.todo-list').find('li').each(($el, index, $list) => {
      cy.wrap($el).trigger('mouseover').find('.toggle').click({ force: true });
    })

    cy.log('Filter tasks by Completed Filter')

    cy.get('.filters > li:nth-of-type(3) > a').click() //completed

    cy.log('Add new tasks from Completed filter tab')

    var nonCompletedTaskList = ['fourthTask', 'fifthTask', 'sixthTask'];

    nonCompletedTaskList.forEach(e => {
      cy.get('.new-todo').type(e).type('{enter}');
    });

    cy.log('Check if newly added tasks are visible on Completed filter tab')
    cy.get('.todo-list > li').should('have.length', completedTaskList.length).then(($el) => {
      return (
        Cypress.$.makeArray($el)
          .map((el) => el.innerText)
      )
    }).should('deep.equal', completedTaskList)


    cy.log('Check if \'All filters\' option is showing all taks including the newly added ones')

    cy.get('.filters > li:nth-of-type(1) > a').click() //all
    cy.get('.todo-list > li').should('have.length', completedTaskList.length + nonCompletedTaskList.length).then(($el) => {
      return (
        Cypress.$.makeArray($el)
          .map((el) => el.innerText)
      )
    }).should('deep.equal', completedTaskList.concat(nonCompletedTaskList))
    cy.get('.filters > li:nth-of-type(1) > a').should('have.class', 'selected')

    
    cy.log('Check if \'Active filters\' option is showing the newly added tasks')

    cy.get('.filters > li:nth-of-type(2) > a').click() //active
    cy.get('.todo-list > li').should('have.length', nonCompletedTaskList.length).then(($el) => {
      return (
        Cypress.$.makeArray($el)
          .map((el) => el.innerText)
      )
    }).should('deep.equal', nonCompletedTaskList)
    cy.get('.filters > li:nth-of-type(2) > a').should('have.class', 'selected')

  });

  it("Verify that user is able to mark any task incomplete from Completed filter screen", () => {
    cy.visit("https://todomvc.com/examples/react/#/")
    var completedTaskList = ['firstTask', 'secondTask', 'thirdTask'];
    completedTaskList.forEach(e => {
      cy.get('.new-todo').type(e).type('{enter}');
    });

    cy.get('.todo-list').find('li').each(($el, index, $list) => {
      cy.wrap($el).trigger('mouseover').find('.toggle').click({ force: true });
    })

    cy.log('Filter tasks by Completed Filter')

    cy.get('.filters > li:nth-of-type(3) > a').click() //completed

    cy.log('Mark task incomplete from Completed filter tab')

    var nonCompletedTaskList = ['firstTask', 'secondTask'];

    cy.get('.todo-list').find('li').each(($el, index, $list) => {
      if(index<2) //mark incomplete- only for first 2 tasks
      cy.wrap($el).trigger('mouseover').find('.toggle').click({ force: true });
    })

    cy.log('Check if incomplete marked tasks are visible on Completed filter tab')
    cy.get('.todo-list > li').should('have.length', completedTaskList.length-nonCompletedTaskList.length).then(($el) => {
      return (
        Cypress.$.makeArray($el)
          .map((el) => el.innerText)
      )
    }).should('deep.equal', completedTaskList.filter(n => !nonCompletedTaskList.includes(n)))


    cy.log('Check if \'All filters\' option is showing all taks including the marked incomplete ones')

    cy.get('.filters > li:nth-of-type(1) > a').click() //all
    cy.get('.todo-list > li').should('have.length', completedTaskList.length).then(($el) => {
      return (
        Cypress.$.makeArray($el)
          .map((el) => el.innerText)
      )
    }).should('deep.equal', completedTaskList)
    cy.get('.filters > li:nth-of-type(1) > a').should('have.class', 'selected')


    cy.log('Check if \'Active filters\' option is showing the marked incomplete tasks')

    cy.get('.filters > li:nth-of-type(2) > a').click() //active
    cy.get('.todo-list > li').should('have.length', nonCompletedTaskList.length).then(($el) => {
      return (
        Cypress.$.makeArray($el)
          .map((el) => el.innerText)
      )
    }).should('deep.equal', nonCompletedTaskList)
    cy.get('.filters > li:nth-of-type(2) > a').should('have.class', 'selected')

  });
    


});