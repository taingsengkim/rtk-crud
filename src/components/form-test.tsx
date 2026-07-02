"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Field } from "./ui/field";
import { Input } from "./ui/input";

const formSchema = z.object({
  email: z.string().min(3, "ersers"),
  password: z.string(),
});

type NewFormType = z.infer<typeof formSchema>;

type formData = {
  email: string;
  password: string;
};
export default function DD() {
  //calling login rtk ( custome hook )

  //1. declare object using with useForm
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    //2. set default value
    defaultValues: {
      email: "",
      password: "",
    },
  });
  //3. create handlesubmit to track value form
  const onSubmit = async (data: NewFormType) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <Input
                {...field}
                name={field.name}
                aria-invalid={fieldState.invalid}
              />
              <p className="text-9xl text-red-600">
                {fieldState.invalid && <p>{fieldState.error?.message}</p>}
              </p>
            </Field>
          )}
        />

        <button type="submit" className="border p-4">
          Sub{" "}
        </button>
      </form>
    </div>
  );
}
