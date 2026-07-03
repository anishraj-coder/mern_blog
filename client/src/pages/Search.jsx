import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm') || '';
    const sortFromUrl = urlParams.get('sort') || 'desc';
    const categoryFromUrl = urlParams.get('category') || 'uncategorized';
    
    setSidebarData({
      searchTerm: searchTermFromUrl,
      sort: sortFromUrl,
      category: categoryFromUrl,
    });

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className='flex flex-col md:flex-row min-h-screen relative overflow-hidden'>
      {/* Background glowing rings */}
      <div className='absolute -left-20 top-40 w-[400px] h-[400px] rounded-full orange-glow filter blur-[120px] pointer-events-none' />
      <div className='absolute -right-20 bottom-40 w-[450px] h-[450px] rounded-full indigo-glow filter blur-[150px] pointer-events-none' />

      {/* Filter Sidebar */}
      <div className='p-6 md:w-80 w-full relative z-10'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='glass-panel p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 shadow-xl flex flex-col gap-6'
        >
          <h2 className='text-lg font-bold tracking-tight bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-600 bg-clip-text text-transparent border-b border-slate-200/30 dark:border-slate-800/50 pb-3'>
            Search Filters
          </h2>
          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2'>
              <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider'>
                Search Term
              </label>
              <TextInput
                placeholder='Keywords...'
                id='searchTerm'
                type='text'
                value={sidebarData.searchTerm}
                onChange={handleChange}
                className='rounded-lg'
              />
            </div>
            
            <div className='flex flex-col gap-2'>
              <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider'>
                Sort Order
              </label>
              <Select 
                onChange={handleChange} 
                value={sidebarData.sort} 
                id='sort'
                className='rounded-lg'
              >
                <option value='desc'>Latest</option>
                <option value='asc'>Oldest</option>
              </Select>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider'>
                Category
              </label>
              <Select
                onChange={handleChange}
                value={sidebarData.category}
                id='category'
                className='rounded-lg'
              >
                <option value='uncategorized'>Uncategorized</option>
                <option value='reactjs'>React.js</option>
                <option value='nextjs'>Next.js</option>
                <option value='javascript'>JavaScript</option>
              </Select>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='mt-2'>
              <Button type='submit' gradientDuoTone='purpleToPink' className='w-full rounded-full py-0.5 shadow-md shadow-orange-500/10'>
                Apply Filters
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      {/* Main Results area */}
      <div className='w-full p-6 relative z-10'>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent pb-4 border-b border-slate-200/50 dark:border-slate-800/50 mb-6'
        >
          Search Results
        </motion.h1>

        <div className='flex flex-col gap-6'>
          {loading && (
            <div className='flex justify-center items-center py-20'>
              <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-rose-500'></div>
            </div>
          )}

          {!loading && posts.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-lg text-slate-500 dark:text-slate-400 text-center py-20 font-medium'
            >
              No posts found matching the filters.
            </motion.p>
          )}

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            <AnimatePresence>
              {!loading &&
                posts &&
                posts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <PostCard post={post} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>

          {!loading && showMore && (
            <div className='flex justify-center mt-8'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShowMore}
                className='text-xs font-bold uppercase tracking-wider text-rose-500 hover:text-rose-400 glass-panel border border-rose-500/20 px-8 py-3 rounded-full shadow-lg transition-colors'
              >
                Show More Results
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
