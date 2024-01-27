"use client";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getReservations } from "../sortReservations";

import { FaRegEye } from "react-icons/fa";


export function DialogShow(props) {
  
  const pr = props.pr;
 

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button
          variant="ghost"
          className="text-sm hover:bg-slate-200 flex    rounded-xl "
        >
         <FaRegEye />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reservations</DialogTitle>
          <DialogDescription>
            {pr.name}'s reservations
          </DialogDescription>
        </DialogHeader>
       
        <div className="grid gap-4 py-4">
           {
           getReservations(pr.reservations).split("\n").map((item, i) => {
            return <p key={i}>{item}</p>;


           })}
        </div>
        <DialogFooter>
        
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
