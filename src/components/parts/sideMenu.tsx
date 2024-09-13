'use client';
import {useState, useEffect, useCallback} from 'react';
import Link from 'next/link';

const menuItems = [
  {title: 'cv', href: '/cv', key: 'side_list_cv'},
  {title: 'article', href: '/article', key: 'side_list_article'},
  {title: 'statement', href: '/statement', key: 'side_list_statement'},
  {title: 'works', href: '/works', key: 'side_list_works'},
  {title: 'contact', href: '/contact', key: 'side_list_contact'},
];
const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    console.log('toggleMenu', !isOpen);
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <nav id="spc-nav" className="relative">
      <div
        id="hamburger-btn"
        className={`hamburger-btn ${isOpen ? 'open' : 'close'} absolute top-6 right-10 w-16 h-16 z-30 cursor-pointer`}
        onClick={toggleMenu}
      >
        <span
          className={`absolute left-0 w-10 h-0.5 ${isOpen ? 'bg-custom-vivid-green' : 'bg-yellow-500'} top-0`}
        />
        <span
          className={`absolute left-0 w-10 h-0.5 ${isOpen ? 'bg-custom-vivid-green' : 'bg-yellow-500'} top-3`}
        />
        <span
          className={`absolute left-0 w-10 h-0.5 ${isOpen ? 'bg-custom-vivid-green' : 'bg-yellow-500'} top-6`}
        />
      </div>

      <ul
        id="sp-nav-menu"
        className={`sp-nav-menu ${isOpen ? 'open' : 'close'}  fixed top-0 left-0 z-2 w-full h-screen box-border p-0 m-0 bg-transparent bg-opacity-80`}
      >
        {menuItems.map((item) => (
          <li
            key={item.key}
            className="relative top-25 left-5 text-4xl text-left mb-2.5 ml-3/4"
          >
            <Link
              href={item.href}
              className="text-custom-vivid-green hover:text-blue-800"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideMenu;
