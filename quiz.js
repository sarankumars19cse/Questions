const express=require("express");
const mongoose=require("mongoose");
const alert=require("alert");

const app=express()

mongoose.connect("mongodb://localhost:27017/quiz",{ useNewUrlParser: true , useUnifiedTopology: true})

app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

const qusSchema=new mongoose.Schema({
    qus:String,
    option1:String,
    option2:String,
    option3:String,
    crtans:String,
    explain:String
})

const qus=new mongoose.model("qus",qusSchema)

app.get("/",function(req,res)
{
    res.render("home")
})
app.get("/qus",function(req,res)
{
    res.render("qus")
    
})
app.get("/start",function(req,res)
{
    var count = 1;
    qus.find({},(err,arr)=>{
        if(!err)
        {
                res.render("start",{arr:arr,count : count});
        }
    })
})


app.post("/qus",function(req,res)
{
    const Qus=new qus({
        qus:req.body.qus,
        option1:req.body.opt1,
        option2:req.body.opt2,
        option3:req.body.opt3,
        crtans:req.body.crtans,
        explain : req.body.explain
    })

    Qus.save(function(e)
    {
        if(e)
        {
            console.log(e);
        }
        else
        {
            res.redirect("/qus");
        }
    })
})

app.listen(3000,function()
{
    console.log("server is running in your chrome")
})
