import { Repo } from "../interfaces";

interface RepositoriesListProps {
  repositories: Repo[]
}

const RepositoriesList = ({ repositories }: RepositoriesListProps) => {
  return (
    <ul className="my-5">
      { repositories.map((repo) => (
        <li key={repo.id} className="my-2 border-b border-solid border-slate-300">
          <a href={repo.url} target="blank" className="text-lg text-fuchsia-800 font-semibold">
            {repo.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default RepositoriesList;
