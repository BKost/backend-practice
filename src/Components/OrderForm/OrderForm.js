import { useEffect, useRef, useState } from "react";
import "./OrderForm.css";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import axios from "axios";

function OrderForm(props) {
  const { isLoggedIn } = useUserContext();

  const formRef = useRef(null);

  const navigate = useNavigate();

  const [buyerInfo, setBuyerInfo] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setBuyerInfo((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleChangeAddress(event) {
    const { name, value } = event.target;

    setBuyerInfo((prev) => {
      return { ...prev, address: { ...prev.address, [name]: value } };
    });
  }

  function getUserInfo() {
    axios
      .get("/api/my-profile")
      .then((response) => {
        const { userData } = response.data;
        setBuyerInfo(userData);
      })
      .catch((err) => console.log(err));
  }

  function handleSubmit(event) {
    event.preventDefault();

    localStorage.setItem("buyer", JSON.stringify(buyerInfo));
    navigate("/cart/order/payment");
  }

  return (
    <form
      ref={formRef}
      onSubmit={(e) => e.preventDefault()}
      className="container order-form "
      action="POST"
    >
      <section>
        <h3>Contact information</h3>

        <ul className="order-form-ul ">
          <li>
            <div className="input-container">
              <label htmlFor="first_name">First Name</label>
              <input
                required
                onChange={handleChange}
                name="first_name"
                type="text"
                value={buyerInfo?.first_name}
              />
            </div>
          </li>
          <li>
            <div className="input-container">
              {" "}
              <label htmlFor="last_name">Last Name</label>
              <input
                required
                onChange={handleChange}
                name="last_name"
                type="text"
                value={buyerInfo?.last_name}
              />
            </div>
          </li>
          <li>
            <div className="input-container">
              {" "}
              <label htmlFor="phone">Phone number</label>
              <input
                required
                onChange={handleChange}
                name="phone"
                type="tel"
                value={buyerInfo?.phone}
              />
            </div>
          </li>
          <li>
            <div className="input-container">
              {" "}
              <label htmlFor="email">E-mail</label>
              <input
                required
                onChange={handleChange}
                name="email"
                type="text"
                value={buyerInfo?.email}
              />
            </div>
          </li>
        </ul>
      </section>
      <section>
        <h3>Address</h3>

        <ul className="order-form-ul ">
          <li>
            <div className="input-container">
              <label htmlFor="street_name">Street name</label>
              <input
                required
                onChange={handleChangeAddress}
                name="street_name"
                type="text"
                value={buyerInfo?.address?.street_name}
              />
            </div>
          </li>
          <li>
            <div className="input-container">
              <label htmlFor="street_number">Street number</label>
              <input
                required
                onChange={handleChangeAddress}
                name="street_number"
                type="text"
                value={buyerInfo?.address?.street_number}
              />
            </div>
          </li>
          <li>
            <div className="input-container">
              {" "}
              <label htmlFor="city">City</label>
              <input
                required
                onChange={handleChangeAddress}
                name="city"
                type="text"
                value={buyerInfo?.address?.city}
              />
            </div>
          </li>
          <li>
            <div className="input-container">
              {" "}
              <label htmlFor="postal_code">Postal code</label>
              <input
                required
                onChange={handleChangeAddress}
                name="postal_code"
                type="text"
                value={buyerInfo?.address?.postal_code}
              />
            </div>
          </li>
        </ul>
      </section>

      {isLoggedIn && (
        <button onClick={getUserInfo} className="blue-button" type="submit">
          Use saved contact and address
        </button>
      )}

      <button
        disabled={!buyerInfo}
        onClick={handleSubmit}
        className="yellow-button"
        type="submit"
      >
        Continue to payment
      </button>
    </form>
  );
}
export default OrderForm;
