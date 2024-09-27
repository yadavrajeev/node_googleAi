const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const express = require('express');
const bodyPasrer = require('body-parser');
const app = express();
app.use(express.json());
app.use(bodyPasrer.json());


app.get('/', (req, res)=>{
    res.send("welcome gemini user");
})

// const prompt = "what is meaning of rajeev in hindi?";
// const prompt commented because we pass prompt in function
const generate = async(prompt)=>{
try{
const result = await model.generateContent(prompt);
console.log(result.response.text());
return result.response.text();

}
catch(error){
    console.error(error);
}
}
// generate();

app.get('/api/content', async(req, res)=>{
    try{
        const data = req.body.question;
        const result = await generate(data);
        res.send({"result": result});

    }
    catch(error){
        console.log(error)
    }
})

app.listen(3030,()=>{
    console.log("server is listning on 3030");
})