"use strict"

const fs = require('fs')
class Person {
  constructor(input){
    this.Id = input[0];
    this.first_name = input[1];
    this.last_name = input[2];
    this.email = input[3];
    this.phone = input[4];
    this.created = input[5]
  }
}

class PersonParser {

  constructor(file) {
    this.fileName = file
    this.file = fs.readFileSync(file,'UTF-8')
    this.hasilArrString = []
    this.hasilArrOfObject = []
    this.tampungStringToCSV = ''
    this.idCount = 0
  }

  arrayOfString(){
    let string = this.file.split('\n')
    for(let i =0;i<string.length;i++){
      this.hasilArrString.push(string[i].split(','))
    }
    return this.hasilArrString
  }

  peopleConstruct(){
    for(let i=1;i<this.hasilArrString.length;i++){
      let person = new Person(this.hasilArrString[i])
      this.hasilArrOfObject.push(person)
      this.idCount++
    }
    return this
  }

  addPerson(array){
    let person = new Person(array)
    this.hasilArrOfObject.push(person)
    this.hasilArrString.push(array)
    this.idCount += 1
    return this.hasilArrString
  }

  addRandomPerson(){
    let randomizer = []
    for(let i =0;i<6;i++){
      randomizer.push(this.hasilArrString[Math.ceil(Math.random()*this.hasilArrString.length)][i])
    }
    randomizer[0] = this.idCount+1
    randomizer[6] = new Date()
    let person = new Person(randomizer)
    this.hasilArrOfObject.push(person)
    this.hasilArrString.push(randomizer)
    this.idCount += 1
    return this.hasilArrString
  }

  toString() {
    this.tampungStringToCSV += 'id,first_name,last_name,email,phone,created_at\n'
    let array = []
    for(let i = 1; i<this.hasilArrString.length;i++){
      array.push(this.hasilArrString[i].join(','))
    }
    this.tampungStringToCSV += array.join('\n')
    return this.tampungStringToCSV
  }

  save() {
    return fs.writeFileSync(this.fileName,this.tampungStringToCSV)
  }

}

let parser = new PersonParser('people.csv')
parser.arrayOfString()
// console.log(parser.arrayOfString())
// console.log(parser.hasilArrString)
parser.peopleConstruct()
// console.log(parser.hasilArrOfObject)
// console.log(parser.idCount)
// parser.addPerson([parser.idCount+1,'Agrha','Prayogo','agrhakart@zgmail.com','081224664707',new Date()])
parser.addRandomPerson()
console.log(parser.hasilArrString[203])
// console.log()
parser.toString()
// console.log(parser.tampungStringToCSV)
parser.save()
// console.log(parser.save())
// console.log(parser.hasilArrOfObjectWithoutHeader)
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
