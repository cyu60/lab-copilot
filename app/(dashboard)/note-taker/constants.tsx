"use client";
import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
} from "openai";
import { Note } from "./page";

export const dummyConversation: ChatCompletionRequestMessage[] = [
  {
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
    content:
      "The weight should be placed at the top of the incline in order to maximize the distance it will be able to travel across the table.",
  },
  {
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: "What does the data I'm collecting supposed to represent?",
  },
  {
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
    content:
      "The data you are collecting will be divided into three parts: Weight (kg), Distance (cm), and Time (s).",
  },
];
export const dummyNotes: Note[] = [
  {
    id: 1,
    text: "placed the weight at the top of the incline\n\nused stopwatch and tape measure\n\nnoticed a change in velocity with different weights",
    editing: false,
  },
];
export const sections = [
  { title: "Laboratory I X" },
  {
    title: "Class Information",
    items: [
      "Course Policies",
      "Lab Notebook",
      "Laboratory Safety",
      "General Lab Equipment",
      "Uncertainty in Measurement and Significant Figures",
    ],
  },
  {
    title: "Experiments",
    items: [
      "Data Analysis with Spreadsheets",
      "Motion in One Dimension",
      "The Glucometer: A Study in Uncertai.",
      "Distraction and Reaction Time",
      "Calibrating a Cannon",
      "Projectile Motion: Hitting a Target",
      "Conservation of Momentum: Inelasti...",
      "Moment of Inertia",
    ],
  },
  { title: "Pre-Lab Quiz" },
  { title: "Lab Experiment Procedure" },
];
