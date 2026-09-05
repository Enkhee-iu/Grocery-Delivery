import fruitsVegetables from "../../assets/fruits_vegetables.png"
import dairyEggs from "../../assets/dairy_eggs.png"
import bakery from "../../assets/bakery.png"
import drinks from "../../assets/drinks.png"
import pantryStaples from "../../assets/pantry_staples.png"
import { useCart } from "../../context/CartContext"

type Product = {
  id: number
  name: string
  category: string
  image: string
  price: number
  originalPrice: number
  rating: number
}

const dummyProducts: Product[] = [
  { id: 1, name: "Organic Banana", category: "Fruits", image: fruitsVegetables, price: 2200, originalPrice: 2800, rating: 4.9 },
  { id: 2, name: "Farm Eggs", category: "Dairy", image: dairyEggs, price: 3500, originalPrice: 4200, rating: 4.8 },
  { id: 3, name: "Fresh Bread", category: "Bakery", image: bakery, price: 1800, originalPrice: 2400, rating: 4.7 },
  { id: 4, name: "Orange Juice", category: "Drinks", image: drinks, price: 2600, originalPrice: 3200, rating: 4.9 },
  { id: 5, name: "Rice Pack", category: "Pantry", image: pantryStaples, price: 4300, originalPrice: 5000, rating: 4.6 },
  { id: 6, name: "Avocado Mix", category: "Fruits", image: fruitsVegetables, price: 2900, originalPrice: 3400, rating: 4.8 },
  { id: 7, name: "Cheese", category: "Dairy", image: dairyEggs, price: 3900, originalPrice: 4600, rating: 4.8 },
  { id: 8, name: "Croissant", category: "Bakery", image: bakery, price: 2000, originalPrice: 2600, rating: 4.7 },
  { id: 9, name: "Farm Eggs", category: "Dairy", image: dairyEggs, price: 3500, originalPrice: 4200, rating: 4.8 },
  { id: 10, name: "Fresh Bread", category: "Bakery", image: bakery, price: 1800, originalPrice: 2400, rating: 4.7 },
]

const PopularProducts = () => {
  const products = dummyProducts.slice(0, 10)
  const { addToCart } = useCart()

  return (
    <section className="pb-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-app">Popular Products</h2>
            <p className="mt-1 text-sm text-app-text-light">Top-rated products this season</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <article key={product.id} className="rounded-2xl border border-app-border/80 bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 overflow-hidden rounded-2xl bg-app-cream">
                <img src={product.image} alt={product.name} className="h-36 w-full object-cover" />
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-app-text-light">{product.category}</p>
                <h3 className="text-base font-semibold text-app">{product.name}</h3>

                <div className="flex items-center gap-1 text-sm text-amber-500">
                  <span>★</span>
                  <span className="font-medium text-app">{product.rating}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-app">${product.price}</span>
                    <span className="ml-2 text-xs text-app-text-light line-through">${product.originalPrice}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="rounded-full bg-app-green px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-app-green/90"
                  >
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularProducts