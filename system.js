import inquirer from 'inquirer';
class Student {
    static studentCount = 0;
    name;
    studentId;
    courses;
    balance;
    constructor(name) {
        this.name = name;
        this.balance = 0;
        this.courses = [];
        this.studentId = this.generateStudentId();
        Student.studentCount++;
    }
    generateStudentId() {
        return Math.floor(10000 + Math.random() * 9000).toString();
    }
    enrollStudent(course) {
        this.courses.push(course);
        console.log(`${this.name} is successfuly enrolled in ${this.courses}`);
    }
    viewBalance() {
        console.log(` ${this.name} has balance of $${this.balance}`);
    }
    payTution(amount) {
        this.balance += amount;
        console.log(`Tution fee paid successfully.`);
        this.balance -= 10;
        console.log(`Balance left:${this.balance} `);
    }
    showStatus() {
        console.log(`Student name= ${this.name}`);
        console.log(`Student Id = ${this.studentId}`);
        console.log(`Courses Enrolled = ${this.courses.join(',')}`);
        console.log(`Student name= ${this.name}`);
    }
}
class studentManagementSystem {
    students;
    constructor() {
        this.students = [];
    }
    async AddStudent() {
        const { name } = await inquirer.prompt([
            {
                name: 'name',
                type: "input",
                message: "Enter student name:"
            }
        ]);
        const newStudent = new Student(name);
        this.students.push(newStudent);
        console.log(`${newStudent.name}is added to system with id :${newStudent.studentId} `);
    }
    async enrollStudentInCourse() {
        const { studentID, course } = await inquirer.prompt([
            {
                name: 'studentID',
                message: 'Enter Student Id:'
            },
            {
                name: "course",
                message: 'Enter your Course Title:'
            }
        ]);
        const student = this.findStudentById(studentID);
        if (student) {
            student.enrollStudent(course);
        }
        else {
            console.log(`Student not found.Invalid Id`);
        }
    }
    async viewStudentBalance() {
        const { studentID } = await inquirer.prompt([
            {
                name: 'studentID',
                message: 'Enter Student Id:'
            }
        ]);
        const student = this.findStudentById(studentID);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log(`Student not found.Invalid Id`);
        }
    }
    async payStudentTutionFee() {
        const { studentID, amount } = await inquirer.prompt([
            {
                name: 'studentID',
                message: 'Enter Student Id:'
            },
            {
                name: 'amount',
                message: 'Enter your fee amount',
            }
        ]);
        const student = this.findStudentById(studentID);
        if (student) {
            student.payTution(amount);
        }
        else {
            console.log(`Student not found.Invalid Id`);
        }
    }
    async showStudentStatus() {
        const { studentID } = await inquirer.prompt([
            {
                name: 'studentID',
                message: 'Enter Student Id:'
            }
        ]);
        const student = this.findStudentById(studentID);
        if (student) {
            student.showStatus();
        }
        else {
            console.log(`Student not found.Invalid Id`);
        }
    }
    findStudentById(studentId) {
        return this.students.find((student) => student.studentId === studentId);
    }
}
async function main() {
    const sms = new studentManagementSystem();
    while (true) {
        const { action } = await inquirer.prompt([{
                name: 'action',
                type: 'list',
                message: "Select any operation:",
                choices: [
                    "Add Student",
                    "Enroll Student in Course",
                    "View Student Balance",
                    "Pay Student Tuition",
                    "Show Student Status",
                    "Exit",
                ],
            }]);
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
