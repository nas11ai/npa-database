import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { ImSpinner8 } from "react-icons/im";

import { LoginAlert } from "./login-alert";

import { InputField, Label } from "@/components";
import { instance } from "@/libs";
import npaLogoFull from "@/public/images/npa-logo-full.png";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    await instance.post("/login", data);
  };

  const onError = (error) => {
    console.error("ERORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
    console.error("error", error);
  };

  return (
    <section className="flex h-screen items-center justify-center bg-npa-neutral-50">
      <div className="flex w-[90%] flex-col gap-10 rounded-2xl bg-white p-10 shadow-xl lg:w-[650px] lg:max-w-[650px]">
        <div className="flex flex-col items-center gap-10">
          <Image
            src={npaLogoFull}
            alt="Noble Properties Asia Logo"
            className="object-contain"
            priority
          />
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Welcome to NPA Database</h1>
            <p className="text-sm">
              Sign in under using an account to access the dashboard
            </p>
          </div>
        </div>
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
                  required: "Username harus diisi!",
                }}
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { isTouched },
                }) => (
                  <InputField
                    type="text"
                    id="username"
                    value={value}
                    disabled={isSubmitting}
                    placeholder="Masukkan username"
                    isError={errors.username}
                    onChange={onChange}
                    onBlur={onBlur}
                    onTouched={isTouched}
                  />
                )}
              />
              <LoginAlert isShow={errors.username}>
                {errors.username?.message}
              </LoginAlert>
            </div>

            <div className="flex flex-col gap-3">
              <Label className="text-md w-max" htmlFor="password">
                Password
              </Label>

              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password harus diisi!",
                }}
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { isTouched },
                }) => (
                  <InputField
                    type="password"
                    id="password"
                    value={value}
                    disabled={isSubmitting}
                    placeholder="Masukkan Password"
                    isError={errors.password}
                    onBlur={onBlur}
                    onChange={onChange}
                    onTouched={isTouched}
                  />
                )}
              />

              <LoginAlert isShow={errors.password}>
                {errors.password?.message}
              </LoginAlert>
            </div>
          </div>

          <div className="flex flex-col items-center gap-5">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-npa-primary-400 p-4 text-white duration-200 hover:brightness-90 disabled:cursor-not-allowed disabled:bg-npa-primary-500/60"
              disabled={isSubmitting}
            >
              <ImSpinner8
                className={classNames("animate-spin", {
                  block: isSubmitting,
                  hidden: !isSubmitting,
                })}
              />
              SIGN IN
            </button>

            <Link
              href={"/login"}
              className="text-npa-primary-400 duration-200 hover:brightness-75"
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
