import NavBars from "../NavBars";
import Headers from "../Headers";
import { useModal } from "../useModal";
import PreparedTable from "./PreparedTable";
import ModalConfirmKitchen from "./KitchenModals/ModalConfirmKitchen";
import {useState, useEffect} from 'react';
import {useLoaderData, useRevalidator} from 'react-router-dom'

function PreparedContainer ({handleAccount}){
    const data = useLoaderData();
    const[isOrderReady, openOrderReady, closeOrderReady]=useModal(false);
    const [orderReady, setOrderReady] = useState(data);
   const revalidator= useRevalidator();
   
    useEffect(() => {
        setOrderReady(data)
    }, [data])

    useEffect(() => {
        const id = setInterval(() => {
            revalidator.revalidate();
        }, 5000);

        return () => clearInterval(id);
    }, []);


    return(
        <><div className="container-kitchen">
            <NavBars handleAccount={handleAccount} />
            <div className="body-active-order">
                <Headers />
                <div>
                    <PreparedTable isOrderReady={isOrderReady} openOrderReady={openOrderReady} closeOrderReady={closeOrderReady} orderReady={orderReady} />
                </div>
            </div>
            <ModalConfirmKitchen isOrderReady={isOrderReady} closeOrderReady={closeOrderReady} />
            </div>
        </>)
}
export default PreparedContainer;