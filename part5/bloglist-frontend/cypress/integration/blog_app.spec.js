describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Paul GOUX',
      username: 'pgoux',
      password: 'bonjour'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('pgoux')
      cy.get('#password').type('bonjour')
      cy.get('#login-button').click()
      cy.contains('Paul GOUX is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('faux')
      cy.get('#login-button').click()
      cy.get('#notification')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Paul GOUX is logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // cy.login({ username: 'pgoux', password: 'bonjour' })
      cy.get('#username').type('pgoux')
      cy.get('#password').type('bonjour')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('New note').click()
      cy.get('#url').type('www.guthib.com')
      cy.get('#author').type('MG')
      cy.get('#title').type('Wololooo')
      cy.get('#add-note').click()
      cy.get('#notification')
        .should('contain', 'New blog add')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('Wololoo')
      cy.contains('MG')
      cy.contains('View')
    })

    describe('when a blog exists', function() {
      beforeEach(function() {
        cy.contains('New note').click()
        cy.get('#url').type('www.guthib.com')
        cy.get('#author').type('MG')
        cy.get('#title').type('Wololooo')
        cy.get('#add-note').click()
      })

      it('A blog can be liked', function() {
        cy.contains('View').click()
        cy.contains('Like 0')
        cy.contains('Like').click()
        cy.contains('Like 1')
      })

      it('A blog can be deleted', function() {
        cy.contains('Wololooo')
        cy.contains('View').click()
        cy.contains('Delete').click()
        cy.contains('Wololooo').should('not.exist')
      })

      it('Most Liked blog is first', function() {
        cy.contains('New note').click()
        cy.get('#url').type('www.guthib.com')
        cy.get('#author').type('MG')
        cy.get('#title').type('Wololooo2')
        cy.get('#add-note').click()
        cy.contains('Wololooo2').contains('View').click()
        cy.contains('Like').click()

        cy.contains('Hide').click()

        cy.get('.blog:first').contains('Wololooo2')
        cy.get('.blog:last').contains('Wololooo')
      })
    })
  })
})
