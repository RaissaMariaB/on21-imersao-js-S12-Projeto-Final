import { Course } from '../../model/Course'

export interface InMemoryCourseRepositoryInterface {
    save(course: Course): Promise<Course>;
    delete(courseTitle: string): Promise<Course>;
    findCourse(courseTitle: string): Promise<Course>;
};