

import fruitsVegetables from "../../assets/fruits_vegetables.png"
import dairyEggs from "../../assets/dairy_eggs.png"
import bakery from "../../assets/bakery.png"
import drinks from "../../assets/drinks.png"
import pantryStaples from "../../assets/pantry_staples.png"
import snacks from "../../assets/snacks.png"
import meatseafood from "../../assets/meat_seafood.png"
import frozenfoods from "../../assets/frozen_foods.png"
import personalcare from "../../assets/personal_care.png"


const categories = [
  { slug: "fruits-vegetables", name: "Fruits & Vegetables", image: fruitsVegetables },
  { slug: "dairy-eggs", name: "Dairy & Eggs", image: dairyEggs },
  { slug: "bakery", name: "Bakery", image: bakery },
  { slug: "beverages", name: "Beverages", image: drinks },
  { slug: "pantry", name: "Pantry", image: pantryStaples },
  { slug: "snacks", name: "Snacks", image: snacks },
  { slug: "seafood", name: "Sea Food", image: meatseafood },
  { slug: "frozzenfoods", name: "Frozen Foods", image: frozenfoods },
  { slug: "personalcare", name: "Personal Care", image: personalcare },
] as const

const HomeCategories = () => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-9">
        <div>
          <h2 className="text-2xl font-semibold text-app">Browse Categories</h2>
          <p className="mt-1 text-sm text-app-text-light">Find exactly what you need using your favorite essentials.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-9">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group flex flex-col items-center gap-3 rounded-2xl p-3 transition-all hover:translate-y-[-2px]"
            >
              <div className="flex size-24 items-center justify-center overflow-hidden rounded-2xl bg-orange-100 ring-1 ring-orange-200 transition-all group-hover:ring-2 group-hover:ring-orange-300/75 sm:size-28">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="text-center text-sm font-medium text-app">{cat.name}</span>
              
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeCategories