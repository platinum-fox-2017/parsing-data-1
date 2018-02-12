"use strict"
const fs = require('fs')
class Person {
  constructor(id, first_name, last_name, email, phone, created_at){
    this.id = id || 'unknown'
    this.first_name = first_name || 'N/A'
    this.last_name = last_name || 'N/A'
    this.email = email || 'N/A'
    this.phone = phone || 'N/A'
    this.created_at = created_at || 'N/A'
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
  // this['data[0]'] ~~ this.id
}

class PersonParser {

  constructor(data) {
    this._file = data
    this._people = []
  }

  get people() {
    return this._people
  }

  addPerson(personObject) {
    this._people.push(personObject)
    return this
  }

  convertToPerson(){
      // loop thru data
        // split data
    for (let i = 1; i < this._file.length; i++) {
      // console.log(i);
      let pData = this._file[i].split(',')
      let date = new Date(pData[5])
      if (i === 1) {
        console.log(pData[5]);
        console.log(date);
      }
      let personObject = new Person (Number(pData[0]), pData[1],pData[2], pData[3],pData[4], date)
      this._people.push(personObject)
    }
    return this
  }

  save(){
    let data = this._people
    let prop = Object.getOwnPropertyNames(data[1]).join(',')
    // console.log(prop);
    let result = []
    for (let i = 0; i < data.length; i++) {
      let newData = Object.values(data[i]).join(',')
      result.push(newData)
    }
    result = result.join('\n')
    // console.log(result);
    fs.writeFileSync('./people-updated.csv', result, 'UTF-8', 'w')
  }

}

const data = fs.readFileSync('./people.csv', 'UTF-8').split('\r\n')
// console.log(data);


let parser = new PersonParser(data)
parser.convertToPerson()
parser.addPerson(new Person(201, 'Fransiskus', 'Teddy', 'ain@gmail.com', '1-098-012-9131', '2018-02-2T01:23:51-07:00'))
console.log(parser._people);
parser.save()
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
