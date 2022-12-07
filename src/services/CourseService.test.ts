import {describe, expect, test} from '@jest/globals';
import { Course } from '../model/Course';
import { CourseService } from './CourseService';

describe('Create new course', () => {
  const courseService = new CourseService();

  test('Should create a instance of a new course', () => {
    const newCourse = courseService.create('lideranca', 'Curso sobre lideranca', 30, new Date(), new Date(), 'Amanda');

    expect(newCourse).toBeInstanceOf(Course);
    expect(newCourse.title).toBe('lideranca');
    console.log(newCourse);    
  });
});