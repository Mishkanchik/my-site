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

function App() {
	const IsAdmin = false;
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user?.isActive) {
			setIsActive(true);
		} else {
			setIsActive(false);
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
							element={<SignIn setIsActive={setIsActive} />}
						/>
						<Route
							path='signUp'
							element={<SignUp setIsActive={setIsActive} />}
						/>
					</Route>
				) : !IsAdmin ? (
					<Route path='/' element={<MainReg setIsActive={setIsActive} />}>
						<Route index element={<Blog />} />
						<Route path='profile' element={<Profile />} />
					</Route>
				) : (
					<Route path='/' element={<MainAdmin />}>
						<Route index element={<Blog />} />
					</Route>
				)}

				<Route path='*' element={<h1>404 Not Found</h1>} />
			</Routes>
		</>
	);
}

export default App;
