import { Route, Routes } from "react-router";
import "./App.css";

import SignIn from "./pages/loginPages/Login";

import SignUp from "./pages/registarationPages/registaration";
import Blog from "./components/mainPagesComponents/main";

import MainNoReg from "./pages/mainPages/mainPagesNoReg/MainNoReg";
import MainReg from "./pages/mainPages/mainPagesReg/MainReg";
import MainAdmin from "./pages/mainPages/mainPagesAdmin/MainAdmin";
import { useEffect, useState } from "react";
import Profile from "./pages/profilePages/Profile";
import AdminPanel from "./pages/adminPages/AdminPanel";
import PageNotFound from "./pages/errorPages/Error";

function App() {
	const [isAdmin, setIsAdmin] = useState(false);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user?.isActive) {
			setIsActive(true);
			setIsAdmin(user.isAdmin || false);
		} else {
			setIsActive(false);
			setIsAdmin(false);
		}
	}, []);

	return (
		<>
			<Routes>
				{!isActive ? (
					<Route path='/' element={<MainNoReg />}>
						<Route index element={<Blog />} />
						<Route
							path='signIn'
							element={
								<SignIn setIsActive={setIsActive} setIsAdmin={setIsAdmin} />
							}
						/>
						<Route
							path='signUp'
							element={<SignUp setIsActive={setIsActive} />}
						/>
						<Route path='*' element={<PageNotFound/>} />
					</Route>
				) : isAdmin ? (
					<Route
						path='/'
						element={
							<MainAdmin setIsActive={setIsActive} setIsAdmin={setIsAdmin} />
						}>
						<Route index element={<Blog />} />
						<Route path='/adminPanel' element={<AdminPanel />} />
						<Route path='*' element={<PageNotFound/>} />
					</Route>
				) : (
					<Route path='/' element={<MainReg setIsActive={setIsActive} />}>
						<Route index element={<Blog />} />
						<Route path='profile' element={<Profile />} />
						<Route path='*' element={<PageNotFound/>} />
					</Route>
				)}

				
			</Routes>
		</>
	);
}
export default App;
