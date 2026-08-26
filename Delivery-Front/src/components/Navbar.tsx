import { ArrowUpRightIcon, BikeIcon, ChevronDownIcon, LogOutIcon, MapPinIcon, MenuIcon, PackageIcon, SearchIcon, ShieldIcon, ShoppingCartIcon, UserIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState<{ name: string; email: string; isAdmin: boolean } | null>({
    name: "John Doe",
    email: "john@example.com",
    isAdmin: true,
  });

  const { cartCount, setIsCartOpen } = {
    cartCount: 5,
    setIsCartOpen: (_data: boolean) => {},
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownLinkClassName = "flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-50";

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    navigate(`/products?search=${encodeURIComponent(trimmedQuery)}`);
  };

  const handleLogout = () => {
    setUser(null);
    setUserMenuOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
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
                className="w-full rounded-full bg-orange-50 p-2 pl-8 ring ring-orange-500/15 focus:ring-orange-500/30"
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
                <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-orange-500 text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="relative">
              {user ? (
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((isOpen) => !isOpen)}
                  className="flex items-center gap-2 p-2"
                >
                    <div className="flex size-7 items-center justify-center rounded-full bg-green-950 text-white">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDownIcon className="size-3 text-zinc-500"/>
                </button>
              )
              :(
                <div className="flex items-center justify-center gap-2">
                  <Link
                    to="/login"
                    className="hidden items-center gap-2 rounded-full bg-green-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-900 md:flex"
                  >
                    <UserIcon size={16}/> Sign In
                  </Link>
                  {userMenuOpen ? <XIcon className="md:hidden"
                  onClick={() => setUserMenuOpen((isOpen) => !isOpen)} /> :
                  <MenuIcon className="md:hidden" onClick={() =>
                    setUserMenuOpen((isOpen) => !isOpen)} />}
                </div>
            )}

            {userMenuOpen && (
                <>
                <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                        <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-zinc-200 bg-white py-2 shadow-lg">
                            {user && (
                                <div className="border-b border-zinc-200 px-4 py-2">
                                    <p className="text-sm font-medium text-zinc-900">{user?.name}</p>
                                    <p className="text-xs text-zinc-500">
                                      {user?.email}
                                      </p>
                                </div>
                            )}
                            <div onClick={()=> setUserMenuOpen(false)}>
                              {!user && <Link to="/login" className={dropdownLinkClassName}><UserIcon size={16}/>Sign In</Link>}

                              {user && <Link to="/orders" className={dropdownLinkClassName}><PackageIcon
                              size={16}/>My Orders</Link>}

                              {user && <Link to="/addresses" className={dropdownLinkClassName}><MapPinIcon
                              size={16}/>Addresses</Link>}

                              {user && <Link to="/products" className={dropdownLinkClassName}><ArrowUpRightIcon
                              size={16}/>Products</Link>}

                                {user && <Link to="/deals" className={dropdownLinkClassName}><ArrowUpRightIcon
                              size={16}/>Deals</Link>}
                              {user?.isAdmin && (
                                <Link to="/admin/products" className={dropdownLinkClassName}><ShieldIcon
                                className="text-orange-600" size={16}/>
                                <span className="text-orange-600">
                                 Admin Panel
                                </span></Link>
                              )}
                              {user && (
                                <div className="border-t border-zinc-200 pt-1">
                                  <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
                                  >
                                    <LogOutIcon size={16}/> LogOut
                                  </button>
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
