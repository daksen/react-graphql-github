import { useEffect, useState, useCallback } from "react";
// utils
import { github } from "./db";
import { searchQuery } from "./query";
// interfaces
import { Pagination, Repo, State } from "./interfaces";
// components
import Toolbar from "./components/Toolbar";
import RepositoriesList from "./components/RepositoriesList";
import PaginationButtons from "./components/PaginationButtons";

function App() {

  const [state, setState] = useState<State>();

  const [pagination, setPagination] = useState<Pagination>({
    queryString: "",
    pageCount: 10,
    pgKeyword: "first",
    pgString: "",
  });

  const handleQueryStringChange = (value: string) => {
    setPagination((prev) => {
      return {
        ...prev,
        queryString: value,
        pgKeyword: "first",
        pgString: "",
      }
    });
  };

  const handlePageCountChange = (value: number) => {
    setPagination((prev) => {
      return {
        ...prev,
        pageCount: value,
        pgKeyword: "first",
        pgString: "",
      }
    });
  }

  const handlePageChange = (pgKeyword: string, pgString: string) => {
    setPagination((prev) => {
      return {
        ...prev,
        pgKeyword,
        pgString,
      }
    });
  };

  const fetchData = useCallback(async () => {
    try {
      const queryText = JSON.stringify(searchQuery(pagination));

      const response = await fetch(github.baseURL, { 
        method: "POST",
        headers: github.headers,
        body: queryText,
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const { data: { viewer, search } } = await response.json();

      setState({
        userName: viewer.name,
        repositories: search.edges.map((item: { node: Repo; }) => item.node),
        totalCount: search.repositoryCount,
        pageInfo: search.pageInfo,
      });
    } catch (error) {
      console.error(error);
    }
  }, [pagination]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container mx-auto p-16">
      <h1 className="text-3xl text-fuchsia-800 font-bold">
        <i className="bi bi-diagram-2-fill mr-2" />
        Repos
      </h1>
      { !!state?.userName && (
        <p className="text-lg my-2">{`Hey there ${state.userName}!`}</p>
      )}
      <Toolbar
        queryString={pagination.queryString}
        pageCount={pagination.pageCount}
        totalCount={state?.totalCount}
        onQueryStringChange={handleQueryStringChange}
        onPageCountChange={handlePageCountChange}
      />
      { !!state?.repositories && (
        <>
          <RepositoriesList
            repositories={state.repositories}
          />
          <PaginationButtons
            pageInfo={state.pageInfo}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default App;
