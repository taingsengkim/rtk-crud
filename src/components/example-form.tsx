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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input {...register("email")} type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input
          {...register("password")}
          type="password"
          name="password"
          id="password"
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
