import { describe, expect, test, beforeEach } from '@jest/globals';
import { Course } from '../../model/Course';
import { CreateCourse } from './CreateCourse';
import { InMemoryCourseRepository } from "../../repositories/InMemoryCourse/InMemoryCourseRepository";

describe('Create new course', () => {
  const MINUTE_IN_MILLISECONDS = 60 * 1000;
  const courseRepository = new InMemoryCourseRepository();
  const createCourse = new CreateCourse(courseRepository);

  beforeEach(() => {
    courseRepository.resetData();
  });

  test('Should create a instance of a new course', async () => {    
    const newCourse = await createCourse.execute('lideranca', 'Curso sobre lideranca', 20, mockStartDate(), mockEndDate(), 'Amanda');

    expect(newCourse).toBeInstanceOf(Course);
    expect(newCourse.title).toBe('lideranca');
  });

  test('Should not be able to create with startDate bigger than endDate', () => {
    const wrongEndDate = new Date('2022-12-05'); 

    expect.assertions(1); // Guarantee that test will fail when the function doesn't throw an error(when the expect doesn't run)
    createCourse.execute('lideranca', 'Curso sobre lideranca', 20, mockStartDate(), wrongEndDate, 'Amanda')
    .catch((e) => { expect(e.message).toBe('Data de término inválida') });
  })
  
  test('Should not be able to create with start date before now', () => {
    const wrongStartDate = new Date('2022-12-05'); 
    const endDate = new Date('2022-12-07');

    expect.assertions(1)
    createCourse.execute('lideranca', 'Curso sobre lideranca', 20, wrongStartDate, endDate, 'Amanda')
    .catch((e) => { expect(e.message).toBe('Data de início inválida') })
  })

  test('Should not be able to create a course with less than five spots or more than 20', async () => {
    expect.assertions(1)
    createCourse.execute('lideranca', 'Curso sobre lideranca', 2, mockStartDate(), mockEndDate(), 'Amanda')
    .catch((e) => { expect(e.message).toBe('O Intervalo quantitativo de vagas precisa ser entre 5 e 20') })
  })

  const mockStartDate = (): Date => {
    return new Date(new Date().getTime() + MINUTE_IN_MILLISECONDS);
  }
  
  const mockEndDate = (): Date => {
    return new Date(mockStartDate().getTime() + MINUTE_IN_MILLISECONDS);
  }
});