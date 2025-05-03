export default function Card4({ title, children }) {
  return (
    <div className="bg-slate-100 rounded-xl p-4 shadow-sm h-full flex flex-col">
      {title && <h2 className="text-md font-semibold text-gray-800 mb-2">{title}</h2>}
      <div className="text-sm text-gray-600 flex-grow">{children}</div>
    </div>
  );
}
