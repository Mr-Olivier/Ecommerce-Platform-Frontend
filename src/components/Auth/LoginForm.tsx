// // src/components/auth/LoginForm.tsx
// import { useState, FormEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import { Mail, Lock } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login, loading } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       await login(email, password);
//       navigate("/");
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//       <div className="rounded-md shadow-sm -space-y-px">
//         <div>
//           <label htmlFor="email" className="sr-only">
//             Email address
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Mail className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
//               placeholder="Email address"
//             />
//           </div>
//         </div>
//         <div>
//           <label htmlFor="password" className="sr-only">
//             Password
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Lock className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
//               placeholder="Password"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center justify-between">
//         <div className="flex items-center">
//           <input
//             id="remember-me"
//             name="remember-me"
//             type="checkbox"
//             className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
//           />
//           <label
//             htmlFor="remember-me"
//             className="ml-2 block text-sm text-gray-900"
//           >
//             Remember me
//           </label>
//         </div>

//         <div className="text-sm">
//           <a
//             href="/forgot-password"
//             className="font-medium text-primary-600 hover:text-primary-500"
//           >
//             Forgot your password?
//           </a>
//         </div>
//       </div>

//       <div>
//         <button
//           type="submit"
//           disabled={loading}
//           className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
//         >
//           {loading ? "Signing in..." : "Sign in"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default LoginForm;
