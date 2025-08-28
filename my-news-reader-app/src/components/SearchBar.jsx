export default function SearchBar({ query, setQuery }) {
  return (
    <div className="max-w-2xl mx-auto mb-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search news..."
        className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
