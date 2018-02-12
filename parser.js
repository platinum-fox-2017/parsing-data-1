"use strict"
const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(array) {
    this._id = array[0]
    this._firstname = array[1]
    this._lastname = array[2]
    this._email = array[3]
    this._phone = array[4]
    this._createdAt = array[5]
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
    this._data = this.read()
  }

  read() {
    let contents = fs.readFileSync(this._file, 'utf-8').split('\n')
    let header = contents[0]
    // console.log(header)
    let content = []
    for (let index = 1; index < contents.length; index++) {
      let tempContent = contents[index].split(',')
      let object = new Person(tempContent)
      content.push(object)
    }
    return content
  }

  get people() {
    return this._people
  }

  addPerson() { }

}

let parser = new PersonParser('people.csv')
// parser.read()
console.log(parser.read())
// console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
