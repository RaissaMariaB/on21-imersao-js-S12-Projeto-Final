import { Course } from "../../model/Course"
import { InMemoryCourseRepositoryInterface } from "../../repositories/InMemoryCourse/InMemoryCourseRepositoryInterface";

export class CreateCourse {
    private repository: InMemoryCourseRepositoryInterface;

    constructor(repository: InMemoryCourseRepositoryInterface) {
        this.repository = repository;
    }

    async execute(title: string,
        description: string,
        spots: number,
        startsAt: Date,
        endsAt: Date, 
        teacher: string): Promise<Course> {
          
          if (endsAt <= startsAt) {
            throw new Error("Data de término inválida");              
          }
          
          if (startsAt < new Date()) {
            throw new Error("Data de início inválida");              
          }
          
          if (spots < 5 || spots > 20  ) {
            throw new Error("O Intervalo quantitativo de vagas precisa ser entre 5 e 20");  
          }
          
          const course = new Course(title,
              description,
              spots,
              startsAt,
              endsAt, 
              teacher);

          const createCourseResponse = this.repository.save(course)

          return createCourseResponse;
    };
};