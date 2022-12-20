import { useEffect, useState } from 'react';
import { useLoaderData, useRevalidator } from "react-router-dom";
import NavBars from "../NavBars";
import Headers from "../Headers";
import PreparedTableWaiters from "./PreparedTableWaiters";
import ModalConfirmDelivered from "./WaitersModals/ModalConfirmDelivered";
import { useModal } from "../useModal";
import { getData, putOneOrder } from "../../serviceApi";

function OrdersReady({ handleAccount }) {
    const revalidator = useRevalidator();
    const data = useLoaderData()
    const [orderReady, setOrderReady] = useState(data);
    const [isOpenOrderDelivered, openOrderDelivered, closeOrderDelivered] = useModal(false);
    const [idOrder, setIdOrder] = useState('');
    const [editOrderDelivered, setEditOrderDelivered] = useState({
        userId: '',
        table: '',
        products: [],
        status: '',
        dataEntryStr: '',
        dataEntryMil: '',
        dataProcessedStr: '',
        dataProcessedMil: '',
    });

    useEffect(() => {
        setOrderReady(data)
    }, [data])

    useEffect(() => {
        const id = setInterval(() => {
            revalidator.revalidate();
        }, 5000);

        return () => clearInterval(id);
    }, []);


    function editStateDelivered() {
        const updateOrder = { ...editOrderDelivered, status: 'delivered' }
        putOneOrder(idOrder, updateOrder)
            .then(async (result) => {
                closeOrderDelivered()
                revalidator.revalidate();
            })
    }

    return (
        <div className='container-waiters'>
            <NavBars handleAccount={handleAccount} />
            <div className="body-active-order">
                <Headers />
                    <PreparedTableWaiters orderReady={orderReady} isOrderDelivered={isOpenOrderDelivered} openOrderDelivered={openOrderDelivered}
                        setIdOrder={setIdOrder} setEditOrderDelivered={setEditOrderDelivered} setOrderReady={setOrderReady} />
                    <ModalConfirmDelivered idOrder={idOrder} setIdOrder={setIdOrder} isOpen={isOpenOrderDelivered} close={closeOrderDelivered} editStateDelivered={editStateDelivered} />
            </div>
        </div>
    )
}

export default OrdersReady;