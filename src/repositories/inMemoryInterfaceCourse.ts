import { Course } from '../model/Course'

export interface InMemoryInterfaceCourse {
    create(course: Course): Promise<Course>;
};