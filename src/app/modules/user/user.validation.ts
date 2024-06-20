import { z } from 'zod';
import { USER_STATUS } from './user.constants';

const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password must be less than 20 characters' })
    .optional(),
});
const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...USER_STATUS] as [string, ...string[]]),
  }),
});
export const UserValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
};
