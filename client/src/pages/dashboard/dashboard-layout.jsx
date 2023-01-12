import { Aside } from "./aside";
import { Header } from "./header";

export const DashboardLayout = ({ children }) => {
  return (
    <>
      <Aside />
      <div className="flex w-full flex-col">
        <Header />
        <main>{children}</main>
      </div>
    </>
  );
};
