import {describe, expect, test} from '@jest/globals';
import { Course } from '../../model/Course';
import { CourseService } from './CourseService';

describe('Create new course', () => {
  const courseService = new CourseService();

  test('Should create a instance of a new course', async () => {
    // const startDate = new Date('2022-12-06');
    // const endDate =  new Date('2022-12-07');
    const date = new Date();
    const startDate =  new Date(date.valueOf() + 1);
    const endDate =  new Date(startDate.valueOf() + 1);
    const newCourse = courseService.create('lideranca', 'Curso sobre lideranca', 20, startDate, endDate, 'Amanda');

    expect(await newCourse).toBeInstanceOf(Course);
    expect((await newCourse).title).toBe('lideranca');
  });

  test('Should not be able to create with startDate bigger than endDate', () => {
    const startDate = new Date();
    const wrongEndDate = new Date('2022-12-05'); 

    expect.assertions(1); // Guarantee that test will fail when the function doesn't throw an error(when the expect doesn't run)
    courseService.create('lideranca', 'Curso sobre lideranca', 20, startDate, wrongEndDate, 'Amanda')
    .catch((e) => { expect(e.message).toBe('Data de término inválida') });
  })
  
  test('Should not be able to create with start date before now', () => {
    const wrongStartDate = new Date('2022-12-05'); 
    const endDate =  new Date('2022-12-07');

    expect.assertions(1)
    courseService.create('lideranca', 'Curso sobre lideranca', 20, wrongStartDate, endDate, 'Amanda')
    .catch((e) => { expect(e.message).toBe('Data de início inválida') })
  })

  test('Should not be able to create a course with less than five spots or more than 20', async () => {
    const date = new Date();
    const startDate =  new Date(date.valueOf() + 1);
    const endDate =  new Date(startDate.valueOf() + 1);

    expect.assertions(1)
    courseService.create('lideranca', 'Curso sobre lideranca', 2, startDate, endDate, 'Amanda')
    .catch((e) => { expect(e.message).toBe('O Intervalo quantitativo de vagas precisa ser entre 5 e 20') })
  })

  test('Should be able to delete a course by title', async () => {
    const date = new Date();
    const startDate =  new Date(date.valueOf() + 1);
    const endDate =  new Date(startDate.valueOf() + 1);
    // courseService.create('lideranca', 'Curso sobre lideranca', 20, startDate, endDate, 'Amanda');
    // const courseDeleted = courseService.delete('lideranca');


    expect.assertions(1)
    courseService.delete('lideranca')
    .catch((e) => { expect(e.message).toBe('O Intervalo quantitativo de vagas precisa ser entre 5 e 20') })
    // expect(await courseDeleted ).('Curso deletado com sucesso!');
  })
});