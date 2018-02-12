"use strict"
const fs = require('fs');

class Person {
  constructor(id, first_name, last_name, email, phone, created_at) {
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
    this._file = fs.readFileSync(file, 'UTF-8').split('\n')
    this._people = new Array()
    this._locationFile = file

    let splitData = new Array()
    for (let i = 1; i < this._file.length; i++) {
      splitData.push(this._file[i].split(','));
    }

    for (let j = 0; j < splitData.length; j++) {
      var dataPerson = new Person(splitData[j][0], splitData[j][1], splitData[j][2], splitData[j][3], splitData[j][4], splitData[j][5])
      this._people.push(dataPerson)
    }

  }

  get people() {
    return this._people
  }

  addPerson(person) {
    this._people.push(person)
  }

  save() {
    let saverArr = new Array()
    saverArr.push(this._file[0])
    for (let i = 0; i < this._file.length; i++) {
      saverArr.push(`${this._people[i].id},${this._people[i].first_name},${this._people[i].last_name},${this._people[i].email},${this._people[i].phone},${this._people[i].created_at}`)
    }
    let savingData = saverArr.join('\n')
    fs.writeFileSync(this._locationFile, savingData)
  }

}

let parser = new PersonParser('people.csv')

// console.log(parser.people)
// parser.addPerson(new Person(parser.people.length + 1, 'Gustaf', 'Pahlevi', 'gustafpahlevi@gmail.com', 1234567831, new Date()))
// parser.addPerson(new Person(parser.people.length + 1, 'Dina', 'Dewi', 'dinda@gmail.com', 09878613, new Date()))
parser.addPerson(new Person(parser.people.length + 1, 'Andrew', 'Budi', 'budi@gmail.com', 09878613, new Date()))

parser.save()

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
