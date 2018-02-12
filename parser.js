"use strict"

const fs = require('fs');


class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(data) {
    this.id           = data.id
    this.first_name   = data.first_name
    this.last_name    = data.last_name
    this.email        = data.email
    this.phone        = data.phone
    this.createdAt    = data.created_at || new Date();
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null;
  }

  convertCSVtoArrObject() {
    this._people = [];
    let data = fs.readFileSync(this._file,'utf8');
    data     = data.split('\n');

    let key  = data[0].split(',');

    for(let i = 1; i < data.length; i++) {
      let arrSingleData = data[i].split(',');
      let objPerson     = {}

      for(let j = 0; j < key.length; j++) {
        objPerson[key[j]] = arrSingleData[j];
      }

      let person        = new Person(objPerson);
      this._people.push(person);
    }  
  }

  get people() {
    return this._people
  }

  get size() {
    return this._people.length;
  }

  addPerson(person) {
    this._people.push(person);    
  }

  save() {
    let data    = fs.readFileSync(this._file,'utf8');
    data        = data.split('\n');
    let key     = data[0];
    let strData = key + '\n';

    for(let i = 0; i < this._people.length; i++) {
      if (i == this._people.length - 1) {
        strData += this._people[i].id + ',' + this._people[i].first_name + ',' + this._people[i].last_name + ',' + this._people[i].email + ',' + this._people[i].phone + ',' + this._people[i].createdAt;  
      } else {
        strData += this._people[i].id + ',' + this._people[i].first_name + ',' + this._people[i].last_name + ',' + this._people[i].email + ',' + this._people[i].phone + ',' + this._people[i].createdAt + '\n';  
      }
      
    }
    fs.writeFileSync(this._file, strData);
  }

}

let parser = new PersonParser('people.csv')
parser.convertCSVtoArrObject();

let arrObjData = parser.people
console.log(arrObjData);

let objPerson  = {
                  id: '201',
                  first_name: 'reynaldi',
                  last_name: 'ananda',
                  email: 'reynaldipane@gmail.com',
                  phone: '081372977796'
                }


parser.addPerson(new Person(objPerson));

parser.save();

console.log(`There are ${parser.size} people in the file '${parser._file}'.`)