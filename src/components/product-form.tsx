"use client";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingCartIcon } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import {
  useCreateProductMutation,
  useGetAllBrandQuery,
  useGetAllCategoryQuery,
  useGetAllSupplierQuery,
} from "@/services/ecommerce";
import { FileUploadFillProgressDemo } from "./upload-file";
import { useUploadFilesMutation } from "@/services/upload";
import { toast } from "sonner";

export const computerSpecSchema = z.object({
  processor: z.string(),
  ram: z.string(),
  storage: z.string(),
  gpu: z.string(),
  os: z.string(),
  screenSize: z.string(),
  battery: z.string(),
});

export const colorImageSchema = z.object({
  color: z.string(),
  images: z.array(z.string().url({ message: "Invalid image URL" })),
});

export const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string(),
  computerSpec: computerSpecSchema,
  stockQuantity: z
    .number()
    .int()
    .nonnegative({ message: "Stock cannot be negative" }),
  priceIn: z
    .number()
    .positive({ message: "Purchase price must be greater than 0" }),
  priceOut: z
    .number()
    .positive({ message: "Selling price must be greater than 0" }),
  discount: z
    .number()
    .min(0)
    .max(100, { message: "Discount must be between 0 and 100" }),
  color: z.array(colorImageSchema),
  thumbnail: z.string(),
  warranty: z.string(),
  availability: z.boolean(),
  images: z.array(z.string()),
  categoryUuid: z.string(),
  supplierUuid: z.string(),
  brandUuid: z.string(),
});
export default function ProductForm() {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      stockQuantity: 0,
      priceIn: 0,
      priceOut: 0,
      categoryUuid: "",
      brandUuid: "",
      computerSpec: {
        processor: "",
        ram: "",
        storage: "",
        gpu: "",
        os: "",
        screenSize: "",
        battery: "",
      },
      discount: 0,
      color: [],
      thumbnail: "",
      warranty: "",
      availability: true,
      images: [],
      supplierUuid: "",
    },
  });
  const { data: categories } = useGetAllCategoryQuery();
  const { data: suppliers } = useGetAllSupplierQuery();
  const { data: brands } = useGetAllBrandQuery();
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [uploadFile] = useUploadFilesMutation();
  const [createProduct] = useCreateProductMutation();
  async function onSubmit(values: z.infer<typeof productSchema>) {
    try {
      if (pendingFiles.length === 0) {
        toast.error("Please add at least one product image.");
        return;
      }
      const uploadedUrls = await Promise.all(
        pendingFiles.map(async (file) => {
          const result = await uploadFile(file).unwrap();
          console.log(result);
          return result?.location;
        }),
      );
      console.log(uploadedUrls);
      const payload = {
        ...values,
        images: uploadedUrls,
        thumbnail: uploadedUrls[0],
      };
      console.log(payload);
      await createProduct(payload).unwrap();
      setPendingFiles([]);

      toast.success("Product Created Successfully!");
      onReset();
    } catch (error) {
      console.error("Failed to create product:", error);
      toast.error("Something went wrong while creating the product.");
    }
  }

  function onReset() {
    form.reset();
    form.clearErrors();
  }

  return (
    <Card className="w-200 p-5">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={onReset}
        className="space-y-8 @container "
      >
        <div className="flex gap-5">
          <div className="grid grid-cols-12 gap-4">
            <div
              key="text-0"
              id="text-0"
              className=" col-span-12 col-start-auto"
            >
              <p className="not-first:mt-6 leading-7">
                <span className="text-lg font-semibold">Create Product</span>
                <br />
                <span className="text-sm text-muted-foreground">
                  Create your product
                </span>
              </p>
            </div>

            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field
                  className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel className="flex w-auto!">Product Name</FieldLabel>

                  <Input
                    key="name"
                    placeholder="Product Name"
                    type="text"
                    className=""
                    {...field}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <Field
                  className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel className="flex w-auto!">Description</FieldLabel>

                  <Textarea
                    key="description"
                    id="description"
                    placeholder="Product Description"
                    className=""
                    {...field}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="stockQuantity"
              render={({ field, fieldState }) => (
                <Field
                  className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel className="flex w-auto!">
                    Stock Quantity
                  </FieldLabel>

                  <InputGroup>
                    <InputGroupInput
                      placeholder="Product Stock"
                      type="number"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                    <InputGroupAddon align="inline-start">
                      <ShoppingCartIcon className="size-4" strokeWidth={2} />
                    </InputGroupAddon>
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="priceOut"
              render={({ field, fieldState }) => (
                <Field
                  className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel className="flex w-auto!">Price Out</FieldLabel>

                  <Input
                    placeholder="Price out"
                    type="number"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="priceIn"
              render={({ field, fieldState }) => (
                <Field
                  className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel className="flex w-auto!">Price In</FieldLabel>

                  <Input
                    placeholder="Price in"
                    type="number"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div className="flex  flex-wrap gap-4">
            <Controller
              control={form.control}
              name="categoryUuid"
              render={({ field, fieldState }) => (
                <Field
                  className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel className="flex w-auto!">Category</FieldLabel>

                  <Select
                    key="categoryUuid"
                    value={field.value}
                    name={field.name}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full ">
                      <SelectValue placeholder="Choose Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.content.map((d) => (
                        <SelectItem key={d.uuid} value={d.uuid}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="supplierUuid"
              render={({ field, fieldState }) => (
                <Field
                  className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel className="flex w-auto!">Supplier</FieldLabel>

                  <Select
                    key="supplierUuid"
                    value={field.value}
                    name={field.name}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full ">
                      <SelectValue placeholder="Choose Supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers?.content.map((d) => (
                        <SelectItem key={d.uuid} value={d.uuid}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="brandUuid"
              render={({ field, fieldState }) => (
                <Field
                  className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel className="flex w-auto!">Brand</FieldLabel>

                  <Select
                    key="brandUuid"
                    value={field.value}
                    name={field.name}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full ">
                      <SelectValue placeholder="Choose Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands?.content.map((d) => (
                        <SelectItem key={d.uuid} value={d.uuid}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <FileUploadFillProgressDemo
              files={pendingFiles}
              onFilesChange={setPendingFiles}
            />
          </div>
        </div>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit">Save</Button>
          </Field>
        </CardFooter>
      </form>
    </Card>
  );
}
