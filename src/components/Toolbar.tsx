interface ToolbarProps {
  queryString: string
  pageCount: number,
  totalCount: number | undefined,
  onQueryStringChange: (value: string) => void;
  onPageCountChange: (value: number) => void;
}

const Toolbar = ({ queryString, pageCount, totalCount, onQueryStringChange, onPageCountChange }: ToolbarProps) => {

  const handleQueryStringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryStringChange(event.target.value);
  }

  const handlePageCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onPageCountChange(Number(event.target.value));
  }

  return (
    <div className="flex bg-slate-300 rounded my-5 p-2">
      <div className="flex flex-1 items-center mr-3">
        <label htmlFor="queryStringInput" className="mr-2">Search:</label>
        <input
          id="queryStringInput"
          type="text"
          className="bg-purple-white shadow rounded border-0 p-1 w-full"
          value={queryString}
          placeholder="Search..."
          onChange={handleQueryStringChange}
        />
      </div>
      <div className="flex items-center mr-3">
        <label htmlFor="pagesCount" className="mr-2">Show:</label>
        <input
          id="pagesCount"
          type="number"
          className="bg-purple-white shadow rounded border-0 text-center p-1 w-20"
          value={pageCount}
          min={1}
          max={100}
          onChange={handlePageCountChange}
        />
      </div>
      { !!totalCount && (
        <div className="flex items-center">
          <label htmlFor="total" className="mr-2">Total:</label>
          <span id="total">{totalCount}</span>
        </div>
      )}
    </div>
  );
}

export default Toolbar;
