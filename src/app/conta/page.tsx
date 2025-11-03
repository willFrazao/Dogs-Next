import photosGet from '@/actions/photos-get';
import userGet from '@/actions/user-get';
import Feed from '@/components/feed/feed';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Minha Conta',
};

export default async function ContaPage() {
  const { data: user, error: userError } = await userGet();
  
  if (userError) {
    return (
      <main>
        <p>{userError}</p>
      </main>
    );
  }

  const { data, error: photosError } = await photosGet({ user: user?.username });
  
  return (
    <main>
      {photosError ? (
        <p>{photosError}</p>
      ) : data && data.length > 0 ? (
        <Feed photos={data} />
      ) : (
        <div>
            <p style={{ color: '#444', fontSize: '1.25rem', marginBottom: '1rem' }}>Nenhuma foto encontrada.</p>
          <Link href={'/conta/postar'} className='button' style={{ display: 'inline-block' }}>Postar Foto</Link>
        </div>
      )}
    </main>
  );
}