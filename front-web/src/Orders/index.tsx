import StepsHeader from './StepsHeader';
import ProductList from './ProductsList';
import OrderLocation from './OrderLocation';
import OrderSummary from './OrderSummary'
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { OrderLocationData, Product } from './types';
import { fetchProducts, saveOrder } from '../api';
import { checkIsSelected } from './helpers';
import Footer from '../Footer';
import './styles.css'

function Orders() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [orderLocation, setOrderLocation] = useState<OrderLocationData>();
    const totalPrice = selectedProducts.reduce((sum, item) => {
        return sum + item.price
    }, 0);
   
    useEffect(() => {
       // instalar o AXIOS - npm instal axios
        fetchProducts()
        .then(response => setProducts(response.data))
        .catch(() => {
            toast.warning('Erro ao listar Produtos');
          })

    }, [] );

    const handleSelectProduct = (product: Product) => {
      const isAlreadySelected = checkIsSelected(selectedProducts, product);


        if (isAlreadySelected) {
            const selected = selectedProducts.filter(item => item.id !== product.id);
            setSelectedProducts(selected);
        } else {
            setSelectedProducts(previous => [...previous, product]);
        }
    }

    const handleSubmit = () => {
        const productsIds = selectedProducts.map(({ id }) => ({ id }));
        const payload = {
          ...orderLocation!,
          products: productsIds
        }
      
        saveOrder(payload).then((response) => {
          //Instalar Bib react-toastfy
          // npm install --save react-toastify
          toast.error(`Pedido enviado com sucesso! Nº ${response.data.id} `);
          setSelectedProducts([]);
        })
          .catch(() => {
            toast.warning('Erro ao enviar pedido');
          })
      }

    return (
        <>
            <div className="orders-container">
                <StepsHeader />
                <ProductList 
                    products={products}
                    onSelectProduct={handleSelectProduct}
                    selectedProducts={selectedProducts}
                />
                <OrderLocation 
                    onChangeLocation={location => setOrderLocation(location)}/>
                <OrderSummary 
                    amount={selectedProducts.length} 
                    totalPrice={totalPrice}
                    onSubmit={handleSubmit}
                />
            </div>
            <Footer />
         </> 
    )

}

export default Orders;

