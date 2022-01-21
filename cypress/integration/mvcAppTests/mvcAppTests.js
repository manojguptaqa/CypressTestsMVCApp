import { Given, And, Then, When } from "cypress-cucumber-preprocessor/steps";

var added_items=[];
var completed_items = [];

Given('I open the ToDo List Application', () => {
    cy.visit("https://todomvc.com/examples/react/#/")
});

Then('I verifiy that placeholder value of the textbox is {string}', (placeholder) => {
    cy.get('.new-todo').should('have.attr', 'placeholder')
        .and('include', 'What needs to be done?')
});

Then('I verifiy that there is no Section and Footer visible by default', () => {
    cy.get('.main').should('not.exist');
    cy.get('.footer').should('not.exist');
});

Then('I verifiy that I am able to add new ToDo list with {string} items', (items) => {
    var initialCount = 0;
    added_items = [];
    for (var i = 0; i < items; i++) {
        var data = Math.random().toString(36).substring(2);

        
        added_items.push(data);

        cy.get('.new-todo').type(data).type('{enter}');
        cy.get('.todo-list').find('li').should('have.length', initialCount + 1)
        initialCount++;
    }
});

Then('I add new ToDo list with {string} items', (items) => {
    added_items = [];
    for (var i = 0; i < items; i++) {
        var data = Math.random().toString(36).substring(2);

        
        added_items.push(data);

        cy.get('.new-todo').type(data).type('{enter}');
    }
});

And('I edit and verify the ToDo list items added in the previous steps are updated', () => {
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
});

And('I delete the {string} items and verify the ToDo list items are deleted', (count) => {
    cy.get('.todo-list').find('li').each(($el, index, $list) => {

        const initialText = $el.find('label').text();
        const newText = initialText + 'New';

        cy.wrap($el).trigger('mouseover').find('.destroy').eq(0).click({ force: true });

        if (index < (count - 1)) {
            cy.get('.todo-list').find('li').then(li => {
                expect(li).to.have.length((count - 1) - index);
            })
        }
    })
});


And('I click Toggle All button', () => {
    cy.get('.main > label').click();
});

And('I click Toggle button one by one on each item', () => {
    completed_items = [];
    cy.get('.todo-list').find('li').each(($el, index, $list) => {
        cy.wrap($el).trigger('mouseover').find('.toggle').click({ force: true });
    })
    completed_items=added_items;

});

And('I verify that all Active items are marked {string}', (operation) => {
    if (operation === 'completed') 
    {
        cy.get('.todo-list').find('li').each(($el, index, $list) => {
            expect($el).to.have.prop('class', 'completed')
        })
    }
    else 
    {
        cy.get('.todo-list').find('li').each(($el, index, $list) => {
            expect($el).not.to.have.prop('class', 'completed')
        })
    }
});

And('I {string} {string} items one by one and verify the items count in the footer', (operation,item_count) => {
    cy.get('.todo-list').find('li').each(($el, index, $list) => {
    cy.wrap($el).trigger('mouseover').find('.toggle').click({ force: true });

if(operation==='check')
{
    if ((item_count - (index + 1)) == 1)
        cy.get('.todo-count').should('have.text', item_count - (index + 1) + ' item left')
    else
        cy.get('.todo-count').should('have.text', item_count - (index + 1) + ' items left')

}
else if (operation === 'uncheck')
{
    if (index+1 <=1)
        cy.get('.todo-count').should('have.text', index+1 + ' item left')
    else
        cy.get('.todo-count').should('have.text', index+1 + ' items left')
}   
    })
});


And('I click on clear completed button', () => {
    cy.get('.clear-completed').click();
})

Then('I verify that only completd items are deleted',()=>
{
  cy.get('.todo-list > li').should('have.length', added_items.length).then(($el) => {
        return (
            Cypress.$.makeArray($el)
                .map((el) => el.innerText)
        )
    }).should('deep.equal', added_items)

})

And('I click on All filters button', () => {
    cy.get('.filters > li:nth-of-type(1) > a').click();
    cy.get('.filters > li:nth-of-type(1) > a').should('have.class', 'selected')
})

And('I click on Active filters button', () => {
    cy.get('.filters > li:nth-of-type(2) > a').click();
    cy.get('.filters > li:nth-of-type(2) > a').should('have.class', 'selected')
})

And('I click on Completed filters button', () => {
    cy.get('.filters > li:nth-of-type(3) > a').click();
    cy.get('.filters > li:nth-of-type(3) > a').should('have.class', 'selected')
})

Then('I verify that only Active items are displayed', () => {
    cy.get('.todo-list > li').should('have.length', added_items.length).then(($el) => {
        return (
            Cypress.$.makeArray($el)
                .map((el) => el.innerText)
        )
    }).should('deep.equal', added_items)
    
})

Then('I verify that only Completed items are displayed', () => {
    cy.get('.todo-list > li').should('have.length', completed_items.length).then(($el) => {
        return (
            Cypress.$.makeArray($el)
                .map((el) => el.innerText)
        )
    }).should('deep.equal', completed_items)

})


Then('I verify that All items are displayed', () => {
    cy.get('.todo-list > li').should('have.length', added_items.length+completed_items.length).then(($el) => {
        return (
            Cypress.$.makeArray($el)
                .map((el) => el.innerText)
        )
    }).should('deep.equal', completed_items.concat(added_items))

})

Then('I verify that Active items are not displayed', () => {
    
    cy.get('.todo-list').then(($btn) => {
        if ($btn.find('li')) {
            cy.get('.todo-list > li').should('have.length', completed_items.length).then(($el) => {
                return (
                    Cypress.$.makeArray($el)
                        .map((el) => el.innerText)
                )
            }).should('deep.equal', completed_items)

        }
    })

})


Then('I verify that Active items are not displayed', () => {

    cy.get('.todo-list').then(($btn) => {
        if ($btn.find('li')) {
            cy.get('.todo-list > li').should('have.length', completed_items.length).then(($el) => {
                return (
                    Cypress.$.makeArray($el)
                        .map((el) => el.innerText)
                )
            }).should('deep.equal', completed_items)

        }
    })

})

Then('I verify that items are moved back to Active items list', () => {

    cy.get('.todo-list').then(($btn) => {
        if ($btn.find('li')) {
            cy.get('.todo-list > li').should('have.length', completed_items.length).then(($el) => {
                return (
                    Cypress.$.makeArray($el)
                        .map((el) => el.innerText)
                )
            }).should('deep.equal', completed_items) // here these are completed to active converted items 

        }
    })

})


