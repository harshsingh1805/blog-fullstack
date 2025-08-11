import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL, GEMINI_API_KEY } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const navigate = useNavigate();

    const generateDescription = async () => {
        if (!title.trim()) {
            alert("Please enter a title first");
            return;
        }
        
        if (!GEMINI_API_KEY) {
            alert("Gemini API key not configured. Please create a .env.local file with VITE_GEMINI_API_KEY=your_key_here");
            return;
        }
        
        setIsGenerating(true);
        try {
            // Using Gemini API (free tier)
            const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                contents: [{
                    parts: [{
                        text: `Generate a compelling blog post description for the title: "${title}". The description should be engaging, informative, and around 2-3 sentences. Make it suitable for a blog platform.`
                    }]
                }]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            const generatedText = response.data.candidates[0].content.parts[0].text;
            setDescription(generatedText);
        } catch (error: any) {
            console.error('Error generating description:', error);
            
            // More specific error handling
            let errorMessage = "AI generation failed";
            if (error.response) {
                // Server responded with error status
                if (error.response.status === 400) {
                    errorMessage = "Invalid request to Gemini API. Please check your API key.";
                } else if (error.response.status === 403) {
                    errorMessage = "API key invalid or quota exceeded. Please check your Gemini API key.";
                } else if (error.response.status === 429) {
                    errorMessage = "API rate limit exceeded. Please try again later.";
                } else {
                    errorMessage = `API error: ${error.response.status} - ${error.response.data?.error?.message || 'Unknown error'}`;
                }
            } else if (error.request) {
                // Network error
                errorMessage = "Network error. Please check your internet connection.";
            } else {
                // Other error
                errorMessage = `Error: ${error.message}`;
            }
            
            console.log('Full error details:', error);
            alert(errorMessage);
            
            // Fallback to a simple template-based generation
            const fallbackDescription = `This blog post explores the topic of "${title}" in detail. We'll dive deep into the subject matter and provide valuable insights for our readers.`;
            setDescription(fallbackDescription);
        } finally {
            setIsGenerating(false);
        }
    };

    return <div>
        <Appbar />
        <div className="flex justify-center w-full pt-8 px-2 sm:px-0"> 
            <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-4 sm:p-8">
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4" placeholder="Title" />

                <TextEditor 
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }} 
                />
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <button 
                        onClick={generateDescription}
                        disabled={isGenerating}
                        className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-600 rounded-lg focus:ring-4 focus:ring-green-200 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isGenerating ? 'Generating...' : 'Generate Description'}
                    </button>
                    
                    <button onClick={async () => {
                        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                            title,
                            content: description
                        }, {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        });
                        navigate(`/blog/${response.data.id}`)
                    }} type="submit" className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    </div>
}


function TextEditor({ value, onChange }: {value: string, onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border">
            <div className="my-2 bg-white rounded-b-lg w-full">
                <label className="sr-only">Publish post</label>
                <textarea 
                    value={value}
                    onChange={onChange} 
                    id="editor" 
                    rows={8} 
                    className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" 
                    placeholder="Write an article..." 
                    required 
                />
            </div>
        </div>
       </div>
    </div>
    
}