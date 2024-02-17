// import modules
// ===============================
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// define initial state
// ===============================
const initialState = {
    // stores items of cart
    cart: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [],

    // stores total cost of cart-items
    total: localStorage.getItem("total")
        ? JSON.parse(localStorage.getItem("total"))
        : 0,

    // stores cart-item count
    totalItems: localStorage.getItem("totalItems")
        ? JSON.parse(localStorage.getItem("totalItems"))
        : 0,
};

// create & export slice
// ===============================
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // add to cart
        // =======================
        addToCart: (state, action) => {
            const course = action.payload;
            const index = state.cart.findIndex(
                (item) => item._id === course._id
            );

            if (index >= 0) {
                // means, the course is already in cart
                // No need to add it again
                toast.error("Course is already present in cart !!");
                return;
            } else {
                // add course to cart
                state.cart.push(course);

                // update item-count & cart-price-sum
                state.totalItems++;
                state.total += course.price;

                // also update local-storage
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem(
                    "totalItems",
                    JSON.stringify(state.totalItems)
                );

                // show success toast
                toast.success("Course added to cart !");
            }
        },

        // remove from cart
        // =======================
        removeFromCart: (state, action) => {
            const courseId = action.payload;
            const index = state.cart.findIndex((item) => item._id === courseId);
            if (index >= 0) {
                // update item-count & total-cost
                state.totalItems--;
                state.total -= state.cart[index].price;

                // course is in the cart, remove it
                state.cart.splice(index, 1);

                // update to localstorage
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem(
                    "totalItems",
                    JSON.stringify(state.totalItems)
                );

                // show success toast
                toast.success("Course removed from cart !");
            }
            // Else, course not in cart, have to do nothing
        },

        // reset cart
        // =======================
        resetCart: (state) => {
            // update cart, item-count, total-cost
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;

            // update to localstorage
            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");
        },
    },
});

// export reducer functions
// ===============================
export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

// export the reducer
// ===============================
export default cartSlice.reducer;
