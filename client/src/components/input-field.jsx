import classNames from "classnames";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";

export const InputField = ({
  type = "text",
  id,
  value,
  placeholder,
  disabled,
  onTouched,
  inputRef,
  onChange,
  onBlur,
  isError,
}) => {
  const [isVisible, setIsVisible] = useState(!(type === "password"));

  const handleVisiblePassword = () => {
    setIsVisible((oldValue) => !oldValue);
  };

  return (
    <div
      className={classNames(
        "flex items-center justify-between rounded-lg border-1 border-npa-neutral-400 py-3 px-4 duration-300 focus-within:shadow-input focus-within:ring-4 md:px-5 xl:py-4 xl:px-6",
        {
          "bg-npa-neutral-50 focus-within:ring-npa-primary-400/20 hover:border-npa-primary-400":
            !disabled && !isError,
          "border-npa-success-500 focus-within:ring-npa-success-500/20 hover:border-npa-success-500":
            onTouched && !isError && value.length > 0,
          "border-npa-error-500 focus-within:ring-npa-error-500/20 hover:border-npa-error-500":
            isError,
          "cursor-not-allowed bg-npa-neutral-200": disabled,
        }
      )}
    >
      <input
        type={isVisible ? "text" : "password"}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        ref={inputRef}
        onBlur={onBlur}
        onChange={onChange}
        className={classNames(
          "form-input w-full appearance-none border-0 bg-transparent py-0 px-0 placeholder:text-sm focus:border-none focus:outline-none focus:ring-0",
          {
            "cursor-not-allowed placeholder:text-npa-neutral-400": disabled,
            "placeholder:text-npa-neutral-500": !disabled,
          }
        )}
      />
      {isVisible && type === "password" && (
        <AiFillEyeInvisible
          className="h-6 w-6 cursor-pointer text-npa-neutral-400"
          onClick={handleVisiblePassword}
        />
      )}
      {!isVisible && type === "password" && (
        <AiFillEye
          className="h-6 w-6 cursor-pointer text-npa-neutral-400"
          onClick={handleVisiblePassword}
        />
      )}

      <RiErrorWarningFill
        className={classNames("h-6 w-6 text-npa-error-500", {
          hidden: !isError,
          block: isError,
        })}
      />
    </div>
  );
};
