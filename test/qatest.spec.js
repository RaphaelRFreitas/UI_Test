// Fazer um teste no cypress que entra no site do Google e pesquisa por 'inatel' e da enter
describe('Pesquisa no Google', () => {
    it('Pesquisa no Google', () => {
        cy.visit('https://www.google.com/')
        cy.get('input[name="q"]').type('Inatel {enter}')
    })
})



