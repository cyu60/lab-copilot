"use client";
// will remove when we use react query to get data, should also use forms?
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FC, useEffect } from "react";
import {
  ArrowRight,
  FileQuestion,
  FileSymlink,
  ImagePlus,
  LucideMenu,
  PlusIcon,
  SidebarIcon,
  StickyNoteIcon,
  X,
} from "../../node_modules/lucide-react";
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
import { dummyNotes, dummyConversation, sections } from "./constants";
import { UserButton } from "@clerk/nextjs";
// import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export type Note = {
  id: number;
  text: string;
  editing: boolean;
};

const NoteTaker = () => {
  // Initialize state to hold the notes as an array of objects
  const [notes, setNotes] = useState<Note[]>(dummyNotes);
  const [userInput, setUserInput] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUserInput(e.target.value);
  };

  const [conversation, setConversation] = useState<
    ChatCompletionRequestMessage[]
  >([]);

  // Function to handle the reordering of notes after a drag
  const handleDragEnd = (result: { destination: any; source: any }) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) return;
    const reorderedNotes = [...notes];
    const [movedNote] = reorderedNotes.splice(source.index, 1);
    reorderedNotes.splice(destination.index, 0, movedNote);
    setNotes(reorderedNotes);
  };

  // const handleNewMessage = () => {
  //   // Add user's message to the conversation
  //   setConversation([
  //     ...conversation,
  //     { role: ChatCompletionRequestMessageRoleEnum.User,
  //       content: userInput
  //     },
  //   ]);

  //   try{

  //   }

  //   // Add a dummy response from the bot
  //   setTimeout(() => {
  //     setConversation([
  //       ...conversation,
  //       {
  //         role: ChatCompletionRequestMessageRoleEnum.User,
  //         content: userInput,
  //       },
  //       {
  //         role: ChatCompletionRequestMessageRoleEnum.Assistant,
  //         content: "Test response",
  //       },
  //     ]);
  //   }, 1000); // Delay to simulate response time

  //   // Clear the input field after sending the message
  //   setUserInput("");
  // };

  const handleNewMessage = async () => {
    // Add user's message to the conversation
    const userMessage: ChatCompletionRequestMessage = {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: userInput,
    };

    const newConversation = [...conversation, userMessage];
    // setConversation([
    //   ...conversation,
    //   {
    //     role: ChatCompletionRequestMessageRoleEnum.User,
    //     content: userInput,
    //   },
    // ]);
    // console.log(conversation)
    // Clear the input field after sending the message
    setUserInput("");
    try {
      // Make an API call to the OpenAI API
      const response = await axios.post("/api/ask", {
        messages: newConversation, // Pass the conversation history
      });

      // Extract the bot's response from the API response
      const botResponse = response.data;

      // Add the bot's response to the conversation
      setConversation([...newConversation, botResponse]);
    } catch (error) {
      console.error("Error sending chat message:", error);
      // Handle errors here
    }
  };

  const handleNewImage = async () => {
    try {
      setPhotos([]);

      const response = await axios.post('/api/img',{prompt:userInput});

      const urls = response.data.map((image: { url: string }) => image.url);

      setPhotos(urls);
    } catch (error: any) {
      if (error?.response?.status === 403) {
        // proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    // } finally {
      // router.refresh();
    // }
    };
  };

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Function to add a new note to the state
  const addNote = () => {
    const newId = notes.length + 1;
    const newNote: Note = {
      id: newId,
      text: "", // Starting with an empty string
      editing: true, // New note will be in editing mode
    };
    setNotes([...notes, newNote]);
  };

  // Function to add a new table note to the state
  const addTable = () => {
    const newId = notes.length + 1;
    const newTable: Note = {
      id: newId,
      text: `| Header 1 | Header 2 |\n| --- | --- |\n| Cell 1 | Cell 2 |\n| Cell 3 | Cell 4 |`, // Default table structure
      editing: true, // New table note will be in editing mode
    };
    setNotes([...notes, newTable]);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ToastContainer></ToastContainer>
      <div className="flex w-full justify-end">
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      <div className="min-h-screen bg-neutral-100 pb-10">
        <div className=" flex items-center justify-between p-4 shadow">
          <div className="flex items-center space-x-5">
            <StickyNoteIcon />
            <div className="text-2xl font-bold">Note Taker</div>
          </div>
          <ConversationSheet
            conversation={conversation}
            userInput={userInput}
            handleInputChange={handleInputChange}
            handleNewMessage={handleNewMessage}
            handleNewImage={handleNewImage}
          />
        </div>
        {/* <div className="flex w-full flex-row"> */}
        <div className="absolute left-5 h-full border-r-2 pr-5 pt-5">
          <Sidebar></Sidebar>
        </div>
        <div className="absolute right-5 pt-5">
          <Button
            className="flex items-center space-x-2 rounded bg-sky-600 px-4 py-2 hover:bg-sky-500"
            onClick={() => toast("Exporting... (TODO)")}
          >
            <FileSymlink color="white" />
            <p className="text-xl text-white">Export</p>
          </Button>
        </div>
        <div className="mt-16 flex flex-col items-center space-y-5 px-56">
          <div className="flex w-full max-w-3xl justify-center">
            <div className="w-full">
              <Notes notes={notes} setNotes={setNotes} />
            </div>
          </div>

          {/* Bottom buttons */}
          <div className="flex flex-row space-x-12">
            {/* Call the addNote function when the "Add Text" button is clicked */}
            <Button className="bg-neutral-400" onClick={addNote}>
              {" "}
              <PlusIcon />
              Add Text
            </Button>
            <Button className="bg-neutral-400" onClick={addTable}>
              {" "}
              <PlusIcon />
              Add Table
            </Button>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default NoteTaker;

const Sidebar: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <SidebarIcon />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>General Physics</SheetTitle>
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

type ConversationSheetProps = {
  conversation: ChatCompletionRequestMessage[]; // Update this with the correct type of conversation
  userInput: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNewMessage: () => void;
  handleNewImage: () => void;
};

const ConversationSheet: React.FC<ConversationSheetProps> = ({
  conversation,
  userInput,
  handleInputChange,
  handleNewMessage,
  handleNewImage,
}) => (
  <Sheet>
    <SheetTrigger>
      <Button className="flex items-center space-x-2 rounded bg-sky-600 px-4 py-2 hover:bg-sky-500">
        <FileQuestion color="white" />
        <p className="text-xl text-white">Ask</p>
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Conversation with Copilot Bot</SheetTitle>
      </SheetHeader>
      <div className="flex h-full flex-col py-8">
        <div className="flex-grow overflow-y-auto">
          {conversation.map((message, index) => (
            <div
              key={index}
              className={`p-2 ${
                message.role === "assistant" ? "bg-neutral-100" : ""
              }`}
            >
              <strong>
                {message.role === "assistant" ? "Copilot Bot" : "You"}:
              </strong>{" "}
              {message.content}
            </div>
          ))}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            className="flex-grow rounded border p-2"
            placeholder="Type your message..."
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={(e) =>
              e.key === "Enter" && e.shiftKey === false
                ? handleNewMessage()
                : null
            }
          />
          <Button
            className="ml-2 rounded bg-sky-600 px-4 py-2 text-white"
            onClick={() => void handleNewMessage()}
          >
            <ArrowRight />
          </Button>
          <Button
            className="ml-2 rounded bg-sky-600 px-4 py-2 text-white"
            onClick={() => void handleNewImage()}
          >
            <ImagePlus />
          </Button>
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

type NotesProps = {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
};

const Notes: React.FC<NotesProps> = ({ notes, setNotes }) => {
  // Function to handle changing the text of a note
  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    id: number,
  ) => {
    const newText = e.target.value;
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, text: newText } : note)),
    );
  };

  // Function to handle enabling or disabling editing for a note
  const toggleEditing = (id: number) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, editing: !note.editing } : note,
      ),
    );
  };

  // Function to delete a note by its ID
  const deleteNote = (id: number) => {
    // Filter out the note with the matching ID
    const newNotes = notes.filter((note) => note.id !== id);

    // Set the state with the new array
    setNotes(newNotes);
  };
  return (
    <Droppable droppableId="notes">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex w-full max-w-3xl flex-col justify-center space-y-4"
        >
          {notes.map((note, index) => (
            <div
              key={note.id}
              className="flex w-full max-w-3xl flex-col justify-center"
            >
              <Draggable draggableId={String(note.id)} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="prose relative flex justify-center bg-white p-6 shadow"
                  >
                    {/* Delete button */}
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="absolute right-2 top-2"
                    >
                      <X />
                    </button>

                    {/* Hamburger icon for dragging */}
                    <div
                      {...provided.dragHandleProps}
                      className="absolute right-2 top-[45%] flex h-6 w-6 cursor-move items-center justify-center"
                    >
                      <LucideMenu />
                    </div>

                    {/* The rest of the note JSX */}
                    {note.editing ? (
                      <textarea
                        value={note.text || ""}
                        onChange={(e) => handleTextChange(e, note.id)}
                        onBlur={() => toggleEditing(note.id)}
                        rows={Math.min(
                          Math.max(note.text.split("\n").length, 1),
                          10,
                        )}
                        className="w-full resize-none border-0 outline-none"
                        autoFocus
                      />
                    ) : (
                      <div
                        onClick={() => toggleEditing(note.id)}
                        className="prose min-h-[20px] w-full cursor-pointer p-1 text-base font-normal text-black"
                      >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {note.text || "*Click to add content*"}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            </div>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
