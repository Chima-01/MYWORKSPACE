
// import { createClient } from '@/utils/supabase/server';


// const handleSignUp = async (email, password, last_name, first_name) => {
//   const supabase = await createClient();
//     try {
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           data: {
//             first_name: 'John',
//             last_name: 'Doe',
//       },
//       });

//       if (error) {
//         setError(error.message);
//       } else {
//         router.push('/dashboard');
//       }
//     } catch (err) {
//       setError('An unexpected error occurred.');
//     }
//   };