import photosGet from '@/actions/photos-get';
import Feed from '@/components/feed/feed';

export default async function Home() {
  const data = await photosGet();
  return (
    <section className="container main-container">
      <Feed photos={data} />
    </section>
  );
}
