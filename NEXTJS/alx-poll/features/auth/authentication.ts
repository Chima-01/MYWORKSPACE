"use server";

import { createClient } from '@/utils/supabase/server';
import {signUpFormState, SignupFormSchema } from './authSchema';
import { z } from 'zod';
import { redirect } from 'next/navigation';


export const handleSignUp = async (state: signUpFormState, formData: FormData) => {
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

export const handleLogin = async (state: signUpFormState, formData: FormData) => {
  const validateFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  });

  if (!validateFields.success) {
    console.log(validateFields?.data, formData.get('email'));
    const flattened = z.flattenError(validateFields.error);
    return { error: flattened.fieldErrors };
  }

  const { email, password } = validateFields.data;
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return (error.name === 'email_not_confirmed' ? { message: 'This Email has not been verified!' }: {message: error?.message})
    }
  
    redirect('/dashboard');
    } catch (err) {
      console.log(err);
      return { message: 'An unexpected error occurred. Refresh and try again.' }
    }
}

export const handleSignout = async () => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    redirect('/login');
  } catch (error) {
    console.error('Logout error:', error);
  }
}

export const handlePasswordReset = async (state: signUpFormState, formData: FormData) => {
  const validateFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
  });
  if (!validateFields.success) {
    console.log(validateFields?.data, formData.get('email'));
      const flattened = z.flattenError(validateFields.error);
      return { error: flattened.fieldErrors };
  }
  const { email } = validateFields.data;
  const supabase = await createClient();
    try { 
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
      });
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
}

export const getUser = async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

