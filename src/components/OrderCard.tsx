import '../css/OrderCard.css'
import type { Order, CartItem } from '../types'

const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const OrderCard = ({
    id,
    userId,
    products
}: Order ) => {
    return (
        <li className="order">
            <p className="order__id">Order #{id}</p>
            <p className="order__user">User: {userId}</p>
            <table className="order__items">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th className="order__item-quantity">Qty</th>
                        <th className="order__item-price">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: CartItem) => (
                        <tr key={product.productId}>
                            <td>{product.name}</td>
                            <td className="order__item-quantity">{product.quantity}</td>
                            <td className="order__item-price">${formatter.format(product.price)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </li>
    );
};



export default OrderCard;