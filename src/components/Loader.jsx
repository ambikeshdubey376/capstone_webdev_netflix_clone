const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      
      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>

      {/* Text */}
      <p className="text-textSub text-sm">
        Loading awesome products...
      </p>

    </div>
  );
};

export default Loader;