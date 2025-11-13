import type { createPollState } from "../auth/authSchema";
import {z} from "zod";
import { createPollSchema } from "../auth/authSchema";

const handleCreatePollAuth = async (state: createPollState, formData: FormData): Promise<createPollState> => {
  const title = formData.get('title');
  const description = formData.get('description');
  const questionType = formData.get('questionType') as string;
  const startTime = formData.get('startTime');
  const duration = formData.get('duration') as string;

  const validateFields = createPollSchema.safeParse({ 
    title,
    ...(description && { description }),
    questionType,
    startTime,
    duration,
  });

  if (!validateFields.success) {
    const flattened = z.flattenError(validateFields.error);
    console.log('Validation errors:', flattened.fieldErrors);
    return { error: flattened.fieldErrors };
  }

  return { success: true };


 //else {
//   return {
//     error: { title: ['Failed to create poll. Please try again.'],
//       description: ['Failed to create poll. Please try again.'],
//       questionType: ['Failed to create poll. Please try again.'],
//       options: ['Failed to create poll. Please try again.']
//      } 
//   }
// }
//   // Here you can add logic to save the poll to your database using Supabase or any other service.
}

export default handleCreatePollAuth;