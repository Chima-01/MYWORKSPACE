export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <svg
          className="mx-auto mb-4 h-16 w-16 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4"
          />
        </svg>
        <h1 className="text-2xl font-bold mb-2 text-gray-800">
          Sign up successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Please check your email to confirm your account.
        </p>
         <p className="text-sm text-gray-500">
          Didn&apos;t receive? Check your spam folder or try again later.
         </p>
      </div>
    </div>
  );
}