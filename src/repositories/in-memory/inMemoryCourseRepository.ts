import test from "node:test";
import { Course } from "../../model/Course";
import {InMemoryInterfaceCourse } from "../inMemoryInterfaceCourse";

export class InMemoryCourseRepository implements InMemoryInterfaceCourse {
    public items: Course[] = [];

    async save(course: Course): Promise<Course> {
        this.items.push(course);

        return course;
    };

    async delete(courseTitle: string): Promise<string> {
        const titleToLowerCase = courseTitle.toLocaleLowerCase();        
        const courseByIndex = this.items.findIndex((element: Course) => element.title.toLocaleLowerCase() === titleToLowerCase);    
        console.log(courseByIndex);
        if(courseByIndex === -1) {
            console.log('entrou');
            
            throw new Error( 'Falha ao deletar o curso, tente novamente')
        }
           
        const deletedCourse = this.items.splice(courseByIndex, 1);

        console.log(deletedCourse);   

         return 'Curso deletado com sucesso!'       
    };
};