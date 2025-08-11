import { ProfileDropdown } from "./ProfileDropdown"
import { Link } from "react-router-dom"

export const Appbar = () => {
    return <div className="border-b flex flex-col sm:flex-row sm:justify-between items-center px-4 sm:px-10 py-3 sm:py-4 w-full">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer text-xl sm:text-2xl font-bold">
                Medium
        </Link>
        <div className="flex items-center mt-2 sm:mt-0">
            <Link to={`/publish`}>
                <button type="button" className="mr-2 sm:mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 text-center mb-2 sm:mb-0">New</button>
            </Link>
            <ProfileDropdown />
        </div>
    </div>
}