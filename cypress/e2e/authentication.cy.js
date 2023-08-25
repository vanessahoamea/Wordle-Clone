describe("Authentication test", () => {
    beforeEach(() => {
        cy.task("removeTestUser");
    });

    it("Account creation works", () => {
        cy.visit("/register");
        cy.contains(/create a new user account/i);

        // not filling in all the required fields
        cy.get("#email").type("new@email.com");
        cy.getDataTest("register-button").click();
        cy.on("window:alert", (message) => {
            expect(message).to.contains(/e-mail and password are required/i);
        });

        // creating an account with an e-mail address already in use
        cy.get("#email").clear();
        cy.get("#email").type("test");
        cy.get("#password").type("123");
        cy.getDataTest("register-button").click();
        cy.on("window:alert", (message) => {
            expect(message).to.contains(/e-mail is already taken/i);
        });

        // creating an account with an unused e-mail address
        cy.get("#email").clear();
        cy.get("#email").type("new@email.com");
        cy.getDataTest("register-button").click();
        cy.on("window:alert", (message) => {
            expect(message).to.contains(/account created/i);
        });
    });

    it("Login works", () => {
        cy.visit("/login");
        cy.contains(/log in to your account/i);

        // authenticating with an account that doesn't exist
        cy.get("#email").type("invalid@email.com");
        cy.get("#password").type("123");
        cy.getDataTest("login-button").click();
        cy.on("window:alert", (message) => {
            expect(message).to.contains(/e-mail or password is incorrect/i);
        });

        // authenticating with an existing account
        cy.get("#email").clear();
        cy.get("#email").type("test");
        cy.getDataTest("login-button").click();
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/play");
        });
    });
});