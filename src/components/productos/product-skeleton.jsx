export const ProductSkeletonList = ({ count = 6 }) =>
  Array.from({ length: count }).map((_, i) => (
    <div
      key={i}
      className="container-itemss animate-pulse rounded-3xl overflow-hidden bg-white shadow"
    >
      <div className="h-52 bg-gray-300 w-full" />
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  ));
