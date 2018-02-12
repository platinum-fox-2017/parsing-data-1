"use strict"

var fs = require('fs')
var read_data = fs.readFileSync('people.csv','utf8').toString().split("\n")

class Person {
  constructor(id, firstName, lastName, email, phone, created){
    this.id = id
    this.first_name = firstName
    this.last_name = lastName
    this.email = email
    this.phone = phone
    this.created  = created || new Date().toISOString()

  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    for(let i=1; i<read_data.length; i++){
      let property = read_data[0].split(',')
      let value = read_data[i].split(',')

      let objPerson =  new Person(this._people[property[0]] = value[0],
        this._people[property[1]] = value[1],
        this._people[property[2]] = value[2],
        this._people[property[3]] = value[3],
        this._people[property[4]] = value[4],
        this._people[property[5]] = value[5])

        this._people.push(objPerson)
    }

    return this._people
  }

  addPerson() {
    
  }

}



let parser = new PersonParser('people.csv')
// let personInfo = new Person()

console.log(parser.people)
// console.log(personInfo._firstName)
// console.log(read_data)
