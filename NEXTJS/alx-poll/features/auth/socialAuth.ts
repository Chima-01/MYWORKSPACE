
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';


const handleSocialLogin = async (provider: 'github' | 'google') => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
      redirectTo: `${window.location.origin}/callback`,
      },
    });

      if (error) {
        console.log('Error during social login:', error?.message);
        redirect('/error?error=OAuth+login+failed.+Please+try+again.');
      }

  } catch (err) {
    console.log(err);
    return { error: 'An unexpected error occurred. Refresh and try again.' }
  }
  };

  export { handleSocialLogin };