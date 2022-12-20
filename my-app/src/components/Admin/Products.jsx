import NavBars from '../NavBars'
import Header from './Header'
import ProductsTable from './ProductsTable'
import { useModal } from '../useModal'
import { useLoaderData } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {getData,deleteOneProduct, postOneProduct, putOneProduct} from '../../serviceApi'
import ModalAddProduct from './AdminModals/ModalAddProduct'
import ModalDeleteProduct from './AdminModals/ModalDeleteProduct'
import ModalEditProduct from './AdminModals/ModalEditProduct'

function Products({handleAccount}) {
    const [isAddProduct, openAddProduct, closeAddProduct] = useModal(false)
    const [isEditProduct, openEditProduct, closeEditProduct] = useModal(false)
    const [isOpenDeleteProduct, openDeleteProduct, closeDeleteProduct] =
        useModal(false)
    const [idModal, setIdModal] = useState('')
    const [products, setProducts] = useState(useLoaderData())
    const [inputText, setInputText] = useState('')
    const [filteredProducts, setFilteredProducts] = useState(products)
    const [addProducts, setAddProducts] = useState({
        name: '',
        type: 'breakfast',
        price: '',
    })

    const filterByName = products.filter((element) => {
        return (
            element.name.toLowerCase().includes(inputText) ||
            element.type.toLowerCase().includes(inputText)
        )
    })

    useEffect(() => {
        setFilteredProducts(inputText !== '' ? filterByName : products)
    }, [inputText])

    const urlProducts = 'https://6372d80a348e947299fdd17b.mockapi.io/products'

    function deleteProduct() {
        deleteOneProduct(idModal)
            .then(async () => {
                const dataProducts = await getData(urlProducts)
                setFilteredProducts(dataProducts)
                closeDeleteProduct()
                return setProducts(dataProducts)
            })
    }

    function postProduct(event) {
        event.preventDefault()
        postOneProduct(addProducts).then((resp) => {
            setFilteredProducts([...products, resp.data])
            closeAddProduct()
            setAddProducts({
                name: '',
                type: 'breakfast',
                price: '',
            })
            return setProducts([...products, resp.data])
        })
    }
    function putProduct(event) {
        event.preventDefault();
       putOneProduct(idModal, addProducts)
            .then(async () => {
                const dataProducts = await getData(urlProducts)
                setFilteredProducts(dataProducts)
                closeEditProduct()
                return setProducts(dataProducts)
            })
    }

    return (
        <div className='container-waiters'>
            <NavBars handleAccount={handleAccount}/>

            <ModalAddProduct isOpen={isAddProduct} close={closeAddProduct} 
            addProducts={addProducts} setAddProducts={setAddProducts}
            postProduct={postProduct}/>
            <ModalDeleteProduct isOpen={isOpenDeleteProduct} close={closeDeleteProduct}
                deleteProduct={deleteProduct}/>
            <ModalEditProduct isOpen={isEditProduct}
                close={closeEditProduct} addProducts={addProducts}
                setAddProducts={setAddProducts} putProduct={putProduct} />
            
            <div className="partners-layout">
                <Header inputText={inputText} setInputText={setInputText} />
                <ProductsTable
                    openAddProduct={openAddProduct}
                    openDeleteProduct={openDeleteProduct}
                    setIdModal={setIdModal}
                    products={
                        filteredProducts !== products
                            ? filteredProducts
                            : products
                    }
                    openEditProduct={openEditProduct}
                    setAddProducts={setAddProducts}
                />
            </div>
        </div>
    )
}

export default Products;
