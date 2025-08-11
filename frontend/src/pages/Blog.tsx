import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks";
import {useParams} from "react-router-dom";

// atomFamilies/selectorFamilies
export const Blog = () => {
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });

    if (loading || !blog) {
        return <div>
            <Appbar />
            <div className="h-screen flex flex-col justify-center items-center px-2 sm:px-0">
                <div className="flex justify-center w-full">
                    <Spinner />
                </div>
            </div>
        </div>
    }
    return <div className="w-full">
        <FullBlog blog={blog} />
    </div>
}