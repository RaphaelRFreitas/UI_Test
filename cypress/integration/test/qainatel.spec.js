/// <reference types="cypress" />

describe("Testar o pomofocus.io", () => {
    it("Verificar se o Short break funciona ", () => {
        cy.visit("https://pomofocus.io/");
        cy.wait(2000);
        mudartab("short");
        cy.wait(2000);
    });

    it("Quando clicar em Long break o tempo deve ser de 15 min ", () => {
        cy.visit("https://pomofocus.io/");
        cy.wait(2000);
        mudartab("long");
        cy.wait(2000);
        cy.get("#timer-string").should("contain.text", "15:00");
    });

    it("Quando clicar em start o tempo deve diminuir", () => {
        cy.visit("https://pomofocus.io/");
        cy.wait(2000);
        mudartab("pomodoro");
        cy.get("button").contains("START").click();
        cy.wait(2000);
        cy.get("#timer-string")
            .invoke("text")
            .then(parseFloat)
            .should("be.below", 25);
    });

    it("Mudar tempo do break para 11 minutos no menu de configuração", () => {
        cy.visit("https://pomofocus.io/");
        cy.wait(2000);
        cy.get(".sc-kpOJdX > :nth-child(2)").click();
        cy.wait(2000);
        cy.get(".sc-caSCKo > :nth-child(2) > .sc-iAyFgw").clear().type("11");
        cy.get(".sc-fBuWsC > .sc-bxivhb").click();
        cy.wait(2000);
        mudartab("short");
        cy.wait(2000);
        cy.get("#timer-string").should("contain.text", "11:00");
    });

    it("Adicionando Task", () => {
        var taskName = "Criei essa task";
        cy.visit("https://pomofocus.io/");
        cy.get("div").contains("Add Task").click();
        cy.wait(2000);
        cy.get("#input_activity_title").type(taskName);
        //clicar enter
        cy.get("#input_activity_title").type("{enter}");
        cy.wait(2000);
    });

    it("Tentando criar pomodoros negativos", () => {
        cy.visit("https://pomofocus.io/");
        cy.wait(2000);
        cy.get("div").contains("Add Task").click();
        cy.wait(2000);
        cy.get("#input_est_pomodoros").type("-1");
        cy.wait(2000);
        cy.get("#input_est_pomodoro").should("contain.value", -1);
    });
});

function mudartab(tab) {
    if(tab == "short"){
        cy.get("button").contains("Short Break").click();
    } else if(tab == "long"){
        cy.get("button").contains("Long Break").click();
    } else if(tab == "pomodoro"){
        cy.get("button").contains("Pomodoro").click();
    }

}