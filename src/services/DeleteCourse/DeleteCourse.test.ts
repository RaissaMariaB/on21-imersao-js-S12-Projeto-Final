import { describe, expect, test, beforeEach } from '@jest/globals';
import { CreateCourse } from '../CreateCourse/CreateCourse';
import { DeleteCourse } from './DeleteCourse';
import { InMemoryCourseRepository } from "../../repositories/InMemoryCourse/InMemoryCourseRepository";

describe('Delete an existing course', () => {
  const MINUTE_IN_MILLISECONDS = 60 * 1000;
  const courseRepository = new InMemoryCourseRepository();
  const createCourse = new CreateCourse(courseRepository);
  const deleteCourse = new DeleteCourse(courseRepository);

  beforeEach(() => {
    courseRepository.resetData();
  });

  test('Should be able to delete a course by title', async () => {    
    const course = await createCourse.execute('lideranca', 'Curso sobre lideranca', 20, mockStartDate(), mockEndDate(), 'Amanda');
    const courseDeleted = await deleteCourse.execute('lideranca');

    expect(courseDeleted).toBe(course);
  })

  const mockStartDate = (): Date => {
    return new Date(new Date().getTime() + MINUTE_IN_MILLISECONDS);
  }
  
  const mockEndDate = (): Date => {
    return new Date(mockStartDate().getTime() + MINUTE_IN_MILLISECONDS);
  }
});