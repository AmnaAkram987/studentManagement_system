
import inquirer from 'inquirer';

class Student{
static studentCount:number=0;

  name:string; 
  studentId:string;
  courses:string[];
  balance:number;

  constructor(name:string){
    this.name=name
    this.balance=0;
    this.courses=[];
    this.studentId = this.generateStudentId()

    Student.studentCount++;
}
  private generateStudentId():string
{
    return Math.floor(10000 + Math.random() *9000 ).toString()
}

 enrollStudent(course:string):void{
    this.courses.push(course)
    console.log( `${this.name} is successfuly enrolled in ${this.courses}`)
}

 viewBalance():void{
    console.log(` ${this.name} has balance of $${this.balance}`)
}
  payTution(amount:number):void{
       this.balance+= amount
       console.log(`Tution fee paid successfully.`)
       this.balance-=10
       console.log(`Balance left:$${this.balance} `)
 }

 showStatus():void{
    console.log(`Student name= ${this.name}`)
    console.log(`Student Id = ${this.studentId}`)
    console.log(`Courses Enrolled = ${this.courses.join(',')}`)
    console.log(`Student balance= ${this.balance}`)

 }

}
class studentManagementSystem{
     students:Student[];

     constructor(){
        this.students = [];
     }
     
 
async AddStudent():Promise < void > {
 const { name } =await inquirer .prompt([
    {
    name:'name',
    type:"input",
    message:"Enter student name:"
 }
])
const newStudent = new Student(name);
this.students.push(newStudent);
console.log(
    `${newStudent.name}is added to system with id :${newStudent.studentId} `)
}


async enrollStudentInCourse():Promise<void>{
 const {studentID,course} =await inquirer.prompt([
    {
    name:'studentID',
    message:'Enter Student Id:'
 },
 {
    name:"course",
    message:'Enter your Course Title:'
 }
])
const student = this.findStudentById(studentID)
   if (student){
          student.enrollStudent(course)
   }
   else{
    console.log(`Student not found.Invalid Id`)
   }
}


async viewStudentBalance():Promise<void>{
 const { studentID } =await inquirer.prompt([
    {
       name:'studentID',
       message:'Enter Student Id:'
    } 
    
])
const student = this.findStudentById(studentID)
if(student){
    student.viewBalance()
}
else{
    console.log(`Student not found.Invalid Id`)
}
}

async payStudentTutionFee():Promise<void>{
    const {studentID,amount} = await inquirer.prompt([
        {
            
            name:'studentID',
            message:'Enter Student Id:'
    },
    {
           name:'amount',
           message:'Enter your fee amount',
    }
])
   const student=this.findStudentById(studentID)
     if(student){
         student.payTution(amount)

     }
     else{
        console.log(`Student not found.Invalid Id`)
     } 
    }


    async showStudentStatus():Promise<void>{
        const {studentID} = await inquirer.prompt([
            {
                
                name:'studentID',
                message:'Enter Student Id:'
        }])
        const student=this.findStudentById(studentID)
     if(student){
         student.showStatus()
     }
     else{
        console.log(`Student not found.Invalid Id`)
     } 
    }

 private  findStudentById(studentId:string) : Student |undefined {

     return this.students.find((student)=> student.studentId === studentId)

}
}
 async function main() {
   const sms=new studentManagementSystem()
   while(true){
    const {action}=await inquirer .prompt([{
        name:'action',
        type:'list',
        message:"Select any operation:",
        choices:[
            "Add Student",
          "Enroll Student in Course",
          "View Student Balance",
          "Pay Student Tuition",
          "Show Student Status",
          "Exit",
        ],

    }])
    
        switch (action) {
            case "Add Student":
              await sms.AddStudent();
              break;
      
            case "Enroll Student in Course":
              await sms.enrollStudentInCourse();
              break;
      
            case "View Student Balance":
              await sms.viewStudentBalance();
              break;
      
            case "Pay Student Tuition":
              await sms.payStudentTutionFee();
              break;
      
            case "Show Student Status":
              await sms.showStudentStatus();
              break;
      
            case "Exit":
              console.log("Exiting Student Management System.");
              process.exit(0);
          }
        } 
    }   
   
    main();

  










