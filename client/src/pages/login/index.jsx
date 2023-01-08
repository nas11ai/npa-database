import Image from "next/image";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { LoginAlert } from "./login-alert";
import { LoginButton } from "./login-button";

import { InputField, Label } from "@/components";
import { instance } from "@/libs";
import npaLogoFull from "@/public/images/npa-logo-full.png";

const Login = () => {
  const {
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [isAlertIsShow, setIsAlertIsShow] = useState(false);

  const onSubmit = async (data) => {
    const res = await instance.post("/login", data);
    reset({}, { keepDefaultValues: true });

    console.log(res);
  };

  const onError = (error) => {
    setIsAlertIsShow(true);
    reset(
      {},
      {
        keepValues: true,
        keepDirtyValues: true,
        keepErrors: true,
        keepTouched: false,
        keepIsValid: true,
        keepDefaultValues: false,
      }
    );

    console.error(error);
  };

  return (
    <section className="flex h-screen items-center justify-center bg-npa-login-background bg-cover bg-no-repeat object-cover py-6">
      <div className="flex h-max w-[90%] max-w-xl flex-col gap-8 rounded-2xl bg-white p-10 shadow-xl xl:gap-10">
        <div className="flex flex-col items-center gap-8 xl:gap-10">
          <Image
            src={npaLogoFull}
            alt="Noble Properties Asia Logo"
            className="w-44 bg-cover object-contain xl:w-60"
            priority
          />
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-xl font-semibold xl:text-2xl">
              Welcome to NPA Database
            </h1>
            <p className="xl:text-sm">
              Sign in under using an account to access the dashboard
            </p>
          </div>
        </div>
        {isAlertIsShow && (
          <LoginAlert onAlertIsShow={() => setIsAlertIsShow(false)} />
        )}
        <form
          className="flex flex-col gap-10"
          onSubmit={(event) => {
            handleSubmit(onSubmit)(event)

              // you will have to catch those error and handle them
              .catch((error) => {
                onError(error);
              });
          }}
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <Label className="text-md w-max" htmlFor="username">
                Username
              </Label>

              <Controller
                name="username"
                control={control}
                rules={{
                  required: "Username is required",
                }}
                render={({
                  field: { value, ref, onChange, onBlur },
                  fieldState: { isTouched },
                }) => (
                  <InputField
                    type="text"
                    id="username"
                    value={value}
                    disabled={isSubmitting}
                    placeholder="Enter username"
                    isError={errors.username}
                    inputRef={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    onTouched={isTouched}
                  />
                )}
              />
              {errors?.username && (
                <p className="text-sm text-red-500">
                  {errors?.username.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label className="text-md w-max" htmlFor="password">
                Password
              </Label>

              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                }}
                render={({
                  field: { value, ref, onChange, onBlur },
                  fieldState: { isTouched },
                }) => (
                  <InputField
                    type="password"
                    id="password"
                    value={value}
                    disabled={isSubmitting}
                    placeholder="Enter password"
                    isError={errors.password}
                    inputRef={ref}
                    onBlur={onBlur}
                    onChange={onChange}
                    onTouched={isTouched}
                  />
                )}
              />
              {errors?.password && (
                <p className="text-sm text-red-500">
                  {errors?.password.message}
                </p>
              )}
            </div>
          </div>

          <LoginButton isSubmitting={isSubmitting} trigger={trigger} />
        </form>
      </div>
    </section>
  );
};

export default Login;
