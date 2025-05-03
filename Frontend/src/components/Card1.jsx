export default function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm h-full flex flex-col">
      {title && <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>}
      <div className="text-sm text-gray-600 flex-grow">{children}</div>
    </div>
  );
}
