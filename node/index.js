const express = require("express");
const { uniqueNamesGenerator, adjectives, animals, colors } = require('unique-names-generator');

const { registerUser, connection } = require("./db");

const app = express();
app.use(express.json());

app.get("/", async (request, response) => {
    const name = uniqueNamesGenerator({
        dictionaries: [adjectives, animals, colors],
        length: 2
    });
    await registerUser(name);

    return response.sendFile(`${__dirname}/templates/index.html`);
});

app.get("/users", async (request, response) => {
    connection.query("SELECT * FROM people", (err, result, fields)=>{
        if(err) {
            return response.json({
                message: "Error to get users"
            });
        }

        if (err) throw err;
        return response.json(result);
     });
});

app.post("/register", async (request, response) => {
    const { name } = request.body;

    await registerUser(name);

    return response.json({
        message: name
    });
});

app.listen(3000);