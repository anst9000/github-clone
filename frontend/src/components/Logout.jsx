import { MdLogout } from "react-icons/md"
import { toast } from "react-hot-toast"
import { useAuthContext } from "../../context/AuthContext"

const Logout = ({ text }) => {
  const { authUser, setAuthUser } = useAuthContext()

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        credentials: "include",
      })

      const data = await response.json()
      console.log(data, authUser)

      setAuthUser(null)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <div
        className="cursor-pointer flex gap-4 items-center p-2 rounded-lg bg-glass mt-auto border border-gray-800"
        onClick={handleLogout}
      >
        <MdLogout size={22} />
        {text && <span>{text}</span>}
      </div>
    </>
  )
}

export default Logout
