import { Course } from "../../model/Course"
import { InMemoryCourseRepositoryInterface } from "../../repositories/InMemoryCourse/InMemoryCourseRepositoryInterface";

export class DeleteCourse {
    private repository: InMemoryCourseRepositoryInterface;

    constructor(repository: InMemoryCourseRepositoryInterface) {
        this.repository = repository;
    }

    async execute(title: string): Promise<Course> {
        const deleteCourseResponse = this.repository.delete(title)

        return deleteCourseResponse
    };
};