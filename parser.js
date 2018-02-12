"use strict"

class Person {
  constructor(id,firstName,lastName,email,phone,createdAt){
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._phone = phone;
    this._createdAt = createdAt;
  }

  set id(input){
    this._id = input;
  }

  get id(){
    return this._id;
  }

  set firstName(input){
    this._firstName = input;
  }

  get firstName(){
    return this._firstName;
  }

  set lastName(input){
    this._lastName = input;
  }

  get lastName(){
    return this._lastName;
  }

  set email(input){
    this._email = input;
  }

  get email(){
    return this._email;
  }

  set phone(input){
    this._phone = input;
  }

  get phone(){
    return this._phone;
  }

  set createdAt(input){
    this._createdAt = input;
  }

  get createdAt(){
    return this._createdAt;
  }

}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
  }

  get people() {
    for(let i=1; i<this._file.length; i++){
      let dataSplit = this._file[i].split(',');
      let person = new Person(dataSplit[0],dataSplit[1],dataSplit[2],dataSplit[3],dataSplit[4],dataSplit[5]);
      this._people.push(person);
    }
    return this._people;
  }

  addPerson() {}

}

var fs = require('fs');
var dataInput = fs.readFileSync('people.csv', 'UTF-8')
  .split('\n');
var parser = new PersonParser(dataInput);
console.log(parser.people);

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
