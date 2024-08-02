import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "EducationForJobs",
	description: "An investment in knowledge pays the best interest",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<Head>
				<script async src={`https://www.googletagmanager.com/gtag/js?id=G-5VKG7C2SQD`}></script>
				<script
					dangerouslySetInnerHTML={{
						__html: `
				          window.dataLayer = window.dataLayer || [];
				          function gtag(){
				            dataLayer.push(arguments);
				          }
				          gtag('js', new Date());
				          gtag('config', 'G-5VKG7C2SQD',{
				            page_path: window.location.pathname,
				          });
				        `,
					}}
				/>
			</Head>
			<body className={inter.className}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
