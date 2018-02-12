"use strict"

const fs = require('fs');

class Person {

  constructor(id, firstName, lastName, email, phone, createdAt){
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._phone = phone;
    this._createdAt = createdAt;
  }

  set id(value){
    this._id = value;
  }

  get id(){
    return this._id;
  }

  set firstName(value){
    this._firstName = value;
  }

  get firstName(){
    return this._firstName;
  }

  set lastName(value){
    this._lastName = value;
  }

  get lastName(){
    return this._lastName;
  }

  set email(value){
    this._email = value;
  }

  get email(){
    return this._email;
  }

  set phone(value){
    this._phone = value;
  }

  get phone(){
    return this._phone;
  }

  set createdAt(value){
    this._createdAt = value;
  }

  get createdAt(){
    return this._createdAt;
  }

  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this.data = this.readData();
    this.person = new Person();
  }

  readData(){
    var data = fs.readFileSync(this._file, 'UTF-8');
    return data.split('\n');
  }

  get people(){
    for(let i=1; i<this.data.length; i++){
      let row = this.data[i].split(',')
      let person = new Person(row[0], row[1], row[2], row[3], row[4], row[5]);
      this._people.push(person)
    }
    return this._people;
  }

  addPerson(input){
    this._people.push(input);
    console.log(this._people);
  }

  save(){
    let newArr = [];
    newArr.push('id,first_name,last_name,email,phone,created_at')
    for(let i=0; i<this._people.length; i++){
      newArr.push(`${this._people[i].id},${this._people[i].firstName},${this._people[i].lastName},${this._people[i].email},${this._people[i].phone},${this._people[i].createdAt},`)
    }
    console.log(newArr.join('\n'));
    fs.writeFile(this._file, newArr.join('\n'), 'utf8', (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  }

}

let parser = new PersonParser('./people.csv');
console.log(parser.people);
parser.addPerson(new Person('201', 'Reza', 'Pramudhika', 'rezapramudhika@gmail.com', '6281283891447', 'Mon Feb 12 2018 16:23:56 GMT+0700 (WIB)'));
// console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`);
parser.save();