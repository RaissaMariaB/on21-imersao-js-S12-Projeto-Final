import { Course } from "../../model/Course";
import {InMemoryCourseRepositoryInterface } from "./InMemoryCourseRepositoryInterface";

export class InMemoryCourseRepository implements InMemoryCourseRepositoryInterface {
    public items: Course[] = [];

    async save(course: Course): Promise<Course> {
        this.items.push(course);

        return course;
    };

    async update(course: Course): Promise<Course> {
        const courseToRemove = this.findCourse(course.title);
        this.delete((await courseToRemove).title);
        this.items.push(course);

        return course;
    };

    async findCourse(courseTitle: string): Promise<Course> {
        const titleToLowerCase = courseTitle.toLocaleLowerCase();        
        const course = this.items.find((element: Course) => element.title.toLocaleLowerCase() === titleToLowerCase);
        
        if (course === undefined) {
            throw new Error(`Curso ${courseTitle} não encontrado`)
        };

        return course;
    };

    async delete(courseTitle: string): Promise<Course> {
        const titleToLowerCase = courseTitle.toLocaleLowerCase();        
        const courseByIndex = this.items.findIndex((element: Course) => element.title.toLocaleLowerCase() === titleToLowerCase);
        
        if (courseByIndex === -1) {
            throw new Error(`Falha ao deletar o curso ${courseTitle}, tente novamente`)
        }; 

        const deletedCourse = this.items.splice(courseByIndex, 1);

        return deletedCourse[0];
    };

    resetData() {
        this.items = [];
    };
};