import Banner from "$/components/Banner";
import Footer from "$/components/Footer";
import CartSidebar from "$/components/Home/CartSidebar";
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
         <CartSidebar/>
       </>
    )
}

export default AppLayout;
