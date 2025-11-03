import photosGet from '@/actions/photos-get';
import Feed from '@/components/feed/feed';

export default async function Home() {
  const { data, error } = await photosGet();
  return (
    <section className="container main-container">
      {error ? (
        <p>{error}</p>
      ) : data ? (
        <Feed photos={data} />
      ) : (
        <p>Nenhuma foto encontrada.</p>
      )}
    </section>
  );
}
