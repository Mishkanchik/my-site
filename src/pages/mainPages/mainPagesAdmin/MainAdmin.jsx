import { Outlet } from "react-router";

import HeaderAdmin from "../../../components/layout/adminHeaderLayoutRegister/HeaderAdmin";

const MainNoReg = ({ setIsActive, setIsAdmin }) => {
	return (
		<>
			<HeaderAdmin setIsActive={setIsActive} setIsAdmin={setIsAdmin} />
			<Outlet />
		</>
	);
};

export default MainNoReg;
