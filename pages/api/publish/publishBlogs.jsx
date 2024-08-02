import axios from "axios";

export async function publishBlogs(formData) {
    try {
        const apiUrl = "https://educationforjobs.onrender.com/api/blogs/create";
        const response = axios.post(apiUrl, formData);
        if ((await response).status === 201) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Error publishing Blogs" + error);
        return false;
    }
}