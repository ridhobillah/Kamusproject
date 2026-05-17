export default function SearchComp({ search, setSearch, onSearch }) {
  return (
    <div>
    <h1 className="mb-3 text-white text-2xl font-bold">Kamus Inggris :</h1>
    <div className="flex mb-6" >
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Cari kata..."
        className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 text-white"
      />
      <button onClick={onSearch}
        className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white hover:bg-gradient-to-br focus:ring-teal-300 dark:focus:ring-teal-800 w-20 rounded"
      >
        Cari
      </button>
    </div>
    </div>
  );
}