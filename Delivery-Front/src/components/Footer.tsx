import { BikeIcon, Globe, MessageCircle, Share2 } from "lucide-react"

const socials = [
  { icon: Globe, name: "Website", link: "#" },
  { icon: MessageCircle, name: "Chat", link: "#" },
  { icon: Share2, name: "Share", link: "#" },
]

const Footer = () => {
  return (
    <footer className="bg-app-green text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="/" className="mb-4 flex items-center gap-2">
              <BikeIcon className="size-6 text-white" />
              <span className="text-xl font-semibold">Instacart</span>
            </a>
            <p className="mb-4 text-sm text-white/70">
              Fresh groceries, delivered fast with care and quality you can trust.
            </p>

            <div className="flex gap-3">
              {socials.map(({ icon: Icon, name, link }, i) => (
                <a
                  key={`${name}-${i}`}
                  href={link}
                  aria-label={name}
                  className="flex size-9 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>About us</li>
              <li>Our stores</li>
              <li>Careers</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Help center</li>
              <li>Shipping</li>
              <li>Returns</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>hello@instacart.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Mon - Sat, 8AM - 9PM</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer