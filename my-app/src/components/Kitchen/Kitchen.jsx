import NavBars from "../NavBars";
import Headers from "../Headers";
import Orders from "./Orders";
import { useModal } from "../useModal";
import {useLoaderData} from "react-router-dom";
import ModalConfirmKitchen from "./KitchenModals/ModalConfirmKitchen";
import {useState} from 'react';
import axios from 'axios';
import getData from "../../getData";

function Kitchen(){
    const[isOrderReady, openOrderReady, closeOrderReady]=useModal(false);
    const [orderReady, setOrderReady] = useState(useLoaderData());
    const [idOrder, setIdOrder] = useState('');
    const [editOrder, setEditOrder] = useState({
        userId: '',
        table: '',
        products: [],
        status: '',
        dataEntryStr: '',
        dataEntryMil: '',
        dataProcessedStr: '',
        dataProcessedMil: '',
    });
  
    function editState(){
        const urlOrders = `https://6372d80a348e947299fdd17b.mockapi.io/orders/${idOrder}`;
        axios.put(urlOrders, {...editOrder, status : 'done', dataProcessedStr: new Date().toLocaleString('en-GB',{hour12: false}), 
        dataProcessedMil: new Date().getTime()})
        .then(async (result) => {
            const dataProducts = await getData("https://6372d80a348e947299fdd17b.mockapi.io/orders/");
            closeOrderReady()
            return setOrderReady(dataProducts)
        })
       }
    

    return(
    <> 
    <NavBars/>
    <div className="body-active-order">
    <Headers/>
    <div>
    <Orders isOrderReady={isOrderReady} openOrderReady={openOrderReady} closeOrderReady={closeOrderReady} 
    orderReady={orderReady} setOrderReady={setOrderReady} setIdOrder={setIdOrder} setEditOrder={setEditOrder}/>
    <ModalConfirmKitchen isOpen={isOrderReady} close={closeOrderReady} editState={editState}/>
    </div>
    </div>
    </>
    )
}
export default Kitchen;