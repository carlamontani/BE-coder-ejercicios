//data organizada

import fns from "date-fns";
export function productsDTO(products) {
  const { title, description, price, category, image } = products;
  return {
    id: products.id || products._id,
    title,
    description,
    price,
    category,
    image,
    createdAt: fns.format(products.createdAt, "dd/MM/yyyy"),
  };
}


export function ordersDTO(orders) {
  const { items, status, mail, total } = orders;
  return {
    id: orders.id || orders._id,
    items,
    status,
    mail,
    total,
    createdAt: fns.format(orders.createdAt, "dd/MM/yyyy"),
  };
}