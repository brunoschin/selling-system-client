import './Cart.css'

function Cart({ cart, setCart, setCartState, setReact, user }: { cart: Cart[], setCart: React.Dispatch<Cart[]>, setCartState: React.Dispatch<boolean>, setReact: React.Dispatch<any>, user: Client }) {
    return (
        <div className='Backdrop'>
            <div className="Cart">
                <h2>Carrinho</h2>
                <button className='Close' onClick={() => { setCartState(false) }}>X</button>
                <div className="Cart-products">
                    {cart.map((cartProduct, i) => (
                        <div className="Cart-product" key={i}>
                            <img src={cartProduct.product.image || './image-not-found.png'} alt={cartProduct.product.name} />
                            <div className="Cart-product-info">
                                <h3>{cartProduct.product.name}</h3>
                                <p>R$ {(cartProduct.product.price * cartProduct.quantity).toFixed(2).replace('.', ',')}</p>
                                <p>Quantidade: {cartProduct.quantity}</p>
                            </div>
                            <button onClick={() => {
                                const cartParsed = cart;
                                const productIndex = cartParsed.findIndex(cartProduct => cartProduct.product.id === cartProduct.product.id);
                                if (productIndex >= 0) {
                                    cartParsed[productIndex].quantity--;
                                    if (cartParsed[productIndex].quantity === 0) {
                                        cartParsed.splice(productIndex, 1);
                                    }
                                }
                                localStorage.setItem('cart', JSON.stringify(cartParsed));
                                setCart(cartParsed);
                                setReact({});
                            }}>Remover</button>
                        </div>
                    ))}
                </div>
                <h3 className='Total'>Total: R$ {cart.reduce((acc, cartProduct) => acc + cartProduct.product.price * cartProduct.quantity, 0).toFixed(2).replace('.', ',')}</h3>
                <button className='Purchase' onClick={() => {
                    console.log(user);
                    if (!user?.id) return;
                    cart.length > 0 && fetch('http://localhost:3001/api/order', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            clientId: user,
                            items: cart.map(cartProduct => ({ id: cartProduct.product.id, quantity: cartProduct.quantity })),
                        })
                    })
                        .then(response => response.json())
                        .then(data => {
                            alert(data.message);
                            localStorage.removeItem('cart');
                            setCart([]);
                            setCartState(false);
                            setReact({});
                        })
                    setCartState(false);
                }}>Finalizar pedido</button>
            </div>
        </div>
    )
}

export default Cart;