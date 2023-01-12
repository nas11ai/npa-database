import { Aside } from "./aside";
import { Header } from "./header";

export const DashboardLayout = ({ children }) => {
  return (
    <>
      <Aside />
      <div className="flex flex-col">
        <Header />
        <main>{children}</main>
      </div>
    </>
  );
};
