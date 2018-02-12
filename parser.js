"use strict"

const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone){
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
    this._profile = this.objProfile()
  }

  get file() {
    return this._file
  }

  readCsv() {
    const csv = fs.readFileSync(this._file, 'utf-8')
    const csvArr = []
    for (let i = 0; i < 1; i++) {
      let csvSplit = csv.split('\n')
      for (let j = 0; j < csvSplit.length; j++) {
        csvArr.push(csvSplit[j].split(','))
      }
    }
    return csvArr
  }

  get people() {
    this._people = this._profile
    return this
  }

  objProfile() {
    const data = this.readCsv()
    const dataObj = []
    for (let i = 0; i < data.length; i++) {
      let obj = {}
      for (let j = 0; j < data[0].length; j++) {
        obj[data[0][j]] = data[i][j]
        if (j === 0) {
          obj[data[0][j]] = Number(data[i][j])
        }
      }
      dataObj.push(obj)
    }
    return dataObj
  }


  get size() {
    this._size = this._people.length
    return this._size
  }

  addPerson(first_name, last_name, email, phone) {
    const newPerson = new Person(this._profile.length+1, first_name, last_name, email, phone)
    this._profile.push(newPerson)
    return this._profile
  }

  save() {
    const saveFiles = this._profile
    let convertString = ''
    convertString += Object.keys(saveFiles[0])
    for (let i = 0; i < saveFiles.length; i++) {
      let arr = []
      for (let j = 0; j < 1; j++) {
        arr.push(saveFiles[i].id)
        arr.push(saveFiles[i].first_name)
        arr.push(saveFiles[i].last_name)
        arr.push(saveFiles[i].email)
        arr.push(saveFiles[i].phone)
        arr.push(saveFiles[i].created_at)
      }
      convertString += '\n' + arr
    }
    fs.writeFileSync(this._file, convertString)
    return convertString
  }
}

let parser = new PersonParser('people.csv')

parser.objProfile()
parser.addPerson('David', 'Yunius', 'david.yunius@gmail.com', '081293402209')
console.log(parser.save())

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
