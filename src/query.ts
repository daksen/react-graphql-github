import { github } from "./db";
import { Pagination } from "./interfaces";

const searchQuery = (pagination: Pagination) => {

  const { queryString, pageCount, pgKeyword, pgString } = pagination;

  return {
    query: `
      {
        viewer {
          name
        }
        search(query: "${queryString} user:${github.username} sort:updated-desc", type: REPOSITORY, ${pgKeyword}: ${pageCount}, ${pgString}) {
          edges {
            cursor
            node {
              ... on Repository {
                id
                name
                description
                url
              }
            }
          }
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          repositoryCount
        }
      }
    `
  }
}

export {
  searchQuery,
};
