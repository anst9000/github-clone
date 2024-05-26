import { FaHeart } from "react-icons/fa"
import { IoHomeSharp } from "react-icons/io5"
import { MdEditDocument, MdOutlineExplore } from "react-icons/md"
import { PiSignInBold } from "react-icons/pi"
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md"

import { Link } from "react-router-dom"
import Logout from "./Logout"
import { Fragment, useState } from "react"

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const authUser = true

  return (
    <Fragment>
      {isExpanded ? (
        <aside className="h-screen py-8 sticky top-0 left-0 overflow-y-hidden border-r bg-glass">
          <nav className="flex flex-col items-start ms-6 min-w-36 sm:w-40 h-full gap-3">
            <Link to="/" className="flex justify-center mb-8">
              <img className="h-8" src="/github.svg" alt="Github Logo" />
            </Link>

            <Link to="/" className="regular-menu-link flex gap-4">
              <IoHomeSharp size={20} />
              <span>Home</span>
            </Link>

            {authUser && (
              <Link to="/likes" className="regular-menu-link flex gap-4">
                <FaHeart size={22} />
                <span>Likes</span>
              </Link>
            )}

            {authUser && (
              <Link to="/explore" className="regular-menu-link flex gap-4">
                <MdOutlineExplore size={25} />
                <span>Explore</span>
              </Link>
            )}

            <Link to="/login" className="auth-menu-link flex gap-4">
              <PiSignInBold size={25} />
              <span>Login</span>
            </Link>

            <Link to="/signup" className="auth-menu-link flex gap-4">
              <MdEditDocument size={25} />
              <span>Signup</span>
            </Link>

            {authUser && (
              <div className="mt-auto mb-10 cursor-pointer hover:bg-gray-800 p-1.5 rounded-lg">
                <Logout text={"Logout"} />
              </div>
            )}
          </nav>
          <div
            className="cursor-pointer flex justify-end me-4"
            onClick={() => setIsExpanded(false)}
          >
            <MdKeyboardDoubleArrowLeft size={25} />
          </div>
        </aside>
      ) : (
        <aside className="sticky top-0 left-0 h-screen py-8 overflow-y-hidden border-r bg-glass">
          <nav className="flex flex-col items-center min-w-12 sm:w-16 h-full gap-3">
            <Link to="/" className="flex justify-center mb-8">
              <img className="h-8" src="/github.svg" alt="Github Logo" />
            </Link>

            <Link to="/" className="regular-menu-link">
              <IoHomeSharp size={20} />
            </Link>

            {authUser && (
              <Link to="/likes" className="regular-menu-link">
                <FaHeart size={22} />
              </Link>
            )}

            {authUser && (
              <Link to="/explore" className="regular-menu-link">
                <MdOutlineExplore size={25} />
              </Link>
            )}

            <Link to="/login" className="auth-menu-link">
              <PiSignInBold size={25} />
            </Link>

            <Link to="/signup" className="auth-menu-link">
              <MdEditDocument size={25} />
            </Link>

            {authUser && (
              <div className="flex flex-col gap-2 mt-auto mb-10 hover:bg-gray-800 p-1.5 rounded-lg">
                <Logout />
              </div>
            )}
          </nav>

          <div
            className="cursor-pointer flex justify-end items-center me-4"
            onClick={() => setIsExpanded(true)}
          >
            <MdKeyboardDoubleArrowRight size={25} />
          </div>
        </aside>
      )}
    </Fragment>
  )
}
export default Sidebar
