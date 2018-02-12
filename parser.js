"use strict"

const fs = require('fs');

class Person {
  constructor(data) {
    this.id = data.id;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.email = data.email;
    this.phone = data.phone;
    this.create_at = data.create_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = this.parse(file);
  }

  parse(file) {
    let data = fs.readFileSync(file, 'utf8').split('\n');
    let result = [];

    for (let i = 1; i < data.length; i++) {
      let dataPerson = data[i].split(',');

      result.push(new Person({
        id: dataPerson[0],
        first_name: dataPerson[1],
        last_name: dataPerson[2],
        email: dataPerson[3],
        phone: dataPerson[4],
        create_at: new Date(dataPerson[5])
      }));
    }
    return result;
  }

  get people() {
    return this;
  }

  get size() {
    return this._people.length;
  }

  get file() {
    return this._file;
  }

  addPerson(data) {
    this._people.push(data);
  }

  save() {
    let data = 'id,first_name,last_name,email,phone,created_at\n';

    for (let i = 0; i < this._people.length; i++) {
      data += this.convertObjtoStr(this._people[i]);
    }

    fs.writeFileSync('people.csv', data);
  }

  convertObjtoStr(obj) {
    let result = '';
    result = `${obj.id},${obj.first_name},${obj.last_name},${obj.email},${obj.phone},${obj.create_at}\n`;
    return result;
  }

}

let parser = new PersonParser('people.csv');

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`);

parser.addPerson(new Person({
  id: 201,
  first_name: 'Ardhiansyah',
  last_name: 'Putra',
  email: 'email@mail.com',
  phone: '62-8533-580-4785',
  create_at: new Date()
}));

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`);

parser.save();