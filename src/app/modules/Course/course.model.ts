import { model, Schema } from 'mongoose';
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);
const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    unique: true,
    trim: true,
  },
  prefix: {
    type: String,
    required: [true, 'Prefix is required'],
    trim: true,
  },
  code: {
    type: Number,
    required: [true, 'Code is required'],
    trim: true,
  },
  credits: {
    type: Number,
    required: [true, 'Code is required'],
    trim: true,
  },
  preRequisiteCourses: {
    type: [preRequisiteCoursesSchema],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
export const Course = model<TCourse>('Course', courseSchema);
const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});
export const CourseFaculty = model<TCourseFaculty>(
  'CourseFaculty',
  courseFacultySchema,
);

