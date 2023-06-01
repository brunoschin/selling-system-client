import './App.css';
import { useState, useEffect } from 'react';
import Header from './Header';
import Showroom from './Showroom';
import CartTSX from './Cart';

function App() {
  const [Search, setSearch] = useState<string>('');
  const [Cart, setCart] = useState<Cart[]>([]);
  const [User, setUser] = useState<any>({});
  const [react, setReact] = useState<any>({});
  const [CartOpen, setCartOpen] = useState<boolean>(false);
  useEffect(() => {
    const user = localStorage.getItem('user');
    const cart = localStorage.getItem('cart');
    if (user) {
      setUser(JSON.parse(user));
      console.log(user)
      console.log(User)
    }
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, [])
  useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, [react])

  return (
    <div className="App">
      <Header search={Search} setSearch={setSearch} cartLen={Cart.length} setCartState={setCartOpen} />
      {CartOpen && <CartTSX cart={Cart} setCart={setCart} setCartState={setCartOpen} setReact={setReact} user={User} />}
      <Showroom search={Search} setReact={setReact} />
    </div>
  );
}

export default App;
