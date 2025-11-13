import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function Logout() { 
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log('Error during sign out:', error);
        return;
      }
      router.refresh();
      router.push('/login');
    } catch (error) { 
      console.log('Logout error:', error);
    }
 }
}