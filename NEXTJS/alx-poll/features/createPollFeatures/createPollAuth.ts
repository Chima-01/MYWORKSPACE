import type { createPollState } from "../auth/authSchema";
import {z} from "zod";
import { createPollSchema } from "../auth/authSchema";


const handleCreatePollAuth = async (state: createPollState, formData: FormData) => {
   const raw = {
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    questionType: formData.get("questionType"),
    options: formData.get("options") as string,
    min: formData.get("min") || 1,
    max: formData.get("max") || 5,
    openCharLimit: Number(formData.get("openCharLimit")) || 200,
    startTime: formData.get("startTime"),
    duration: formData.get("duration")
  };

  const optionsJson = raw.options ? JSON.parse(raw.options) : [];
  console.log('Form Data:', raw.duration, raw.questionType, raw.options, raw.duration, raw.title);
  

  const validateFields = createPollSchema.safeParse({...raw, options: optionsJson });

  if (!validateFields.success) {
    const flattened = z.flattenError(validateFields.error);
    console.log('Validation errors:', flattened.fieldErrors);
    return { error: flattened.fieldErrors };
  }

  //   if (questionType === 'single' || questionType === 'multiple') {
  //     const optionsArray = optionsJson ? JSON.parse(optionsJson as string) : [];  
  //     console.log('options', optionsArray);
  //     if (optionsArray.length < 2) { 
  //       return { 
  //         error: {
  //           options: ['At least two options are required for the selected question type.']
  //         }
  //       }
  //   }      
  // }

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