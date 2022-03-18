import Express from "express";
import cors from "cors"
import { v4 as uuid } from 'uuid';
import session from "express-session"
import { createUser, getUser, HashPassword, GOOGLE_APPLICATION_CREDENTIALS } from "./db.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

import https from "https";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const PORT = 443;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const startServerEncrypted = async () => {
    const sm = new SecretManagerServiceClient({
        projectId: 'pftc-0000001',
        keyFilename: GOOGLE_APPLICATION_CREDENTIALS,
    });

    const [pub] = await sm.accessSecretVersion({
        name: "projects/292886393633/secrets/PublicKey/versions/1",
    });

    const [prvt] = await sm.accessSecretVersion({
        name: "projects/292886393633/secrets/PrivateKey/versions/1",
    });

    const sslOptions = {
        key: prvt.payload.data.toString(),
        cery: pub.payload.data.toString(),
    };

    https.createServer(sslOptions,app).listen(PORT, () => {
        console.log("Secure Server Listening on port:" + PORT);
    });
};


const startServer = () =>{
    app.listen(PORT, () => console.log("Server Listening on port: " + PORT));
}


//Session config
const config = {
    genid: (req) => uuid(),
    secret: "keyboard cat",
    cookie: {},
    resave: false,
    saveUninitialized: true,
};


const app = Express();
app.use(cors());
app.use(session(config));

//DELIVERING STATIC FILES
app.use(Express.static(path.join(__dirname, "../frontend/public/")));


let requests = 0;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/register.html"));
});

app.post("/login", (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    requests++;

    getUser(email).then((r) => {
        //if this email address is not taken
        //r.length = 0, data array is empty, email does not exist in database
        if (r.length === 1) {
            if (r[0].password === HashPassword(password)) {
                //Login valid
                console.log("Login successful.");
                res.send({ result: "success", email: email, name: r[0].name });
            } else {
                //Passwords do not match
                console.log("Login failed! Invalid credentials");
                res.send({ result: "fail", reason: "Invalid credentials." });
            }
        } else {
            console.log("Account does not exist.");
            res.send({ result: "fail", reason: "account does not exist." });
        }
    });
    // res.send({ result: "success", name: "David", email: "test@test.com" });
    // res.send({ result: "fail" });
});

app.post("/register", (req, res) => {
    const name = req.query.name;
    const surname = req.query.surname;
    const email = req.query.email;
    const password = req.query.password;
    requests++;

    getUser(email).then((r) => {
        //if this email address is not taken

        //r.length = 0, data array is empty, email does not exist in database
        if (r.length === 0) {

            //Save the user to the database
            createUser(name, surname, email, password).then((r) => {
                console.log(r);
                res.send({ result: "success", email: email, name: name });
            }).catch((e) => console.log(e));
        } else {
            console.log("Account already exists.");
            res.send({ result: "fail", reason: "account already exists." });
        }
    });
});

startServerEncrypted();

