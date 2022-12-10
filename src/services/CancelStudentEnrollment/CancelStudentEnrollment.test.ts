import { describe, expect, test, beforeEach } from '@jest/globals';
import { CreateCourse } from '../CreateCourse/CreateCourse';
import { EnrollStudent } from '../EnrollStudent/EnrollStudent';
import { CancelStudentEnrollment } from './CancelStudentEnrollment';
import { InMemoryCourseRepository } from "../../repositories/InMemoryCourse/InMemoryCourseRepository";

describe('Cancel student course enrollment', () => {
    const MINUTE_IN_MILLISECONDS = 60 * 1000;
    const courseRepository = new InMemoryCourseRepository();
    const createCourse = new CreateCourse(courseRepository);
    const enrollStudent = new EnrollStudent(courseRepository);
    const cancelStudentEnrollment = new CancelStudentEnrollment(courseRepository);
  
    beforeEach(() => {
      courseRepository.resetData();
    });
  
    test('Should disenroll a student in the course', async () => {
        const newCourse = await createCourse.execute('lideranca', 'Curso sobre lideranca', 20, mockStartDate(), mockEndDate(), 'Amanda');
    
        enrollStudent.execute('lideranca', 'Julia');
        cancelStudentEnrollment.execute('lideranca', 'Julia');
    
        expect(newCourse.spots).toBe(20)
        expect(newCourse.students.length).toBe(0)
      })
    
      test('Should fail to disenroll a student that is not enrolled', async () => {
        await createCourse.execute('lideranca', 'Curso sobre lideranca', 20, mockStartDate(), mockEndDate(), 'Amanda');
    
        expect.assertions(1);
        cancelStudentEnrollment.execute('lideranca', 'Julia')
          .catch(e => { expect(e.message).toBe('Esse estudante não está matriculado') });
      })
  
    const mockStartDate = (): Date => {
      return new Date(new Date().getTime() + MINUTE_IN_MILLISECONDS);
    }
    
    const mockEndDate = (): Date => {
      return new Date(mockStartDate().getTime() + MINUTE_IN_MILLISECONDS);
    }
  });