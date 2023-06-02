import './Cart.css'

function Cart({ cart, setCart, setReact, user }: { cart: Cart[], setCart: React.Dispatch<Cart[]>, setReact: React.Dispatch<any>, user?: string }) {
    return (
        <div className="Cart">
            <h2>Carrinho</h2>
            <div className="Cart-products">
                {cart.length > 0 ?
                    cart.map((cartProduct, i) => (
                        <div className="Cart-product" key={i}>
                            <img src={cartProduct.product.image || './image-not-found.png'} alt={cartProduct.product.name} />
                            <div className="Cart-product-info">
                                <h3>{cartProduct.product.name}</h3>
                                <p>R$ {(cartProduct.product.price * cartProduct.quantity).toFixed(2).replace('.', ',')}</p>
                                <p>Quantidade: {cartProduct.quantity}</p>
                            </div>
                            <button onClick={() => {
                                const cartParsed = cart;
                                const productIndex = cartParsed.findIndex(_cartProduct => _cartProduct.product.id === cartProduct.product.id);
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
                    ))
                    :
                    <h3 style={{ width: 'fit-content', margin: 'auto' }}>Nenhum produto no carrinho</h3>
                }
            </div>
            {cart.length > 0 &&
                <>
                    <h3 className='Total'>Total: R$ {cart.reduce((acc, cartProduct) => acc + cartProduct.product.price * cartProduct.quantity, 0).toFixed(2).replace('.', ',')}</h3>
                    <button className='Purchase' onClick={() => {
                        console.log(user);
                        if (!user || user === '') return;
                        if (cart.length > 0) {
                            const _body = {
                                clientId: user,
                                items: cart.map(cartProduct => ({ id: cartProduct.product.id, quantity: cartProduct.quantity }))
                            }
                            fetch('http://localhost:3001/api/order', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(_body)
                            }).then(response => {
                                if (response.status !== 201) {
                                    return;
                                }
                                response.json().then(data => {
                                    localStorage.removeItem('cart');
                                    setCart([]);
                                    setReact({});
                                })
                            })

                        }
                    }}>Finalizar pedido</button>
                </>
            }
        </div >
    )
}

export default Cart;