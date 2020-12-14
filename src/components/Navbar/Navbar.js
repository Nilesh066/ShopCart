import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { logout } from "../../redux/Shopping/shopping-actions";
import { connect } from "react-redux";

const Navbar = ({ cart,loggedIn,logoff }) => {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    let count = 0;
    console.log(loggedIn);
    cart.forEach((item) => {
      count += item.qty;
    });

    setCartCount(count);
  }, [cart, cartCount]);
  
  return (
    <div className={styles.navbar}>
      <Link to="/">
        <h2 className={styles.navbar__logo}>Shopping Cart</h2>
      </Link>
      <Link to="/cart">
        <div className={styles.navbar__cart}>
          <h3 className={styles.cart__title}>Cart</h3>
          <img
            className={styles.cart__image}
            src="https://image.flaticon.com/icons/svg/102/102276.svg"
            alt="shopping cart"
          />
          <div className={styles.cart__counter}>{cartCount}</div>
        </div>
      </Link>
      {loggedIn?<Link to="/"><div className={styles.navbar__cart}>
          <h3 className={styles.cart__title} onClick={logoff}>LogOut</h3></div></Link>:
          <Link to="/login"><div className={styles.navbar__cart}>
          <h3 className={styles.cart__title}>LogIn</h3></div></Link>}

    </div>
  );
};
const mapDispatchToProps=(dispatch)=>{
  return{
    logoff:dispatch(logout())
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
    loggedIn: state.shop.loggedIn,
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
  
  
  
