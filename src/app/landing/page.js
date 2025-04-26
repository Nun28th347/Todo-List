'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between min-h-screen bg-[#000f1e] px-6 md:px-10 py-10">
      
      {/* Text Section */}
      <motion.div
        className="text-white w-full md:w-1/2 text-center md:text-left"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Discover the Future of&nbsp;
            <Link
              href="https://QuantumSoul.ai"
              target="_blank"
              className="text-purple-400 hover:text-purple-300 transition"
            >
              AI
            </Link>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Transform your daily routine with an efficient To-Do <br />
            List that helps you stay on track and accomplish more.
          </p>

          {/* ✅ Call to Action */}
          <button
            onClick={() => router.push('/login')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg shadow-md transition duration-300"
          >
            Join us
          </button>


          {/* ✅ Feature Highlights */}
          <div className="mt-10 text-left space-y-4 text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-purple-400 text-xl">✔</span>
              <p>Easily create tasks and set daily priorities</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-400 text-xl">✔</span>
              <p>Get automatic reminders before deadlines</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-400 text-xl">✔</span>
              <p>Track your progress with simple performance insights</p>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="w-full md:w-1/2 mb-8 md:mb-0"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <img 
          src="/images/image0_0.png" 
          alt="AI Illustration" 
          className="w-full h-auto object-cover rounded-xl shadow-lg"
        />
      </motion.div>
    </div>
  );
};

export default LandingPage;
