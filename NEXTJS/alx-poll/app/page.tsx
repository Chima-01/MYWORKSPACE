// d
export default function HomePage() {
  // const { user } = useUser();
  // const router = useRouter();
  // const supabase = createClient();
  // const [successMessage, setSuccessMessage] = useState('');

  // const handleLogout = async () => {
  //   try {
  //     const { error } = await supabase.auth.signOut();
  //     if (error) throw error;
  //     router.push('/login');
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //   }
  // };

  // const handleCreatePoll = async () => {
  //   // Logic for creating a new poll.
  //   // For this example, we'll just show a success message.
  //   setSuccessMessage('Poll created successfully!');
  //   setTimeout(() => setSuccessMessage(''), 3000);
  // };

    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
            Create Engaging Polls
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Get instant feedback on your ideas with our simple and beautiful polling app.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center justify-center">
            <a href="/register" className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
              Get Started
            </a>
            <a href="/login" className="w-full sm:w-auto px-6 py-3 bg-white text-blue-600 border border-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-50 transition-colors duration-300">
              Log In
            </a>
          </div>
        </div>
      </main>
    );

  // Dashboard view for logged-in users.
  // return (
  //   <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center p-6">
  //     <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-8 transform transition-transform duration-300 hover:scale-[1.02] text-center">
  //       <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
  //         Hello, {user?.email}!
  //       </h1>
  //       <p className="text-gray-600 mb-6">
  //         You are successfully logged in.
  //       </p>

  //       {successMessage && (
  //         <div className="flex items-center justify-center space-x-2 text-green-600 mb-6 transition-opacity duration-500 ease-in-out opacity-100">
  //           <BsCheckCircleFill className="w-6 h-6" />
  //           <p className="font-medium">{successMessage}</p>
  //         </div>
  //       )}

  //       <div className="space-y-4">
  //         <button
  //           onClick={handleCreatePoll}
  //           className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
  //         >
  //           Create a New Poll
  //         </button>
  //         <button
  //           onClick={handleLogout}
  //           className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
  //         >
  //           Log Out
  //         </button>
  //       </div>
  //     </div>
  //   </main>
  // );
}
