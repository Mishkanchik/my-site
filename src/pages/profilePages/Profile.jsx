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
	const defaultAvatar = "https://via.placeholder.com/100"; // Стандартна аватарка

	const [user, setUser] = useState({
		fullName: "",
		password: "",
		avatar: defaultAvatar,
	});

	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [newAvatarUrl, setNewAvatarUrl] = useState("");

	useEffect(() => {
		const savedUser = JSON.parse(localStorage.getItem("user"));
		if (savedUser) {
			setUser(savedUser);
		} else {
			const newUser = { fullName: "", password: "", avatar: defaultAvatar };
			setUser(newUser);
			localStorage.setItem("user", JSON.stringify(newUser));
		}
	}, []);

	const updateUser = (updatedFields) => {
		const updatedUser = { ...user, ...updatedFields };
		setUser(updatedUser);
		localStorage.setItem("user", JSON.stringify(updatedUser));
		window.dispatchEvent(new Event("userUpdated")); // Подія для оновлення аватарки в іншому компоненті
	};

	const handleAvatarChange = () => {
		if (newAvatarUrl) {
			updateUser({ avatar: newAvatarUrl });
			setNewAvatarUrl("");
		}
	};

	const handlePasswordChange = () => {
		if (newPassword && newPassword === confirmPassword) {
			updateUser({ password: newPassword });
			setNewPassword("");
			setConfirmPassword("");
		} else {
			alert("Passwords do not match!");
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
