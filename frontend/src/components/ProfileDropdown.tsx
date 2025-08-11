import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  // Get user name from localStorage or fallback
  const name = localStorage.getItem("name") || "U";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSignOut() {
    localStorage.clear();
    navigate("/signin");
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center focus:outline-none"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Avatar name={name} size="big" />
      </button>
      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <button
            onClick={handleSignOut}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};
