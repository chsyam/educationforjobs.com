import axios from "axios";

export async function getBlogById(blogId) {
    try {
        const apiUrl = `https://educationforjobs.onrender.com/api/blogs/${blogId}`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.log("Error fetching Blogs list" + error);
        return null;
    }
}