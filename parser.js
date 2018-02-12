"use strict"

class Person {
  constructor(id,firstName,lastName,email,phone,createdAt){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.createdAt = createdAt;
  }

  id(){
    this.id = input;
    return this.id;
  }

  firstName(){
    this.firstName = input;
    return this.firstName;
  }

  lastName(){
    this.lastName = input;
    return this.lastName;
  }

  email(){
    this.email = input;
    return this.email;
  }

  phone(){
    this.phone = input;
    return this.phone;
  }

  createdAt(){
    this.createdAt = input;
    return this.createdAt;
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

  addPerson(input){
    this._people.push(input);
    return this._people;
  }

  save(){
      let updatedData = [];
      for(let j=0; j<this._people.length; j++){
        updatedData.push(`${this._people[j].id},${this._people[j].firstName},${this._people[j].lastName},${this._people[j].email},${this._people[j].phone},${this._people[j].createdAt},`)
      }
      let updatedDataNewFormat = updatedData.join('\n');
      console.log(updatedDataNewFormat);
      fs.writeFile('people.csv', updatedDataNewFormat, 'UTF-8', function(err){
        if (err) throw err;
        console.log('Saved!');
      });
    }

}

var fs = require('fs');
var dataInput = fs.readFileSync('people.csv', 'UTF-8')
  .split('\n');
var parser = new PersonParser(dataInput);
console.log(parser.people);
parser.addPerson(new Person('201','Fitrul,Islam','fitrul.islam@gmail.com','62-856-1111-2222','2018-02-12T18:02:30-07:00'));
parser.save();
console.log(`There are ${parser.people.length-1} people in the file '${parser.file}'.`)
