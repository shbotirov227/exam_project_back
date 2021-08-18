
const fs = require("fs/promises")
const path = require('path')


module.exports = class Database{
    constructor(){
        // kurslar uchun
        this.kpath = path.join(__dirname, '..', '/routs', '/kurs.json')
        this.kdata = []
        this.readkfile()

        // uquvchilar uchun
        this.upath = path.join(__dirname, '..', '/routs', '/student.json')
        this.udata = []
        this.readufile()

        // manbalar uchun
        this.mpath = path.join(__dirname, '..', '/routs', '/manba.json')
        this.mdata = []
        this.readmfile()
        

    }
        // kurs class
    async readkfile(){
        let kdata = await fs.readFile(this.kpath, 'utf-8')
        kdata = await JSON.parse(kdata)
        this.kdata = kdata.kdata
        return kdata.kdata
        
    }
    async addkData(name){
        let kdata= {
            id: Math.random().toString(32).substring(2),
            name
        }
        this.kdata.push(kdata)
        await fs.writeFile(this.kpath, JSON.stringify({kdata:this.kdata}))
         return kdata
    }

    // uquvchi class

    async readufile(){
        let udata = await fs.readFile(this.upath, 'utf-8')
        udata = await JSON.parse(udata)
         this.udata = udata.udata
            // console.log(this.upath);
          return udata.udata
         
     }
     async adduData(name, age, kurs, manba){
         let udata= {
            id: this.udata.length+1,
            name,
            age,
            kurs,
            manba
        }
        this.udata.push(udata)
        
        await fs.writeFile(this.upath, JSON.stringify({udata:this.udata}))
        
        return udata
    }

    // manba class

    async readmfile(){
        let mdata = await fs.readFile(this.mpath, 'utf-8')
        mdata = await JSON.parse(mdata)
        this.mdata = mdata.mdata
        return mdata.mdata
        
    }
    async addmData(name){
        let mdata= {
            id: Math.random().toString(32).substring(2),
            name,
        }
        this.mdata.push(mdata)
        await fs.writeFile(this.mpath, JSON.stringify({mdata:this.mdata}))
         return mdata
    }
    async delete(id){
        let udata = await this.readufile()
        let filtered = udata.filter(e => e.id != id)
        await fs.writeFile( this.upath, JSON.stringify({
            udata: filtered
        }))
    }
}