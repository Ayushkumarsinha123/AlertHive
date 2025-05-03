// components/ReportCard.jsx
export default function ReportCard({ title, children }) {
  return (
    <div className="w-full h-full bg-white/90 rounded-2xl shadow-md p-6 overflow-auto">
      {title && <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>}
      <div className="text-sm text-gray-700">{children}</div>
    </div>
  );
}
