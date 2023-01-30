const db = require('./db')

const Query = {
   //resolver function for students returns list
   students:() => db.students.list(),
}
console.log(Query);
const Student = {
   college:(root) => {
      return db.colleges.get(root.collegeId);
   }
}

const Mutation = {
   createStudent: (root,args,context,info) => {
      return db.students.create({
         id: args.id,
         firstName: args.firstName,
         lastName: args.lastName
      })
   },
   addStudent_returns_object:(root,args,context,info) => {
      const id = db.students.create({
         id:args.id,
         firstName:args.firstName,
         lastName:args.lastName
      })

      return db.students.get(id)
   },
   editStudent:(root,args,context,info) => {
      let stud = db.students.get(args.id);
      console.log(stud);
      stud.firstName = args.firstName;
      stud.lastName = args.lastName;
      db.students.update({
         id: args.id,
         firstName: args.firstName,
         lastName: args.lastName
      })
      return stud;
   }
}
module.exports = {Query,Student,Mutation}