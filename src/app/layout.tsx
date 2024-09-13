import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mariko Arai - Portfolio site',
  description: 'Artist portfolio site',
};
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  console.log('RootLayout');
  return (
    <html lang="ja">
      <body className="font-sans bg-black text-custom-yellow m-0 p-0 leading-normal">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
