import { Outlet } from "react-router-dom";

import { Bottombar, Header } from "../components/shared";

const AppLayout = () => {
  
  return (
    <main className="pb-10">
      <Header />
      
      <div className="flex-1">
        <Outlet />
      </div>

      {/********** BOTTOM BAR **********/}
      <Bottombar />
    </main>
  );
};

export default AppLayout;