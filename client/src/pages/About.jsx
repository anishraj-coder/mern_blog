import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Defined locally to resolve the import error and ensure single-file preview compilation
function CallToAction() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 text-left border border-indigo-500/30 shadow-lg shadow-indigo-500/10">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-100 mb-1">
            Want to optimize your build pipelines?
          </h3>
          <p className="text-xs text-slate-400 max-w-md">
            Get practical tutorials on Spring Security, database indexing, and front-end optimization delivered straight to your inbox.
          </p>
        </div>
        
        <div className="w-full md:w-auto flex-shrink-0">
          {subscribed ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-emerald-400 font-semibold text-sm bg-emerald-950/50 border border-emerald-500/40 rounded-lg px-4 py-2.5 text-center"
            >
              🎉 Welcome to the loop!
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="developer@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full md:w-64 px-3 py-2 text-xs rounded-lg bg-slate-950/60 border border-slate-700/60 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-md hover:shadow-indigo-500/20 active:scale-95 transition-all flex-shrink-0"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>
      
      {/* Background radial accent glow */}
      <div className="absolute right-0 bottom-0 w-32 h-32 bg-indigo-500/10 rounded-full filter blur-xl pointer-events-none" />
    </div>
  );
}

export default function App() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className='relative overflow-hidden min-h-screen flex items-center justify-center py-12 px-4 bg-transparent'>
      
      {/* Background drifting glow blobs */}
      <motion.div
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -20, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut'
        }}
        className='absolute top-20 left-10 w-[300px] h-[300px] rounded-full orange-glow filter blur-[100px] pointer-events-none'
      />
      <motion.div
        animate={{
          x: [0, -40, 40, 0],
          y: [0, 20, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut'
        }}
        className='absolute bottom-20 right-10 w-[350px] h-[350px] rounded-full indigo-glow filter blur-[120px] pointer-events-none'
      />

      {}
      <motion.div 
        variants={cardVariants}
        initial='hidden'
        animate='show'
        className='max-w-2xl w-full glass-panel p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 shadow-2xl relative z-10 text-center flex flex-col gap-6'
      >
        <motion.h1 
          variants={childVariants}
          className='text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-500 bg-clip-text text-transparent pb-2'
        >
          About Anish's Blog
        </motion.h1>

        {}
        <motion.div 
          variants={childVariants}
          className='text-md text-slate-500 dark:text-slate-400 flex flex-col gap-6 leading-relaxed text-left sm:text-center'
        >
          <p>
            Hey, welcome! I’m Anish Raj, a 4th-year Computer Science student at Amity University 
            and a full-stack engineer. If you caught me out in the wild, I’d probably be deep in 
            a Java Spring Boot backend, tweaking a React frontend, or figuring out why a Podman 
            container is refusing to connect on port 9091.
          </p>

          <p>
            I built this blog as a space to document my development journey, break down software 
            engineering concepts, and share real-world fixes for the technical bottlenecks I run 
            into—much like the ones I handled during my time as a software intern at Kiran Foundation. 
            No generic AI templates here; just honest write-ups on building scalable web apps, 
            optimizing database queries, and integrating AI stuff like Gemini.
          </p>

          <p>
            Learning in isolation is boring, so I built a full comment system here on purpose. 
            Feel free to dive into the comment threads, share a cleaner way to solve a bug, or 
            reply to other readers. Let's build some cool things and skip the hours of debugging together.
          </p>
        </motion.div>

        {}
        <motion.div 
          variants={childVariants}
          className='mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-800/50'
        >
          <CallToAction />
        </motion.div>
      </motion.div>
    </div>
  );
}