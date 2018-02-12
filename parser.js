"use strict"

var fs = require('fs')


class Person {
  constructor(id, firstName, lastName, email, phone, created){
    this.id = id
    this.first_name = firstName
    this.last_name = lastName
    this.email = email
    this.phone = phone
    this.created  = created || new Date().toString()

  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  objPerson(){
    let arrPerson = []
    let read_data = fs.readFileSync('./people.csv').toString().trim().split("\n")
    for(let i=0; i<read_data.length; i++){
    // let property = read_data[0].split(',')
      arrPerson.push(read_data[i].split(','))
    }
    for(let j=1; j<arrPerson.length; j++){
      let dataPerson =  new Person(arrPerson[j][0], arrPerson[j][1], arrPerson[j][2], arrPerson[j][3], arrPerson[j][4], arrPerson[j][5])
      this._people.push(dataPerson)
    }

    return this._people
  }

  get people() {
    return {size: this._people.length}
  }

  addPerson() {
    let addData = new Person(`${this._people.length+ 1}`, 'Agung', 'Prabowo', 'agungp@pindad.com', '087822171172','')
    this._people.push(addData)
    let dataTemp = `${addData.id},${addData.first_name},${addData.last_name},${addData.email},${addData.phone},${addData.created}\n`
    fs.appendFile('./people.csv', dataTemp, (err) => {
      if (err) throw err;
      console.log('Data baru telah ditambahkan ke dalam file CSV');
    });
  }

}



let parser = new PersonParser('./people.csv')


parser.objPerson()
parser.addPerson()
console.log(`Data people ke-${parser.people.size} dalam  '${parser._file}'.`)
parser._people
// console.log(parser.objPerson())
// console.log(personInfo._firstName)
// console.log(read_data)
