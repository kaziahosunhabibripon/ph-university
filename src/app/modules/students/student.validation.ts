import { z } from 'zod';

// Define Zod schema for user name
const createUserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(25),
  middleName: z.string().min(3).max(25),
  lastName: z.string().min(3).max(25),
});

// Define Zod schema for guardian
const createGuardianValidationSchema = z.object({
  fatherName: z.string().min(3),
  motherName: z.string().min(3),
  fatherContactNo: z.string().min(3),
  fatherOccupation: z.string().min(3),
  motherContactNo: z.string().min(3),
  motherOccupation: z.string().min(3),
});

// Define Zod schema for local guardian
const createLocalGuardianValidationSchema = z.object({
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
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string().min(3),
      emergencyContactNo: z.string().min(3),
      bloodGroup: z.enum(['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-']),
      presentAddress: z.string().min(3),
      permanentAddress: z.string().min(3),
      guardian: createGuardianValidationSchema,
      admissionSemester: z.string(),
      localGuardian: createLocalGuardianValidationSchema,
      profilePic: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});
// Define Zod schema for user name
const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(25).optional(),
  middleName: z.string().min(3).max(25).optional(),
  lastName: z.string().min(3).max(25).optional(),
});

// Define Zod schema for guardian
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().min(3).optional(),
  motherName: z.string().min(3).optional(),
  fatherContactNo: z.string().min(3).optional(),
  fatherOccupation: z.string().min(3).optional(),
  motherContactNo: z.string().min(3).optional(),
  motherOccupation: z.string().min(3).optional(),
});

// Define Zod schema for local guardian
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().min(3).optional(),
  contactNo: z.string().min(3).optional(),
  occupation: z.string().min(3).optional(),
  address: z.string().min(3).optional(),
});

// Define Zod schema for student
export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().min(3).optional(),
      emergencyContactNo: z.string().min(3).optional(),
      bloodGroup: z.enum(['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-']).optional(),
      presentAddress: z.string().min(3).optional(),
      permanentAddress: z.string().min(3).optional(),
      guardian: updateGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      profilePic: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
