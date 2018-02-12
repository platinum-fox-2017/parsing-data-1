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
    this._file = file
    this._people = null
    this.data = this.getData()
  }
  getData(){
    let data = fs.readFileSync('./people.csv', 'utf8').trim()
    let arr = data.toString().split('\n')
    let result = []
    for(let i=1; i<arr.length; i++){
      let arrPerson = arr[i].split(',')
      let person = new Person(arrPerson)
      result.push(person)
    }
    this._people = result
    return result
  }
  get people() {
    return this._people
  }

  addPerson(id, first_name, last_name, email, phone, created_at) {
    let data = fs.readFileSync('./people.csv', 'utf8').trim()
    let arr = data.toString().split('\n')
    let result = []
    for(let i=0; i<arr.length; i++){
      let arrPerson = arr[i].split(',')
      result.push(arrPerson)
    }
    let newData = []
    newData.push(id, first_name, last_name, email, phone, created_at)
    result.push(newData)
    this._people = result

    return this._people[this._people.length-1]
  }
  save(){
    let dataStr = this._people.join('\n')
    return fs.writeFileSync('people.csv', dataStr, 'utf8')
  }
  get size(){
    return this._people.length
  }

}

let parser = new PersonParser('people.csv')
// parser.addPerson('202', 'Valensio', 'Deva', 'devdots@gmail.com', '081398220030', Date.now())
// parser.save();
console.log(`There are ${parser.size} people in the file '${parser._file}'.`)
