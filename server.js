const express = require('express');
const fs = require('fs/promises');
const database = require('./moduls/database');



const db = new database();

const app = express();

app.listen(8080, () => {
    console.log('app running port');
})
app.use(express.urlencoded({
    extended: true,
}))
app.use(express.json())

app.use(express.static(__dirname + '/public'))

app.get('/', async (req, res) => {
    let reed = await fs.readFile(__dirname + '/views/index.html', "utf-8")
    res.send(reed)
})
app.get("/manager", async (req, res) => {
    let studentdata = await db.readufile();
    res.json({
        studentdata: studentdata
    })
})

app.post("/studentform", async (req, res) => {

    let dbbody = await db.addStudentData(req.body.name, req.body.age, req.body.kurs, req.body.manba)
    res.json(dbbody)

})



// kurslar
app.get("/kurslar", async (req, res) => {
    let kdata = await db.readkfile();
    res.json({
        kdata: kdata
    })
})
app.post("/kursform", async (req, res) => {

    let dbkbody = await db.addKursData(req.body.name)
    res.json(dbkbody)

})


// manbalar 
app.get("/manbalar", async (req, res) => {
    let mdata = await db.readmfile();
    res.json({
        mdata: mdata
    })
})
app.post("/manbaform", async (req, res) => {
    let dbmbody = await db.addManbaData(req.body.name)
    res.json(dbmbody)
})


app.delete("/delete/:id", async (req, res) => {
    await db.delete(req.params.id)
    res.json({
        ok: true,
    })
})