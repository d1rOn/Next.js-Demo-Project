import dynamic from 'next/dynamic';

const DynamicFourOhFour = dynamic(
  () => import('../components/FourOhFour/FourOhFour'),
  {
    ssr: false,
  },
);

function Page404() {
  return <DynamicFourOhFour />;
}

export default Page404;
