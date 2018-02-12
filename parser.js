"use strict"

var Person = require('./person.js');
var csv = require('csv-parser')
var fs = require('fs')
class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.parsingFromCsv();
  }

  get people() {
    let arrPeoplePerson = [];
    for(var i = 1; i < this._people.length; i++){
      arrPeoplePerson.push({
        id: this._people[i][0],
        first_name: this._people[i][1],
        last_name: this._people[i][2],
        email: this._people[i][3],
        phone: this._people[i][4],
        created_at: this._people[i][5],
      }) 
    }
    return arrPeoplePerson;
  }
  get file(){
    return this._file;  
  }
  save(){
   let data = this.arrayToString() ;
   fs.writeFileSync(this.file,data);
  }

  arrayToString(){
   var arrPeople = [];
   for(var i = 0; i < this._people.length; i++){
     let newStringPerson = this._people[i].join(',');
     arrPeople.push(newStringPerson);
   }
   return arrPeople.join('\n');
  }

  parsingFromCsv(){
    let data = fs.readFileSync(this._file,'utf8');
    data = data.split('\n');
    let arrPeople = []
    for(var i = 1; i < data.length; i++){
      var arrPerson = data[i].split(',');
      arrPeople.push(arrPerson);
       
    }
    return arrPeople;
  }

  addPerson(person) {
   let arrPerson = [person.id,person.first_name,person.last_name,person.email,person.phone,person._created_at];
   this._people.push(arrPerson);
  }

}

let parser = new PersonParser('people.csv')
//console.log(parser.people.)
let objPerson = {
  id: 500,
  first_name: 'Haidar',
  last_name: 'Afif',
  email: 'haidar@gmail.com',
  phone: '80123123',
  created_at: '2012-11-15T16:55:29-08:00' 
};
let newPerson = new Person(objPerson)
console.log(newPerson.created_at);
parser.addPerson(newPerson)
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
parser.save();
console.log(parser.people[parser.people.length -1 ])

