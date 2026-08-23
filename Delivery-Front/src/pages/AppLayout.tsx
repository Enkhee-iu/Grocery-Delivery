import Banner from "$/components/Banner";
import Navbar from "$/components/Navbar";
import { Outlet } from "react-router-dom";


const AppLayout = () => {
    return (
       <>
         <Banner/>
         <Navbar/>
         <main className="min-h-screen">
            <Outlet />
         </main>
         <p>footer</p>
         <p>cartsidebar</p>
       </>
    )
}

export default AppLayout; 