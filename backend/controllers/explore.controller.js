export const explorePopularRepos = async (req, res) => {
  const { language } = req.params

  const URL = `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`

  try {
    const response = await fetch(URL, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    })
    const data = await response.json()

    res.status(200).json({ repos: data.items })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
