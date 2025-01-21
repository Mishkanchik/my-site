import { Outlet } from "react-router";
import HeaderMainReg from "../../../components/layout/headerLayoutRegister/HeaderRegDefault";

const MainReg = ({ setIsActive }) => {
	return (
		<>
			<HeaderMainReg setIsActive={setIsActive} />
			<Outlet />
		</>
	);
};

export default MainReg;
