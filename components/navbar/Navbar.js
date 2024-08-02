"use client";
import Image from "next/image";
import styles from "./../../styles/Navbar.module.css";
import Logo from "./../images/channels4_profile.jpg";
import { SiYoutube } from "react-icons/si";
import React from "react";

function Navbar() {
    const redirectToChannel = () => {
        window.open("https://youtube.com/@educationwithentertainment7?si=B2ilAdO7DirrBBQv", "_blank")
    }

    return (
        <nav className={styles.navbar}>
            <label className={styles.logo} onClick={() => window.location.href = "/"}>
                <Image width="auto" height="auto" priority="high" className={styles.logo} src={Logo} alt="Blog image" />
            </label>
            <ul className={styles.navLinks}>
                <li onClick={() => window.location.href = "/"}>Home</li>
                <li onClick={() => window.location.href = "/blogs"}>Blogs</li>
                <li onClick={() => window.location.href = "/feedback"}>Feedback</li>
            </ul>
            <ul className={styles.navLinks} onClick={() => redirectToChannel()}>
                <div className={styles.followButton}>
                    <div><SiYoutube /></div>
                    <div>Subscribe</div>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;