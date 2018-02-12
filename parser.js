"use strict"

const fs = require('fs')

class Person {
  constructor(from_to_arr) {
    this.id = from_to_arr[0]
    this.first_name = from_to_arr[1]
    this.last_name = from_to_arr[2]
    this.email = from_to_arr[3]
    this.phone = from_to_arr[4]
    this.created_at = from_to_arr[5]
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  to_arr () {
    const data = fs.readFileSync(this._file, 'utf8')
    let data_csv = data.split('\n')
    let dataArr = []
    console.log(data_csv);
    for (var i = 1; i < data_csv.length; i++) {
      let arrPeople = data_csv[i].split(',')
      const objPerson = new Person(arrPeople)
      dataArr.push(objPerson)
    }
    return dataArr
  }

  get people() {
    return this._people
  }

  addPerson() {}

}

let parser = new PersonParser('people.csv')

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

console.log(parser.to_arr());
