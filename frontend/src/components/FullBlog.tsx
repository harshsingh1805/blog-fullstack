import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: {blog: Blog}) => {
    return <div>
        <Appbar />
        <div className="flex justify-center w-full px-2 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-screen-xl pt-8">
                <div className="md:col-span-8 col-span-1">
                    <div className="text-2xl sm:text-4xl md:text-5xl font-extrabold break-words">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2 text-sm sm:text-base">
                        Post on 2nd December 2023
                    </div>
                    <div className="pt-4 text-base sm:text-lg break-words">
                        {blog.content}
                    </div>
                </div>
                <div className="md:col-span-4 col-span-1 mt-8 md:mt-0">
                    <div className="text-slate-600 text-base sm:text-lg">
                        Author
                    </div>
                    <div className="flex w-full mt-2">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-lg sm:text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500 text-xs sm:text-sm">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    </div>
}