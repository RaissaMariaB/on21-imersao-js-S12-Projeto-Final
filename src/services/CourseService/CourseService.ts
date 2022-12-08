import { Course } from "../../model/Course"
import { InMemoryCourseRepository } from "../../repositories/in-memory/inMemoryCourseRepository";

export class CourseService {

    repository = new InMemoryCourseRepository();

    async create(title: string,
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
        // .then( (response) => {
        //     // console.log(`Curso salvo com Sucesso `);
        //     return response;
        //   })
        //   .catch( (error) => {
        //     // console.log(error);
        //     throw error;       
        //   });

        return createCourseResponse;
    };


    async delete(title: string) {
        const deleteCourseResponse = this.repository.delete(title)
        // .then( (response) => {

            // return response;            
          // })
          // .catch( (error) => {

          //   return error;       
          // });

        return deleteCourseResponse
    };
};