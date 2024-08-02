import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Head from "next/head";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "EducationForJobs",
	description: "An investment in knowledge pays the best interest",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<GoogleAnalytics />
			<body className={inter.className}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
