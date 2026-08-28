  import { Clock3Icon, LeafIcon, ShieldCheckIcon, TruckIcon } from "lucide-react"

const features = [
  { icon: TruckIcon, title: "Fast Delivery", desc: "Same-day delivery" },
  { icon: ShieldCheckIcon, title: "Freshness Guaranteed", desc: "Quality checked" },
  { icon: LeafIcon, title: "Organic Picks", desc: "Farm fresh" },
  { icon: Clock3Icon, title: "24/7 Support", desc: "Always here" },
] as const

const Features = () => {
  return (
    <section className="rounded-xl border border-app-border/80 bg-white py-5">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div key={`${title}-${i}`} className="flex items-center gap-3 py-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-app-cream">
                <Icon className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-app-green">{title}</p>
                <p className="text-xs text-app-text-light">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features