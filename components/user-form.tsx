"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type UserSchema, userSchema } from "@/schema/userSchema";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import type { User } from "@prisma/client";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { updateUser } from "@/actions/user";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
function UserForm({ user }: { user: User }) {
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
    },
  });
  const onSubmit = async (data: UserSchema) => {
    try {
      await updateUser(data);
      toast.success("User updated successfully! 🎉");
      router.push("/admin/users");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
    }
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 max-w-lg">
                    <FormLabel className="font-semibold">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your name"
                        className="input"
                      />
                    </FormControl>
                    <FormDescription>
                      The user&apos;s public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="profile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Profile Image
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="max-w-xs"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleImageChange(e);
                          field.onChange(e.target.files?.[0]);
                        }}
                      />
                    </FormControl>
                    {previewUrl && (
                      <div className="mt-4">
                        <Image
                          src={previewUrl}
                          alt="Image Preview"
                          width={100}
                          height={100}
                          className="rounded"
                        />
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-6">
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 max-w-lg">
                  <FormLabel className="font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your email"
                      className="input"
                    />
                  </FormControl>
                  <FormDescription>
                    Email address of the user. This will be used for login.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <div className="flex flex-col gap-6">
            <FormField
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 max-w-lg">
                  <FormLabel className="font-semibold">Phone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your phone number"
                      className="input"
                      type="tel"
                    />
                  </FormControl>
                  <FormDescription>Phone number of the user.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
            className="text-white w-32"
            type="submit"
          >
            {form.formState.isSubmitting ? (
              <>
                Saving... <Loader2 className="animate-spin" />
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default UserForm;
