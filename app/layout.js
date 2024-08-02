import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
// import SubscribeButton from "@/components/SubscribeButton/SubscribeButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EducationForJobs",
  description: "An investment in knowledge pays the best interest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        {/* <SubscribeButton /> */}
      </body>
    </html>
  );
}
