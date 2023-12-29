import "./CartItem.css";
import image from "../../images/product.jpg";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function CartItem(props) {
  const { cartItems, setCartItems } = useContext(CartContext);

  function deleteCartItem() {
    const filteredItems = cartItems.filter((item, index) => {
      return index !== props.index;
    });

    setCartItems(filteredItems);

    localStorage.setItem("cart", JSON.stringify(filteredItems));
  }

  return (
    <li className="container cart-item">
      <img
        className="cart-item-image"
        height="100"
        width="150"
        src={props.image}
        alt="Product image"
      />
      <h3>{props.title}</h3>
      <p className="price-tag">Price: $ {props.price}</p>
      <button onClick={deleteCartItem} className="cart-item-btn red-button">
        Delete
      </button>
    </li>
  );
}
export default CartItem;
