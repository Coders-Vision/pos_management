import { Outlet } from "react-router-dom";
function index() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-zinc-300  ">
      <Outlet />
    </div>
  );
}

export default index;
