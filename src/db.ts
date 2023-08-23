const github = {
  baseURL: "https://api.github.com/graphql",
  username: import.meta.env.VITE_USERNAME,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `bearer ${import.meta.env.VITE_API_KEY}`
  }
}

export {
  github,
};
