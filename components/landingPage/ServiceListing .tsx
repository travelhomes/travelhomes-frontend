export default function ServiceListing() {
    return (
        <div className="py-8 px-4 md:py-[60px] rounded-2xl md:px-[94px] bg-[url('/bg.png')] bg-cover flex flex-col md:flex-row items-center md:justify-between gap-6">
            <div className="max-w-[500px] text-center md:text-left">
                <h3 className="text-white text-2xl md:text-[2rem] mb-3 md:mb-[12px]">Service Listing Benefits</h3>
                <p className="text-white text-sm md:text-base">Non, une fois votre devis établi, aucun coût supplémentaire ne s&apos;ajoute. Nous nous engageons à une transparence totale et à une tarification fixe.</p>
            </div>
            <div>
                <button className="bg-white text-[#131313] rounded-[50px] py-3 px-6 md:py-[16px] md:px-[40px] mt-4 md:mt-10 text-sm md:text-base">
                    Check here for more information
                </button>
            </div>
        </div>
    )
}