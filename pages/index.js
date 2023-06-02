import Image from "next/image";
import { Inter } from "next/font/google";
import ChatBox from "@/components/ChatBox";
import Menu from "@/components/Menu";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ml-32 ${inter.className}`}
    >
      <ChatBox />
    </main>
  );
}
