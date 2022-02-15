import Express from "express";
import cors from "cors";

//Don't forget to put "type": "module" under "main" in package.json

//starting new instance of express
const app = Express();
//port number that connections will go through
const PORT = 3001;

// allowing express to use cors to bypass cross oriign requests
app.use(cors());

app.get("/hello",(req,res) =>{
    const username = req.query.username;
    const password = req.query.password;
    if(username == "Joe" && password == "123"){
        res.send("Hello Joe!");
    }else{
        res.send("Invalid credentials.");
    }

    //console.log(username + " " + password);
    res.send("Hello world!");
});


//telling the server to start listening
app.listen(PORT,() =>
    console.log("Server listening on port: " + PORT))