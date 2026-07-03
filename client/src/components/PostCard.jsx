import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PostCard({ post }) {
  return (
    <motion.div 
      whileHover={{ y: -6, scale: 1.01 }}
      className='group relative w-full glass-panel overflow-hidden rounded-2xl sm:w-[360px] transition-all duration-300 mx-auto flex flex-col justify-between shadow-lg shadow-black/20 hover:shadow-orange-500/5'
    >
      <Link to={`/post/${post.slug}`} className='overflow-hidden block'>
        <img
          src={post.image}
          alt='post cover'
          className='h-[200px] w-full object-cover group-hover:scale-105 transition-all duration-500'
        />
      </Link>
      <div className='p-5 flex flex-col gap-4 flex-grow'>
        <div className='flex justify-between items-center'>
          <span className='px-2.5 py-0.5 text-xs font-semibold tracking-wide text-orange-500 uppercase bg-orange-500/10 rounded-full border border-orange-500/20'>
            {post.category}
          </span>
        </div>
        <p className='text-lg font-bold line-clamp-2 text-slate-800 dark:text-slate-100 group-hover:text-orange-500 transition-colors duration-300'>{post.title}</p>
        
        <Link
          to={`/post/${post.slug}`}
          className='mt-auto w-full py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 hover:opacity-90 text-white text-center font-semibold text-sm shadow-md shadow-orange-500/10 transition-all duration-300'
        >
          Read Article
        </Link>
      </div>
    </motion.div>
  );
}
