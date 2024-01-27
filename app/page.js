"use client";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { MdDashboard } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineHelp } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { columns, PR } from "@/app/columns";
import { RiReservedLine } from "react-icons/ri";
import { usePrStore } from "./store/prstore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosSettings } from "react-icons/io";
import { doc, collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { getTotalPeople } from "@/components/sortReservations";
import { DataTable } from "./DataTable";
import { Skeleton } from "@/components/ui/skeleton";
export default function Home() {
  const [user] = useAuthState(auth);
  const [prs, setPrs] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Check if user is logged in, if not redirect to signup page
  const userSession =
    typeof window !== "undefined" ? sessionStorage.getItem("user") : null;
  if (!user && !userSession) {
    router.push("/signup");
  }

  // Fetch PRs when the component mounts or when the user changes
  useEffect(() => {
    const fetchPrs = async () => {
      if (user) {
        const prsRef = collection(doc(db, "users", user.uid), "prs");
        const prsSnapshot = await getDocs(prsRef);
        const prsData = prsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPrs(prsData);
        setLoading(false);
      }
    };
    fetchPrs();
  }, [user]);

  return (
    <div className="flex flex-row bg-slate-200 h-screen items-center">
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
                <h1 className=" text-indigo-700">Dashboard</h1>
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
                <h1 className=" text-neutral-700">Settings</h1>
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
                onClick={() => {
                  signOut(auth);
                  sessionStorage.removeItem("user");
                  router.push("/signin");
                }}
                className="text-xl hover:bg-slate-200 flex justify-start w-2/4 p-8 shadow-md rounded-xl "
              >
                <FaSignOutAlt className="mr-4 " />
                <h1 className=" text-red-700">Sign out</h1>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Skeleton className=" ml-[600px] w-[100px] h-[100px]" rounded-full />
        </div>
      ) : (
        <div className=" flex flex-col justify-center items-center  bg-slate-200">
          <div className="flex flex-row justify-evenly grid-rows-1 panels">
            <div className="panels p-14">
              <div className="w-80 h-32 bg-slate-100 gap-5 justify-center items-center shadow-md rounded-2xl">
                <div className="flex flex-row justify-evenly items-center">
                  <div className="left">
                    <div className="title text-slate-400 ">
                      New Reservations
                    </div>
                    <div className="reservations text-bold">
                      <h1 className="text-bold mt-8 text-4xl">
                        {prs.length > 0
                          ? prs.reduce(
                              (total, pr) =>
                                total + parseInt(pr.totalReservations),
                              0
                            )
                          : 0}
                      </h1>
                    </div>
                  </div>
                  <div className="right mt-20 text-indigo-400">
                    <Button
                      onClick={() => router.push("/prmanagement")}
                      variant="ghost"
                    >
                      <h1 className="text-md">Details {">"} </h1>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="panels p-14">
              <div className="w-80 h-32 bg-slate-100 gap-5 justify-center items-center shadow-md rounded-2xl">
                <div className="flex flex-row justify-evenly items-center">
                  <div className="left">
                    <div className="title text-slate-400 ">
                      Total Money Owed
                    </div>
                    <div className="reservations text-bold">
                      <h1 className="text-bold mt-8 text-4xl">
                        {prs.length > 0
                          ? prs.reduce(
                              (total, pr) => total + parseInt(pr.moneyOwed),
                              0
                            )
                          : 0}{" "}
                        €
                      </h1>
                    </div>
                  </div>
                  <div className="right mt-20 text-indigo-400">
                    <Button variant="ghost">
                      <h1 className="text-md">Details {">"} </h1>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="panels p-14">
              <div className="w-80 h-32 bg-slate-100 gap-5 justify-center items-center shadow-md rounded-2xl">
                <div className="flex flex-row justify-evenly items-center">
                  <div className="left">
                    <div className="title text-slate-400 ">Total People</div>
                    <div className="reservations text-bold">
                      <h1 className="text-bold mt-8 text-4xl">
                        {prs.length > 0 ? getTotalPeople(prs) : ""}
                      </h1>
                    </div>
                  </div>
                  <div className="right mt-20 text-indigo-400">
                    <Button variant="ghost">
                      <h1 className="text-md">Details {">"} </h1>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="panels p-14">
            <div className=" bg-slate-100 justify-center items-center shadow-md rounded-2xl">
              <div className=" p-4 text-slate-400 ">Table of PRs</div>

              <div className="p-4 w-fit h-fit">
                <DataTable columns={columns} data={prs} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
