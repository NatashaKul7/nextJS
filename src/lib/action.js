"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import { Post, User } from "./models";
import { connectToDb } from "./utils";

import bcrypt from "bcryptjs";

export const addPost = async (previousState, formData) => {
  const { title, desc, slug, userId, img } = Object.fromEntries(formData);
  try {
    connectToDb();
    const newPost = new Post({ title, desc, slug, userId, img });

    await newPost.save();
    console.log("saved to DB");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    console.log("deleted from DB");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const addUser = async (previousState, formData) => {
  const { username, email, password, img } = Object.fromEntries(formData);
  try {
    connectToDb();
    const newUser = new User({ username, email, password, img });

    await newUser.save();
    console.log("saved to DB");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from DB");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (previousState, formData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Password doesn't match" };
  }

  try {
    connectToDb();

    const user = await User.findOne({ username });
    if (user) {
      return { error: "User already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log("Saved to db");

    return { success: true };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const login = async (previousState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (error) {
    if (error.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw error;
  }
};
