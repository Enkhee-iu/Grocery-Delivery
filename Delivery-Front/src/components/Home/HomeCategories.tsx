

import fruitsVegetables from "../../assets/fruits_vegetables.png"
import dairyEggs from "../../assets/dairy_eggs.png"
import bakery from "../../assets/bakery.png"
import drinks from "../../assets/drinks.png"
import pantryStaples from "../../assets/pantry_staples.png"

const categories = [
  {
    slug: "fruits-vegetables",
    name: "Fruits & Vegetables",
    image: fruitsVegetables,
  },
  {
    slug: "dairy-eggs",
    name: "Dairy & Eggs",
    image: dairyEggs,
  },
  {
    slug: "bakery",
    name: "Bakery",
    image: bakery,
  },
  {
    slug: "beverages",
    name: "Beverages",
    image: drinks,
  },
  {
    slug: "household",
    name: "Household",
    image: pantryStaples,
  },
] as const

const HomeCategories = () => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-2xl font-semibold text-app">Browse Categories</h2>
          <p className="mt-1 text-sm text-app-text-light">Find exactly what you need using your favorite essentials.</p>
        </div>

        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group flex min-w-[120px] flex-col items-center gap-3 p-4"
            >
              <div className="flex size-20 items-center justify-center overflow-hidden rounded-2xl bg-orange-100 ring-1 ring-orange-200 transition-all group-hover:ring-2 group-hover:ring-orange-300/75 sm:size-24">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="text-sm font-medium text-app">{cat.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeCategories