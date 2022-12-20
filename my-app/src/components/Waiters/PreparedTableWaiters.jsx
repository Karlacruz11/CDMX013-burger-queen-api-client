import '../Kitchen/kitchenView.css'
import burgerlogo from '../../images/burgerlogo.png';
import PreparedWaiters from './PreparedWaiters';

function PreparedTableWaiters({ orderReady, openOrderDelivered,
  setIdOrder, setEditOrderDelivered }) {
  let ordersContainer = '';

  if (orderReady !== undefined) {
    const sentOrders = orderReady.filter((order) => order.status === 'done').sort((a, b) => a.dataProcessedMil
      - b.dataProcessedMil
    );


    ordersContainer = sentOrders.map((order) => {
      return (<PreparedWaiters
        order={order}
        key={order.id}
        openOrderDelivered={openOrderDelivered}
        setIdOrder={setIdOrder}
        setEditOrderDelivered={setEditOrderDelivered}


      />)
    })
  };
  return (
    <>
      <table className="table-orders-waiters">
        <thead className="table-order-header">
          <tr>
            <th>Orders</th>
          </tr>
        </thead>
        <tbody className="order-table-waiters-body">
          {ordersContainer}
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

export default PreparedTableWaiters;