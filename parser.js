"use strict"
const fs = require('fs');


class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at) {
    this._id = id
    this._first_name = first_name
    this._last_name = last_name
    this._email = email
    this._phone = phone
    this.created_at = new Date()
   }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    let dataPeople = fs.readFileSync(this._file,'utf-8').split('\n')
    for (let i = 1; i < dataPeople.length; i++) {
      let splittedData = dataPeople[i].split(',')
      let objPerson = new Person(splittedData[0],splittedData[1],splittedData[2],splittedData[3],splittedData[4],splittedData[5])
      this._people.push(objPerson)
    }
    return this._people
  }

  addPerson() {}

}

let parser = new PersonParser('people.csv')
console.log(parser.people);
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
