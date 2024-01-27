"use client";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { provider } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const [user] = useAuthState(auth);

  const handleSignInGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      console.log({ res });
      if (typeof window !== "undefined") {
        sessionStorage.setItem("user", true);
      }
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (!res) {
        setError(true);
        return;
      }
      console.log({ res });
      if (typeof window !== "undefined") {
        sessionStorage.setItem("user", true);
      }
      setEmail("");
      setPassword("");
      setError(false);
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 bg-white md:grid-cols-2">
        <div className="bg-[#16202a] text-white flex items-center justify-center flex-col">
          <div className="my-4">
            <h1 className="text-4xl font-bold text-center">Sign In</h1>{" "}
            <p className="mt-4 text-xl text-slate-400">
              Keep track of your reservations like never before
            </p>
          </div>
          <div>
            <Button
              onClick={handleSignInGoogle}
              className="flex my-8 text-lg items-center w-full gap-4 px-16 py-4 bg-transparent rounded-full"
              variant="outline"
            >
              <FcGoogle />
              Sign In with Google
            </Button>
            <h1 className="flex justify-center text-slate-300">OR</h1>
            <Label className="text-lg" htmlFor="email">
              Email
            </Label>
            <Input
              className="mt-2 mb-4 bg-transparent rounded-full"
              type="email"
              id="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label className="text-lg" htmlFor="password">
              Password
            </Label>
            <Input
              className="mt-2 mb-4 bg-transparent rounded-full"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
            />
            {error ? (
              <h1 className="flex text-red-500 items-center justify-center">
                Wrong email or password
              </h1>
            ) : (
              <h1></h1>
            )}

            <Button
              type="submit"
              onClick={handleSignIn}
              variant="outline"
              className="w-full mt-6 bg-indigo text-md
              ] rounded-full hover:bg-indigo-600"
            >
              Sign In
            </Button>
          </div>

          <p className="mt-4 text-s text-slate-400">
            Don`&apos;`t have an account?
            <a
              className="text-indigo-500"
              href="#"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </a>
          </p>

          <p className="mt-4 text-cs text-slate-200">
            @2023 All rights reserved
          </p>
        </div>
        <div className="relative hidden md:block">
          <Image
            className="object-cover"
            fill={true}
            src="/bglogin.jpeg"
            alt="background image"
          />
        </div>
      </div>
    </main>
  );
}
