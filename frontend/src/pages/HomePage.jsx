import ProfileInfo from "../components/ProfileInfo"
import Repos from "../components/Repos"
import Search from "../components/Search"
import SortRepos from "../components/SortRepos"
import Spinner from "../components/Spinner"

const repos = []
const loading = false
const userProfile = {
  avatar_url:
    "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
  bio: "👨🏻‍💻👨🏻‍💻👨🏻‍💻",
  email: "johndoe@gmail.com",
  followers: 100,
  following: 200,
  html_url: "https://github.com/burakorkmez",
  location: "Somewhere, Earth",
  name: "John Doe",
  public_gists: 100,
  public_repos: 100,
  twitter_username: "johndoe",
  login: "johndoe",
}

const HomePage = () => {
  const onSearch = () => {}
  const onSort = () => {}
  const sortType = null
  return (
    <div className="m-4">
      {/* SEARCH COMPONENT */}
      <Search onSearch={onSearch} />
      {/* SORT-REPOS COMPONENT */}
      <SortRepos onSort={onSort} sortType={sortType} />
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {/* PROFILE-INFO COMPONENT */}
        <ProfileInfo userProfile={userProfile} />

        {!loading && <Repos repos={repos} />}
        {loading && <Spinner />}
      </div>
    </div>
  )
}

export default HomePage
