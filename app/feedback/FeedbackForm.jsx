"use client";
import { useState } from "react";
import styles from "./../../styles/Feedback.module.css"
import { submitFeedback } from "@/pages/api/feedback/submitFeedback";

function FeedbackForm({ relatedBlogId }) {
    const [formData, setFormData] = useState({
        comment: "",
        username: "",
        email: "",
        relatedBlogId: "NA"
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        relatedBlogId && (formData.relatedBlogId = relatedBlogId);
        const response = await submitFeedback(formData);
        if (response === true) {
            alert("Feedback submitted successfully");
            window.location.reload();
        } else {
            console.log(response);
            alert("Something went wrong. Please try again later");
            window.location.reload();
        }
    }

    return (
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.heading}>Leave a Comment</div>
            <div>
                <label htmlFor="name">Full Name</label><br />
                <input name="username" placeholder="Full Name *" onChange={(e) => handleChange(e)} type="text" id="name" required />
            </div>
            <div>
                <label htmlFor="email">Email</label><br />
                <input name="email" placeholder="example@domain.com *" onChange={(e) => handleChange(e)} type="email" id="email" required />
            </div>
            <div>
                <label htmlFor="comment">Comment</label><br />
                <textarea placeholder="Type your message *" name="comment" onChange={(e) => handleChange(e)} id="comment" rows="6" cols="70" />
            </div>
            <div>
                <button className={styles.submitButton}>Submit Comment</button>
            </div>
        </form>
    )
}

export default FeedbackForm;