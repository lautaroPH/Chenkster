import Category from '@/components/City/Category';
import EnterMetaverse from '@/components/City/EnterMetaverse';
import Layout from '@/components/Layout';
import { getCategories } from '@/utils/getCategories';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export const getServerSideProps = async (ctx) => {
  const { country, city } = ctx.query;

  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();

  const { categories, error } = await getCategories();

  if (error) return { notFound: true };

  return {
    props: {
      initialSession: data?.user,
      user: data?.user,
      categories,
      country,
      city,
    },
  };
};

export default function City({ user, categories, country, city }) {
  return (
    <Layout
      title={'Choose the category'}
      username={user?.user_metadata?.username}
    >
      <p className="text-lg text-center font-lato text-chenkster-gray w-80">
        Get the best advice about places, experiences and activities, directly
        from our <span className="text-chenkster-blue">local chenksters!</span>
      </p>

      <div className="my-10">
        <h2 className="text-xl font-bold text-center font-lato text-chenkster-gray">
          Categories
        </h2>
        <div className="flex flex-wrap items-center justify-center mt-5 gap-x-5 gap-y-10">
          {categories.map((category) => (
            <Category
              key={category.id}
              category={category.title}
              city={city}
              country={country}
              image={category.image}
              role={user?.user_metadata.role}
              id={category.id}
            />
          ))}
        </div>

        <EnterMetaverse />
      </div>
    </Layout>
  );
}
