"use strict"
const fs = require('fs')

class Person {
  constructor(id, firstname, lastname, email, phone, createdat) {
    this.id = id
    this.first_name = firstname
    this.last_name = lastname
    this.email = email
    this.phone = phone
    this.created_at = createdat
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = this.arrPeople()
  }

  arrPeople() {
    // console.log(arr)
    let arr = [];
    for(let i = 1; i < data.length; i++) {
      let row = data[i].split(',')
      let person = new Person(row[0], row[1], row[2], row[3], row[4], row[5]);
      arr.push(person)
    }
    return arr;
  }

  get people() {
    return this._people
  }

  get file() {
    return this._file
  }

  get size() {
    return this._people.length
  }

  addPerson(newperson) {
    this._people.push(newperson)
  }

  save() {
    let str = ''
    str += data[0] + '\n'
    for(let i = 0; i < this._people.length; i++) {
      if(i === this._people.length-1) {
        str += `${this._people[i].id},${this._people[i].first_name},${this._people[i].last_name},${this._people[i].email},${this._people[i].phone},${this._people[i].created_at}`
      } else {
        str += `${this._people[i].id},${this._people[i].first_name},${this._people[i].last_name},${this._people[i].email},${this._people[i].phone},${this._people[i].created_at}
`
      }
    }
    fs.writeFileSync('people.csv', str, 'utf8')
    return str;
  }
}

let data = fs.readFileSync('./people.csv', 'utf8').split('\n');
let parser = new PersonParser('people.csv')
parser.addPerson(new Person((parser.size)+1, 'Fatimah', 'Azzahra', 'fatimah.azzhr@hotmail.com', '1-702-580-4785', new Date()))
parser.save()
console.log(`There are ${parser.size} people in the file '${parser.file}'.`)