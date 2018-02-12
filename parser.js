"use strict"
let fs = require('fs')
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor (data){
    this.id = data.id
    this.firstName = data.first_name
    this.lastName = data.last_name
    this.email = data.email
    this.phone = data.phone
    this.createdAt = data.created_at
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.convert()
  }

  convert (){
    let data = fs.readFileSync(`./${this._file}`).toString().split('\n')
    let convert = []
    let result = []

    for (let i = 0; i < data.length; i++){
      convert.push(data[i].split(','))
    }
    
    for (let i = 1; i < convert.length; i++){
      let obj = {}
      for (let j = 0; j < convert[i].length; j++){
        obj[convert[0][j]] = convert[i][j]
      }
      result.push(new Person(obj))
    }
    this._people = result
    return this._people
  }
  
  get people() {
    return this._people
  }

  addPerson(obj) {
    return this._people.push(new Person(obj))
  }
  
  save (){
    let arr = []
    for (let i = 0; i < this._people.length;i++){
        arr.push(Object.values(this._people[i]).join(','))
    }
    arr = arr.join('\n')
    
    return fs.writeFile(this._file, arr, (err) => {
      if (err) throw err;
      // console.log('The file has been saved')
    })
  }

}

let parser = new PersonParser('people.csv')
let herby = {
  id: '201',
  first_name: 'Herby',
  last_name: 'Herado',
  email: 'herby.herado@gmail.com',
  phone: '083890801024',
  created_at: new Date(new Date().getTime())
}
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)

console.log(parser.people)
parser.addPerson(herby)
console.log(parser.people)
console.log(parser.save())
// console.log(new Date(new Date().getTime()))