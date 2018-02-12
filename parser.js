"use strict"
const fs = require('fs')
class Person {
  constructor(id,first_name,last_name,email,phone,created_at){
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
    this._file = file
    this._arrData = []
    this._people = []
  }

  read_data(){
    let data = fs.readFileSync(this._file,'UTF-8')
    let splitData = data.split('\n')
    for(let i = 0 ; i < splitData.length ; i++){
      this._arrData.push(splitData[i].split(','))
    }
    return this._arrData
  }

  get people() {
    return this._people
  }

  addPerson() {
    for(let i = 1 ; i < this._arrData.length ; i++){
      let data = new Person(this._arrData[i][0],this._arrData[i][1],this._arrData[i][2],this._arrData[i][3],this._arrData[i][4],this._arrData[i][5])
      this._people.push(data)
    }
  }


}

let parser = new PersonParser('people.csv')
parser.read_data()
parser.addPerson()
console.log(parser._people[0])



// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
