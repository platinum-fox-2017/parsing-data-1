"use strict"

const fs = require('fs')

class Person {
  constructor(from_csv_to_arr) {
    this.id = from_csv_to_arr[0]
    this.first_name = from_csv_to_arr[1]
    this.last_name = from_csv_to_arr[2]
    this.email = from_csv_to_arr[3]
    this.phone = from_csv_to_arr[4]
    this.created_at = from_csv_to_arr[5]
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
    this.allData = this.csv_to_arr()
  }

  csv_to_arr () {
    const data = fs.readFileSync(this._file, 'utf8').trim()
    let data_csv = data.split('\n')
    let dataArr = []
    // console.log(data_csv);
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

  addPerson(id, first_name, last_name, email, phone, created_at) {
    let newPerson = new Person(id, first_name, last_name, email, phone, created_at)
    this.allData.push(newPerson)
    return this.allData
  }

  save() {
    let dataArr = this.allData
    let convertString = Object.keys(dataArr[0])
    // console.log(convertString);
    // console.log(dataArr);
    for (var i = 0; i < dataArr.length; i++) {
      let newArr = []
      newArr.push(dataArr[i].id)
      newArr.push(dataArr[i].first_name)
      newArr.push(dataArr[i].last_name)
      newArr.push(dataArr[i].email)
      newArr.push(dataArr[i].phone)
      newArr.push(dataArr[i].created_at)
      convertString += '\n' + newArr
    }
    fs.writeFile(this._file, convertString)

    return convertString
  }

  get size() {
    let temp = this.csv_to_arr()
    return temp.length
  }

}

let parser = new PersonParser('people.csv')

// parser.addPerson(new Person())

console.log(`There are ${parser.size} people in the file '${parser._file}'.`)

// console.log(parser.csv_to_arr());
parser.addPerson(['204','SING', 'SING', 'sing@gmail.com', '09873246542', Date.now()])
// console.log(parser.addPerson());
parser.save()
