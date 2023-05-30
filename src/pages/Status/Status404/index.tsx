function index() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="bg-white flex flex-col justify-center items-center px-10 py-12 rounded-md">
        <h2 className="text-7xl font-extrabold my-4 text-cyan-500">404</h2>
        <h3 className=" text-lg font-bold my-1">
          <span className="text-cyan-500">Oops! </span>Page Not Found
        </h3>
        <p className="text-sm">The page you are looking for does not exists</p>
      </div>
    </div>
  );
}

export default index;
