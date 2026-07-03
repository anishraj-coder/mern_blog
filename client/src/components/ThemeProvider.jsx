import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className='theme-grid-bg text-gray-800 dark:text-gray-100 min-h-screen transition-colors duration-300 relative overflow-hidden'>
        {children}
      </div>
    </div>
  );
}
