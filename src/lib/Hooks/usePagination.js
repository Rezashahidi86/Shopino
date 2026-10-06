import { useState } from "react";
import { useSearchParams } from "react-router";

const usePagination = () => {
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useSearchParams();
  const currentPage = Number(search.get("page"))
    ? Number(search.get("page"))
    : 1;
  let showNumberPage = [];
  if (pagination?.totalPages <= 4) {
    showNumberPage = Array.from(
      { length: pagination.totalPages },
      (_, index) => index + 1,
    );
  } else if (currentPage == 1 || currentPage == 2 || !currentPage) {
    showNumberPage = [1, 2, 3, 4, 5];
  } else if (currentPage >= pagination?.totalPages - 2) {
    showNumberPage = [
      pagination?.totalPages - 4,
      pagination?.totalPages - 3,
      pagination?.totalPages - 2,
      pagination?.totalPages - 1,
      pagination?.totalPages,
    ];
  } else {
    showNumberPage = [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  }
  return [currentPage, pagination, setPagination, showNumberPage];
};

export default usePagination;
