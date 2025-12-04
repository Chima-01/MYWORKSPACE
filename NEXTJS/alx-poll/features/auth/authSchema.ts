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

const pollOptionSchema = z.object({
  optionText: z.string().min(1, { error: 'Option text cannot be empty.' }).trim(),
  isChecked: z.boolean()
}).superRefine((val, ctx) => {
  if(val.optionText.length > 0 && !val.isChecked) {
    ctx.addIssue({
      code: 'custom',
      message: 'Please confirm this option before proceeding.',
      path: ['isChecked']
    })
  }
})

const minimumStartTime = new Date(Date.now() - 1000);

const checkTime = z.coerce.date()
  .refine((date) => !isNaN(date.getTime()), 'Invalid date format')
  .refine((date) => date >= minimumStartTime, 'Start time cannot be backdated. Please select a future time.');

export const createPollSchema = z.object({
  title: z.string().min(5, { error: 'Title must be at least 5 characters long.' }).trim(),
  description: z.string().min(10, { error: 'Description must be at least 10 characters long.' }).trim().optional(),
  questionType: z.enum(['single', 'multiple', 'rating', 'slide', 'open'], { error: 'Select Question Type' }),
  options: z.array(pollOptionSchema).min(2, { error: 'At least two options are required.' } ).optional(),
  min: z.number("Min must be a number, This is a backend error, Kindly report to developer").positive().optional(),
  max: z.number("Max must be a number, This is a backend error, Kindly report to developer").positive().optional(),
  openCharLimit: z.number("Open end char must be a number, This is a backend error, Kindly report to developer").positive().optional(),
  startTime: checkTime,
  duration: z.enum([ '1m', '5m', '10m', '30m', '1h', '6h', '12h', '1d' ], { error: 'Duration is required' } ),
  // anonymous: z.boolean().optional(),
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



export type optionsType = {
  optionText: string;
  isChecked: boolean;
  error?: string;
}

export type PollFormInputs = { 
  title: string;
  description?: string;
  questionType: string | undefined;
  options?: optionsType[] | undefined;
  min?: number;
  max?: number;
  openCharLimit?: number;
  startTime: string;
  duration: string | undefined;
  anonymous?: boolean;
};

  export type createPollState =
  | {
      error?: {
        title?: string[];
        description?: string[];
        questionType?: string[];
        options?: string[];
        min?: string[];
        max?: string[];
        openCharLimit?: string[];
        startTime?: string[];
        duration?: string[];
      };
      success?: boolean;
  } | undefined;

