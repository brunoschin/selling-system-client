import './Product.css'

function Product({ product, setReact }: { product: Product, setReact: React.Dispatch<any> }) {
    return (
        <div className="Product">
            <img src={product.image || './image-not-found.png'} alt={product.name} />
            <div className="Product-info">
                <h2>{product.name}</h2>
                <p>R$ {product.price.toFixed(2).replace('.', ',')}</p>
                <div className="Product-footer">
                    <p>ID: {product.id}</p>
                    <p>Quantidade: {product.quantity}</p>
                </div>
            </div>
            <button onClick={() => {
                const cart = localStorage.getItem('cart');
                if (cart) {
                    const cartParsed = JSON.parse(cart) as Cart[];
                    const productIndex = cartParsed.findIndex(cartProduct => cartProduct.product.id === product.id);
                    if (productIndex >= 0) {
                        cartParsed[productIndex].quantity++;
                    }
                    else {
                        cartParsed.push({ product, quantity: 1 });
                    }
                    localStorage.setItem('cart', JSON.stringify(cartParsed));
                }else{
                    localStorage.setItem('cart', JSON.stringify([{ product, quantity: 1 }]));
                }
                setReact({});
            }}>Adicionar ao pedido</button>
        </div>
    )
}
export default Product;