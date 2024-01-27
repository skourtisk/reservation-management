"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Corrected from "next/navigation"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

export default function Home() {
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Firebase hook
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  // Next.js router
  const router = useRouter();

  // Function to handle sign up
  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      setEmail("");
      setPassword("");
      router.push("/signin");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 bg-white md:grid-cols-2">
        <div className="bg-[#16202a] text-white flex items-center justify-center flex-col">
          <div className="my-4">
            <h1 className="text-4xl font-bold text-center">Sign Up</h1>{" "}
            <p className="mt-4 text-xl text-slate-400">
              Keep track of your reservations like never before
            </p>
          </div>
          <div>
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
            <Button
              onClick={handleSignUp}
              variant="outline"
              className="w-full mt-6 bg-indigo text-md
              ] rounded-full hover:bg-indigo-600"
            >
              Register
            </Button>
          </div>

          <p className="mt-4 text-s text-slate-400">
            Already have an account?{" "}
            <a
              className="text-indigo-500"
              href="#"
              onClick={() => router.push("/signin")}
            >
              Sign in
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
            src="/bg.jpeg"
            alt="background image"
          />
        </div>
      </div>
    </main>
  );
}
