import { MdLogout } from "react-icons/md"
// import { useAuthContext } from "../context/AuthContext"
// import { toast } from "react-hot-toast"

const Logout = ({ text }) => {
  // const { authUser, setAuthUser } = useAuthContext()

  // const handleLogout = async () => {
  //   try {
  //     const res = await fetch("/api/auth/logout", { credentials: "include" })
  //     const data = await res.json()
  //     console.log(data)
  //     setAuthUser(null)
  //   } catch (error) {
  //     toast.error(error.message)
  //   }
  // }

  return (
    <>
      <div className="cursor-pointer flex gap-4 items-center p-2 rounded-lg bg-glass mt-auto border border-gray-800">
        <MdLogout size={22} />
        {text && <span>{text}</span>}
      </div>
    </>
  )
}

export default Logout
