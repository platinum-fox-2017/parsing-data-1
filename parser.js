"use strict"

const fs = require('fs');

var fileCSV = fs.readFileSync('./people.csv', 'UTF-8').split('\n')
// console.log(fileCSV.length); // 201 file
// console.log(fileCSV);

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?

  constructor(data) {
    this._id = data.id;
    this._firstName = data.firstName;
    this._lastName = data.lastName;
    this._email = data.email;
    this._phone = data.phone;
    this._createdAt = data.createdAt;
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.convert()
  }

  convert () {
    var arrFileCSV = [];
    for (var i = 0; i < fileCSV.length; i++) {

      var obj = {};
      obj.id = fileCSV[i].split(',')[0];
      obj.firstName = fileCSV[i].split(',')[1];
      obj.lastName = fileCSV[i].split(',')[2];
      obj.email = fileCSV[i].split(',')[3];
      obj.phone = fileCSV[i].split(',')[4];
      obj.createdAt = new Date(fileCSV[i].split(',')[5]);  
      arrFileCSV.push(new Person(obj));  
    }
    return arrFileCSV;
  }

  get people() {
    return this
  }

  addPerson(objData) {
    this._people.push(objData);
  }

  savePerson() {

    var indexTerakhir = this._people.length-1;
    var strNewPerson = `${this._people[indexTerakhir]._id},${this._people[indexTerakhir]._firstName},${this._people[indexTerakhir]._lastName},${this._people[indexTerakhir]._email},${this._people[indexTerakhir]._phone},${this._people[indexTerakhir]._createdAt}`;
    // return strNewPerson;
    var fileCSV1 = fs.readFileSync('./people1.csv', 'UTF-8')
    var newCSV = fileCSV1 + '\n' + strNewPerson;
    return fs.writeFileSync('./people1.csv', newCSV, {encoding:'utf8',mode:0o666,flag:'w'})
  }

  get size() {
    return this._people.length;
  }

  get file() {
    return this._file;
  }

}




let parser = new PersonParser('./people1.csv');
// console.log(parser.file);
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

// RELEASE 0
// console.log(parser.people);

// RELEASE 1
// console.log(parser.people[200]);
var newObj = {};
  newObj.id = '201';
  newObj.firstName = 'Marco';
  newObj.lastName = 'Sumali';
  newObj.email = 'marco.sumali@gmail.com';
  newObj.phone = '0215600175';
  newObj.createdAt = new Date('2015-02-22T10:09:03-08:00');  

// parser.addPerson(new Person (newObj));
// console.log(parser.people[201]);

// console.log(parser.savePerson());

