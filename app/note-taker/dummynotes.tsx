import { Note } from "./page";
// import fs from "fs";

export const dummyNotes: Note[] = [
  {
    id: 1,
    text: "placed the weight at the top of the incline\n\nused stopwatch and tape measure\n\nnoticed a change in velocity with different weights",
    editing: false,
  },
  {
    id: 2,
    text: "placed the weight at the top of the incline\n\nused stopwatch and tape measure\n\nnoticed a change in velocity with different weights",
    editing: false,
  },
  {
    id: 3,
    text: "placed the weight at the top of the incline\n\nused stopwatch and tape measure\n\nnoticed a change in velocity with different weights",
    editing: false,
  },
];

// export function exportConcatenatedTextToJson(notes:Note[]) {
//   // Extract the 'text' field from each object and concatenate them into one big string
//   const concatenatedText = notes.map((note) => note.text).join('\n\n');

//   const data = {
//     concatenatedText,
//   };

//   // Convert the object to a JSON-formatted string
//   const jsonString = JSON.stringify(data, null, 2); // The second argument (null) is for replacer, and the third argument (2) is for the number of spaces to use for indentation

//   // Save the JSON string to a file
//   fs.writeFileSync('concatenated-text.json', jsonString);

//   console.log('Data saved to concatenated-text.json');
//   console.log(concatenatedText);
// }

// Usage example:
// exportConcatenatedTextToJson(dummyNotes);




