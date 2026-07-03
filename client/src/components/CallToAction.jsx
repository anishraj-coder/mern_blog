import { Button } from 'flowbite-react';
import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row gap-6 p-6 justify-between items-center rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/80 text-center sm:text-left relative overflow-hidden shadow-lg shadow-black/10'>
      <div className='absolute -right-20 -top-20 w-80 h-80 rounded-full orange-glow filter blur-[80px] pointer-events-none' />
      <div className='flex-1 justify-center flex flex-col relative z-10'>
        <span className='text-xs font-bold tracking-wider text-orange-500 uppercase mb-2'>
          Featured Resource
        </span>
        <h2 className='text-2xl font-extrabold text-slate-800 dark:text-white leading-tight'>
          Want to master JavaScript by building projects?
        </h2>
        <p className='text-slate-500 dark:text-slate-400 my-3 text-sm leading-relaxed'>
          Explore our collection of 100 practical JavaScript projects, designed to reinforce your layout, styling, and DOM logic skills.
        </p>
        <a
          href='https://github.com/anishraj-coder'
          target='_blank'
          rel='noopener noreferrer'
          className='w-full sm:w-max mt-2'
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              gradientDuoTone='purpleToPink'
              className='rounded-full px-4 font-semibold w-full sm:w-max shadow-md shadow-orange-500/10'
            >
              Start Building Now
            </Button>
          </motion.div>
        </a>
      </div>
      <div className='flex-1 p-4 relative z-10 w-full max-w-[320px] sm:max-w-none'>
        <img 
          src='https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221114110410/Top-10-JavaScript-Project-Ideas-For-Beginners-2023.png' 
          alt='JavaScript Projects Illustration'
          className='rounded-xl shadow-md border border-slate-200/20 w-full object-cover'
        />
      </div>
    </div>
  );
}
