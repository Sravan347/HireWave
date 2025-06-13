const express = require("express")
const app = express()

const PORT=5000
app.get('/',(req,res)=>{
    res.send("test is working")
})
app.listen(PORT,()=>{
    console.log(`the server is running on port ${PORT}`);
    
})