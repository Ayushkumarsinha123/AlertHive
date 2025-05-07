export default function Navbar({ progressStep = 0 }) {
  const steps = ["Fetching", "Fetched", "Displayed"];

  return (
    <nav className="w-full bg-gray-100 px-6 py-3 flex justify-center rounded-xl">
      <div className="flex items-center gap-0 relative max-w-md w-full justify-between px-4">
        {steps.map((label, index) => (
          <div key={index} className="flex flex-col items-center relative z-10 w-1/3">
            {/* Circle */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
              ${index === progressStep ? 'bg-blue-500 text-white shadow-lg' : 'bg-white border border-gray-400'}
              transition duration-300 ease-in-out`}>
              {index + 1}
            </div>
            {/* Label */}
            <span className="mt-1 text-xs text-gray-700 text-center">{label}</span>
          </div>
        ))}

        {/* Line */}
        <div className="absolute top-5 left-8 right-8 h-1 bg-gray-300 z-0">
          <div
            className="h-full bg-blue-500 transition-all duration-700 ease-in-out"
            style={{
              width: `${(progressStep / (steps.length - 1)) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </nav>
  );
}
