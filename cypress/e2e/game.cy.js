describe("Gameplay test", () => {
    beforeEach(() => {
        cy.visit("/login");
        cy.get("#email").type("test");
        cy.get("#password").type("123");
        cy.getDataTest("login-button").click();
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/play");
        });
    });

    it("Header buttons work as intended", () => {
        // modal button
        cy.get("#modal").should("not.be.visible");
        cy.getDataTest("stats-button").click();
        cy.get("#modal").should("be.visible");
        cy.get(".modal-content").contains(/guess distribution/i);
        cy.getDataTest("close-button").click();
        cy.get("#modal").should("not.be.visible");

        // logout button
        cy.getDataTest("logout-button").click();
        cy.wait(500);
        cy.getDataTest("stats-button").click();
        cy.get(".modal-content").contains(/no data to display/i);
        cy.getDataTest("close-button").click();

        // login button
        cy.getDataTest("login-button").click();
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/login");
        });
    });

    it("Game works as intended", () => {
        cy.getDataTest("stats-button").click();
        cy.getDataTest("games-played").invoke("text").then((number) => {
            cy.wrap(parseInt(number)).as("gamesPlayed");
        });

        // entering an incorrect guess
        cy.get(".free-row").should("have.length", 6);
        "asdfg".split("").forEach((letter) => {
            cy.getDataTest(`key-${letter}`).click();
        });
        cy.getDataTest("key-Enter").click();
        "asdfg".split("").forEach((letter) => {
            cy.getDataTest(`key-${letter}`).should("not.have.class", "undefined-key");
        });
        cy.get(".free-row").should("have.length", 5);

        // entering an incomplete solution
        "xyz".split("").forEach((letter) => {
            cy.getDataTest(`key-${letter}`).click();
        });
        cy.getDataTest("key-Enter").click();
        cy.get(".free-row").should("have.length", 5);
        for(let i=0; i<3; i++)
        {
            cy.getDataTest("key-Backspace").click();
        }

        // entering an already used word
        "asdfg".split("").forEach((letter) => {
            cy.getDataTest(`key-${letter}`).click();
        });
        cy.getDataTest("key-Enter").click();
        cy.get(".free-row").should("have.length", 5);
        for(let i=0; i<5; i++)
        {
            cy.getDataTest("key-Backspace").click();
        }

        // guessing the word
        cy.getDataTest("solution").invoke("text").then((word) => {
            word.split("").forEach((letter) => {
                cy.getDataTest(`key-${letter}`).click();
            });
            cy.getDataTest("key-Enter").click();
            word.split("").forEach((letter) => {
                cy.getDataTest(`key-${letter}`).should("have.class", "green-key");
            });
        });

        cy.getDataTest("stats-button").click();
        cy.get("@gamesPlayed").then((gamesPlayed) => {
            cy.getDataTest("games-played").invoke("text").then(parseInt).should("equal", gamesPlayed + 1);
        });
    });
});