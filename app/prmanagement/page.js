"use client";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { MdDashboard } from "react-icons/md";
import { useEffect } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineHelp } from "react-icons/md";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosSettings } from "react-icons/io";
import { RiReservedLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { DialogAdd } from "@/components/ui/dialogDemoAdd";
import { usePrStore } from "../store/prstore";
import { db } from "@/app/firebase/config";
import { collection, getDocs, doc } from "firebase/firestore";
import Pr from "@/components/Pr";
import { Skeleton } from "@/components/ui/skeleton";

export default function PrHandler() {
  // Hooks for user authentication and routing
  const [user] = useAuthState(auth);
  const router = useRouter();

  // State for loading status
  const [loading, setLoading] = useState(true);

  // Get user session from sessionStorage if available

  // If no user, redirect to signup
  useEffect(() => {
    const userSession =
      typeof window !== "undefined" ? sessionStorage.getItem("user") : null;

    if (!user && !userSession) {
      router.push("/signup");
    }
  }, []);

  // Fetch PRs when user changes
  useEffect(() => {
    if (user) {
      const userId = user.uid;
      getPrs(userId);
      setLoading(false);
    }
  }, [user]);

  // Use PR store
  const PrStore = usePrStore((state) => state);

  // Get PRs from PR store
  const PRs = PrStore.PRs;

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [prsPerPage] = useState(10);

  // Get current PRs
  const indexOfLastPr = currentPage * prsPerPage;
  const indexOfFirstPr = indexOfLastPr - prsPerPage;
  const currentPrs = PRs.slice(indexOfFirstPr, indexOfLastPr);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to fetch PRs from Firestore
  async function getPrs(userId) {
    const prsRef = collection(doc(db, "users", userId), "prs");
    const prsSnapshot = await getDocs(prsRef);
    const prs = prsSnapshot.docs.map((doc) => doc.data());
    PrStore.setPRs(prs);
  }

  return (
    <div className="flex flex-row  items-center">
      <div className="mainmenu">
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
                <h1 className=" text-indigo-700">Edit PRs</h1>
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
                variant="Ghost"
                onClick={() => router.push("/settings")}
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
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      ) : (
        <div className="w-full flex flex-col items-center h-screen bg-slate-200">
          <div className="flex justify-center p-4">
            <DialogAdd />
          </div>
          <div className="divider flex items-center justify-center">
            <div className="h-px w-3/4 mt-8 bg-slate-300"></div>
          </div>
          <div className="grid overflow grid-cols-5 grid-rows-2 gap-y-32">
            {currentPrs.map((PR, i) => (
              <Pr key={i} {...PR} />
            ))}
          </div>
          <div className="flex justify-center rounded-xl mt-48 shadow-md bg-white w-fit p-4 items-center text-4xl ">
            {Array(Math.ceil(PRs.length / prsPerPage))
              .fill()
              .map((_, i) => (
                <button key={i} onClick={() => paginate(i + 1)}>
                  {i + 1} {currentPage === i + 1 && "👈"}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
