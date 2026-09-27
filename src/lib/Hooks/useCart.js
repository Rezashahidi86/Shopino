import { useEffect, useState } from "react";
import { getCart, removeCart, updateCart } from "../../services/cart/cart";
import { toast } from "sonner";
const useCart = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(null);
  const fetchCart = async () => {
    setLoading(true);
    setItems(await getCart());
    setLoading(false);
  };
  useEffect(() => {
    fetchCart();
  }, []);
  const removeFromCart = (formRemoveCart) => {
    toast.promise(removeCart(formRemoveCart), {
      success: () => {
        fetchCart();
        return "با موفقیت حذف شد";
      },
      loading: "درحال حذف کردن",
    });
  };
  const updateFromCart = (formUpdateCart) => {
    if (formUpdateCart.quantity <= 0) {
      formUpdateCart.quantity = 1;
    } else {
      toast.promise(updateCart(formUpdateCart), {
        success: () => {
          fetchCart();
          return "با موفقیت بروزرسانی شد";
        },
        loading: "درحال تغییر...",
      });
    }
  };
  const submitCart = () => {
    toast.info("درگاه پرداخت نیست همیجا وایسا😂");
  };
  return [loading, items, removeFromCart, updateFromCart, submitCart];
};


export default useCart