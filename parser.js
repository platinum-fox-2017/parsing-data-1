
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

// console.log(parser.save(parser._people));


// console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)

// console.log(parser.people.length)


// "use strict"

// const fs = require('fs');

// class Person {
//   // Look at the above CSV file
//   // What attributes should a Person object have?
//   constructor(id,firstName,lastName,email, phone, createdAt){
//     this.id = id,
//     this.firstName = firstName,
//     this.lastName = lastName,
//     this.email = email,
//     this.phone = phone,
//     this.createdAt = createdAt
//   }
// }
// class PersonParser {
//   constructor(file) {
//     this._file = file
//     this._people = [];
//     console.log(this._file)
//   }
//   get people() {
//     let data =fs.readFileSync(this._file,'utf8')
//     let arr = data.split('\n');
//     console.log(arr)
//     let newArr = [];
//     for(let i=1; i<arr.length; i++){
//       let arrPeople = arr[i].split(',');
//       let newObj = new Person(arrPeople[0],arrPeople[1],arrPeople[2],arrPeople[3],arrPeople[4],arrPeople[5]);
//       this._people.push(newObj);
//     }
//     return this._people;
//   }
//   addPerson(newPerson) {
//     this._people.push(newPerson);
//     return this._people;
//   }
//   save(){
//     let str = '';
//     str +=  Object.keys(this._people[0])
//     for(let i=0; i<this._people.length; i++){
//       let arr =[];
//       if(this._people[i].id !== '' && this._people[i].firstName !== ''&& this._people[i].lastName !== ''&& this._people[i].email !== ''&& this._people[i].phone !== ''&& this._people[i].createdAt!== ''){
//         arr.push(this._people[i].id)
//         arr.push(this._people[i].firstName)
//         arr.push(this._people[i].lastName)
//         arr.push(this._people[i].email)
//         arr.push(this._people[i].phone)
//         arr.push(this._people[i].createdAt)
//         str +=  '\n' + arr
//       }
//     }
//     fs.writeFileSync('example.csv',str,(err) =>{
//       if(err) throw err;
//       console.log('The file has been saved!')
//     })
//   }
// }
// let parser = new PersonParser('example.csv')
// console.log(parser.people)
// // parser.save();
// console.log(parser.addPerson(new Person(parser._people.length+1,'Dennis','Wong','d3nn1sdennis@gmail.com','081280242978',new Date())))
// console.log(parser.save())
// // console.log(parser.people)

// // console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

