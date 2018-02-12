"use strict"
const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstname, lastname, email, phone, createdAt) {
    this.id = id
    this.firstname = firstname
    this.lastname = lastname
    this.email = email
    this.phone = phone
    this.createdAt = createdAt
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._data = this.read()
  }

  read() {
    let contents = fs.readFileSync(this._file, 'utf-8').split('\n')
    let content = []
    for (let index = 1; index < contents.length; index++) {
      let tempContent = contents[index].split(',')
      let object = new Person(tempContent[0], tempContent[1], tempContent[2], tempContent[3], tempContent[4], tempContent[5])
      content.push(object)
    }
    return content
  }

  addPerson(person) {
    this._data.push(person)
    console.log(person)
    return this._data
  }

  save() {
    let newPeople = []
    console.log(this._data[0].firstname)
    for (let index = 0; index < this._data.length; index++) {
      newPeople.push([])
      newPeople[index].push(this._data[index].id, this._data[index].firstname, this._data[index].lastname, this._data[index].email, this._data[index].phone, this._data[index].createdAt)
    }
    newPeople.unshift(['id', 'first_name', 'last_name', 'email', 'phone', 'created_at'])
    fs.writeFileSync(this._file, newPeople.join('\n'));
  }

}

let parser = new PersonParser('people.csv')
// console.log(parser)
let date = new Date()
let currentDate = date.getFullYear() + '-' + date.getUTCMonth() + '-' + date.getUTCDate() + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() +
  ":" + date.getMilliseconds()
parser.addPerson(new Person(parser._data.length + 1, 'andrew', 'kusuma', 'andrew.budikusuma@gmail.com', '085880016822', currentDate))
// console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
// console.log(parser._data.length)
//
parser.save()