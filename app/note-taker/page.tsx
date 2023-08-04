"use client";
// will remove when we use react query to get data
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { PlusIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface pageProps {}
import React, { useState } from "react";
// import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const NoteTaker = () => {
  // Initialize state to hold the notes as an array of objects
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: "placed the weight at the top of the incline\n\nused stopwatch and tape measure\n\nnoticed a change in velocity with different weights",
    },
    {
      id: 2,
      text: "placed the weight at the top of the incline\n\nused stopwatch and tape measure\n\nnoticed a change in velocity with different weights",
    },
  ]);

  // Function to add a new note to the state
  const addNote = () => {
    // Generate a new unique ID for the note
    const newId = notes.length + 1;

    // Create a new note object
    const newNote = {
      id: newId,
      text: "New note text", // You can set a default text here or an empty string
    };

    // Add the new note to the state
    setNotes([...notes, newNote]);
  };

  return (
    <div className="bg-neutral-100 h-screen">
      <div className="px-56 flex flex-col  space-y-5 items-center">
        <div className="text-center text-black text-4xl font-bold py-4">
          Note Taker
        </div>
        {/* Loop through the notes state and display each note */}
        {notes.map((note) => (
          <div
            key={note.id}
            className="max-w-3xl w-full p-6 bg-white shadow prose"
          >
            <div className="text-black text-base font-normal prose">
              {/* Render the markdown content using ReactMarkdown */}
              <ReactMarkdown>{note.text || ""}</ReactMarkdown>
            </div>
            {/* <ReactMarkdown>{note.text as string || ""}</ReactMarkdown> */}
            {/* <div className="text-black text-base font-normal">{note.text}</div> */}
          </div>
        ))}

        {/* Bottom buttons */}
        <div className="flex flex-row space-x-12">
          {/* Call the addNote function when the "Add Text" button is clicked */}
          <Button className="bg-neutral-300" onClick={addNote}>
            {" "}
            <PlusIcon />
            Add Text
          </Button>
          <Button className="bg-neutral-300">
            {" "}
            <PlusIcon />
            Add Table
          </Button>
        </div>
        <Button className="bg-sky-600 w-36"> Export</Button>
      </div>
    </div>
  );
};

export default NoteTaker;

// const page: FC<pageProps> = ({}) => {

//   return (
//     <div className="bg-neutral-100 h-screen">
//       <div className="px-56 flex flex-col  space-y-5 items-center">
//         <div className="text-center text-black text-4xl font-bold py-4">
//           Note Taker
//         </div>
//         <div className="max-w-3xl w-full p-6 bg-white shadow">
//           <div className=" text-black text-base font-normal">
//             placed the weight at the top of the incline
//             <br />
//             used stopwatch and tape measure
//             <br />
//             <br />
//             noticed a change in velocity with different weights
//           </div>
//         </div>
//         <div className="max-w-3xl w-full p-6 bg-white shadow">
//           <div className=" text-black text-base font-normal">
//             placed the weight at the top of the incline
//             <br />
//             used stopwatch and tape measure
//             <br />
//             <br />
//             noticed a change in velocity with different weights
//           </div>
//         </div>
//         {/* Bottom buttons */}
//         <div className="flex flex-row space-x-12 ">
//           <Button className="bg-neutral-300">
//             {" "}
//             <PlusIcon />
//             Add Text
//           </Button>
//           <Button className="bg-neutral-300">
//             {" "}
//             <PlusIcon />
//             Add Table
//           </Button>
//         </div>
//         <Button className="bg-sky-600 w-36"> Export</Button>
//       </div>
//     </div>
//   );
// };

// export default page;
