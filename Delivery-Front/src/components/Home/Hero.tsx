import heroBg from "../../assets/hero_bg.jpeg"

const Hero = () => {
    return (
        <section className="relative overflow-hidden min-h-[540px] mb-10 rounded-3xl flex items-center">
            <img src={heroBg} alt="Hero" className="w-full h-auto object-cover" />
        </section>
    )
}
export default Hero