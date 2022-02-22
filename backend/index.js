import Express from "express";
import cors from "cors"
import { v4 as uuid } from 'uuid';

const app = Express();
const PORT = 3001;
let requests = 0;
const secretToken = uuid();

app.get("/secret", (req, res) => {
    const token = req.query.token;
    requests ++;
    if (token === secretToken){
        res.send({result: 200, requests: requests, message: "This is a very secret message."});
    }else{
        res.send({result: 401,message: "Invalid token!"});
    }
  });


app.post("/login", (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    requests ++;
    if (email == "test@test.com" && password == "123"){
        res.send("Hello Joe!");
    }else{
        res.send("Invalid credentials!");
    }
  });

app.use(cors());

console.log(secretToken);

app.listen(PORT, () =>
    console.log("Server Listening on port: " + PORT));