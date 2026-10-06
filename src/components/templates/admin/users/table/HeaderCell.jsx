import React from "react";

function HeaderCell({ title,className }) {
  return (
    <th className={className}>
      {title}
    </th>
  );
}

export default HeaderCell;
