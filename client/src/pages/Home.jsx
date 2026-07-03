import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { motion } from 'framer-motion';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 14 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='relative'
    >
      {/* Decorative Drifting Glow Blobs */}
      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut'
        }}
        className='absolute top-10 left-1/4 w-[400px] h-[400px] rounded-full orange-glow filter blur-[120px] pointer-events-none'
      />
      <motion.div
        animate={{
          x: [0, -30, 30, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut'
        }}
        className='absolute top-40 right-1/4 w-[450px] h-[450px] rounded-full indigo-glow filter blur-[130px] pointer-events-none'
      />

      <div className='flex flex-col gap-8 p-12 px-4 max-w-6xl mx-auto text-center items-center relative z-10'>
        <motion.span 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className='text-xs font-bold tracking-wider text-orange-500 uppercase bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20'
        >
          Welcome to my workspace
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='text-4xl font-extrabold tracking-tight lg:text-7xl leading-tight'
        >
          Discover Insights on <br />
          <span className='bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-500 bg-clip-text text-transparent'>
            Web Dev & Tech Craft
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed'
        >
          Explore a collection of tutorials, articles, and learning projects designed to sharpen your programming skills. We cover everything from database architecture to modern styling systems.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='flex flex-wrap gap-4 justify-center mt-4'
        >
          <Link to='/search'>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold rounded-full shadow-lg shadow-orange-500/20 text-sm hover:opacity-95 transition-opacity'
            >
              Explore Articles
            </motion.button>
          </Link>
          <Link to='/projects'>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-6 py-3 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/50 text-sm transition-colors'
            >
              View Projects
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <div className='max-w-6xl mx-auto p-4 flex flex-col gap-10 py-10 relative z-10'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-8'>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className='text-3xl font-extrabold text-center tracking-tight'
            >
              Recent Posts
            </motion.h2>
            
            <motion.div 
              variants={containerVariants}
              initial='hidden'
              whileInView='show'
              viewport={{ once: true, margin: '-100px' }}
              className='flex flex-wrap gap-6 justify-center'
            >
              {posts.slice(0, 3).map((post) => (
                <motion.div key={post._id} variants={itemVariants}>
                  <PostCard post={post} />
                </motion.div>
              ))}
            </motion.div>
            
            <Link
              to={'/search'}
              className='text-sm text-orange-500 font-bold hover:underline text-center mt-2'
            >
              View all posts &rarr;
            </Link>
          </div>
        )}
      </div>

      <div className='max-w-4xl mx-auto p-6 my-10 relative z-10'>
        <CallToAction />
      </div>
    </motion.div>
  );
}
