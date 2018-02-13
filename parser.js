"use strict"
const fs = require('fs');

// class Person {
//   constructor(arrKey, arr){
//       this[arrKey[0]] = arr[0];
//       this[arrKey[1]] = arr[1];
//       this[arrKey[2]] = arr[2];
//       this[arrKey[3]] = arr[3];
//       this[arrKey[4]] = arr[4];
//       this[arrKey[5]] = new Date(arr[5]);
//   }
// }

class Person {
  constructor(obj, arr){
      let index = 0;
      for (var i in obj){
          if(i=='created_at'){
              this[i] = new Date(arr[index++]);
          }
          else{
              this[i] = arr[index++];
          }
      }
  }
}

class PersonParser {
  constructor(file) {
    this.file = file
    this._people = new Array();
    this.data = fs.readFileSync(this.file,'utf8').split('\n');
    this.write = new String();
    this.peopleObject = this.create_header(this.data[0]);
    this.read_to_object();
  }

  create_header(str){
      let headerArr = str.split(",");
      let tempObject = new Object();
      for(let i = 0; i<headerArr.length;i++){
          tempObject[headerArr[i]] = undefined;
      }
      console.log(tempObject);
      return tempObject;
  }

  read_to_object(){
      for(let i = 1; i<this.data.length; i++){
          // this.addPerson(new Person(this.data[0].split(","),this.data[i].split(",")));
          this.addPerson(new Person(this.peopleObject,this.data[i].split(",")));

      }
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
          this.write += this.obj_to_string(this._people[i]);
      }
      fs.writeFileSync('./people_output.csv',this.write);
  }

  obj_to_string(obj){
      return [obj.id,obj.first_name,obj.last_name,obj.email,obj.phone, obj.created_at].join(',')+'\n';
  }

}

let parser = new PersonParser('people.csv');

console.log(parser.file);
console.log(parser.people);
parser.save();
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
