import { jest, describe, expect, test, beforeEach } from '@jest/globals';
import { CreateCourse } from '../CreateCourse/CreateCourse';
import { EnrollStudent } from './EnrollStudent';
import { InMemoryCourseRepository } from "../../repositories/InMemoryCourse/InMemoryCourseRepository";

describe('Enroll student in a course', () => {
  const MINUTE_IN_MILLISECONDS = 60 * 1000;
  const courseRepository = new InMemoryCourseRepository();
  const createCourse = new CreateCourse(courseRepository);
  const enrollStudent = new EnrollStudent(courseRepository);

  beforeEach(() => {
    courseRepository.resetData();
  });

  test('Should enroll a new student in a course', async () => {
    createCourse.execute('lideranca', 'Curso sobre lideranca', 20, mockStartDate(), mockEndDate(), 'Amanda');
    const updatedCourse = await enrollStudent.execute('lideranca', 'Julia');

    expect(updatedCourse.spots).toBe(19);
    expect(updatedCourse.students).toContain('Julia');
    expect(updatedCourse.students.length).toBe(1);
  })

  test('Should not enroll a new student in a course that has already started', async () => {
    jest.useFakeTimers();

    const startDate = new Date();
    createCourse.execute('lideranca', 'Curso sobre lideranca', 20, startDate, mockEndDate(), 'Amanda');

    jest.advanceTimersByTime(1 * MINUTE_IN_MILLISECONDS);
    
    expect.assertions(1);
    enrollStudent.execute('lideranca', 'Julia')
      .catch(e => { expect(e.message).toBe('Este curso já iniciou e novos estudantes não podem ser adicionados') });

    jest.useRealTimers();
  })

  const mockStartDate = (): Date => {
    return new Date(new Date().getTime() + MINUTE_IN_MILLISECONDS);
  }
  
  const mockEndDate = (): Date => {
    return new Date(mockStartDate().getTime() + MINUTE_IN_MILLISECONDS);
  }
});