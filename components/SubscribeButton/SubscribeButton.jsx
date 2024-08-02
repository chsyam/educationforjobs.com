"use client"
import Image from "next/image";
import React from "react"
import styles from "@/styles/SubscribeButton.module.css";
import Logo from "./../images/channels4_profile.jpg";
import { FaTimes } from "react-icons/fa";

function SubscribeButton() {
    return (
        <div className={styles.container}>
            <input type="radio" className={styles.hide} />
            <div className={styles.box}>
                <label htmlFor="hide">
                    <FaTimes />
                </label>
                <div className={styles.logo}>
                    <Image width="auto" height="auto" priority="high" className={styles.logoImage} src={Logo} alt="Youtube Logo" />
                </div>
                <div className={styles.right}>
                    <div className={styles.text1}>CodingLab</div>
                    <div className={styles.text2}>Subscribe Our YouTube Channel</div>
                    <a href="https://youtube.com/@educationwithentertainment7?si=szCJHA2jouWCck7n" target="_blank">
                        Subscribe
                    </a>
                </div>
            </div>
        </div>
    );
}

export default SubscribeButton;