'use client'
import { Button } from "@/components/ui/button";
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
import Empty from "@/components/Empty";
import { Notebook } from "@prisma/client";

type NotebookPreviewProps = {
  notebooks: Notebook[];
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

const NotebookCard: React.FC<{ notebook: Notebook }> = ({ notebook }) => {
  return (
    <Link href={`/notebook/${notebook.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{notebook.name}</CardTitle>
          <CardDescription>Last updated: {new Date(notebook.updatedAt).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add additional notebook details here */}
        </CardContent>
      </Card>
    </Link>
  );
};

export default function Dashboard() {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotebooks = async () => {
      const res = await fetch('/api/getNotebooks');
      const body = await res.json();
      setNotebooks(body.notebooks);
      setIsLoading(false);
    };
    if (typeof window !== "undefined") {
      fetchNotebooks();
    }
  }, []);

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-goodpink">
        <div>
          {/* <Sidebar></Sidebar> */}
        </div>
      </div>
      <main className="md:pl-64">
        {/* <Navbar></Navbar> */}
        <div>
          {isLoading ? (
            // Add loading skeleton UI here
            <div>Loading...</div>
          ) : notebooks?.length > 0 ? (
            <NotebookPreview notebooks={notebooks} />
          ) : (
            <Empty label="Create your first Notebook" />
          )}
        </div>
      </main>
    </div>
  );
}