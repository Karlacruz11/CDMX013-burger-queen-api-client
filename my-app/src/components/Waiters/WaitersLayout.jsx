import Menu from "./Menu";
import NavBar from "./NavBar";
import Header from "./Header";
import Ticket from "./Ticket";
import Modals from "../Modals";
import './WaitersLayout.css'
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useModal } from "../useModal";
import { useSearchParams } from 'react-router-dom'; 

function WaitersLayout(){
  const products= useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const bfProducts = products.filter((product) =>{
    const type= searchParams.get('type') === null ? 'breakfast' : searchParams.get('type');
    if (product.type === type){
      return true
    }
    return false
  })

  const [text, setText] = useState('');
  const [isOpenConfirmOrder, openConfirmOrder, closeConfirmOrder] = useModal(false);
  const [productQty, setProductQty] = useState(()=>{
    const quantities = {}
    products.forEach(product => {
      quantities[product.name] = 0
    })
    return quantities;
  });
 
  return (
    <>
    <NavBar/>
    <div className="body-new-order">
    <Header text={text} setText = {setText}/>
    <div className="tables-menu-ticket">
    <Menu products={bfProducts} productQty={productQty} setProductQty={setProductQty}/>
    <Ticket text={text} productQty={productQty} products={bfProducts} openConfirmOrder={openConfirmOrder} setProductQty={setProductQty}/>
    <Modals isOpenConfirmOrder={isOpenConfirmOrder} openConfirmOrder={openConfirmOrder} closeConfirmOrder={closeConfirmOrder} />
   
    </div>
    </div>
    </>
  )
}

export default WaitersLayout;