import classNames from "classnames";

export const LoginErrorText = ({ children, isShow }) => {
  return (
    <div
      className={classNames(
        "flex items-center gap-3",
        isShow ? "block" : "hidden"
      )}
    >
      <div className="h-4 w-4 rounded-full bg-red-500" />
      <p className="text-sm text-red-500">{children}</p>
    </div>
  );
};

export default LoginErrorText;
