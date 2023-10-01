'use client'
import Link from "next/link";
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
import { useEffect, useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { Notebook } from "@prisma/client";
import { useRouter } from "next/router";
import axios from "axios";

interface NotebookProps {
    name: string,
}

const CreateNotebook = () => {
    const [input, setInput] = useState<string>('')
    const router = useRouter()
    
    const { mutate: notebook, isLoading} = useMutation({
        mutationFn: async ({ name }: NotebookProps) => {
            const payload: NotebookProps = {name}
            const { data } = await axios.post('/api/notebook/create', payload)
            return data
        }
    })

    
}