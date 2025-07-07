export const ProductSkeletonList = ({ count = 6 }) =>
  Array.from({ length: count }).map((_, i) => (
    <div
      key={i}
      className="container-itemss-skeleton animate-pulse rounded-3xl overflow-hidden bg-white shadow w-[100px]!important"
    >
      <div className="h-[60vh] bg-gray-300 rounded-2xl w-full mt-4" />
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
      </div>
    </div>
  ));
