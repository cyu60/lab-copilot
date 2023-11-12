'use client'
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FC, useEffect } from "react";
import {
  SidebarIcon,
} from "../../../node_modules/lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
} from "openai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import { jsPDF } from "jspdf";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
//import Navbar from "@/components/Navbar";
//import Sidebar from "@/components/Sidebar";
import Empty from "@/components/Empty";
import { dummyNotes } from "../dummynotes";
// import Note from "./page"
import { Note } from "../page"; 
import Link from "next/link";
import { dummyConversation, sections } from ".././constants";

type NotebookPreviewProps = {
  notebooks: Note[];
};

const NotebookPreview: React.FC<NotebookPreviewProps> = ({ notebooks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 md:pr-10">
      {notebooks.map((notebook) => (
        <NotebookCard key={notebook.id} notebook={notebook} />
      ))}
    </div>
  );
};



const NotebookCard: React.FC<{ notebook: Note }> = ({ notebook }) => {
  return (
    <Link href={`/notebook/${notebook.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{notebook.name}</CardTitle>
          <CardDescription>Last updated: {new Date(notebook.updatedAt!).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add additional notebook details here */}
        </CardContent>
      </Card>
    </Link>
  );
};

export const dumNotes: Note[] = [
  {
    id: 1,
    text: "placed the weight at the top of the incline\n\nused stopwatch and tape measure\n\nnoticed a change in velocity with different weights",
    editing: false,
    updatedAt: new Date(),
  },
  {
    id: 2,
    text: "placed the weight at the top of the incline\n\nused stopwatch and tape measure\n\nnoticed a change in velocity with different weights",
    editing: false,
    updatedAt: new Date(),
  },
  {
    id: 3,
    text: "placed the weight at the top of the incline\n\nused stopwatch and tape measure\n\nnoticed a change in velocity with different weights",
    editing: false,
    updatedAt: new Date(),
  },
];

const Sidebar: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <SidebarIcon />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <Link href="note-taker/courseDash">
              <SheetTitle>General Physics</SheetTitle>
          </Link>
        </SheetHeader>
        <div className=" p-4">
          {sections.map((section, idx) => (
            <div key={idx} className="flex flex-col pb-2">
              {section.items ? (
                <h4 className="pb-1 text-xl font-semibold">{section.title}</h4>
              ) : (
                <h3 className="pb-2 text-2xl font-bold">{section.title}</h3>
              )}
              {section.items && (
                <ol className="rounded bg-neutral-200 py-2">
                  {section.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="border-b border-neutral-300 py-2 pl-2 text-lg last:border-0"
                    >
                      {item}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default function Dashboard() {
  const [notebooks, setNotebooks] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotebooks = async () => {
      // const res = await fetch('/api/getNotebooks');
      // const body = await res.json();
      setNotebooks(notebooks);
      setIsLoading(false);
    };
    if (typeof window !== "undefined") {
      fetchNotebooks();
    }
  }, []);
  
  return (
    <div className="h-full relative">
       <div className="absolute left-5 h-full border-r-2 pr-5 pt-5">
          <Sidebar></Sidebar>
        </div>
      <div className="hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-goodpink">
        <div>
          {/* <Sidebar></Sidebar> */}
        </div>
      </div>
      <main className="md:pl-64">
        {/* <Navbar></Navbar> */}
        <div>
        <NotebookPreview notebooks={dumNotes} />
        </div>
      </main>
    </div>
  );
}