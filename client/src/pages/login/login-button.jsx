import classNames from "classnames";
import { ImSpinner8 } from "react-icons/im";

const LoginButton = ({ isSubmitting, trigger }) => {
  return (
    <button
      type="submit"
      className="flex w-full items-center justify-center gap-3 rounded-xl bg-npa-primary-400 p-3 font-semibold text-white duration-200 hover:brightness-90 disabled:cursor-not-allowed disabled:bg-npa-primary-500/60 xl:p-4"
      disabled={isSubmitting}
      onClick={() => {
        trigger();
      }}
    >
      <ImSpinner8
        className={classNames("animate-spin", {
          block: isSubmitting,
          hidden: !isSubmitting,
        })}
      />
      Sign in
    </button>
  );
};

export default LoginButton;
