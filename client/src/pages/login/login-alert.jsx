import { MdClose } from "react-icons/md";

export const LoginAlert = ({ onAlertIsShow }) => {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border-1 border-npa-error-500/25 bg-npa-error-500/[15%] py-4 px-6 duration-200">
      <h3 className="text-sm text-npa-error-500">
        Incorrect username or password
      </h3>
      <MdClose
        className="cursor-pointer text-npa-error-500"
        onClick={onAlertIsShow}
      />
    </div>
  );
};
