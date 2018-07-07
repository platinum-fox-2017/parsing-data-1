
"use strict"

const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
  }
  readFile() {
    let data = fs.readFileSync(this._file,'utf-8');
    let array = data.split('\n');
    let new_array = array.map((v,i,a) => {
      let array_people = v.split(',');
      let new_object = new Person(array_people[0],array_people[1],array_people[2],array_people[3],array_people[4],array_people[5]);
      this._people.push(new_object)
    })
    return ''
  }
  get people() {
    return this._people;
  }

  addPerson(new_person) {
    this._people.push(new_person);
    // return this._people;
  }
  save(data){
    let new_data = data.map((v,i,a)=> {
    let string = `${v.id},${v.first_name},${v.last_name},${v.email},${v.phone},${new Date(v.created_at)}`
      return string;
    }).join('\n');
    fs.writeFileSync('test.csv',new_data);
  }
}

let parser = new PersonParser('people.csv')

console.log(parser.readFile());

console.log(parser.addPerson(new Person(parser.people.length,'Dennis','Wong','d3nn1sdennis@gmail.com','081280242978',new Date())));

console.log(parser.people);

console.log(parser.save(parser._people));