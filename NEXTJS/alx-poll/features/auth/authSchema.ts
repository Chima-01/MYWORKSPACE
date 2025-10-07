import { z } from 'zod';
 
const nameSchema = z.string().min(2, { message: 'Name must be at least 2 characters long.'}).trim();

export const SignupFormSchema = z.object({
  lastname: nameSchema,
  firstname: nameSchema,
  email: z.email({ message: "Nice try, but that's not a valid email addrress." }).trim(),
  password: z
    .string()
    .min(8, { message: "Passwords need strength. Yours skipped the gym. (minimum of 8 characters)" })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})
 
export type signUpFormState =
  | {
     errors?: { 
        lastname?: string[];
        firstname?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;