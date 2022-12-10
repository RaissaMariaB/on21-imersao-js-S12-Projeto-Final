import { Student } from "../../model/Student";
import { InMemoryStudentRepositoryInterface } from "../../repositories/InMemoryStudents/InMemoryStudentRepositoryInterface";

export class CreateStudent {
    private repository: InMemoryStudentRepositoryInterface;

    constructor(repository: InMemoryStudentRepositoryInterface) {
        this.repository = repository;
    }

    async execute(name:string, cpf: string, email: string): Promise<Student> {
        if (name === '' || cpf === '' || email === '') {
            throw new Error('Valor obrigatório');
        };       

        const student = new Student(name, cpf, email);
        const createStudentResponse = this.repository.save(student)

        return createStudentResponse;
    }
}