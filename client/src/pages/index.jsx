export default function Home() {
  return <h1>Hello World </h1>;
}

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/dashboard",
      permanent: false,
    },
    props: {},
  };
};
