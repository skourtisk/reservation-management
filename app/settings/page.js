"use client";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { MdDashboard } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineHelp } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RiReservedLine } from "react-icons/ri";
import { updateProfile } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosSettings } from "react-icons/io";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updatePassword } from "firebase/auth";
import { updateEmail } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [error, setError] = useState(false);

  // Check if user is logged in, if not redirect to signup page
  const userSession =
    typeof window !== "undefined" ? sessionStorage.getItem("user") : null;
  if (!user && !userSession) {
    router.push("/signup");
  }

  // Function to handle photo change
  const handlePhotoChange = async () => {
    try {
      await updateProfile(auth.currentUser, { photoURL: photo });
      setPhoto("");
    } catch (e) {
      console.log(e);
    }
  };

  // Function to handle username change
  const handleUsername = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName: username });
      setUsername("");
    } catch (e) {
      console.log(e);
    }
  };

  // Function to handle password change
  const handleChangePassword = async () => {
    try {
      await updatePassword(auth.currentUser, password);
      setPassword("");
    } catch (e) {
      console.log(e);
      setError(true);
    }
    setError(false);
  };

  // Function to handle email change
  const handleChangeEmail = async () => {
    try {
      await updateEmail(auth.currentUser, email);
      await sendEmailVerification(auth.currentUser);
    } catch (e) {
      console.log(e);
      setErrorEmail(true);
    }
    setErrorEmail(false);
  };

  // Function to handle sign out
  const handleSignOut = () => {
    signOut(auth);
    sessionStorage.removeItem("user");
    router.push("/signin");
  };

  // Function to send email verification
  const handleSendEmailVerification = () => {
    sendEmailVerification(auth.currentUser);
  };

  return (
    <div className="flex flex-row">
      <div className="mainmenu ">
        <div className=" h-screen shadow-lg w-96  p-4  relative hidden md:block  bg-slate-100 ">
          <div className="logo p-4 flex gap-2 items-center flex-col">
            <div className="logo-wrapper shadow-lg p-4 w-52 rounded-lg flex justify-center flex-col items-center">
              <Avatar className="w-16 h-16">
                {user?.photoURL ? (
                  <AvatarImage src={user.photoURL} />
                ) : (
                  <AvatarFallback className="text-2xl font-bold bg-slate-700 text-white">
                    {user?.displayName
                      ? user.displayName.charAt(0)
                      : user?.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>

              <h1 className="text-xl mt-2 font-bold text-center text-gray-700">
                Welcome back,{"\n"}
                {user?.displayName
                  ? user.displayName
                  : user?.email.split("@")[0]}
              </h1>
            </div>
            <div>
              <h1 className="text-4xl mt-4 font-semibold text-center text-gray-700">
                ErvereS
              </h1>
              <h1 className="text-2xl font-normal text-center text-gray-400">
                Management
              </h1>
            </div>
          </div>

          <div id="menu">
            <h1 className=" ml-10 p-4 text-slate-400">MAIN MENU</h1>

            <div className="button-wrapper button-menu justify-center items-center flex flex-col gap-7">
              <Button
                variant="Ghost"
                onClick={() => router.push("/")}
                className="text-2xl hover:bg-slate-200 flex justify-start w-3/4 p-8 shadow-md rounded-xl "
              >
                <MdDashboard className="mr-4" />
                <h1 className=" text-neutral-700">Dashboard</h1>
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push("/prmanagement")}
                className="text-2xl hover:bg-slate-200 flex justify-start w-3/4 p-8 shadow-md rounded-xl "
              >
                <IoPersonSharp className="mr-4" />
                <h1 className=" text-neutral-700">Edit PRs</h1>
              </Button>
              <Button
                variant="ghost"
                className="text-2xl hover:bg-slate-200 flex justify-start w-3/4 p-8 shadow-md rounded-xl "
              >
                <div className="flex justify-between ">
                  <RiReservedLine className="mr-4" />
                  <h1 className=" text-neutral-700">Reservations</h1>
                </div>
              </Button>
            </div>
          </div>
          <div className="divider flex items-center justify-center">
            <div className="h-px w-3/4 mt-8 bg-slate-300"></div>
          </div>
          <div id="menu">
            <h1 className=" ml-10 p-4 text-slate-400">PREFERENCES</h1>

            <div className="button-wrapper button-menu justify-center items-center flex flex-col gap-8">
              <Button
                onClick={() => router.push("/settings")}
                variant="Ghost"
                className="text-2xl hover:bg-slate-200 flex justify-start w-3/4 p-8 shadow-md rounded-xl "
              >
                <IoIosSettings className="mr-4" />
                <h1 className=" text-indigo-700">Settings</h1>
              </Button>
              <Button
                variant="ghost"
                className="text-2xl hover:bg-slate-200 flex justify-start w-3/4 p-8 shadow-md rounded-xl "
              >
                <MdOutlineHelp className="mr-4" />
                <h1 className=" text-neutral-700">Help</h1>
              </Button>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="text-xl hover:bg-slate-200 flex justify-start w-2/4 p-8 shadow-md rounded-xl "
              >
                <FaSignOutAlt className="mr-4 " />
                <h1 className=" text-red-700">Sign out</h1>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-screen w-screen bg-slate-200">
        <div className="bg-white rounded-lg p-8">
          <h1 className="text-slate-400">Settings</h1>
          <div>
            <Label className="text-lg" htmlFor="changeUsername">
              Change username
            </Label>
            <Input
              className="mt-2 bg-transparent rounded-full"
              type="text"
              id="changeusername"
              placeholder="Enter your username..."
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <Button
              type="submit"
              onClick={handleUsername}
              variant="outline"
              className="w-full mt-6 mb-8 bg-indigo text-md
                    ] rounded-full hover:bg-indigo-600"
            >
              Change Username
            </Button>
            <Label className="text-lg" htmlFor="verifyEmail">
              Verify Email
            </Label>
            <Button
              type="submit"
              onClick={handleSendEmailVerification}
              variant="outline"
              className="w-full mt-6 mb-8 bg-indigo text-md
                    ] rounded-full hover:bg-indigo-600"
            >
              Send Verification Email
            </Button>

            <Label className="text-lg" htmlFor="email">
              Email
            </Label>
            <Input
              className="mt-2 bg-transparent rounded-full"
              type="email"
              id="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              onClick={handleChangeEmail}
              variant="outline"
              className="w-full mt-6 mb-8 bg-indigo text-md
              ] rounded-full hover:bg-indigo-600"
            >
              Change Email
            </Button>
            {errorEmail ? (
              <h1 className="flex text-red-500 items-center justify-center">
                Verify Email before changing it!
              </h1>
            ) : (
              <h1></h1>
            )}
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
              type="submit"
              onClick={handleChangePassword}
              variant="outline"
              className="w-full mt-6 bg-indigo text-md
              ] rounded-full hover:bg-indigo-600"
            >
              Change Password
            </Button>
            {error ? (
              <h1 className="flex text-red-500 items-center justify-center">
                Wrong password format
              </h1>
            ) : (
              <h1></h1>
            )}
            <Label className="text-lg" htmlFor="password">
              Photo
            </Label>
            <Input
              className="mt-2 mb-4 bg-transparent rounded-full"
              type="text"
              id="photo"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="Enter photo URL from the Web!"
            />

            <Button
              type="submit"
              onClick={handlePhotoChange}
              variant="outline"
              className="w-full mt-6 bg-indigo text-md
              ] rounded-full hover:bg-indigo-600"
            >
              Change Photo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
