import { PageInfo } from '../interfaces';

interface PaginationButtonsProps {
  pageInfo: PageInfo
  onPageChange: (pgKeyword: string, pgString: string) => void
}

const PaginationButtons = ({ pageInfo, onPageChange }: PaginationButtonsProps) => {
  return (
    <div className="flex flex-row justify-center items-center gap-3 w-full">
      <button 
        disabled={!pageInfo?.hasPreviousPage}
        className="rounded bg-fuchsia-800 text-white p-2 disabled:opacity-50"
        onClick={() => onPageChange("last", `before: "${pageInfo.startCursor}"`)}
      >
        <i className="bi bi-arrow-left" />
      </button>
      <button 
        disabled={!pageInfo?.hasNextPage}
        className="rounded bg-fuchsia-800 text-white p-2 disabled:opacity-50"
        onClick={() => onPageChange("first", `after: "${pageInfo.endCursor}"`)}
      >
        <i className="bi bi-arrow-right" />
      </button>
    </div>
  );
}

export default PaginationButtons;
