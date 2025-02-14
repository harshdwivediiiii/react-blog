import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { link } from "../components/Baselink";
const EditArticle = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getDetails = async () => {
            try {
                // Fetch the article details by ID
                const token = localStorage.getItem("token"); // Assume token is stored in localStorage
                const resp = await axios.post(
                    `${link}/api/article/getarticlebyid`,
                    { id },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setTitle(resp.data.title || "");
                setContent(resp.data.content || "");
            } catch (error) {
                console.error("Error fetching article details:", error);
                setError("Failed to fetch article details. Please try again.");
            }
        };
        getDetails();
    }, [id]);

    const handleSave = async () => {
        try {
            // Send the updated details to the backend
            const token = localStorage.getItem("token"); // Assume token is stored in localStorage
            console.log(token)
            const resp = await axios.post(
                `${link}/api/article/editarticle`,
                {
                    id,
                    title: title.trim(),
                    content: content.trim(),
                },
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            );
            
            console.log("Article updated successfully:", resp.data);
            navigate("/article-list"); // Redirect after successful update
        } catch (error) {
            console.error("Error updating article:", error);
            setError(
                error.response?.data?.error || "Failed to update the article. Please try again."
            );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-10">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
                    Edit Article
                </h1>
                {error && (
                    <div className="text-red-600 text-center mb-4">
                        {error}
                    </div>
                )}
                <form
                    className="space-y-8"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                >
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-xl font-semibold text-gray-700 mb-3"
                        >
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter article title"
                            className="block w-full px-6 py-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="content"
                            className="block text-xl font-semibold text-gray-700 mb-3"
                        >
                            Content
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter article content"
                            rows="10"
                            className="block w-full px-6 py-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white text-lg font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-all"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/articles")}
                            className="text-gray-600 text-lg hover:text-gray-800 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditArticle;
