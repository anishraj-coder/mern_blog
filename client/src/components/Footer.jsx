import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsLinkedin } from 'react-icons/bs';
import Logo from './Logo';

export default function FooterCom() {
  return (
    <Footer container className='backdrop-blur-md bg-white/40 dark:bg-[#080c14]/40 border-t border-slate-200/50 dark:border-slate-800/50 transition-all duration-300 py-8 rounded-none'>
      <div className='w-full max-w-7xl mx-auto px-4'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1 gap-6'>
          <div className='mt-5'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-bold dark:text-white flex items-center gap-1.5'
            >
              <Logo className='w-6 h-6' />
              <span className='px-3 py-1 bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-600 rounded-full text-white text-xs tracking-wider uppercase shadow-md'>
                Anish's
              </span>
              <span className='bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent'>
                Blog
              </span>
            </Link>
            <p className='text-xs mt-3 text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed'>
              Become a Software Engineer in the top product based companies. Structured live learning with projects, mentorship and clear outcomes.
            </p>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='About' className='text-slate-900 dark:text-slate-200 font-semibold' />
              <Footer.LinkGroup col className='text-slate-600 dark:text-slate-400 text-sm'>
                <Footer.Link href='/about'>
                  Anish's Blog
                </Footer.Link>
                <Footer.Link href='/projects'>
                  Explore Projects
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Follow us' className='text-slate-900 dark:text-slate-200 font-semibold' />
              <Footer.LinkGroup col className='text-slate-600 dark:text-slate-400 text-sm'>
                <Footer.Link
                  href='https://github.com/anishraj-coder'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </Footer.Link>
                <Footer.Link href='#'>Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal' className='text-slate-900 dark:text-slate-200 font-semibold' />
              <Footer.LinkGroup col className='text-slate-600 dark:text-slate-400 text-sm'>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider className='my-6 border-slate-200/50 dark:border-slate-800/50' />
        <div className='w-full sm:flex sm:items-center sm:justify-between text-slate-500 dark:text-slate-400'>
          <Footer.Copyright
            href='#'
            by="Anish's blog"
            year={new Date().getFullYear()}
            className='text-xs'
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='#' icon={BsFacebook} className='hover:text-orange-500 transition-colors' />
            <Footer.Icon href='#' icon={BsInstagram} className='hover:text-orange-500 transition-colors' />
            <Footer.Icon href='#' icon={BsTwitter} className='hover:text-orange-500 transition-colors' />
            <Footer.Icon href='https://github.com/anishraj-coder' icon={BsGithub} className='hover:text-orange-500 transition-colors' />
            <Footer.Icon href='#' icon={BsLinkedin} className='hover:text-orange-500 transition-colors' />
          </div>
        </div>
      </div>
    </Footer>
  );
}
