'use client'
import { useEffect } from "react";
import {
  SidebarIcon,
} from "../../../node_modules/lucide-react";
import "react-toastify/dist/ReactToastify.css";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Note } from "../page"; 
import Link from "next/link";
import { sections } from ".././constants";

export type Note = {
  id: number;
  text: string;
  editing: boolean;
  name?: string;
  updatedAt?: Date;
  completed?: "completed" | "inProgress" | "notCompleted";
};


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



// Inside the NotebookCard component
const NotebookCard: React.FC<{ notebook: Note }> = ({ notebook }) => {
  // Array of unique names for each card
  const experimentTitles = [
    "Data Analysis with Spreadsheets",
    "Motion in One Dimension",
    "Distraction and Reaction Time",
    "The Glucometer A Study in Uncertainty",
    // Add more titles as needed
  ];

  // Use the title based on the notebook's position in the array
  const title = experimentTitles[notebook.id - 1];

  return (
    <Link href={`/notebook/${notebook.id}`}>
      <Card>
        <CardHeader>
          <div>
            <CardTitle style={{ fontSize: '14px' }}>{`Experiment ${notebook.id}`}</CardTitle>
            {/* Add a line to divide the completion status and the experiment name */}
            {/* Display the title under the experiment number */}
            <CardDescription style={{ fontSize: '12px' }}>{title}</CardDescription>
            {/* Display completion status with different colors */}
            <div style={{ borderBottom: '1px solid #ccc', margin: '4px 0' }}></div>
            <CardDescription style={{ fontSize: '12px', color: getCompletionStatusColor(notebook.completed) }}>
              {getCompletionStatusText(notebook.completed)}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {/* Add additional notebook details here */}
        </CardContent>
      </Card>
    </Link>
  );
};

// Helper function to get completion status text
const getCompletionStatusText = (status: Note["completed"]): string => {
  if (status === "completed") {
    return 'Completed';
  } else if (status === "inProgress") {
    return 'In Progress';
  } else {
    return 'Not Started';
  }
};

// Helper function to get completion status color
const getCompletionStatusColor = (status: Note["completed"]): string => {
  if (status === "completed") {
    return 'blue'; // Completed is blue
  } else if (status === "inProgress") {
    return 'gray'; // In Progress is gray
  } else {
    return 'red'; // Not Completed is red
  }
};


export const dumNotes: Note[] = [
  {
    id: 1,
    text: "placed the weight at the top of the incline\n\nused stopwatch and tape measure\n\nnoticed a change in velocity with different weights",
    editing: false,
    updatedAt: new Date(),
    name: "Data Analysis with Spreadsheets",
    completed: "completed", // Set completed to true for the first experiment
  },
  {
    id: 2,
    text: "placed the weight at the top of the incline\n\nused stopwatch and tape measure\n\nnoticed a change in velocity with different weights",
    editing: false,
    updatedAt: new Date(),
    name: "Motion in One Dimension",
    completed: "completed", // Set completed to false for the second experiment
  },
  {
    id: 3,
    text: "placed the weight at the top of the incline\n\nused stopwatch and tape measure\n\nnoticed a change in velocity with different weights",
    editing: false,
    updatedAt: new Date(),
    name: "Distraction and Reaction Time",
    completed: "inProgress", // Set completed to true for the third experiment
  },
  {
    id: 4,
    text: "placed the weight at the top of the incline\n\nused stopwatch and tape measure\n\nnoticed a change in velocity with different weights",
    editing: false,
    updatedAt: new Date(),
    name: "The Glucometer A Study in Uncertainty",
    completed: "notCompleted", // Set completed to true for the third experiment
  },
];


const Sidebar: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <SidebarIcon />
      </SheetTrigger>
      <SheetContent side={"left"}>
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

// ... (previous imports)

// Dashboard component
export default function Dashboard() {
  const [notebooks, setNotebooks] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotebooks = async () => {
      // Fetch notebooks from the API or another source
      // For now, using the hardcoded data dumNotes
      setNotebooks(dumNotes);
      setIsLoading(false);
    };

    if (typeof window !== "undefined") {
      fetchNotebooks();
    }
  }, []);

  return (
    <div className="h-full relative">
      <div className="bg-goodpink p-4 mb-4 text-white">
        <Link href="../note-taker">
          <h1 className="text-2xl font-bold text-black">
            General Physics Lab
          </h1>
        </Link>
        {/* Add a line below the title */}
        <div className="border-b-2 border-black my-2"></div>
      </div>
      <div className="absolute left-5 h-full pr-5 pt-5 flex items-center"> {/* Add flex and items-center to center the Sidebar and the vertical line */}
        {/* Add a black vertical line extending downward */}

        {/* Render the Sidebar component */}
        <Sidebar />
      </div>
      <main className="w-full md:pl-64 flex justify-center items-center"> {/* Add flex and justify-center to center the content */}
        <div>
          <NotebookPreview notebooks={dumNotes} />
        </div>
      </main>
    </div>
  );
}






