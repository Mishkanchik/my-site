import { Outlet } from "react-router";

import HeaderAdmin from "../../../components/layout/adminHeaderLayoutRegister/HeaderAdmin";

const MainNoReg = () => {
	return (
		<>
			<HeaderAdmin />
			<Outlet />
		</>
	);
};

export default MainNoReg;
