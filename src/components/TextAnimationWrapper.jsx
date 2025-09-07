'use client';

import dynamic from 'next/dynamic';
import Loader from './ui/Loader';

// Dynamically import TextAnimation with SSR disabled as a fallback option
const TextAnimation = dynamic(() => import('./TextAnimation'), {
  ssr: false,
  loading: () => <Loader size="12px" className="opacity-50" />
});

export default TextAnimation;