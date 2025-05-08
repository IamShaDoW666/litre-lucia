"use server";
import prisma from "@/lib/prisma";
import { wait } from "@/lib/utils";
import { userSchema, UserSchema } from "@/schema/userSchema";

import { deleteFile, saveFile } from "@/lib/server-utils";

export const deleteUser = async (userId: string) => {
  await wait(1000);
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const res = await prisma.user.delete({
    where: { id: userId },
  });
  return {
    success: true,
    data: res,
    message: "User deleted successfully",
  };
};

export const deleteBulkUsers = async (ids: string[]) => {
  await wait(1000);
  console.log("userId", ids);
  const user = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  if (!user) {
    throw new Error("Users not found");
  }

  const res = await prisma.user.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  return {
    success: true,
    data: res,
    message: "User deleted successfully",
  };
};

export const updateUser = async (data: UserSchema) => {
  await wait(1500);
  const validatedData = userSchema.safeParse(data);
  console.log("validatedData", validatedData);
  if (!validatedData.success) {
    throw new Error("Validation failed");
  }
  const user = await prisma.user.findUnique({
    where: { email: validatedData.data.email },
  });

  if (!user) {
    throw new Error("User not found");
  }
  let profilePath = user.profile;
  if (validatedData.data.profile) {
    const file = validatedData.data.profile;
    const fileName = `${Date.now()}-${file.name.split(".")[0]}`.replace(
      / /g,
      "-"
    );
    deleteFile(user.profile!);
    // Save the file to the server or cloud storage
    profilePath = await saveFile(file, fileName, 500, 500);
  }
  const res = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: validatedData.data.name,
      email: validatedData.data.email,
      phone: validatedData.data.phone,
      profile: profilePath != user.profile ? profilePath : user.profile,
    },
  });
  return {
    success: true,
    data: res,
    message: "User updated successfully",
  };
};
