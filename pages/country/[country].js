import DiscoverCountry from '@/components/Country/DiscoverCountry';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import City from '@/components/Country/City';

export default function Country() {
  const router = useRouter();
  const { country } = router.query;

  return (
    <Layout title={'Select the city'}>
      <DiscoverCountry country={country} />

      <City country={'Italy'} city={'Milan'} />
      <City country={'Italy'} city={'Milan'} />
      <City country={'Italy'} city={'Milan'} />
      <City country={'Italy'} city={'Milan'} />
    </Layout>
  );
}
