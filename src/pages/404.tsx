// src/pages/404.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(30);
  const [isCountdownActive, setIsCountdownActive] = useState(true);

  // Auto-redirect countdown
  useEffect(() => {
    if (!isCountdownActive) return;

    if (countdown <= 0) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate, isCountdownActive]);

  // Stop countdown if user interacts with page
  const stopCountdown = () => {
    setIsCountdownActive(false);
  };

  // Particle effect config
  const particleCount = 40;
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFBE0B", "#FB5607"];

  // Generate random particles
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5,
    color: colors[Math.floor(Math.random() * colors.length)],
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <>
      <Helmet>
        <title>Page Not Found | Your Store Name</title>
        <meta
          name="description"
          content="The page you are looking for does not exist"
        />
      </Helmet>

      {/* Background Gradient Animation */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-blue-900 opacity-10"></div>

      {/* Floating Particles */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full opacity-20"
            style={{
              backgroundColor: particle.color,
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div
        className="min-h-screen w-full flex items-center justify-center px-4 py-12 relative z-10 overflow-hidden"
        onClick={stopCountdown}
        onKeyDown={stopCountdown}
        role="region"
        aria-label="404 Not Found Page"
      >
        <motion.div
          className="max-w-4xl w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 404 with Animation */}
          <div className="relative mb-16 px-4">
            <motion.div
              className="relative z-0"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.2,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 rounded-full filter blur-3xl"></div>

              <svg className="w-full h-64 md:h-80" viewBox="0 0 200 100">
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                  <mask id="mask" x="0" y="0" width="100%" height="100%">
                    <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
                    <text
                      x="50%"
                      y="50%"
                      fontFamily="sans-serif"
                      fontSize="60"
                      fontWeight="bold"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                    >
                      404
                    </text>
                  </mask>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  mask="url(#mask)"
                  fill="url(#gradient)"
                />
                <text
                  x="50%"
                  y="50%"
                  fontFamily="sans-serif"
                  fontSize="60"
                  fontWeight="bold"
                  fill="none"
                  stroke="#0F172A"
                  strokeWidth="0.5"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  404
                </text>
              </svg>
            </motion.div>

            <motion.div
              className="mt-4 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block">Page Not Found</span>
              </h1>
              <motion.div
                className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              />
            </motion.div>
          </div>

          {/* Message and Options */}
          <motion.div
            className="space-y-8 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We've searched everywhere, but the page you're looking for seems
              to have gone on an adventure without leaving a map.
            </p>

            <motion.div
              className="grid gap-8 md:grid-cols-2 max-w-2xl mx-auto"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {/* Left Panel - Suggestions */}
              <motion.div
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-100"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 },
                }}
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  What might have happened?
                </h2>
                <ul className="space-y-3 text-gray-600">
                  <motion.li
                    className="flex items-start"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
                    <svg
                      className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>The URL might have been mistyped</span>
                  </motion.li>
                  <motion.li
                    className="flex items-start"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
                    <svg
                      className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>The page may have been moved or deleted</span>
                  </motion.li>
                  <motion.li
                    className="flex items-start"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
                    <svg
                      className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>You might have followed an outdated link</span>
                  </motion.li>
                </ul>
              </motion.div>

              {/* Right Panel - Action Buttons */}
              <motion.div
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-100"
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  show: { opacity: 1, x: 0 },
                }}
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Where to go from here?
                </h2>
                <div className="space-y-3">
                  <Link to="/">
                    <motion.button
                      className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg flex items-center justify-center group hover:shadow-lg transition-all duration-300"
                      whileHover={{
                        scale: 1.02,
                        boxShadow:
                          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      <span>Return Home</span>
                      <motion.span
                        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                      >
                        →
                      </motion.span>
                    </motion.button>
                  </Link>

                  <Link to="/products">
                    <motion.button
                      className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg flex items-center justify-center group hover:bg-gray-50 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg
                        className="w-5 h-5 mr-2 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      <span>Browse Products</span>
                    </motion.button>
                  </Link>

                  <Link to="/contact">
                    <motion.button
                      className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg flex items-center justify-center group hover:bg-gray-50 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg
                        className="w-5 h-5 mr-2 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span>Contact Support</span>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* Auto-redirect notice */}
            {isCountdownActive && (
              <motion.div
                className="mt-8 text-center text-gray-500 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p>
                  Redirecting to home page in{" "}
                  <span className="font-medium text-blue-600">{countdown}</span>{" "}
                  seconds.
                  <button
                    onClick={stopCountdown}
                    className="ml-2 text-blue-600 hover:text-blue-800 font-medium underline underline-offset-2 focus:outline-none"
                  >
                    Cancel
                  </button>
                </p>
                <motion.div className="mt-2 h-1 bg-gray-200 rounded-full max-w-xs mx-auto overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                    initial={{ width: "100%" }}
                    animate={{ width: `${(countdown / 30) * 100}%` }}
                    transition={{ duration: 1, ease: "linear" }}
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Footer message */}
            <motion.div
              className="text-center text-gray-500 text-sm py-4 mt-8 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <p>
                If you believe this is an error, please contact our support
                team.
                <br />
                Error code:{" "}
                <span className="font-mono text-gray-700">
                  404_PAGE_NOT_FOUND
                </span>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFoundPage;
