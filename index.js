import express from "express";
import axios from"axios";
import bodyParser from "body-parser";
import e from "express";

const app = express();

app.listen(3000,()=>{
    console.log("Server Running Successfully"); 
})      
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.get("/random",async (req,res)=>{
    try {
        const response = await axios.get("https://secrets-api.appbrewery.com/random");
        console.log(response.data)
        res.render("index.ejs",{random:response.data})
    } catch (error) {
        console.log(error.message)
    }
})

app.get("/basic", async (req,res)=>{
    try {
        
//         const register = await axios.post("https://secrets-api.appbrewery.com/register",{username:"",password:""}) ;
// console.log(register.data)
const response = await axios.get("https://secrets-api.appbrewery.com/all?page=1",{auth:{username:"",password:""}});
console.log(response.data);
res.render("index.ejs",{basic:response.data})
    } catch (error) {
        console.log(error.message)
    }
})

app.get("/apiKey", async (req,res)=>{
    try {
    //     const Key= await axios.get("https://secrets-api.appbrewery.com/generate-api-key");
    // console.log(Key.data);
    
    const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=5`,{params:{apiKey:""}});
    console.log(response.data)
    res.render("index.ejs",{apiKey:response.data})
    } catch (error) {
        console.log(error.message);
    }
    
})

app.get("/token", async (req,res)=>{
    try {
    //         const Token= await axios.post("https://secrets-api.appbrewery.com/get-auth-token",{username:"",password:""});
    // console.log(Token.data);
    const token ="";
const response = await axios.get("https://secrets-api.appbrewery.com/secrets/2",{headers:{Authorization: `Bearer ${token}`}});
console.log(response.data);

    res.render("index.ejs",{token:response.data})
        
    } catch (error) {
        console.log(error)
    }
})
