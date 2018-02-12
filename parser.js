"use strict"
const fs = require('fs');

class Person {
  constructor(arrKey, arr){
      this[arrKey[0]] = arr[0];
      this[arrKey[1]] = arr[1];
      this[arrKey[2]] = arr[2];
      this[arrKey[3]] = arr[3];
      this[arrKey[4]] = arr[4];
      this[arrKey[5]] = arr[5];
  }
}

class PersonParser {
  constructor(file) {
    this.file = file
    this._people = new Array();
    this.data = fs.readFileSync(file,'utf8').split('\n');
    this.write = new String();
  }

  get people() {
    return this._people
  }

  addPerson(obj) {
      this._people.push(obj);
  }

  save(){
      this.write += (Object.keys(this._people[0]).join(',')+'\n');
      for(let i = 1; i < this._people.length; i++){
          this.write += (Object.values(this._people[i]).join(',')+'\n');
      }
      fs.writeFileSync('./people_output.csv',this.write);
  }

}

let parser = new PersonParser('people.csv');

for(let i = 1; i<parser.data.length; i++){
    parser.addPerson(new Person(parser.data[0].split(","),parser.data[i].split(",")));
}

console.log(parser.file);
console.log(parser.people);
parser.save();
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
