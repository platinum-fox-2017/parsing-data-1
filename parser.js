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
    this._people = this.convertToPerson()
  }

  get people() {
    return this._people
  }

  addPerson(personObject) {
    this._people.push(personObject)
    // return this
  }

  convertToPerson(){
    let peopleArr = []
    for (let i = 1; i < this._file.length-1; i++) {
      // console.log(i);
      let pData = this._file[i].split(',')
      let date = new Date(pData[5])
      let personObject = new Person (Number(pData[0]), pData[1],pData[2], pData[3],pData[4], date)
      peopleArr.push(personObject)
    }
    return peopleArr
  }

  save(){
    let data = this._people
    console.log(data.length);
    let prop = Object.getOwnPropertyNames(data[1]).join(',')
    // console.log(prop);
    let result = []
    for (let i = 0; i < data.length+1; i++) {
      if (i === 0) {
        result.push(prop)
      } else {
        let newData = Object.values(data[i-1]).join(',')
        result.push(newData)
      }

    }
    result = result.join('\n')
    fs.writeFileSync('./people-updated.csv', result, 'UTF-8', 'w')
  }

}

const data = fs.readFileSync('./people.csv', 'UTF-8').split('\r\n')
// console.log(data);


let parser = new PersonParser(data)
// parser.convertToPerson()
console.log(parser._people.length);
parser.addPerson(new Person(201, 'Fransiskus', 'Teddy', 'ain@gmail.com', '1-098-012-9131', '2018-02-2T01:23:51-07:00'))
// let test = new Person(201, 'Fransiskus', 'Teddy', 'ain@gmail.com', '1-098-012-9131', '2018-02-2T01:23:51-07:00')
// // console.log(test);
// parser.addPerson(test)
// console.log(parser._people[201]);

parser.save()
console.log(parser._people.length);

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
