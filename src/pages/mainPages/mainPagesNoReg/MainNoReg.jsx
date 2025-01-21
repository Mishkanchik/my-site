import { Outlet } from "react-router";
import HeaderMainNoReg from '../../../components/layout/headerLayoutNoRegister/HeaderNoRegister';


const MainNoReg = () => {
    return (
        <>
            
            <HeaderMainNoReg/>
            <Outlet />
             
        </>
    );
};

export default MainNoReg