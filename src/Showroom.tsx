import './Showroom.css'
import ProductTSX from './Product';

const products: Product[] = [
    {
        id: 1,
        name: 'Cafeteira Elétrica Britânia CP15 15 Cafés Preto',
        price: 121.24,
        quantity: 7,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN5dv6lMKDZHbYLWfWeKt801BR_SO2HBUEzILBHP1pBjnEiLnwFJO_VMrjckT-fdsv5vM&usqp=CAU'
    },
    {
        id: 2,
        name: 'Coca-Cola 2L',
        price: 7.99,
        quantity: 10,
    }
];
function Showroom() {
    return <>
        <div className="Showroom">
            <div className="Showroom-container">
                {products.map((product, i) => <ProductTSX {...product} key={i} />)}
            </div>
        </div>
    </>
}

export default Showroom;