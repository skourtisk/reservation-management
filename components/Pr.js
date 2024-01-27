"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogEdit } from "./ui/dialogDemoEdit";
import { DialogShow } from "./ui/dialogDemoShow";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { Button } from "./ui/button";
import { usePrStore } from "@/app/store/prstore.js";
import { db } from "@/app/firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

// Main component
export default function Pr(props) {
  // Destructure props
  const { id, name, reservations, moneyOwed } = props;

  // Use Firebase auth state hook
  const [user] = useAuthState(auth);

  // Remove the PR function
  const prRemove = usePrStore((state) => state.removePR);

  // Function to handle PR removal
  const handleRemove = async () => {
    // Remove PR from state
    prRemove(id);

    // Remove the PR from Firestore
    const prRef = doc(db, "users", user.uid, "prs", id);
    await deleteDoc(prRef);
  };

  return (
    <div className="logo p-4 flex  h-48 items-center flex-col">
      <div className="logo-wrapper bg-white  shadow-lg p-4 w-52 b rounded-lg flex justify-center flex-col items-center">
        <Avatar className="w-16 h-16">
          <AvatarFallback className="text-2xl font-bold bg-slate-700 text-white">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h1 className=" text-md mt-2 font-bold text-left text-gray-700">
          {name}
        </h1>
        <div className=" flex flex-col ">
          <div className="flex flex-row justify-center items-center">
            <h1 className="text-md  font-bold text-left text-gray-700">
              Reservations:
            </h1>
            <DialogShow pr={props} />
          </div>
          <h1 className="text-md mt-2 font-bold text-left text-gray-700">
            Total Reservations:{" "}
            {
              reservations
                .split("\n")
                .map((n) => n.trim())
                .filter((n) => n != "").length
            }
          </h1>
          <h1 className="text-md mt-2 font-bold text-left text-gray-700">
            Money Owed: {moneyOwed}
          </h1>
        </div>
        <div className="flex flex-row justify-center items-center gap-4">
          <DialogEdit pr={props} />
          <Button
            variant="outline"
            onClick={handleRemove}
            className="text-xl hover:bg-slate-200 flex   shadow-md rounded-xl "
          >
            <RiDeleteBin7Fill />
          </Button>
        </div>
      </div>
    </div>
  );
}
