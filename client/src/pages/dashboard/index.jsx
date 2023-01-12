import { DashboardLayout } from "./dashboard-layout";

export default function Dashboard() {
  return <DashboardLayout />;
}

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "dashboard/analytics",
      permanent: false,
    },
    props: {},
  };
};
