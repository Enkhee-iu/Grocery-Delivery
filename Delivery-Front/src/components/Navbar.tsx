import { BikeIcon, ChevronDownIcon, MenuIcon, SearchIcon, ShoppingCartIcon, UserIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user: { name: string; email: string; isAdmin: boolean } | null = {
    name: "John Doe",
    email: "john@example.com",
    isAdmin: true,
  };

  const { cartCount, setIsCartOpen } = {
    cartCount: 5,
    setIsCartOpen: (_data: boolean) => {},
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    navigate(`/products?search=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-app-border bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2 text-[22px] font-medium">
          <BikeIcon size={24} />
          Instacart
        </Link>

        <div className="flex w-full items-center justify-end gap-4 lg:gap-10">
          <div className="hidden items-center gap-6 text-sm text-zinc-600 md:flex">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/deals" className="text-orange-400">
              Deals
            </Link>
          </div>

          <form onSubmit={handleSearch} className="hidden flex-1 max-w-sm text-xs sm:flex sm:text-sm">
            <div className="relative w-full">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search for groceries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full bg-orange-50 p-2 pl-8 ring ring-app-orange/15 focus:ring-app-orange/30"
              />
            </div>
          </form>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative rounded-xl p-2"
              aria-label="Open cart"
            >
              <ShoppingCartIcon className="size-5 text-zinc-900" />
              {cartCount > 0 && (
                <span className="flex-center absolute -right-1 -top-1 size-4 rounded-full bg-app-orange text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="relative">
              {user ? (
                <button className="flex items-center gap-2 p-2">
                    <div className="size-7 rounded-full bg-green-950 text-white flex-center">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDownIcon className="size-3 text-zinc-500"/>
                </button>
              )
              :(
                <div className="flex-center gap-2">
                  <Link
                    to="/login"
                    className="hidden items-center gap-2 rounded-full bg-green-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-950-light md:flex "
                  >
                    <UserIcon size={16}/> Sign In
                  </Link>
                  {userMenuOpen ? <XIcon className="md:hidden"
                  onClick={()=> setUserMenuOpen(!userMenuOpen)}/> :
                  <MenuIcon className="md:hidden" onClick={() => 
                    setUserMenuOpen(!userMenuOpen)}/>}
                </div>
            )}

            {userMenuOpen && (
                <>
                <div className="fixed inset-0 z-40" onClick={()=>
                    setUserMenuOpen(false)}>
                        <div className="absolute right-0 mt-2.5 w-56
                        bg-white rounded-xl shadow-lg border
                        border-app-border py-2 z-50 animate-fade-in">
                            {user && (
                                <div className="px-4 py-2 border-b border-app-border">
                                    <p className="text-sm font-medium text-zinc-900">{user?.name}</p>
                                    <p>{user?.email}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

             
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
