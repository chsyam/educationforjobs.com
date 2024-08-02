"use client"
import React, { useEffect } from "react";

export default function Home() {
	useEffect(() => {
		document.title = "Home | EducationForJobs";
	})

	return (
		<div style={{ fontFamily: "Poppins", textAlign: "center", marginTop: "10%" }}>
			<span style={{ fontSize: "20px" }}>We are working on this page.</span> <br /><br />
			<span style={{ fontSize: "24px" }}>Till then enjoy our <a href="/blogs">blogs</a></span>
		</div>
	);
}
