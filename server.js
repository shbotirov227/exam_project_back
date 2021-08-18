const express = require('express')
const fs = require('fs').promises
const kursdatabase = require('./moduls/database')



const db = new kursdatabase()
// console.log(udb.addData('javohir', 'abdujalilov', 21, 'buxoro', 'web developer', 'instagram'));



 const app = express();

 app.listen(8088, ()=>{
     console.log('app running port');
 })
 app.use(express.urlencoded({
     extended: true,
 }))
app.use(express.json())

 app.use(express.static(__dirname+'/public'))

 app.get('/', async (req, res)=>{
    let reed = await fs.readFile(__dirname+'/views/index.html', "utf-8")
    res.send(reed)
 })
 app.get("/manager", async (req, res)=>{
     let udata = await db.readufile();
     res.json({
         udata: udata
     })
 })

 app.post("/uform", async (req, res)=>{
   
     let dbbody = await db.adduData(req.body.name, req.body.age, req.body.kurs, req.body.manba)
     res.json(dbbody)
  
 })



// kurslar bolimi
 app.get("/kurslar", async (req, res)=>{
    let kdata = await db.readkfile();
    res.json({
        kdata: kdata
    })
})
app.post("/kform", async (req, res)=>{
   
    let dbkbody = await db.addkData(req.body.name)
    res.json(dbkbody)

})


// manba bolimi
app.get("/manbalar", async (req, res)=>{
    let mdata = await db.readmfile();
    res.json({
        mdata: mdata
    })
})
app.post("/mform", async (req, res)=>{
   
    let dbmbody = await db.addmData(req.body.name)
    res.json(dbmbody)

})
 

app.delete("/delete/:id", async (req, res)=>{
    await db.delete(req.params.id)
    res.json({
        ok: true,
    })
});
