import React, { useEffect, useReducer, useState } from "react";
import {
	TextField,
	Button,
	Avatar,
	Box,
	Typography,
	Paper,
	Alert,
} from "@mui/material";
import userReducer from "../../store/reducers/userReduser";
import {
	loadUsers,
	updateUser,
} from "../../store/reducers/userReduser/actionUser";

const Profile = () => {
	const [state, dispatch] = useReducer(userReducer, { user: {} });
	const [newAvatarUrl, setNewAvatarUrl] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [newFullName, setNewFullName] = useState(state.user.fullName || "");
	const [alertConfirmation, setAlertConfirmation] = useState(false);
	useEffect(() => {
		dispatch(loadUsers());
	}, []);

	const handleAvatarChange = () => {
		if (newAvatarUrl.trim()) {
			dispatch(updateUser({ avatar: newAvatarUrl }));
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
		if (oldPassword === state.user.password) {
			dispatch(updateUser({ password: newPassword }));
			setNewPassword("");
			setConfirmPassword("");
			setOldPassword("");
			setErrorMessage("");
		} else {
			setErrorMessage("Старий пароль невірний");
		}
	};

	const handleNameChange = () => {
		if (newFullName.trim()) {
			dispatch(updateUser({ fullName: newFullName }));
			setAlertConfirmation(true);
			setTimeout(() => setAlertConfirmation(false), 3000);
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
					<Avatar
						src={state.user.avatar}
						sx={{ width: 100, height: 100, mb: 2 }}
					/>
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
					value={newFullName}
					onChange={(e) => setNewFullName(e.target.value)}
				/>
				<Button
					variant='contained'
					onClick={handleNameChange}
					fullWidth
					sx={{ mt: 2 }}>
					Change Name
				</Button>

				{alertConfirmation && (
					<Alert severity='success' sx={{ mt: 2 }}>
						Нікнейм збережено
					</Alert>
				)}
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
