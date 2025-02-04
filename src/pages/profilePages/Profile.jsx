import React, { useState, useEffect } from "react";
import {
	TextField,
	Button,
	Avatar,
	Box,
	Typography,
	Paper,
} from "@mui/material";

const Profile = () => {
	const defaultAvatar =
		"https://pngcore.com/files/preview/960x960/11694532441f7xttwthhk686wgcagm71b84znfjy39usdvu0yrjfvlxflwlhmgbus0szosphh85sfhz9mkj6rorpkf9aozsmwxxfwg1chfkmzez.png";

	const [user, setUser] = useState({
		fullName: "",
		password: "",
		avatar: defaultAvatar,
	});

	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [newAvatarUrl, setNewAvatarUrl] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		const savedUser = JSON.parse(localStorage.getItem("user"));
		if (savedUser) {
			setUser(savedUser);
		}
	}, []);

	const updateUser = (updatedFields) => {
		setUser((prevUser) => {
			const updatedUser = { ...prevUser, ...updatedFields };
			localStorage.setItem("user", JSON.stringify(updatedUser));

			const users = JSON.parse(localStorage.getItem("users")) || [];
			const index = users.findIndex((u) => u.email === prevUser.email);
			if (index !== -1) {
				users[index] = { ...users[index], ...updatedFields };
				localStorage.setItem("users", JSON.stringify(users));
			}

			window.dispatchEvent(new Event("userUpdated"));
			return updatedUser;
		});
	};

	const handleAvatarChange = () => {
		if (newAvatarUrl.trim() !== "") {
			updateUser({ avatar: newAvatarUrl });
			setNewAvatarUrl("");
		}
	};

	const handlePasswordChange = () => {
		if (newPassword.length < 6) {
			setErrorMessage("Введіть більше 6 символів");
			return;
		}
		if (newPassword !== confirmPassword) {
			setErrorMessage("Паролі не збігаються");
			return;
		}
		if (oldPassword === user.password) {
			updateUser({ password: newPassword });
			setNewPassword("");
			setConfirmPassword("");
			setOldPassword("");
			setErrorMessage("");
		} else {
			setErrorMessage("Старий пароль невірний");
		}
	};

	return (
		<Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
			<Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 600 }}>
				<Typography variant='h5' gutterBottom>
					Profile Settings
				</Typography>

				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						mb: 3,
					}}>
					<Avatar src={user.avatar} sx={{ width: 100, height: 100, mb: 2 }} />
					<TextField
						label='Avatar URL'
						variant='outlined'
						fullWidth
						margin='normal'
						value={newAvatarUrl}
						onChange={(e) => setNewAvatarUrl(e.target.value)}
					/>
					<Button variant='contained' onClick={handleAvatarChange} fullWidth>
						Update Avatar
					</Button>
				</Box>

				<TextField
					label='Full Name'
					variant='outlined'
					fullWidth
					margin='normal'
					value={user.fullName}
					onChange={(e) => updateUser({ fullName: e.target.value })}
				/>

				<Typography variant='h6' sx={{ mt: 4 }}>
					Change Password
				</Typography>
				<TextField
					label='Old Password'
					variant='outlined'
					type='password'
					fullWidth
					margin='normal'
					value={oldPassword}
					onChange={(e) => setOldPassword(e.target.value)}
				/>
				<TextField
					label='New Password'
					variant='outlined'
					type='password'
					fullWidth
					margin='normal'
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
				<TextField
					label='Confirm Password'
					variant='outlined'
					type='password'
					fullWidth
					margin='normal'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				{errorMessage && (
					<Typography color='error' sx={{ mt: 1, textAlign: "center" }}>
						{errorMessage}
					</Typography>
				)}
				<Button
					variant='contained'
					onClick={handlePasswordChange}
					fullWidth
					sx={{ mt: 2 }}>
					Update Password
				</Button>
			</Paper>
		</Box>
	);
};

export default Profile;
