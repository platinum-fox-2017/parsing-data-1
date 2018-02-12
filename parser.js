"use strict"
const fs = require('fs');


class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
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
      if(dataPeople[i] !== '') {
        let splittedData = dataPeople[i].split(',')
        let objPerson = new Person(splittedData[0],splittedData[1],splittedData[2],splittedData[3],splittedData[4],splittedData[5])
        this._people.push(objPerson)
      }
    }
    return this
  }

  get file() {
    return this._file
  }

  addPerson(id,first_name, last_name, email, phone) {
    let newPerson = new Person(id, first_name, last_name, email, phone, new Date())
    this._people.push(newPerson)
    return this
  }

  get size () {
    let count = this._people.length
    return count
  }

  save () {
    let strResult = ''
    strResult += Object.keys(this._people[0])
    this._people.forEach(data => {
      let arr = []
      arr.push(data.id)
      arr.push(data.first_name)
      arr.push(data.last_name)
      arr.push(data.email)
      arr.push(data.phone)
      arr.push(data.created_at)
      strResult += '\n' + arr
    })
    fs.writeFileSync(this._file, strResult)
    return strResult
  }
}

let parser = new PersonParser('people.csv')
// parser.people
// console.log(parser.people.addPerson(201,'Steve','Jobs','stevejobs@apple.com','121-7845-9089').save());
// parser.save()
// console.log(parser.people);
// console.log(parser.size);
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
// console.log(parser.save());
