import './App.css';
import { useState, useEffect } from 'react';
import Header from './Header';
import Showroom from './Showroom';
import CartTSX from './Cart';
import History from './History';

function App() {
  const [Search, setSearch] = useState<string>('');
  const [Cart, setCart] = useState<Cart[]>([]);
  const [User, setUser] = useState<string>();
  const [react, setReact] = useState<any>({});
  useEffect(() => {
    const user = localStorage.getItem('user');
    const cart = localStorage.getItem('cart');
    if (user) {
      const json = JSON.parse(user);
      setUser(json);
      fetch(`http://localhost:3001/api/client/${json}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.status !== 200) {
          getClient()
        }
      })
    } else {
      getClient()
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
  const { pathname } = document.location;

  function getClient() {
    fetch('http://localhost:3001/api/client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json().then(({ id }) => {
      setUser(id);
      localStorage.setItem('user', JSON.stringify(id));
    }))
  }
  return (
    <div className="App">
      <Header search={Search} setSearch={setSearch} cartLen={Cart.length} />
      {(() => {
        switch (pathname) {
          case '/history':
            return <History user={User} setReact={setReact} />
          case '/cart':
            return <CartTSX cart={Cart} setCart={setCart} setReact={setReact} user={User} />
          default:
            return <Showroom search={Search} setReact={setReact} />
        }
      })()}
    </div>
  );
}

export default App;
