const DummyCourseCard: React.FC = () => {
  return (
    <div className="bg-dark p-4 rounded-lg shadow-md text-white animate-pulse h-[280px]">
      <div className="w-full h-40 bg-gray-700 rounded-md mb-4"></div>
      <h2 className="text-xl font-semibold mb-2 bg-gray-700 h-6 rounded"></h2>
      <div className="flex justify-between items-center">
        <button className="bg-violet text-white px-4 py-2 rounded hover:bg-gray-700"></button>
        <p className="text-gray-300"></p>
      </div>
    </div>
  );
};

export default DummyCourseCard;
