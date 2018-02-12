"use strict"

const fs = require('fs');

class Person {
  constructor(data){
    this.id = data.id
    this.first_name = data.first_name
    this.last_name = data.last_name
    this.email = data.email
    this.phone = data.phone
    this.created_at = data.created_at
  }
  
}

class PersonParser {
  constructor(file) {
    this._file = file
    this.dataArrPerson = this.convert()
    // this._people = this.addPerson()
  }

  convert(){
    let datax = fs.readFileSync('./people.csv', 'utf8').split('\n');
    // console.log(typeof(this.dataArrPerson))
    var dataArr = [];
    for(let i=0; i<datax.length; i++){
      let datas = datax[i].split(',')

      let obj = {}
      obj.id = datas[0]
      obj.first_name = datas[1]
      obj.last_name = datas[2]
      obj.email = datas[3]
      obj.phone = datas[4]
      obj.created_at = datas[5]

      dataArr.push(new Person(obj))
      // console.log(obj);
    }

    return dataArr
  }
  get size(){
    return this.dataArrPerson.length
  }
  get people() {
    return this
  }
  get file(){
    return this._file
  }

  addPerson(obj) {
    this.dataArrPerson.push(obj)
  }

  save(){
    var savePrint = '';
    for(let i=0; i<this.dataArrPerson.length; i++){
      savePrint+=this.dataArrPerson[i].id+','+
      this.dataArrPerson[i].first_name+','+
      this.dataArrPerson[i].last_name+','+
      this.dataArrPerson[i].email+','+
      this.dataArrPerson[i].phone+','+
      this.dataArrPerson[i].created_at+'\n'
    }
    fs.writeFile('people.csv', savePrint)
  }
  

}

let parser = new PersonParser('people.csv')

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

// console.log(parser.save())
// console.log(parser.dataArrPerson)

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

// parser.addPerson('777', 'yohanes', 'sahrul', 'yosa@gmail', '021','juni')

console.log(parser)

let addObj = {}
addObj.id = '66'
addObj.first_name = 'sasa'
addObj.last_name = 'yosa'
addObj.email = 'yosa@gmail.com'
addObj.phone = '02145678'
addObj.created_at = '789456'

parser.addPerson(new Person(addObj))
parser.save()