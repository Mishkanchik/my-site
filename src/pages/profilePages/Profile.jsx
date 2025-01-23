import React, { useState, useEffect } from "react";
import {
	TextField,
	Button,
	Avatar,
	Box,
	Typography,
	Paper,
	List,
} from "@mui/material";
import { Chip } from "@mui/material";
const Profile = () => {
	const defaultAvatar =
		"https://pngcore.com/files/preview/960x960/11694532441f7xttwthhk686wgcagm71b84znfjy39usdvu0yrjfvlxflwlhmgbus0szosphh85sfhz9mkj6rorpkf9aozsmwxxfwg1chfkmzez.png";

	const [user, setUser] = useState({
		fullName: "",
		password: "",
		avatar: defaultAvatar,
		roles: [],
	});

	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [newAvatarUrl, setNewAvatarUrl] = useState("");

	useEffect(() => {
		const savedUser = JSON.parse(localStorage.getItem("user"));
		if (savedUser) {
			setUser({
				...savedUser,
				roles: savedUser.roles || [],
			});
		} else {
			const newUser = {
				fullName: "",
				password: "",
				avatar: defaultAvatar,
				roles: [],
			};
			setUser(newUser);
			localStorage.setItem("user", JSON.stringify(newUser));
		}
	}, []);
	const updateUser = (updatedFields) => {
		const updatedUser = { ...user, ...updatedFields };
		setUser(updatedUser);
		localStorage.setItem("user", JSON.stringify(updatedUser));
		const users = localStorage.getItem("users");
		const usersParse = JSON.parse(users);
		const index = usersParse.findIndex((u) => u.email === user.email);
		usersParse[index] = { ...usersParse[index], ...updatedFields };
		localStorage.setItem("users", JSON.stringify(usersParse));

		window.dispatchEvent(new Event("userUpdated"));
	};

	const handleAvatarChange = () => {
		updateUser({ avatar: newAvatarUrl });
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
					User Roles
				</Typography>
				{user.roles.length > 0 ? (
					<List>
						{user.roles.map((role, index) => (
							<Chip
								sx={{ marginRight: "5px" }}
								key={index}
								label={role}
								color='secondary'
							/>
						))}
					</List>
				) : (
					<Typography variant='body1'>No roles available.</Typography>
				)}

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
