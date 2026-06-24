"use client";
import { useLoginUserMutation } from "@/services/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
type formData = {
  email: string;
  password: string;
};
export default function FormExampleComponent() {
  //calling login rtk ( custome hook )

  const [loginUser] = useLoginUserMutation();

  //1. declare object using with useForm
  const { register, handleSubmit, reset, setError } = useForm({
    //2. set default value
    defaultValues: {
      email: "",
      password: "",
    },
  });
  //3. create handlesubmit to track value form
  const onSubmit = async (data: formData) => {
    try {
      const response = await loginUser(data).unwrap();
      console.log(response);
      toast.success("Login successfully!");
    } catch (error) {
      toast.error("Failed to login!");
    }
  };
  return (
    <div className="flex py-10 items-center justify-center bg-gray-50 font-sans">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm border border-gray-100"
      >
        <h2 className="mb-6 text-2xl font-bold text-gray-800 text-center">
          Welcome Back
        </h2>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-600 mb-1.5"
          >
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            name="email"
            id="email"
            placeholder="name@company.com"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-600 mb-1.5"
          >
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
          />
        </div>

        <button className="w-full rounded-lg bg-indigo-600 py-3 px-4 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all">
          Sign In
        </button>
      </form>
    </div>
  );
}
