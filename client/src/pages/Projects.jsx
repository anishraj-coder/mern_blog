import { useEffect, useState } from 'react';
import CallToAction from '../components/CallToAction';
import { motion } from 'framer-motion';
import { Button } from 'flowbite-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/user/projects');
        const data = await res.json();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen max-w-5xl mx-auto flex flex-col items-center justify-center p-6 gap-10 py-16 relative z-10'
    >
      {/* Glow Blobs */}
      <div className='absolute -left-20 top-20 w-[300px] h-[300px] rounded-full orange-glow filter blur-[100px] pointer-events-none' />
      <div className='absolute -right-20 bottom-20 w-[300px] h-[300px] rounded-full indigo-glow filter blur-[100px] pointer-events-none' />

      <div className='text-center flex flex-col items-center gap-3 relative z-10'>
        <span className='text-xs font-bold tracking-wider text-orange-500 uppercase bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20'>
          My Creations
        </span>
        <h1 className='text-4xl font-extrabold tracking-tight lg:text-6xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-500 dark:from-white dark:to-slate-300 bg-clip-text text-transparent'>
          Explore My Projects
        </h1>
        <p className='text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed'>
          A refined selection of projects built with modern technologies. Striving for clean architecture, fluid layouts, and complete user experiences.
        </p>
      </div>

      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 relative z-10'>
        {loading ? (
          <div className='col-span-full text-center text-slate-500 dark:text-slate-400 py-10'>
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className='col-span-full text-center text-slate-500 dark:text-slate-400 py-10'>
            No projects found.
          </div>
        ) : (
          projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -5 }}
              className='glass-panel p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 shadow-lg flex flex-col justify-between gap-4 transition-all duration-300'
            >
              <div className='flex flex-col gap-2'>
                <h2 className='text-2xl font-bold text-slate-800 dark:text-white'>
                  {project.title}
                </h2>
                <p className='text-slate-500 dark:text-slate-400 text-sm leading-relaxed'>
                  {project.description}
                </p>
                <div className='flex flex-wrap gap-2 mt-2'>
                  {project.tech.map((techItem, index) => (
                    <span
                      key={index}
                      className='px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 rounded-full border border-slate-200/50 dark:border-slate-800/30'
                    >
                      {techItem}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={project.link}
                target='_blank'
                rel='noopener noreferrer'
                className='mt-4 w-full'
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    gradientDuoTone='purpleToPink'
                    className='w-full rounded-full py-0.5 font-semibold text-xs shadow-md shadow-orange-500/10'
                  >
                    View Project
                  </Button>
                </motion.div>
              </a>
            </motion.div>
          ))
        )}
      </div>

      <div className='w-full mt-10 relative z-10'>
        <CallToAction />
      </div>
    </motion.div>
  );
}
