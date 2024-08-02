"use client";
import { useEffect } from "react";
import styles from "./../../styles/Feedback.module.css"
import FeedbackForm from "./FeedbackForm";

function Feedback() {
    useEffect(() => {
        document.title = "Feedback | EducationForJobs";
    })
    return (
        <div className={styles.feedbackForm}>
            <FeedbackForm />
        </div >
    )
}

export default Feedback;