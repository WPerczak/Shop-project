import Link from "next/link";
import React from "react";

function Categories() {

  return (
    <div className="Categories">
    <ul>
      <li>
        <Link href={`/category/men's%20clothing`}>Man's Clothing</Link>
      </li>
      <li>
        <Link href={`/category/women's%20clothing`}>Woman's Clorthing</Link>
      </li>
    </ul>
  </div>
  );
}

export default Categories;