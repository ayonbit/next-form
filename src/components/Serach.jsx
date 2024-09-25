const SearchInput = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        className="px-4 py-2 border border-gray-300 bg-slate-200 text-black rounded w-full"
      />
    </div>
  );
};

export default SearchInput;
