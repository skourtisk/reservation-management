"use client";
import { Button } from "@/components/ui/button"
import { v4 as uuidv4 } from 'uuid';

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoPersonAdd } from "react-icons/io5"
import { usePrStore } from "@/app/store/prstore"
import { collection, addDoc,setDoc,doc } from "firebase/firestore"; 
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { db } from "@/app/firebase/config";



export function DialogAdd() {
  const [user] = useAuthState(auth);

  // Use PR store
  const prStore = usePrStore(state => state);

  // State for name
  const [name, setName] = useState("");

  // Generate a new ID
  const newId = uuidv4();

  // Function to handle PR addition
  async function handlePrAdd() {
    // Create new PR
    const newPr = {
      id: newId,
      name: name,
      reservations: "",
      totalReservations: 0,
      moneyOwed: 0,
      totalPeople:0,
    };

    // Add new PR to state
    prStore.addPR(newPr);

    // Add new PR to Firestore
    const prRef = doc(db, 'users', user.uid, 'prs', newId);
    await setDoc(prRef, newPr);
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button
          variant="outline"
          className="text-2xl hover:bg-slate-200 flex justify-start w-34 p-8 shadow-md rounded-xl "
        >
          <div className="flex justify-between ">
            <h1 className=" text-neutral-700">Add PR</h1>
            <IoPersonAdd className="ml-4" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add PR</DialogTitle>
          <DialogDescription>
            Add a PR to your team.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} onChange={
              (e) => setName(e.target.value)
} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
        <DialogTrigger asChild>
          <Button onClick={handlePrAdd} type="submit">Add</Button>
        </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
