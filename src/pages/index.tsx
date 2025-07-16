import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.email}</p>
        <img src={session.user?.image ?? ""} alt="User image" width={50} />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div>
      <p>Not signed in</p>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </div>
  );
}
