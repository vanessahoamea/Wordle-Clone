const { defineConfig } = require("cypress");
const { connect, disconnect } = require("./cypress/support/db");

module.exports = defineConfig({
    e2e: {
        baseUrl: "http://localhost:3000",
        setupNodeEvents(on, config)
        {
            on("task", {
                async removeTestUser()
                {
                    const db = await connect();
                    const users = db.collection("users");

                    await users.deleteMany({email: "new@email.com"});

                    await disconnect();

                    return null;
                }
            });
        }
    }
});
