export function addToCartRequest(id) {
  return {
    type: '@cart/AddRequest',
    id,
  };
}

export function addToCartSuccess(product) {
  return {
    type: '@cart/AddSuccess',
    product,
  };
}

export function removeFromCart(id) {
  return {
    type: '@cart/Remove',
    id,
  };
}

export function updateAmountRequest(id, amount) {
  return {
    type: '@cart/UpdateAmountRequest',
    id,
    amount,
  };
}

export function updateAmountSuccess(id, amount) {
  return {
    type: '@cart/UpdateAmountSuccess',
    id,
    amount,
  };
}
