import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  age: yup.number().positive().integer().required(),
  password: yup.string().min(4).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

const ReactHookFormYup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log("errors", errors);

  const submitForm = (data) => {
    console.log("submitForm", data);
  };

  return (
    <div className="h-screen bg-gray-200">
      <div className="flex flex-col items-center justify-center">
        <div>Sign up</div>
        <div>
          <form onSubmit={handleSubmit(submitForm)}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name..."
              {...register("firstName")}
            />
            <p className="text-red-500">{errors.firstName?.message}</p>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name..."
              {...register("lastName")}
            />
            <p className="text-red-500">{errors.lastName?.message}</p>
            <input
              type="text"
              name="email"
              placeholder="Email..."
              {...register("email")}
            />
            <p className="text-red-500">{errors.email?.message}</p>
            <input
              type="text"
              name="age"
              placeholder="Age..."
              {...register("age")}
            />
            <p className="text-red-500">{errors.age?.message}</p>

            <input
              type="text"
              name="password"
              placeholder="Password..."
              {...register("password")}
            />
            <p className="text-red-500">{errors.password?.message}</p>
            <input
              type="text"
              name="confirmPassword"
              placeholder="Confirm Password..."
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">Passwords Should Match!</p>
            )}

            <input type="submit" id="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReactHookFormYup;
