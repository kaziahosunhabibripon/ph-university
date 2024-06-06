import { z } from 'zod';
import { BloodGroup, Gender } from './faculty.constant';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(3)
    .max(25)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string().min(3).max(25),
  lastName: z.string().min(3).max(25),
});

export const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    faculty: z.object({
      designation: z.string(),
      name: createUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
      presentAddress: z.string().min(3),
      permanentAddress: z.string().min(3),
      academicDepartment: z.string(),
      academicYear: z.string(),
      profileImg: z.string(),
    }),
  }),
});
const updateUserNameValidationSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});
export const updateFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      designation: z.string().optional(),
      name: updateUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      academicDepartment: z.string().optional(),
      academicYear: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});
export const facultyValidations = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};