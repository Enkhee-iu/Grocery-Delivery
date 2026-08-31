import Banner from "$/components/Banner";
import Footer from "$/components/Footer";
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
         <Footer/>
         <p>cartsidebar</p>
       </>
    )
}

export default AppLayout; 