import Menu from './Menu'
import NavBars from '../NavBars'
import Headers from '../Headers'
import Ticket from './Ticket'
import './WaitersLayout.css'
import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import { useModal } from '../useModal'
import { useSearchParams } from 'react-router-dom'
import ModalConfirmOrder from './WaitersModals/ModalConfirmOrder'
import ModalConfirmCancel from './WaitersModals/ModalConfirmCancel'
import { postOneOrder } from '../../serviceApi'

function WaitersLayout({ user, handleAccount }) {
  const products = useLoaderData()
  const [searchParams, setSearchParams] = useSearchParams()

  const actualProducts = products.filter((product) => {
    const type =
      searchParams.get('type') === null ? 'breakfast' : searchParams.get('type')
    if (product.type === type) {
      return true
    }
    return false
  })

  const [isOpenConfirmOrder, openConfirmOrder, closeConfirmOrder] =
    useModal(false)
  const [isOpenCancelOrder, openCancelOrder, closeCancelOrder] = useModal(false)

  const [productQty, setProductQty] = useState(() => {
    const quantities = {}
    products.forEach((product) => {
      quantities[product.name] = 0
    })
    return quantities
  })

  const [userName, setUserName] = useState(user.auth)

  const [text, setText] = useState('')

  const [order, setOrder] = useState({
    userId: userName,
    table: text,
    products: [],
    status: 'sent',
    dataEntryStr: new Date().toLocaleString('en-GB', { hour12: false }),
    dataEntryMil: new Date().getTime(),
    dataProcessedMil: '',
    dataProcessedStr: '',
  })

  function resetQty() {
    setProductQty(() => {
      const quantities = {}
      products.forEach((product) => {
        quantities[product.name] = 0
      })
      closeCancelOrder()
      closeConfirmOrder()
      return quantities
    })
  }

  const productsEntries = Object.entries(productQty)

  function saveOrder() {
    //array que contiene el objeto y la cantidad del producto para generar la orden
    let arrProducts = []
    products.forEach((productObj) => {
      productsEntries.forEach((product) => {
        const obj = productObj
        const name = product[0]
        const quantity = product[1]
        if (name === obj.name && quantity >= 1) {
          arrProducts.push({ quantity, name, product: obj })
        }
      })
    })
    const newOrder = { ...order, table: text, products: arrProducts }
    postOneOrder(newOrder).then((resp) => {
      setText('')
      document.querySelector('.input-table').value = ''
      closeConfirmOrder()
      resetQty()
    })
  }

  return (
    <div className='container-waiters'>
      <NavBars handleAccount={handleAccount} />
      <div className="body-new-order">
        <Headers text={text} setText={setText} />
        <div className="tables-menu-ticket">
          <Menu
            products={actualProducts}
            productQty={productQty}
            setProductQty={setProductQty}
          />
          <Ticket
            text={text}
            productQty={productQty}
            products={actualProducts}
            openConfirmOrder={openConfirmOrder}
            openCancelOrder={openCancelOrder}
            close={closeConfirmOrder}
          />
          <ModalConfirmOrder
            isOpen={isOpenConfirmOrder}
            close={closeConfirmOrder}
            saveOrder={saveOrder}
          />
          <ModalConfirmCancel
            isOpen={isOpenCancelOrder}
            close={closeCancelOrder}
            products={products}
            setProductQty={setProductQty}
            resetQty={resetQty}
          />
        </div>
      </div>
    </div>
  )
}

export default WaitersLayout
