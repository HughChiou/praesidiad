describe('employee', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.intercept(
      {
        pathname: '/api/v1/employees',
        method: 'GET',
      },
      {
        fixture: 'list-employees.json',
      },
    ).as('getEmployees');

    cy.intercept(
      {
        pathname: '/api/v1/create',
        method: 'POST',
      },
      {
        fixture: 'create-employee.json',
      },
    ).as('createEmployee');

    cy.intercept(
      {
        pathname: '/api/v1/employee/*',
        method: 'GET',
      },
      {
        fixture: 'get-employee.json',
      },
    ).as('getEmployeeDetail');

    cy.intercept(
      {
        pathname: '/api/v1/update/*',
        method: 'PUT',
      },
      {
        fixture: 'update-employee.json',
      },
    ).as('updateEmployee');

    cy.intercept(
      {
        pathname: '/api/v1/delete/*',
        method: 'DELETE',
      },
      {
        fixture: 'delete-employee.json',
      },
    ).as('deleteEmployee');
  });

  it('should list all employees', () => {
    cy.get('h2').contains('employee list');

    cy.wait('@getEmployees').then(() => {
      cy.get('table').should('be.visible');
    });
  });

  it('should display employee detail', () => {
    cy.contains('Detail').click();
    cy.wait('@getEmployeeDetail').then(() => {
      cy.contains('detail works');
    });
  });

  it('should update eeployee', () => {
    cy.contains('Edit').click();
    cy.contains('Edit Employee');
    cy.get('input[formcontrolname=age]').clear().type('99');
    cy.get('button').contains('Submit').click();
    cy.wait('@updateEmployee').then(() => {
      cy.contains('Successfully! Record has been updated.');
      cy.contains('OK').click();
      cy.contains('Successfully! Record has been updated.').should(
        'not.be.visible',
      );
    });
  });

  it('should delete employee', () => {
    cy.contains('Delete').click();
    cy.get('mat-dialog-container').contains('Delete').click();
    cy.wait('@deleteEmployee').then(() => {
      cy.get('h2').contains('employee list');
    });
  });

  it('should create employee', () => {
    cy.contains('Create').click();
    cy.get('input[formcontrolname=name]').type('Test');
    cy.get('input[formcontrolname=salary]').type('123456');
    cy.get('input[formcontrolname=age]').type('99');
    cy.get('button').contains('Submit').click();
    cy.wait('@createEmployee').then(() => {
      cy.contains('Successfully! Record has been added.');
      cy.contains('OK').click();
      cy.contains('Successfully! Record has been added.').should(
        'not.be.visible',
      );
    });
  });
});
