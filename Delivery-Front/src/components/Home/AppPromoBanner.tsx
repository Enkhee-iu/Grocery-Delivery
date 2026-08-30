import React from "react"
import deliveryTruck from "../../assets/delivery_truck.svg"

const AppPromoBanner = () => {
    return (
        <section className="mx-auto my-14 max-w-[1440px] rounded-2xl bg-green-950 px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row xl:px-10">
                <div className="text-center md:text-left">
                    <h2 className="mb-3 font-serif text-3xl text-white sm:text-4xl">
                        Get the app & shop smarter
                    </h2>
                    <p className="mb-6 max-w-md text-white/70">
                        Enjoy fast delivery, exclusive deals, and fresh groceries curated for your home.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                        <button className="rounded-xl bg-white px-6 py-3 font-semibold text-green-950 transition hover:bg-orange-100">
                            App Store
                        </button>
                        <button className="rounded-xl border border-white/20 bg-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                            Google Play
                        </button>
                    </div>
                </div>

                <img src={deliveryTruck} alt="Delivery Truck" className="max-w-[240px] sm:max-w-[280px] xl:pr-10" />
            </div>
        </section>
    )
}

export default AppPromoBanner