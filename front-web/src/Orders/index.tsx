import StepsHeader from './StepsHeader';
import ProductList from './ProductsList';
import OrderLocation from './OrderLocation';
import './styles.css'
import { useEffect, useState } from 'react';
import { OrderLocationdata, Product } from './types';
import { fetchProducts } from '../api';

function Orders() {
    const [products, setProducts] = useState<Product[]>([]);
    const [orderLocation, setOrderLocation] = useState<OrderLocationdata>()
   
    useEffect(() => {
       // instalar o AXIOS - npm instal axios
        fetchProducts()
        .then(response => setProducts(response.data))
        .catch(error => console.log(error))

    }, [] );

    return (
        <div className="orders-container">
            <StepsHeader />
            <ProductList products={products}/>
            <OrderLocation onChangeLocation={location => setOrderLocation(location)}/>
            
        </div>
    )

}

export default Orders;

