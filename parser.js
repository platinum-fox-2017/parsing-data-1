// "use strict"
//
var fs = require('fs')
var data = fs.readFileSync('./people.csv').toString().split('\n')

class Person {
  constructor(dataobj){
    this.id=dataobj.id
    this.firstname=dataobj.first_name
    this.lastname=dataobj.last_name
    this.email=dataobj.email
    this.phone=dataobj.phone
    this.created_at=dataobj.created_at
  }
}
//
class PersonParser{

  constructor(file) {
    this._file = file
    this._people = this.convert()
  }

  convert(){
    let datas = []
    for(let i=0;i<this._file.length;i++){
      var hasil=this._file[i].split(',')
      datas.push([])
      for(let j=0;j<hasil.length;j++){
        datas[i].push(hasil[j])
      }
    }

    let objarr=[]
    for(let i=1;i<datas.length-1;i++){
      var dataobj={}
      for(let j=0;j<datas[i].length;j++){
        dataobj[datas[0][j]]=datas[i][j]
      }
      objarr.push(new Person(dataobj))
    }
    this._people=objarr
    return this._people
  }

  get people() {
    return this._people
  }

  addPerson(kirimdata) {
    this._people.push(new Person(kirimdata))
    var arr=[['id,first_name,last_name,email,phone,created_at']]
    for(let i=0;i<this._people.length;i++){
      arr.push(this._people[i].id+','+this._people[i].firstname+','+this._people[i].lastname+','+this._people[i].email+','+this._people[i].phone+','+String(this._people[i].created_at))
    }
    var kirim = arr.join('\n')
    // console.log(kirim)
    fs.writeFile('./people.csv',kirim,'utf-8')
  }

}


let parser = new PersonParser(data)
let irsyad={
    id: '201',
    first_name: 'irsyad',
    last_name: 'pahlapi',
    email: 'irsyadpahlapi28@gmail.com',
    phone: '1-187-134-2333',
    created_at: '2013-11-01T13:08:44.000Z'}
console.log(parser.addPerson(irsyad))
// console.log(parser._people)
// console.log(parser._people[200])



// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
