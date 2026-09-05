import { useState } from "react";
import { Link } from "react-router-dom";
import { Bike as BikeIcon, Loader2Icon, LockIcon, MailIcon, UserIcon } from "lucide-react";
import heroBackground from "../assets/hero_bg.jpeg";

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
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat lg:flex"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <section className="hidden items-center justify-center bg-emerald-950/60 p-12 text-white lg:flex lg:w-1/2">
      
        <div className="max-w-md text-center">
          <h1 className="mb-4 text-4xl font-semibold">Fresh groceries, delivered.</h1>
          <p className="text-emerald-100">Shop your everyday essentials and get them delivered to your doorstep.</p>
        </div>
      </section>

      <div className="flex min-h-screen flex-1 items-center justify-center bg-app-cream px-4 py-12">
        <div className="w-full max-w-md">
             <div className="text-center mb-8">
                 <Link to="/" className="inline-flex items-center gap-2 mb-6">
                   <BikeIcon className="size-8 text-app-green" />
                   <span className="text-2xl font-semibold text-app-green text-app">Instacart</span>
                 </Link>
                 <h1 className="text-2xl font-semibold text-app-green mb-2">
                  {isLoginState ? "Sign in to your account" : "Sign up for an account"}
                 </h1>
                 <p className="text-sm text-app-text-light">
                  {isLoginState ? "Don't have an account?" : "Already have an account?"}
                  <button type="button" onClick={() => setLoginState((current) => !current)} className="text-orange-500
                   ml-1 font-semibold hover:text-orange-600 transition-colors">
                    {isLoginState ? "Create one" : "Sign in"}
                  </button>
                 </p>
              </div> 
              <form onSubmit={handleSubmit} className="space-y-5">
                   {!isLoginState &&(
                    <label className="text-sm flex flex-col gap-1">
                      Name
                      <div className="relative ">
                        <UserIcon className="absolute mt-3 left-3.5 top-1/2-translate-y-1/2 size-4 text-app-text-light"/>
                        <input 
                        type="text"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        required
                        placeholder="Your name"
                        className="w-full pl-11 pr-4 py-3 text-sm bg-white
                        rounded-xl border bot-focus:border-app-border transition-all"
                        />

                      </div>
                    </label>
                   )}

                    <label className="text-sm flex flex-col gap-1">
                      Email Address
                      <div className="relative ">
                        <MailIcon className="absolute mt-3 left-3.5 top-1/2-translate-y-1/2 size-4 text-app-text-light"/>
                        <input 
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="w-full pl-11 pr-4 py-3 text-sm bg-white
                        rounded-xl border bot-focus:border-app-border transition-all"
                        />

                      </div>
                    </label>


                    <label className="text-sm flex flex-col gap-1">
                      Password
                      <div className="relative ">
                        <LockIcon className="absolute mt-3 left-3.5 top-1/2-translate-y-1/2 size-4 text-app-text-light"/>
                        <input 
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                        placeholder="Your Password"
                        className="w-full pl-11 pr-4 py-3 text-sm bg-white
                        rounded-xl border bot-focus:border-app-border transition-all"
                        />

                      </div>
                    </label>
                  <button type="submit" disabled={loading} className="flex-center w-full
                  py-3 bg-green-950 text-white font-semibold rounded-xl hover:bg-green-900
                  transition-colors disabled:opacity-50">
                    {loading ? <Loader2Icon className="animate-spin"/>:
                    isLoginState ? "Sign In" : "Sign Up"}

                  </button>
              </form>

               

        </div>

      </div>
    </div>
  );
};

export default Login;
