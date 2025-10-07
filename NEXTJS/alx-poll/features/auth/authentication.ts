"use server";

import { createClient } from '@/utils/supabase/server';
import {signUpFormState, SignupFormSchema } from './authSchema';
import { z } from 'zod';



const handleSignUp = async (state: signUpFormState, formData: FormData) => {
  const validateFields = SignupFormSchema.safeParse({
    lastname: formData.get('lastname'),
    firstname: formData.get('firstname'),
    email: formData.get('email'),
    password: formData.get('password')
  });

  if (!validateFields.success) {
    console.log(validateFields?.data, formData.get('email'));
      const flattened = z.flattenError(validateFields.error);
      return { error: flattened.fieldErrors };
  }
  const { lastname, firstname, email, password } = validateFields.data;
  const supabase = await createClient();
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstname,
            lastname,
          },
        }
      });

      if (error) {
        console.log('Error during sign up:', error);
        return (error.name === 'email_exists' ?
          { error: { email: ['This email is already registered ']} } :
          { message: error?.message } );
      }
      return { success: true }
    } catch (err) {
      console.log(err);
      return { message: 'An unexpected error occurred. Refresh and try again.' };
    }
  };

const handleSocialLogin = async (provider: 'github' | 'google') => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
    redirectTo: `${window.location.origin}/callback`,
    },
  });

    if (error) {
      return { error: error.message };
    }
  };


  export { handleSignUp, handleSocialLogin };