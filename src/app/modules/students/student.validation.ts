import { z } from 'zod';

// Define Zod schema for user name
const userNameValidationSchema = z.object({
  firstName: z.string().min(3).max(25),
  middleName: z.string().min(3).max(25),
  lastName: z.string().min(3).max(25),
});

// Define Zod schema for guardian
const guardianValidationSchema = z.object({
  fatherName: z.string().min(3),
  motherName: z.string().min(3),
  fatherContactNo: z.string().min(3),
  fatherOccupation: z.string().min(3),
  motherContactNo: z.string().min(3),
  motherOccupation: z.string().min(3),
});

// Define Zod schema for local guardian
const localGuardianValidationSchema = z.object({
  name: z.string().min(3),
  contactNo: z.string().min(3),
  occupation: z.string().min(3),
  address: z.string().min(3),
});

// Define Zod schema for student
export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.date().optional(),
      email: z.string().email(),
      contactNo: z.string().min(3),
      emergencyContactNo: z.string().min(3),
      bloodGroup: z.enum(['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-']),
      presentAddress: z.string().min(3),
      permanentAddress: z.string().min(3),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profilePic: z.string(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
