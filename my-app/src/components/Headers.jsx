import Menubuttons from "./Waiters/Menubuttons";
import { useLocation } from "react-router-dom";
import Header from "./Waiters/Header";

function Headers ({text, setText}){

   const handleInputChange = ({target}) => {
    setText(target.value);
    // localStorage.setItem('Text', JSON.stringify(target.value));
   }
   
   const location = useLocation();
   let content;
   
if (location.pathname === '/waiters/new_order') {
  content = <Header>
            <header className="header-waiters-new-order">
                <div className="choose-table-box">
                    <label className="choose-table-letter">Table: </label>
                    <input
                        className="input-table"
                        type="number" min='0'  
                        value={text} onChange={handleInputChange}
                        >  
                    </input>
                </div>
                <Menubuttons/>
                <label className="role-letters">Waiters </label>;
            </header>
            </Header>
} else if(location.pathname === '/kitchen/active' || location.pathname === '/kitchen/prepared'){
    content = <Header>
                <header className="header-chefs">
                 <label className="role-letters-chefs">Chefs </label>;
                </header>
             </Header>
} else if(location.pathname === '/waiters/ready'){
    content = <Header>
                 <header>
                    <label className="role-letters-chefs">Waiters </label>;
                </header>
              </Header>
}
    return (
        <>
           {content};
        </>
    )
}

export default Headers;