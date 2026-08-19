import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [isLoginState, setLoginState] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => window.location.assign("/"), 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <section className="hidden items-center justify-center bg-emerald-700 p-12 text-white lg:flex lg:w-1/2">
        <div className="max-w-md text-center">
          <h1 className="mb-4 text-4xl font-semibold">Fresh groceries, delivered.</h1>
          <p className="text-emerald-100">Shop your everyday essentials and get them delivered to your doorstep.</p>
        </div>
      </section>

      <div className="flex min-h-screen flex-1 items-center justify-center bg-app-cream px-4 py-12">
        <div className="w-full max-w-md">
             <div className="text-center mb-8">
                 <Link to="/" className="inline-flex items-center gap-2 mb-6">
                   {/* <BikeIcon className="size-8 text-app-green"/> */}
                   <span className="text-2xl font-semibold text-app">Instacart</span>
                 </Link>
                 <h1 className="text-2xl font-semibold text-app-green mb-2">
                  {isLoginState ? "Sign in to your account" : "Sign up for an account"}
                 </h1>
                 <p>
                  {isLoginState ? "Don't have an account?" : "Already have an account?"}
                  <button type="button" onClick={() => setLoginState((current) => !current)} className="text-orange-500
                   ml-1 font-semibold hover:text-orange-600 transition-colors">
                    {isLoginState ? "Create one" : "Sign in"}
                  </button>
                 </p>
              </div> 

        </div>

      </div>
    </div>
  );
};

export default Login;
