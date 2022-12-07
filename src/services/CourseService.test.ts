import {describe, expect, test} from '@jest/globals';
import { Course } from '../model/Course';
import { CourseService } from './CourseService';

describe('Create new course', () => {
  const courseService = new CourseService();

  test('Should create a instance of a new course', async () => {
    const newCourse = courseService.create('lideranca', 'Curso sobre lideranca', 30, new Date(), new Date(), 'Amanda');

    expect(await newCourse).toBeInstanceOf(Course);
    expect((await newCourse).title).toBe('lideranca');
    console.log(newCourse);    
  });

  // test('Shold not be able to create with startDate bigger than endDate',() => {
  //   expect(newCouse).
  // })
});