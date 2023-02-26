import Category from '@/components/City/Category';
import EnterMetaverse from '@/components/City/EnterMetaverse';
import Layout from '@/components/Layout';
import VerificSvg from '@/components/Svg/VerificSvg';

export default function City() {
  return (
    <Layout title={'Choose the category'}>
      <p className="text-lg text-center font-lato text-chenkster-gray">
        Get the best advice about places, experiences and activities, directly
        from our <span className="text-chenkster-blue">local chenksters!</span>
      </p>

      <div className="my-10">
        <h2 className="text-xl font-bold text-center font-lato text-chenkster-gray">
          Categories
        </h2>
        <div className="flex flex-wrap items-center justify-between mt-5 gap-y-10">
          <Category category={'Eating-out'} city={'Milan'} country={'Italy'} />
          <Category category={'Eating-out'} city={'Milan'} country={'Italy'} />
          <Category category={'Eating-out'} city={'Milan'} country={'Italy'} />
          <Category category={'Eating-out'} city={'Milan'} country={'Italy'} />
          <Category category={'Eating-out'} city={'Milan'} country={'Italy'} />
          <Category category={'Eating-out'} city={'Milan'} country={'Italy'} />
        </div>

        <EnterMetaverse />
      </div>
    </Layout>
  );
}
