import { Course } from "../model/Course"

export class CourseService {

    create(title: string,
        description: string,
        spots: number,
        startsAt: Date,
        endsAt: Date, 
        teacher: string): Course {

        return new Course(title,
            description,
            spots,
            startsAt,
            endsAt, 
            teacher);
    }

}