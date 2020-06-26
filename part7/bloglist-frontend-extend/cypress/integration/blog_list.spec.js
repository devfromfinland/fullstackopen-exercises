describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'viet',
      password: '12345678',
      name: 'Viet Phan'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    const user2 = {
      username: 'matti',
      password: 'salainen',
      name: 'Matti'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('Front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('log in to application')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('.input-username').type('viet')
      cy.get('.input-password').type('12345678')
      cy.get('.btn-login').click()
      cy.contains('Viet Phan logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('.input-username').type('viet')
      cy.get('.input-password').type('12345')
      cy.get('.btn-login').click()
      cy.get('#notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Viet Phan logged in')
    })

    it('and then log out successfully', function () {
      cy.login({ username: 'viet', password: '12345678' })
      cy.contains('Viet Phan logged in')
      cy.get('.btn-logout').click()
      cy.login({ username: 'matti', password: 'salainen' })
      cy.contains('Matti logged in')
        .and('not.contain', 'Viet Phan logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function () {
      cy.login({ username: 'viet', password: '12345678' })
    })

    it('contents are shown properly', function() {
      cy.contains('Viet Phan logged in')
      cy.contains('logout')
      cy.contains('create new blog')
    })

    it('user can create a new blog', function () {
      cy.contains('Viet Phan logged in')

      cy.get('.btn-toggle-label').click()
      cy.get('.input-title').type('test blog')
      cy.get('.input-author').type('devfromfinland')
      cy.get('.input-url').type('www.test.com')
      cy.get('.btn-submit').click()

      cy.get('#notification')
        .should('contain', 'a new blog test blog by devfromfinland was added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('test blog')
      cy.get('.btn-toggle').click()
      cy.contains('devfromfinland')
      cy.contains('www.test.com')
      cy.contains('like')
      cy.contains('remove')
      cy.get('.blog-likes')
        .should('contain', '0')
    })

    it('user can view and hide a blog details', function () {
      cy.createBlog({
        title: 'test blog',
        author: 'devfromfinland',
        url: 'www.test.com'
      })
      cy.get('.btn-toggle')
        .should('contain', 'view')
        .click()
      cy.contains('devfromfinland')
      cy.contains('www.test.com')
      cy.contains('like')
      cy.contains('remove')
      cy.get('.btn-toggle')
        .should('contain', 'hide')
        .click()
      cy.should('not.contain', 'devfromfinland')
        .and('not.contain', 'www.test.com')
        .and('not.contain', 'like')
        .and('not.contain', 'remove')
    })

    it('user can like his own blog', function () {
      cy.createBlog({
        title: 'New blog',
        author: 'Tester Pro',
        url: 'www.test.com'
      })
      cy.get('.btn-toggle').click()
      cy.get('.btn-likes').click()
      cy.get('.blog-likes')
        .should('contain', '1')
    })

    it('user can like someone else blog', function () {
      cy.createBlog({
        title: 'New blog',
        author: 'Tester Pro',
        url: 'www.test.com'
      })
      cy.get('.btn-logout').click()
      cy.login({ username: 'matti', password: 'salainen' })
      cy.get('.btn-toggle').click()
      cy.get('.btn-likes').click()
      cy.get('.blog-likes')
        .should('contain', '1')
    })

    it('user can remove his own blog', function () {
      cy.createBlog({
        title: 'New blog',
        author: 'Tester Pro',
        url: 'www.test.com'
      })
      cy.get('.btn-toggle').click()
      cy.get('.btn-remove').click()
      cy.get('#notification')
        .should('contain', 'the blog has been removed')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html')
        .should('not.contain', 'New blog')
        .should('not.contain', 'Tester Pro')
        .should('not.contain', 'www.test.com')
    })

    it('user can not delete someone else blog', function () {
      cy.createBlog({
        title: 'New blog',
        author: 'Tester Pro',
        url: 'www.test.com'
      })
      cy.get('.btn-logout').click()
      cy.login({ username: 'matti', password: 'salainen' })
      cy.get('.btn-toggle').click()
      cy.get('.btn-remove').should('not.exist')
    })

    it('user can not add a blog with existing url', function () {
      cy.createBlog({
        title: 'New blog',
        author: 'Tester Pro',
        url: 'www.test.com'
      })

      cy.get('.btn-toggle-label').click()
      cy.get('.input-title').type('Duplicated blog url')
      cy.get('.input-author').type('Does not matter')
      cy.get('.input-url').type('www.test.com')
      cy.get('.btn-submit').click()

      cy.get('#notification')
        .should('contain', 'fail adding a new blog')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Duplicated blog url')
    })

    describe('When many blogs were added', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Blog 1',
          author: 'Tester Pro',
          url: 'www.test.com/1',
          likes: 10
        })
  
        cy.createBlog({
          title: 'Blog 2',
          author: 'Tester Pro',
          url: 'www.test.com/2',
          likes: 20
        })

        cy.createBlog({
          title: 'Blog 3',
          author: 'Tester Pro',
          url: 'www.test.com/3',
          likes: 5
        })
      })

      it('blogs are shown in higher-lower order according to the number of likes', function () {
        cy.get('.btn-toggle').click({ multiple: true })
        
        let flag = false
        cy.get('.blog-likes')
          .then(arr => {
            for (let i = 0; i < arr.length - 1; i++) {
              if (arr[i+1].dataset.likes > arr[i].dataset.likes) {
                flag = true
                break
              }
            }
          })
        
        cy.expect(flag).to.be.false
      })
    })
    
  })
})