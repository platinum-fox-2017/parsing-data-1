"use strict"
const fs = require('fs')
const dateFormat = require('dateformat')
const faker = require('faker')

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
    this._people = null
  }

  read_data(){
    let data = fs.readFileSync(this._file,'UTF-8')
    let splitData = data.split('\n')
    for(let i = 1 ; i < splitData.length ; i++){
      this._arrData.push(splitData[i].split(','))
    }

    let arrPeople = []
    for(let i = 0 ; i < this._arrData.length ; i++){
      let array = new Person(this._arrData[i][0],this._arrData[i][1],this._arrData[i][2],this._arrData[i][3],this._arrData[i][4],this._arrData[i][5])
      arrPeople.push(array)
    }
    return this._arrData = arrPeople
  }

  get people() {
    // this._arrData
    return this
  }

  get size(){
    return this._arrData.length-1
  }

  addPerson(first_name,last_name,email,phone,created_at) {
    this._people = new Person(this._arrData.length,first_name,last_name,email,phone,created_at)
    this._arrData.push(this._people)
    return this._arrData
  }

  writeData(){
    let convertStr = ''
    convertStr += Object.keys(this._arrData[0])
    for(let i = 0 ; i < this._arrData.length ; i++){
      let result = []
      result.push(this._arrData[i].id)
      result.push(this._arrData[i].first_name)
      result.push(this._arrData[i].last_name)
      result.push(this._arrData[i].email)
      result.push(this._arrData[i].phone)
      result.push(this._arrData[i].created_at)
      convertStr += '\n'+ result
    }
    return convertStr
  }

  save (){
    let newData = this.writeData()
    return fs.writeFileSync(this._file,newData)
  }

}

let firstName = faker['name'].firstName()
let lastName  = faker['name'].lastName()
let email     = faker['internet'].email()
let phone     = faker['phone'].phoneNumber()
let now       = faker['date'].recent()

let parser = new PersonParser('people.csv')
parser.read_data()
parser.addPerson(firstName,lastName,email,phone,dateFormat(now,"yyyy-mm-dd'T'hh:MM:ssZ"))
console.log(parser.writeData())
parser.save()


console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
