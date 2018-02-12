"use strict"
//letak 'fs' di atas, buat tau kita udah require apa aja
//module export taro di bawah
const fs = require('fs');


//untuk bikin cetakan
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(data) {
    this.id = data._id
    this.first_name = data._first_name
    this.last_name = data._last_name
    this.email = data._email
    this.phone = data._phone
    this.created_at = data._created_at
  }
}

// untuk memanggil person
class PersonParser {
  constructor(file) {
    this._file = file
    this._people = this.convert()
  }

  convert() {
    let people = fs.readFileSync('./people.csv', 'UTF-8').split('\n')
    let arr = []
    for(let i=0; i<people.length; i++) {
      let idPeople = people[i].split(',')
      let obj = {}
      obj._id = idPeople[0]
      obj._first_name = idPeople[1]
      obj._last_name = idPeople[2]
      obj._email = idPeople[3]
      obj._phone = idPeople[4]
      obj._created_at = idPeople[5]
      arr.push(new Person(obj))
    }
    return arr
    // console.log(people);
  }

  get people() {
    return this._people
  }

  addPerson(obj) {
    this._people.push(obj)
  }

  size() {
    return this._people.length
  }

  file() {
    return this._file
  }

  save() {
    let arrSave = []
    // arrSave.push('id,first_name,last_name,email,phone,created_at')
    for(let i=0; i<this._people.length; i++) {
      let text = ''
      text += `${this._people[i].id},${this._people[i].first_name},${this._people[i].last_name},${this._people[i].email},${this._people[i].phone},${this._people[i].created_at}`
      arrSave.push(text)
    }
    arrSave = arrSave.join('\r\n')
    fs.writeFileSync('people.csv', arrSave);
    // console.log(arrSave);
  }
}

let parser = new PersonParser('people.csv')
//
let addObj = {}
addObj._id = 201
addObj._first_name = 'Wika'
addObj._last_name = 'Silo'
addObj._email = 'silo.wika@gmail.com'
addObj._phone = '081298574543'
addObj._created_at = new Date()
// // console.log(addObj);
parser.addPerson(new Person(addObj))
parser.save()
// console.log(parser.convert()[201]);
// console.log(parser.convert());

// let people = fs.readFileSync('./people.csv', 'UTF-8').split('\n')
// console.log(people[201]);
console.log(`There are ${parser.size()} people in the file '${parser.file()}'.`)
