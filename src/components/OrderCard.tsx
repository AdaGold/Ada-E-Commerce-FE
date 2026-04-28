import type { Order, CartItem } from '../types'

const OrderCard = ({ 
    id,
    userId,
    products
}: Order ) => {

    const orderItemList = products.map((product: CartItem) => {
        return (
            <>
                <h3>{product.name}</h3>
                <h3>{product.price}</h3>
                <h3>{product.quantity}</h3>
            </>
        )

    });

    return (
        <li className="order">
            <h2>{id}</h2>
            <h3>User: {userId}</h3>
            <ul>{orderItemList}</ul>

        </li>
        );
};



export default OrderCard;