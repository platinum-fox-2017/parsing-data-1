"use strict"
const fs = require('fs')
// const dataPeople = require('./people.csv')
// let readData = fs.readFileSync('./people.csv','utf8')
// console.log(readData)
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  // id,first_name,last_name,email,phone,created_at
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at

  }
  
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    // let arr = []
    let readData = fs.readFileSync(this._file,'utf8')
    let dataSplit = readData.split('\n')
    // console.log(dataSplit)
    for(let i =1;i<dataSplit.length;i++){
      let dataInside = dataSplit[i].split(',')
      // console.log(dataInside)
      let inputData = new Person (dataInside[0],dataInside[1],dataInside[2],dataInside[3],dataInside[4],dataInside[5])
      this._people.push(inputData)
    }
    return this._people
  }
  get size(){
    return this._people.length
  }
  get file(){
    return this._file
  }

  addPerson(objPerson) {
    // let arr = []
    this._people.push(objPerson)
    return this._people


  }


}

let parser = new PersonParser('people.csv')
console.log(parser.people)
console.log(`There are ${parser.size} people in the file '${parser.file}'.`)

console.log(parser.addPerson(new Person(parser.size+1,'Roger','Federer','rogerf@gmail.com','62134659232',new Date())))

