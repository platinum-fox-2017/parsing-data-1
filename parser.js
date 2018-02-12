"use strict"
const fs = require('fs')
const Person = require('./person.js')

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    let readData = fs.readFileSync(this._file,'utf8')
    let dataSplit = readData.split('\n')
    for(let i =1;i<dataSplit.length;i++){
      let dataInside = dataSplit[i].split(',')
      let inputData = new Person (dataInside[0],dataInside[1],dataInside[2],dataInside[3],dataInside[4],dataInside[5])
      this._people.push(inputData)
    }
    return this._people
  }
  get size(){
    return this._people.length
  }
  get file(){
    return this._file
  }

  addPerson(objPerson) {
    this._people.push(objPerson)
    return this._people
  }
  
  save(){
    let str = ''
    str+= 'id,first_name,last_name,email,phone,created_at'
    for(let i =0; i<this._people.length;i++){
      let arr = []
      if(this._people[i].id !== '' &&this._people[i].first_name !== '' &&this._people[i].last_name !== '' &&this._people[i].email !== '' &&this._people[i].phone !== '' &&this._people[i].created_at !== ''){
        arr.push(this._people[i].id)
        arr.push(this._people[i].first_name)
        arr.push(this._people[i].last_name)
        arr.push(this._people[i].email)
        arr.push(this._people[i].phone)
        arr.push(new Date(this._people[i].created_at))
        str+= '\n'+arr
      }
    }
    let writeData = fs.writeFileSync(this._file,str,'utf8')
    return writeData
  }

}

let parser = new PersonParser('people.csv')
console.log(parser.people)
console.log(`There are ${parser.size} people in the file '${parser.file}'.`)

console.log(parser.addPerson(new Person(parser.size+1,'Roger','Federer','rogerf@gmail.com','62134659232',new Date())))
parser.save()
