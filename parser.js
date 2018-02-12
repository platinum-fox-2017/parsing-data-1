"use strict"

var fs = require('fs')
var content_csv = fs.readFileSync('people.csv','utf8')
  .toString()
  .split("\n")

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(objPeople) {
    this.id=objPeople.id
    this.first_name=objPeople.first_name
    this.last_name=objPeople.last_name
    this.email=objPeople.email
    this.phone=objPeople.phone
    this.created_at=objPeople.created_at || new Date();
  }

}

class PersonParser{

  constructor(file) {

    this._file = file
    this._people = this.people
  }

  get people() {
    var arrPeople=[];
    var arrReturn=[]
    //var splitComma=this._file.split(',')
    for(let i=0;i<this._file.length;i++){
      arrPeople.push(this._file[i].split(','))
    }
    for(let j=1;j<arrPeople.length-1;j++){
      var objPeople={}
      for(let k=0;k<arrPeople[j].length;k++){
      objPeople[arrPeople[0][k]]=arrPeople[j][k]
      }
      arrReturn.push(new Person(objPeople))
    }
    return arrReturn;
  }

  addPerson(plusData) {
  //  console.log(this._people)
    this._people.push(new Person(plusData))
  //  console.log(this._people)
  }
  save() {
      var fill_csv = fs.readFileSync('people.csv','utf8')
        .toString()
        .split("\n")
      var strData = fill_csv[0] + '\n';

      for(let i = 0; i < this._people.length; i++) {
        if (i == this._people.length - 1) {
        strData += this._people[i].id + ',' + this._people[i].first_name + ',' + this._people[i].last_name + ',' + this._people[i].email + ',' + this._people[i].phone + ',' + this._people[i].created_at;
          } else {
        strData += this._people[i].id + ',' + this._people[i].first_name + ',' + this._people[i].last_name + ',' + this._people[i].email + ',' + this._people[i].phone + ',' + this._people[i].created_at + '\n';
        }
      }
      fs.writeFileSync('people.csv', strData);
    }
}



 let parser = new PersonParser(content_csv);

 //console.log(orang.createObj())
  var newPeople={
   id:'201',
   first_name : 'Eki',
   last_name : 'Fakhrureza',
   email : 'ekifakhrureza@gmail.com',
   phone : '087874957002',

  }
parser.addPerson(newPeople)
parser.save()
console.log(parser._people)
//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
