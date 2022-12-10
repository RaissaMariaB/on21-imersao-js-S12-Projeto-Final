import { Student } from "../../model/Student";
import { InMemoryStudentRepositoryInterface } from "./InMemoryStudentRepositoryInterface";

export class InMemoryStudentRepository implements InMemoryStudentRepositoryInterface {
    public items: Student[] = [];

    async save(course: Student): Promise<Student> {
        this.items.push(course);

        return course;
    };

    async update(student: Student): Promise<Student> {
        const courseToRemove = this.findStudent(student.name);
        this.delete((await courseToRemove).name);
        this.items.push(student);

        return student;
    };

    async findStudent(studentName: string): Promise<Student> {
        const titleToLowerCase = studentName.toLocaleLowerCase();        
        const student = this.items.find((element: Student) => element.name.toLocaleLowerCase() === titleToLowerCase);
        
        if (student === undefined) {
            throw new Error(`Estudante ${studentName} não encontrado`)
        };

        return student;
    };

    async delete(studentName: string): Promise<Student> {
        const nameToLowerCase = studentName.toLocaleLowerCase();        
        const courseByIndex = this.items.findIndex((element: Student) => element.name.toLocaleLowerCase() === nameToLowerCase);
        
        if (courseByIndex === -1) {
            throw new Error(`Falha ao deletar o curso ${studentName}, tente novamente`)
        }; 

        const deletedStudent = this.items.splice(courseByIndex, 1);

        return deletedStudent[0];
    };

    resetData() {
        this.items = [];
    };
};