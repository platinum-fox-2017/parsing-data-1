

"use strict"

const fs = require('fs')

class Person {
  constructor(id,first_name,last_name,email,phone,created_at){
    this._id = id
    this._first_name = first_name
    this._last_name = last_name
    this._email = email
    this._phone = phone
    this._created_at = created_at
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._peopleAmount = null
    this._people = []
  }

  readFile(file){
    let data = fs.readFileSync('people.csv', 'UTF-8')
    return data.split('\n')
    
  }

  parsingData(){
    let readData = this.readFile(this._file)
  
    let dataArray = []
    for(let [index,value] of readData.entries()){
      dataArray.push(value.split(','))
    }
    for(let i = 1; i < dataArray.length - 1; i++){
      let string = dataArray[i][5].slice(0,10)
      let parserPeople = new Person(dataArray[i][0],dataArray[i][1],dataArray[i][2],dataArray[i][3],dataArray[i][4],string)
      this._people.push(parserPeople)
    }
    return this
  }

  addPerson(first_name,last_name,email,phone){
    let id = this._people.length + 1
    let created_at = new Date().toISOString()
    let stringDate = created_at.slice(0,10)

    let newPeople = new Person(id,first_name,last_name,email,phone,stringDate)
    this._people.push(newPeople)
    this._peopleAmount = this._people.length
    return this
  }
  
  save(){
    let data = this._people
    
    let convertString = ""
    for(let [index,value] of data.entries()){
      let array = []
      if(index === 0){
        convertString += Object.keys(data[0]) + '\n'
      }

        array.push(value._id)
        array.push(value._first_name)
        array.push(value._last_name)
        array.push(value._email)
        array.push(value._phone)
        array.push(value._created_at)

        convertString += array.join(",") + '\n'
    }

    fs.writeFileSync(this._file,convertString)

    return this
  }

  get file(){
    return this._file
  }

  get people() {
    this._peopleAmount = this._people.length
    return this._peopleAmount
  }
}

let parser = new PersonParser('people.csv')
// parser.parsingData().addPerson('Kevin','Himawan','kevinhimawanhie@gmail.com','123456').save()

console.log(`There are ${parser.people} people in the file '${parser.file}'.`)
