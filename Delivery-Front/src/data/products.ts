import fruitsVegetables from "../assets/fruits_vegetables.png"
import dairyEggs from "../assets/dairy_eggs.png"
import bakery from "../assets/bakery.png"
import drinks from "../assets/drinks.png"
import pantryStaples from "../assets/pantry_staples.png"

export type Product = {
  id: number
  name: string
  category: string
  image: string
  price: number
  originalPrice: number
  rating: number
}

export const products: Product[] = [
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

