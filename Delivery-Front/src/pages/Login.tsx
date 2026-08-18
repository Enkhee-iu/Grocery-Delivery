import { useState } from "react";



const Login = () => {
    const [isLoginState, setLoginState] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.SubmitEvent)=>{
       e.preventDefault()
       setLoading(true);
       setTimeout(()=> window.location.href = "/", 1000)
    }
    return (
        <div className="min-h-screen flex">
             <div className="hidden lg:flex lg:w-1/2 bg-app-green relative items-center
                justify-center">
            <img src="/path/to/your/image.jpg" alt="Description" className="absolute inset-0 object-cover h-full bg-center opacity-10"/>
            <div className="relative text-center px-12">
                <h2 className="text-4x1 font-semibold text-wwhite mb-4">Welcome back to Instacart</h2>
                <p>Fresh groceries and organic produce, delivered to your doorstep.</p>
            </div>
             </div>
        </div>
    )
}

export default Login;