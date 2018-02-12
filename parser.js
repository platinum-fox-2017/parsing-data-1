"use strict"

const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(data){
    this.id = data[0]
    this.first_name = data[1]
    this.last_name = data[2]
    this.email = data[3]
    this.phone = data[4]
    this.created_at = data[5]
  }
}

class PersonParser {

  constructor(file) {
    this._file = fs.readFileSync('./people.csv', 'utf8')
    this._people = null
    this.data = this.getData()
  }
  getData(){
    let arr = this._file.toString().split('\n')
    let result = []
    for(let i=1; i<arr.length; i++){
      let arrPeople = arr[i].split(',')
      let person = new Person(arrPeople)
      result.push(person)
    }

    return result
  }
  get people() {
    return this._people
  }

  addPerson() {}

}

let parser = new PersonParser('people.csv')
console.log(parser.getData());

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
