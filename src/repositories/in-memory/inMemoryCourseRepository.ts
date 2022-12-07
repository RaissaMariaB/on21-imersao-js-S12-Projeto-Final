import { Course } from "../../model/Course";
import {InMemoryInterfaceCourse } from "../inMemoryInterfaceCourse";

export class InMemoryCourseRepository implements InMemoryInterfaceCourse {
    public items: Course[] = [];

    async create(course: Course): Promise<Course> {
        this.items.push(course);
        return course;
    };
};