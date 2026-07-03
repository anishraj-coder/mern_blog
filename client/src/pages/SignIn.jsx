import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
  clearError,
} from '../redux/user/userSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Logo from '../components/Logo';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center relative px-4 py-12 overflow-hidden'>
      {/* Background radial glow */}
      <div className='absolute -left-20 top-20 w-[400px] h-[400px] rounded-full orange-glow filter blur-[100px] pointer-events-none' />
      <div className='absolute -right-20 bottom-20 w-[450px] h-[450px] rounded-full indigo-glow filter blur-[120px] pointer-events-none' />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md glass-panel p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 shadow-2xl relative z-10 flex flex-col gap-6'
      >
        <div className='text-center'>
          <Link to='/' className='font-bold dark:text-white text-3xl flex flex-col justify-center items-center gap-3'>
            <Logo className='w-12 h-12' />
            <div className='flex items-center gap-1.5'>
              <span className='px-3 py-1 bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-600 rounded-full text-white text-xs tracking-wider uppercase shadow-md'>
                Anish's
              </span>
              <span className='bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent'>
                Blog
              </span>
            </div>
          </Link>
          <p className='text-xs text-slate-500 dark:text-slate-400 mt-2.5'>
            Enter your credentials below to access your account
          </p>
        </div>

        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <div className='mb-1.5 block'>
              <Label value='Your Email' className='text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400' />
            </div>
            <TextInput
              type='email'
              placeholder='name@company.com'
              id='email'
              onChange={handleChange}
              required
              className='rounded-lg'
            />
          </div>
          <div>
            <div className='mb-1.5 block'>
              <Label value='Your Password' className='text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400' />
            </div>
            <TextInput
              type='password'
              placeholder='••••••••'
              id='password'
              onChange={handleChange}
              required
              className='rounded-lg'
            />
          </div>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='mt-2'>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
              className='w-full rounded-full py-0.5 shadow-md shadow-orange-500/10'
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </motion.div>
        </form>

        <div className='text-center text-xs text-slate-500 dark:text-slate-400 mt-2 border-t border-slate-200/50 dark:border-slate-800/50 pt-4'>
          Don't have an account?{' '}
          <Link to='/sign-up' className='text-orange-500 hover:underline font-semibold'>
            Sign Up
          </Link>
        </div>

        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className='bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs px-4 py-3 rounded-full flex items-center gap-2 mt-2 shadow-sm overflow-hidden'
            >
              <svg className='w-4 h-4 shrink-0 text-rose-500' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
              </svg>
              <span className='font-semibold'>{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
