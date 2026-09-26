import React from "react";
import SpecificationsCart from "./SpecificationsCart";

function ProductSpecifications({ product }) {
  return (
    <section className="mt-6 rounded-3xl bg-white p-5 dark:bg-[#18233a] md:p-7">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        مشخصات محصول
      </h2>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {Object.entries(product?.customFields).map(([key, value]) => (
          <SpecificationsCart key={key} keyWord={key} value={value}></SpecificationsCart>
        ))}

        {Object.entries(product?.filterValues).map(([key, value]) => (
          <SpecificationsCart key={key} keyWord={key} value={value}></SpecificationsCart>
        ))}
      </div>
    </section>
  );
}

export default ProductSpecifications;
