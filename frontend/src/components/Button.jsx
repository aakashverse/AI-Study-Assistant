export default function Button({ children, loading, variant = "primary", ...props }) {
  const base = "px-2 py-1 rounded-md text-sm font-medium transition disabled:opacity-60";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    outline: "border bg-gray-200 border-indigo-400 text-gray-700 hover:bg-gray-50",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button className={`${base} ${variants[variant]}`} disabled={loading} {...props}>
      {loading ? "Loading..." : children}
    </button>
  );
}