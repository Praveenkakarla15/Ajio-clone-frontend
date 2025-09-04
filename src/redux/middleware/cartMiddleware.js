// src/middleware/cartMiddleware.js
const cartMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Persist cart only when cart actions are dispatched
  if (action.type.startsWith("cart/")) {
    const { cart } = store.getState();

    try {
      localStorage.setItem("cart", JSON.stringify(cart.items));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }

  return result;
};

export default cartMiddleware;
