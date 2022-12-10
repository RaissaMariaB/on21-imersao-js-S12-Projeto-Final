import { Student } from "../../model/Student";
import { InMemoryStudentRepository} from '../../repositories/InMemoryStudents/InMemoryStudentRepository'

export class StudentService {
    repository = new InMemoryStudentRepository()

    create(name:string, cpf: string, email: string) {

        if(name === '' || cpf === '' || email === '') {
            throw new Error('Valor obrigatório');
        };       

        const student = new Student(name, cpf, email);
        const createStudentResponse = this.repository.save(student)

        return createStudentResponse;
    };

    delete() {
        
    }
};