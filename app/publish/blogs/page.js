"use client"
import styles from "@/styles/createPost.module.css"
import { useEffect, useRef, useState } from "react";
import dynamic from 'next/dynamic';
import { publishBlogs } from "@/pages/api/publish/publishBlogs";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/app/config";
import { TagsInput } from "react-tag-input-component";

const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false
});

function AddPost() {
    const editor = useRef(null);
    const [publishing, setPublishing] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [tags, setTags] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        videoUrl: "",
        resourceUrl: "",
        tagsList: ""
    })

    useEffect(() => {
        document.title = "Publish a Post | EducationForJobs"
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const config = {
        readonly: false,
        height: 250,
        toolbarSticky: false,
        uploader: {
            insertImageAsBase64URI: true
        },
        toolbarButtonSize: 'middle',
    };

    const handleFileUpload = () => {
        if (!file) return;
        const fileRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error("Error uploading file:", error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setFormData({
                        ...formData,
                        "resourceUrl": url
                    })
                });
            }
        );
    }

    useEffect(() => {
        setFormData({
            ...formData,
            "tagsList": tags.join("#")
        })
    }, [tags])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (uploadProgress < 100) {
            setErrorMessage("Please wait for the file to upload");
            return;
        }
        setPublishing(true);
        console.log(formData);
        const response = await publishBlogs(formData);
        setPublishing(false);
        if (response === true) {
            alert("Blog Created Successfully");
            window.location.reload();
        } else {
            alert("Something went wrong. Please try again later");
        }
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleBlur = newContent => {
        setFormData({ ...formData, content: newContent });
    };

    const handleEditorChange = newContent => {
        setFormData({ ...formData, content: newContent });
    };

    return (
        <div> {
            publishing ? (
                <div style={{ textAlign: "center", marginTop: "20%", fontFamily: "Poppins", fontWeight: "600" }}>
                    Publishing your Content
                </div>
            ) : (
                <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.heading}>Publish a Post</div>
                    <div className={styles.divSection}>
                        <div className={styles.label}>Blog Title (required)</div>
                        <textarea rows={3} name="title" onChange={(e) => handleChange(e)} type="text" id="title" required />
                    </div>
                    <div className={styles.divSection}>
                        <div className={styles.label}>Blog Content (required)</div>
                        <JoditEditor
                            ref={editor}
                            value={formData.content}
                            config={config}
                            tabIndex={1}
                            onBlur={handleBlur}
                            onChange={handleEditorChange}
                        />
                        <div className={styles.divSection}>
                            <div className={styles.label}>Live Preview</div>
                            <div className={styles.preview}>
                                <div className={styles.previewContent} dangerouslySetInnerHTML={{ __html: formData.content }}></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.divSection}>
                        <div className={styles.label}>Video ID ({`Optional`})</div>
                        <input name="videoUrl" onChange={(e) => handleChange(e)} type="text" id="videoUrl" />
                    </div>
                    <div className={styles.fileUpload}>
                        <div className={styles.label}>Material ({`Optional`}) </div>
                        <div className={styles.fileContent}>
                            <div className={styles.inputFile}>
                                <input
                                    id="resourceUrl"
                                    type="file"
                                    onChange={(event) => handleFileChange(event)}
                                />
                            </div>
                            {
                                (uploadProgress > 0 && uploadProgress < 100) && (
                                    <div className={styles.uploadStatus}>
                                        <div>{`0%`}</div>
                                        <div><progress value={uploadProgress} max="100" /></div>
                                        <div>{`${uploadProgress}%`}</div>
                                    </div>
                                )
                            }
                            {
                                (uploadProgress === 100) && (
                                    <div style={{ color: "green", fontWeight: "500" }}>
                                        File Uploaded Successfully
                                    </div>
                                )
                            }
                            <div className={styles.uploadButton} onClick={() => handleFileUpload()}>
                                Upload
                            </div>
                        </div>
                    </div>
                    <div className={styles.divSection}>
                        <div className={styles.label}>Tags</div>
                        <TagsInput
                            value={tags}
                            onChange={setTags}
                            name="tags"
                            placeHolder="Enter tags here..."
                        />
                    </div>
                    {
                        (tags.length >= 1 && (tags.length < 3 || tags.length > 5)) && (
                            <div style={{ color: "red" }}>Number of Tags should be {`< 5`} and {`> 3`}</div>
                        )
                    }
                    {uploadProgress < 100 && (
                        <div style={{ color: "red" }}>{errorMessage}</div>
                    )}
                    <div className={styles.divSection}>
                        <button className={styles.submitButton}>
                            Publish Blog
                        </button>
                    </div>
                </form>
            )
        }
        </div>
    );
}

export default AddPost;