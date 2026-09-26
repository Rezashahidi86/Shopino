import { useEffect, useReducer, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router";
import getAllCategories from "../../services/category/category.service";
import { getProductsService } from "../../services/product/product.service";
const useCategory = () => {
  const [price, setPrice] = useState({
    min: "",
    max: "",
  });
  const [countPagination, setCountPagination] = useState(0);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState(null);
  const [searchProducts, setSearchProducts] = useState(null);
  const { idCategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const { pathname } = useLocation();
  const setFilter = (state, action) => {
    let newFiltersProducts = {
      ...state,
      page: searchParams.get("page") || 1,
      subCategory: idCategory,
    };

    switch (action.type) {
      case "max_price": {
        if (Number(price.max) < 0) {
          setPrice({
            max: 0,
            min: price.min,
          });
        }
        if (action.Maxprice != "") {
          newFiltersProducts["maxPrice"] = Number(action.Maxprice);
        } else {
          delete newFiltersProducts.maxPrice
        }

        break;
      }

      case "min_price": {
        if (price.min < 0) {
          setPrice({
            min: "",
            max: price.max,
          });
        }
        if (action.Minprice != "") {
          newFiltersProducts["minPrice"] = Number(action.Minprice);
        } else {
          delete newFiltersProducts.minPrice
        }

        break;
      }

      case "filter_value": {
        newFiltersProducts["filterValues"] = {
          ...state.filterValues,
          [action.key]: action.value,
        };
        break;
      }

      case "delete_filters": {
        newFiltersProducts = {
          ...newFiltersProducts,
        };

        delete newFiltersProducts.filterValues;
        break;
      }
    }

    return newFiltersProducts;
  };
  const showSearchProducts = (searchUser) => {
    if (searchUser.length) {
      const filterProducts = products.filter((product) =>
        product.name.includes(searchUser),
      );

      setSearchProducts(filterProducts);
    } else {
      setSearchProducts(null);
    }
  };
  const setSelectFilter = (value) => {
    console.log(value);
    switch (value) {
      case "oldest": {
        if (products) {
          setProducts(
            [...products].sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            ),
          );
        }

        if (searchProducts) {
          setSearchProducts(
            [...searchProducts].sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            ),
          );
        }

        break;
      }

      case "newest": {
        if (products) {
          setProducts(
            [...products].sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            ),
          );
        }

        if (searchProducts) {
          setSearchProducts(
            [...searchProducts].sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            ),
          );
        }

        break;
      }

      case "expensive": {
        if (products) {
          setProducts(
            [...products].sort(
              (a, b) => b?.sellers[0]?.price - a?.sellers[0]?.price,
            ),
          );
        }

        if (searchProducts) {
          setSearchProducts(
            [...searchProducts].sort(
              (a, b) => b?.sellers[0]?.price - a?.sellers[0]?.price,
            ),
          );
        }

        break;
      }

      case "cheapest": {
        if (products) {
          setProducts(
            [...products].sort(
              (a, b) => a?.sellers[0]?.price - b?.sellers[0]?.price,
            ),
          );
        }

        if (searchProducts) {
          setSearchProducts(
            [...searchProducts].sort(
              (a, b) => a?.sellers[0]?.price - b?.sellers[0]?.price,
            ),
          );
        }

        break;
      }

      case "popular": {
        if (products) {
          setProducts(
            [...products].sort((a, b) => a?.averageRating - b?.averageRating),
          );
        }

        if (searchProducts) {
          setSearchProducts(
            [...searchProducts].sort(
              (a, b) => a?.averageRating - b?.averageRating,
            ),
          );
        }

        break;
      }
    }
  };
  const [filtersProduct, dispatch] = useReducer(setFilter, {});
  useEffect(() => {
    const controller = new AbortController();

    const fetchCategory = async () => {
      const response = await getAllCategories();

      if (controller.signal.aborted) return;

      const categories = response.data.categories;

      const category = categories.find(
        (category) => category._id === idCategory,
      );

      setCategory(category);
    };

    const fetchProducts = async () => {
      const response = await getProductsService({
        ...filtersProduct,
        page: searchParams.get("page") || 1,
        subCategory: idCategory,
      });

      if (controller.signal.aborted) return;

      setCountPagination(response.data.data.pagination.page);
      setProducts(response.data.data.products);
    };

    fetchCategory();
    fetchProducts();

    return () => {
      controller.abort();
    };
  }, [pathname, idCategory, filtersProduct]);
  return [
    category,
    search,
    products,
    filtersProduct,
    countPagination,
    searchProducts,
    searchParams,
    price,
    setPrice,
    dispatch,
    setSearch,
    setSelectFilter,
    showSearchProducts,
  ];
};

export default useCategory;
