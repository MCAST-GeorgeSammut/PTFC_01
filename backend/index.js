import Express from "express";
import cors from "cors";
import { v4 as uuid } from 'uuid';

//Don't forget to put "type": "module" under "main" in package.json

//starting new instance of express
const app = Express();
//port number that connections will go through
const PORT = 3001;
const secretToken = uuid();
let requests = 0;


app.get("/secret",(req,res) =>{
    const token = req.query.token;
    requests++;
    if(token == secretToken){
        res.send({result: "200", requests : requests, message:"This is a very secret message"});
    }else{
        res.send({result: "401", message:"Invalid token."});
    }
});



// app.get("/hello",(req,res) =>{
//     const username = req.query.username;
//     const password = req.query.password;
//     if(username == "Joe" && password == "123"){
//         res.send("Hello Joe!");
//     }else{
//         res.send("Invalid credentials.");
//     }

//     //console.log(username + " " + password);
//     res.send("Hello world!");
// });


// allowing express to use cors to bypass cross oriign requests
app.use(cors());



//telling the server to start listening
app.listen(PORT,() =>
    console.log("Server listening on port: " + PORT))