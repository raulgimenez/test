import {useEffect} from 'react'

export default function useInfiniteScroll(onInfiniteScroll) {

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      });
    
      function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 5 ) return;
        onInfiniteScroll()
      }
}
