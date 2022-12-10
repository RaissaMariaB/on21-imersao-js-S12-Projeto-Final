import { jest, describe, expect, test, beforeEach } from '@jest/globals';
import { Course } from '../../model/Course';
import { CourseService } from './CourseService';

describe('Create new course', () => {
  const MINUTE_IN_MILLISECONDS = 60 * 1000;
  let courseService: CourseService;

  beforeEach(() => {
    courseService = new CourseService();
  })

  test('Should create a instance of a new course', async () => {    
    const newCourse = await courseService.create('lideranca', 'Curso sobre lideranca', 20, mockStartDate(), mockEndDate(), 'Amanda');

    expect(newCourse).toBeInstanceOf(Course);
    expect(newCourse.title).toBe('lideranca');
  });

  test('Should not be able to create with startDate bigger than endDate', () => {
    const wrongEndDate = new Date('2022-12-05'); 

    expect.assertions(1); // Guarantee that test will fail when the function doesn't throw an error(when the expect doesn't run)
    courseService.create('lideranca', 'Curso sobre lideranca', 20, mockStartDate(), wrongEndDate, 'Amanda')
    .catch((e) => { expect(e.message).toBe('Data de término inválida') });
  })
  
  test('Should not be able to create with start date before now', () => {
    const wrongStartDate = new Date('2022-12-05'); 
    const endDate = new Date('2022-12-07');

    expect.assertions(1)
    courseService.create('lideranca', 'Curso sobre lideranca', 20, wrongStartDate, endDate, 'Amanda')
    .catch((e) => { expect(e.message).toBe('Data de início inválida') })
  })

  test('Should not be able to create a course with less than five spots or more than 20', async () => {
    expect.assertions(1)
    courseService.create('lideranca', 'Curso sobre lideranca', 2, mockStartDate(), mockEndDate(), 'Amanda')
    .catch((e) => { expect(e.message).toBe('O Intervalo quantitativo de vagas precisa ser entre 5 e 20') })
  })

  test('Should be able to delete a course by title', async () => {    
    const course = await courseService.create('lideranca', 'Curso sobre lideranca', 20, mockStartDate(), mockEndDate(), 'Amanda');
    const courseDeleted = await courseService.delete('lideranca');

    expect(courseDeleted).toBe(course);
  })

  test('Should enroll a new student in a course', async () => {
    courseService.create('lideranca', 'Curso sobre lideranca', 20, mockStartDate(), mockEndDate(), 'Amanda');
    const updatedCourse = await courseService.enrollStudent('lideranca', 'Julia');

    expect(updatedCourse.spots).toBe(19);
    expect(updatedCourse.students).toContain('Julia');
    expect(updatedCourse.students.length).toBe(1);
  })

  test('Should not enroll a new student in a course that has already started', async () => {
    jest.useFakeTimers();

    const startDate = new Date();
    courseService.create('lideranca', 'Curso sobre lideranca', 20, startDate, mockEndDate(), 'Amanda');

    jest.advanceTimersByTime(1 * MINUTE_IN_MILLISECONDS);
    
    expect.assertions(1);
    courseService.enrollStudent('lideranca', 'Julia')
      .catch(e => { expect(e.message).toBe('Este curso já iniciou e novos estudantes não podem ser adicionados') });

    jest.useRealTimers();
  })

  test('Should disenroll a student in the course', async () => {
    const newCourse = await courseService.create('lideranca', 'Curso sobre lideranca', 20, mockStartDate(), mockEndDate(), 'Amanda');

    courseService.enrollStudent('lideranca', 'Julia');
    courseService.cancelStudentEnrollment('lideranca', 'Julia');

    expect(newCourse.spots).toBe(20)
    expect(newCourse.students.length).toBe(0)
  })

  test('Should fail to disenroll a student that is not enrolled', async () => {
    await courseService.create('lideranca', 'Curso sobre lideranca', 20, mockStartDate(), mockEndDate(), 'Amanda');

    expect.assertions(1);
    courseService.cancelStudentEnrollment('lideranca', 'Julia')
      .catch(e => { expect(e.message).toBe('Esse estudante não está matriculado') });
  })

  const mockStartDate = (): Date => {
    return new Date(new Date().getTime() + MINUTE_IN_MILLISECONDS);
  }
  
  const mockEndDate = (): Date => {
    return new Date(mockStartDate().getTime() + MINUTE_IN_MILLISECONDS);
  }
});