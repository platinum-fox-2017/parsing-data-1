class Person{
  constructor(person) {
   this.id = person.id;
   this.first_name = person.first_name;
   this.last_name = person.last_name;
   this.email = person.email;
   this.phone = person.phone;
   this._created_at = person.created_at;
  }
  get created_at(){
     return new Date(this._created_at) ;
  }
  
}
module.exports = Person
