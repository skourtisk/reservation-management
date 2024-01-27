"use client";
import { Button } from "@/components/ui/button"
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
import { MdModeEdit } from "react-icons/md";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoPersonAdd } from "react-icons/io5"
import { usePrStore } from "@/app/store/prstore"
import { setDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { db } from "@/app/firebase/config";

import { Textarea } from "./textarea";

export function DialogEdit(props) {
  // Use PR store
  const prStore = usePrStore(state => state);

  // Get PR from props
  const pr = props.pr;

  // State for name, reservations, and money owed
  const [name, setName] = useState(pr.name);
  const [reservations, setReservations] = useState(pr.reservations);
  const [moneyOwed, setMoneyOwed] = useState(pr.moneyOwed);

  // Use Firebase auth state hook
  const [user] = useAuthState(auth);

  // Function to handle PR editing
  async function handlePrEdit() {
    // Create updated PR
    const updatedPr = {
      id: pr.id,
      name: name,
      reservations: reservations,
      totalReservations: reservations.split("\n")
        .map((n) => n.trim())
        .filter((n) => n != "").length,
      moneyOwed: moneyOwed,
    };

    // Update PR in state
    prStore.updatePR(updatedPr);

    // Update the PR in Firestore
    const prRef = doc(db, 'users', user.uid, 'prs', pr.id);
    await setDoc(prRef, updatedPr, { merge: true });
  }



  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button
          variant="outline"
          className="text-xl hover:bg-slate-200 flex   shadow-md rounded-xl "
        >
         <MdModeEdit />
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
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <div className="text-sm">
              <div className="text-black">Example Reservations:</div>
        <div className="text-gray-400">2 ατ Σκουρτης 3πριμφ</div>
        <div className="text-gray-400">15 ατ Ρεντιον</div>
        <div className="text-gray-400">6 ατ Αλι 2φ</div>
        <div className="text-gray-400">12 ατ Λογιοτατος 2φ 3πρεφ</div>
              </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            
            <Label htmlFor="name" className="text-right">
              Reservations
         
        
            </Label>
            <Textarea id="name" rows={5} cols={100}  value={reservations} onChange={(e) => setReservations(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Money Owed
            </Label>
            <Input id="name" value={moneyOwed} onChange={(e) => setMoneyOwed(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
        <DialogTrigger asChild>
          <Button onClick={
            handlePrEdit
          } type="submit">Done</Button>
        </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
