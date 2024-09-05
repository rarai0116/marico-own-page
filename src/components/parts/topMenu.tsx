import Link from 'next/link';

const TopMenu = () => {
  return (
    <header className="mt-8">
      <nav className="block top-menu">
        <ul className="mr-[5%] p-0 list-none flex flex-row justify-end">
          <li>
            <Link href="/" className="text-custom-yellow hover:text-green-500">
              home
            </Link>
          </li>
          <li>
            <Link
              href="/cv"
              className="text-custom-yellow hover:text-green-500"
            >
              cv
            </Link>
          </li>
          <li>
            <Link href="/article">article</Link>
          </li>
          <li>
            <Link
              href="/statement"
              className="text-custom-yellow hover:text-green-500"
            >
              statement
            </Link>
          </li>
          <li>
            <Link
              href="/works"
              className="text-custom-yellow hover:text-green-500"
            >
              works
            </Link>
          </li>
          <li>
            <Link href="/contact">contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default TopMenu;
