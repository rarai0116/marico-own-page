'use client';
import {useState, useEffect, useCallback} from 'react';
import Link from 'next/link';
import SideMenu from '@/components/parts/sideMenu';
import TopMenu from '@/components/parts/topMenu';

const FlexibleMenu = () => {
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        console.log('window.innerWidth:', window.innerWidth);
        console.log(window.innerWidth < window.innerHeight);
        setIsVertical(window.innerWidth < window.innerHeight);
      };

      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);
  return (
    <div>
      {/** 縦長表示ならサイドメニューを表示、横長表示ならトップメニューを表示 */}
      {isVertical ? <SideMenu /> : <TopMenu />}
    </div>
  );
};

export default FlexibleMenu;
