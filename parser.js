"use strict"

const fs = require('fs')
const faker = require('faker')

class Person {
  constructor (id,first_name,last_name,email,phone,created_at){
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
    this._people = []
  }

  get people() {
    let data = fs.readFileSync(this._file,'utf8').split('\n')
    for(let i=1; i<data.length; i++){
      let personData = data[i].split(',')
      let objPerson = new Person(personData[0],personData[1],personData[2],personData[3],personData[4],new Date(personData[5]))
      this._people.push(objPerson)
    }
    return this
  }
  get size(){
    let count = this._people.length
    return count
  }

  get file(){
    return this._file
  }

  addPerson(newPerson) {
    this._people.push(newPerson)
    return this._people
  }

  save(){
    let str = ''
    str+=Object.keys(this._people[0])
      for(let i =0; i<this._people.length; i++){
        let arr = []      
        if(this._people[i].id !=='' && this._people[i].first_name !=='' && this._people[i].last_name !=='' && this._people[i].email !=='' && this._people[i].phone !=='' && this._people[i].created_at !==''){        
          arr.push(this._people[i].id)
          arr.push(this._people[i].first_name)
          arr.push(this._people[i].last_name)
          arr.push(this._people[i].email)
          arr.push(this._people[i].phone)
          arr.push(this._people[i].created_at)
          str+='\n'+arr
        }      
    }
    fs.writeFileSync('people.csv',str,'utf8')
    return str
    
  }

}

let parser = new PersonParser('people.csv')
//console.log(faker)

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
let first_name = faker.name.firstName()
let last_name = faker.name.lastName()
let email = faker.internet.email()
let phone = faker.phone.phoneNumber()
parser.addPerson(new Person(parser.size+1,first_name,last_name,email,phone, new Date()))
parser.save()

