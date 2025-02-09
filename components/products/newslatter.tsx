export default function Newslatter() {
  return (
    <div className="py-8 px-4 sm:px-6 md:py-[60px] rounded-2xl md:px-[94px] bg-[url('/bg.png')] bg-cover flex flex-col md:flex-row items-center md:justify-between gap-6">
      <div className="w-full md:max-w-[500px] text-center md:text-left">
        <h3 className="text-white text-xl sm:text-2xl md:text-[2rem] mb-3 md:mb-[12px]">
          Subscribe Newsletter
        </h3>
        <p className="text-white text-xs sm:text-sm md:text-base">
          Get inspired! Receive travel discounts, tips and behind the scenes
          stories.
        </p>
      </div>
      <div className="w-full md:w-auto">
        <div className="flex items-center bg-white rounded-full px-3 sm:px-4 py-2 mx-auto md:mx-0 max-w-[90%] sm:max-w-[400px] md:max-w-none">
          <input
            type="email"
            placeholder="Email..."
            className="bg-transparent outline-none text-black placeholder-gray-400 px-2 w-full md:w-auto text-sm sm:text-base"
          />
          <button className="bg-black text-white rounded-full px-3 sm:px-5 py-1 text-sm sm:text-base whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
