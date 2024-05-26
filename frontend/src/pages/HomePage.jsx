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
  const [loading, setLoading] = useState(false)
  const [sortType, setSortType] = useState("recent")

  const getUserProfileAndRepos = useCallback(async (username = "anst9000") => {
    setLoading(true)

    try {
      const userResp = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          authorization: `token ${import.meta.env.VITE_GITHUB_API_KEY}`,
        },
      })

      const userJson = await userResp.json()
      setUserProfile(userJson)

      const reposResp = await fetch(userJson.repos_url)
      const reposJson = await reposResp.json()
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      setRepos(reposJson)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getUserProfileAndRepos()
  }, [getUserProfileAndRepos])

  const onSearch = async (evnt, username) => {
    evnt.preventDefault()

    setLoading(true)
    setRepos([])
    setUserProfile(null)

    const { userProfile, repos } = await getUserProfileAndRepos(username)

    setUserProfile(userProfile)
    setRepos(repos)
    setLoading(false)
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
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}

        {!loading && <Repos repos={repos} />}

        {loading && <Spinner />}
      </div>
    </div>
  )
}

export default HomePage
