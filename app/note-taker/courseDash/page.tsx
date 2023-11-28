/**
 * v0 by Vercel.
 * @see https://v0.dev/t/1TrovUyGhOs
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { BellIcon, InfoIcon } from "lucide-react"
import { UserButton } from "@clerk/nextjs";

export default function Component() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-blue-500">
      <div className="hidden border-r bg-zinc-100/40 lg:block dark:bg-zinc-800/40">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6">
            <Link className="flex items-center gap-2 font-semibold text-white" href="../note-taker">
              <span className="text-lg">General Physics Lab</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white"
              href="#"
            >
              <IconHome className="h-4 w-4" />
              DashBoard
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white"
              href="#"
            >
              <InfoIcon className="h-4 w-4" />
              Class Information
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white"
              href="#"
            >
              <BellIcon className="h-4 w-4" />
              Notifications
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white"
              href="#"
            >
              <IconUsers className="h-4 w-4" />
              Profile
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white"
              href="#"
            >
              <IconSettings className="h-4 w-4" />
              Settings
            </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-zinc-100/40 px-6 dark:bg-zinc-800/40">
          <Link className="lg:hidden" href="#">
            <IconPackage2 className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <div>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent>
              <img
                alt="Placeholder"
                className="w-full h-1/2 object-cover rounded-lg p-0 m-0"
                height="200"
                src="/E1.png"
                style={{
                  aspectRatio: "1.6",  // Set the aspect ratio here
                  objectFit: "cover",
                }}
                width="200"
              />
              <div className="status-container flex items-center justify-center mt-2"> 
                <div className="text-lg font-bold">
                  Experiment 1
                </div>
              </div>
              <div className="status-container flex items-center justify-center mt-2"> 
                <div className="text-lg">
                  Data Analysis with Spreadsheets
                </div>
              </div>
              <div className="status-container flex items-center justify-center mt-2">
                <div className="text-lg mt-2 border rounded-md p-1 border-black inline-block">
                  Completed {/* Change the status dynamically based on your logic */}
                </div>
              </div> 
            </CardContent>
          </Card>
          <Card>
            <CardContent>
            <img
                alt="Experiment 1"
                className="w-full h-1/2 object-cover rounded-lg p-0 m-0"
                src="/E2.png"
                style={{
                  aspectRatio: "1.6",  // Set the aspect ratio here (16:9 is a common widescreen aspect ratio)
                  objectFit: "cover",
                }}
            />
              <div className="status-container flex items-center justify-center mt-2"> 
                <div className="text-lg font-bold">
                  Experiment 2
                </div>
              </div>
              <div className="status-container flex items-center justify-center mt-2"> 
                <div className="text-lg">
                  Motion in One Dimension
                </div>
              </div>
              <div className="status-container flex items-center justify-center mt-2">
                <div className="text-lg mt-2 border rounded-md p-1 border-black inline-block">
                  Completed {/* Change the status dynamically based on your logic */}
                </div>
              </div> 
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <img
                alt="Placeholder"
                className="w-full h-1/2 object-cover rounded-lg p-0 m-0"
                height="200"
                src="/E3.png"
                style={{
                  aspectRatio: "1.6",
                  objectFit: "cover",
                }}
                width="200"
              />
              <div className="status-container flex items-center justify-center mt-2"> 
                <div className="text-lg font-bold">
                  Experiment 3
                </div>
              </div>
              <div className="status-container flex items-center justify-center mt-2"> 
                <div className="text-lg">
                The Glucometer: A Study in Uncertainty
                </div>
              </div>
              <div className="status-container flex items-center justify-center mt-2">
                <div className="text-lg mt-2 border rounded-md p-1 border-black inline-block">
                  Completed {/* Change the status dynamically based on your logic */}
                </div>
              </div> 
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <img
                alt="Placeholder"
                className="w-full h-1/2 object-cover rounded-lg p-0 m-0"
                height="200"
                src="/E4.png"
                style={{
                  aspectRatio: "1.6",
                  objectFit: "cover",
                }}
                width="200"
              />
              <div className="status-container flex items-center justify-center mt-2"> 
                <div className="text-lg font-bold">
                  Experiment 4
                </div>
              </div>
              <div className="status-container flex items-center justify-center mt-2"> 
                <div className="text-lg">
                Distraction and Reaction Time
                </div>
              </div>
              <div className="status-container flex items-center justify-center mt-2">
                <div className="text-lg mt-2 border rounded-md p-1 border-black inline-block">
                  Completed {/* Change the status dynamically based on your logic */}
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

function IconBell(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}


function IconHome(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function IconPackage2(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}


function IconPlus(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function IconSettings(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function IconUsers(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
