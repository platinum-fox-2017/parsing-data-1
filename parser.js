"use strict"
const csv = require('csv-parse');
const fs = require('fs')

class Person {
  constructor(id,firstName,lastName,email,phone,createdAt) {
    this.id=id
    this.firstName=firstName
    this.lastName=lastName
    this.email=email
    this.phone=phone
    this.createdAt = Date(createdAt)
  }
}

// class Date {
//   constructor(strDate) {
//     this.string = strDate;
//   }

// }

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.parsing()
  }

  get people() {
    return this
  }

  get size() {
    return this._people.length
  }

  get file() {
    return this._file;
  }

  parsing() {
    let tempPersonArr=[];
    let personData=fs.readFileSync(this._file,'utf8').split('\n');
    for(let i=1; i<personData.length; i++) {
      let data = personData[i].split(',');
      let person = new Person(data[0],data[1],data[2],data[3],data[4],data[5])
      tempPersonArr.push(person)
    }
    return tempPersonArr;
  }

  addPerson(obj) {
    this.people.push(obj);
  }

  save() {
    let text='id,first_name,last_name,email,phone,created_at\n';
    for(let i=0; i<this._people.length; i++) {
      let data=this.people[i];
      let strData=`${data.id},${data.firstName},${data.lastName},${data.email},${data.phone},${data.createdAt}\n`
      text+=strData;
    }
    fs.writeFileSync(this._file,text,'utf8')
  }

 }

let parser = new PersonParser('people.csv')

// parser.addPerson(new Person('201','Ervan','Adetya','ervan.adetya@gmail.com','021545444545','2012-07-15T12:06:16-07:00'))
// console.log(parser._people[parser._people.length-1])
// parser.save();

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
