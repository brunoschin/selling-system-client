import './History.css'
import { useEffect, useState } from 'react';

function History({ user, setReact }: { user?: string, setReact: React.Dispatch<any> }) {
    const [history, setHistory] = useState<any[]>([]);
    useEffect(() => {
        user && fetch(`http://localhost:3001/api/order/client/${user}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json().then((_history: any[]) => {
            fetch(`http://localhost:3001/api/product`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json().then(products => {
                let temp: any[] = [];
                _history.forEach(({ items, id }: any) => {
                    temp.push({
                        id,
                        items: items.map(({ id, quantity }: any) => {
                            const { name, price, image }: any = products.find(({ id: _id }: any) => _id === id);
                            return { name, price, quantity, image }
                        })
                    })
                })
                console.log(temp)
                setHistory(temp);
            }))
        }))
    }, [user])
    return (
        <div className="History">
            <h2>Histórico</h2>
            <div className="History-orders">
                {history.length > 0 ?
                    history.map(({ items, id }: any, i) => (
                        <div className='Order' key={i}>
                            <div className='Order-imgs' >
                                {items.map(({ name, image }: any, i: number) => (
                                    <img src={image} alt={name} key={i} />
                                ))}
                            </div>
                            <h3>Total: R$ {items.reduce((acc: number, { price, quantity }: any) => acc + price * quantity, 0).toFixed(2).replace('.', ',')}</h3>
                            <p onClick={() => {
                                fetch(`http://localhost:3001/api/order/${id}`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }).then(res => {
                                    if (res.status !== 204) return;
                                    setHistory(history.filter(({ id: _id }) => _id !== id));
                                    setReact({});
                                })
                            }}>Apagar do histórico</p>
                        </div>
                    ))
                    :
                    <h3>Nenhum pedido feito</h3>}
            </div>
        </div>
    )
}
export default History;