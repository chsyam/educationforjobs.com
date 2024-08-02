import axios from "axios";

export async function submitFeedback(formData) {
    try {
        const response = await axios.post("https://educationforjobs.onrender.com/api/submitfeedback", formData);
        console.log(response);
        if (response.status === 201 || response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Error publishing Blogs" + error);
        return false;
    }
}