class Person {
    // Look at the above CSV file
    // What attributes should a Person object have?
    constructor(id,first_name,last_name,email,phone,created_at){
      this.id = id
      this.first_name = first_name
      this.last_name = last_name
      this.email = email
      this.phone = phone
      this.created_at = created_at
  
    }
    
  }
module.exports = Person  