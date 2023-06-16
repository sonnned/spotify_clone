const SongSkeleton = () => {
  return (
    <div className="grid grid-cols-2 text-gray-500 py-4 px-5 rounded-lg cursor-pointe transition duration-200 ease-in-out animate-pulse">
      <div className="flex items-center space-x-4">
        <p className="h-5 w-5 bg-gray-600 rounded"></p>
        <div className="h-10 w-10 bg-gray-600 rounded"></div>
        <div>
          <p className="h-5 w-36 lg:w-64 bg-gray-600 rounded"></p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline h-5 w-28 bg-gray-600 rounded"></p>
        <p className="h-5 w-10 bg-gray-600 rounded"></p>
      </div>
    </div>
  );
};

export default SongSkeleton;
