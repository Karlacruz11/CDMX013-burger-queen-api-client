import './kitchenView.css';
import Order from "./Order"
import burgerlogo from '../../images/burgerlogo.png';
function  Orders ({isOrderReady,openOrderReady, closeOrderReady, orderReady, setOrderReady}){
 
  let ordersContainer = ''  ;
  
  if (orderReady !== undefined) {
    ordersContainer = orderReady.map((order) => {
     return( <Order
      order={order}
      openOrderReady={openOrderReady}
      key={order.id}
  />)
})
         
}
  
  
 

  

    return(
        <>
        <table className="tableOrders">
    <thead className="table-order-header">
      <tr>
        <th>Orders</th>
      </tr>
    </thead>
    <tbody className="order-table-body">
     {ordersContainer}
      {/* <Order isOrderReady={isOrderReady}  openOrderReady={openOrderReady} closeOrderReady={closeOrderReady} /> */}
      </tbody>
      <tfoot className="logo-table-box-chefs">
        <tr className="container-logo-burger-orders">
                      <td className='container-burger-chefs'>
                            <img
                                className="burger-logo-menu" id='burger-logo-admin'
                                src={burgerlogo}
                                alt="burger-logo-menu"
                            ></img>
                      </td>
          </tr>
      </tfoot>
  </table>
  
        </>
    )
}

export default Orders;