import ItemTicket from "./ItemTicket";
function Ticket({text, productQty, products, openConfirmOrder, openCancelOrder, closeConfirmOrder}){
    
    const productsEntries = Object.entries(productQty);
    let total = 0;

    return (
        <>
        <table className="tableTicket">
            <thead className="table-ticket-header">
            <tr className = 'tr-ticket-table-number'>
                <th>Ticket Table #{text}</th>
            </tr>
            </thead>
            <tbody className="ticket-body"> 
                {products.map(item =>{
                return productsEntries.map(product => {
                const productName = product[0];
                const productQty = product[1];
                const itemPrice = item.price*productQty;
                if(productQty === 0){
                    return null;
                }
                if(productName === item.name){
                    total = itemPrice + total;
                    return <ItemTicket key={productName} product={productName} quantity={productQty}  price={itemPrice}/>
                }
                return null;
                })} )}
                <tr> 
                    <td>
                    <div className="ticket-total-box">
                        <label className="ticket-total">Total  ${total}</label>
                    </div>
                    </td>
                </tr> 
            </tbody>
            <tfoot className="buttons-table-box">
                <tr className="container-ticketbuttons"> 
                    <td className="confirm-order-buttons-cell">
                        <div className="confirm-order-buttons">
                            <button className="button-cancel-order" onClick={openCancelOrder}>Cancel</button>
                            <button className="button-confirm-order" onClick= {openConfirmOrder}>Confirm</button>
                        </div>
                    </td>
                </tr>
             </tfoot>
        </table>
        </>
    )
}

export default Ticket;