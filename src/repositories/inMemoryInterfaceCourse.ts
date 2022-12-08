import { Course } from '../model/Course'

export interface InMemoryInterfaceCourse {
    save(course: Course): Promise<Course>;
    delete(courseTitle: string): Promise<string>;
};