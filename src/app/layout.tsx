import type { Metadata } from 'next';
// @ts-ignore: allow importing global CSS without a declaration file
import './globals.css';
import { type_second } from '../functions/fonts';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { UserContextProvider } from '@/context/user-context';
import userGet from '@/actions/user-get';

export const metadata: Metadata = {
  title: 'Dogs Next',
  description: 'Rede social para cachorros.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await userGet();
  return (
    <html lang="pt-BR">
      <body className={type_second.variable}>
        <UserContextProvider user={data}>
          <div className='App'>
            <Header />
            <main className='AppBody'>{children}</main>
            <Footer />
          </div>
        </UserContextProvider>
      </body>
    </html>
  );
}
