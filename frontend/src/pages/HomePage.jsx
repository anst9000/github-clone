import { useCallback, useEffect, useState } from "react"
import ProfileInfo from "../components/ProfileInfo"
import Repos from "../components/Repos"
import Search from "../components/Search"
import SortRepos from "../components/SortRepos"
import Spinner from "../components/Spinner"
import toast from "react-hot-toast"

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [sortType, setSortType] = useState("recent")

  const getUserProfileAndRepos = useCallback(async (username = "anst9000") => {
    setIsLoading(true)

    try {
      const resp = await fetch(
        `http://localhost:5000/api/users/profile/${username}`
      )
      const { repos: githubRepos, userProfile: profile } = await resp.json()

      githubRepos.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )
      setRepos(githubRepos)
      setUserProfile(profile)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    getUserProfileAndRepos()
  }, [getUserProfileAndRepos])

  const onSearch = async (evnt, username) => {
    evnt.preventDefault()

    setIsLoading(true)
    setRepos([])
    setUserProfile(null)

    const { userProfile, repos } = await getUserProfileAndRepos(username)

    setUserProfile(userProfile)
    setRepos(repos)
    setIsLoading(false)
    setSortType("recent")
  }

  const onSort = (type) => {
    switch (type) {
      case "recent":
        repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        break

      case "stars":
        repos.sort((a, b) => b.stargazers_count - a.stargazers_count)
        break

      case "forks":
        repos.sort((a, b) => b.forks_count - a.forks_count)
        break

      default:
        break
    }

    setSortType(type)
    setRepos([...repos])
  }

  return (
    <div className="m-4">
      {/* SEARCH COMPONENT */}
      <Search onSearch={onSearch} />
      {/* SORT-REPOS COMPONENT */}
      {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {/* PROFILE-INFO COMPONENT */}
        {userProfile && !isLoading && <ProfileInfo userProfile={userProfile} />}

        {!isLoading && repos.length > 0 && <Repos repos={repos} />}

        {isLoading && <Spinner />}
      </div>
    </div>
  )
}

export default HomePage
