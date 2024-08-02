"use client"
import styles from "@/styles/Blogs.module.css";
import BlogCard from "./BlogCard";
import { useEffect, useState } from "react";
import axios from "axios";

async function fetchData() {
    try {
        const response = await axios.get('https://educationforjobs.onrender.com/api/blogs/all');
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        console.log("Error fetching Blogs list" + error);
        return [];
    }
}

export default function Blogs() {
    const [blogsData, setBlogsData] = useState([]);
    const [blogsFound, setBlogsFound] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Blogs | EducationForJobs";
        const fetchBlogs = async () => {
            try {
                const blogsList = await fetchData();
                setLoading(false);
                if (blogsList) {
                    setBlogsData(blogsList);
                }
                else if (blogsList?.length == 0) {
                    setBlogsFound(false);
                } else {
                    setBlogsFound(false);
                }
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        fetchBlogs();
    }, []);

    return (
        <div className={styles.blogContent}>
            {
                blogsFound ? (
                    loading ? (
                        <div style={{ textAlign: "center", marginTop: "20%", fontFamily: "Poppins", fontWeight: "600" }}>
                            Loading....
                        </div>
                    ) : (
                        blogsData?.map((blog, index) =>
                            <BlogCard key={index} blog={blog} />
                        )
                    )
                ) : (
                    <div style={{ textAlign: "center", marginTop: "20%", fontFamily: "Poppins", fontWeight: "600" }}>
                        No blogs found
                    </div>
                )
            }
        </div>
    );
}