import { useEffect, useRef, useState } from "react";
import { redirect, useParams } from "react-router";
import { getProductService } from "../../services/product/product.service";
import {
  getCommentsProduct,
  sendCommentForProduct,
} from "../../services/comments/comments";
import { toast } from "sonner";
import { addToCartService } from "../../services/cart/cart";
const useProduct = () => {
  const { idProduct } = useParams();
  const [copied, setCopied] = useState(false);
  const [seller, setseller] = useState(null);
  const [product, setproduct] = useState(null);
  const [comments, setComments] = useState(null);
  const [formPostComment, setFormPostComment] = useState({
    productId: idProduct,
    content: "",
    rating: 5,
  });

  const [formAddToCart, setFormAddToCart] = useState({
    productId: idProduct,
    sellerId: null,
    quantity: 1,
  });

  const refRating = useRef([]);

  useEffect(() => {
    const fetchproduct = async () => {
      const request = await getProductService(idProduct);
      setseller(request?.sellers[0]);
      setproduct(request);

      if (request?.commentCount) {
        const comments = await getCommentsProduct(idProduct);
        setComments(comments);
      }
      if (request?.sellers) {
        setFormAddToCart((prev) => {
          return { ...prev, sellerId: request.sellers[0]._id };
        });
      }
    };

    fetchproduct();
  }, []);

  const copyUrl = () => {
    navigator.clipboard.writeText(location.href);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const ratingHandler = (star) => {
    refRating.current.map((element) =>
      element.classList.remove("fill-current"),
    );

    refRating.current
      .slice(0, star)
      .map((element) => element.classList.add("fill-current"));

    setFormPostComment((prev) => {
      return { ...prev, rating: Number(star) };
    });
  };

  const postComment = () => {
    toast.promise(sendCommentForProduct(formPostComment), {
      success: () => {
        setFormPostComment({
          productId: idProduct,
          content: "",
          rating: 5,
        });

        ratingHandler(5);

        return "با موفقیت ارسال شد";
      },
      loading: "در حال ارسال",
      error: (error) => {
        return error;
      },
    });
  };

  const addToCart = () => {
    toast.promise(addToCartService(formAddToCart), {
      success: () => {
        redirect("/cart");
        return "با موفقیت افزوده شد";
      },
      loading: "درحال افزودن...",
    });
  };

  return [
    copied,
    seller,
    product,
    comments,
    formPostComment,
    formAddToCart,
    refRating,
    copyUrl,
    ratingHandler,
    postComment,
    addToCart,
    setseller,
    setFormAddToCart,
    setFormPostComment
  ];
};

export default useProduct;
