import React, { useState, useEffect } from "react";
import {
	Fab,
	IconButton,
	Avatar,
	TextField,
	Button,
	Typography,
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Tooltip,
	Grid,
	Paper,
	createTheme,
	ThemeProvider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#90caf9",
		},
		secondary: {
			main: "#f48fb1",
		},
		background: {
			default: "#121212",
			paper: "#1e1e1e",
		},
	},
	typography: {
		fontFamily: "Roboto, sans-serif",
	},
});

const AdminPanel = () => {
	const [users, setUsers] = useState([]);
	const [isAdding, setIsAdding] = useState(false);
	const [newUser, setNewUser] = useState({
		fullName: "",
		email: "",
		password: "",
		isActive: false,
		avatar: "",
	});
	const [editUser, setEditUser] = useState(null);

	// Завантаження користувачів з локального сховища
	useEffect(() => {
		const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
		setUsers(storedUsers);
	}, []);

	// Збереження користувачів у локальному сховищі
	const saveUsersToLocalStorage = (updatedUsers) => {
		localStorage.setItem("users", JSON.stringify(updatedUsers));
	};

	// Додавання нового користувача
	const handleAddUser = () => {
		if (newUser.fullName && newUser.email && newUser.password) {
			const updatedUsers = [...users, { ...newUser, id: Date.now() }];
			setUsers(updatedUsers);
			saveUsersToLocalStorage(updatedUsers);
			setNewUser({
				fullName: "",
				email: "",
				password: "",
				isActive: false,
				avatar: "",
			});
			setIsAdding(false);
		}
	};

	// Видалення користувача
	const handleDeleteUser = (id) => {
		const updatedUsers = users.filter((user) => user.id !== id);
		setUsers(updatedUsers);
		saveUsersToLocalStorage(updatedUsers);
	};

	// Редагування користувача
	const handleEditUser = () => {
		const updatedUsers = users.map((user) =>
			user.id === editUser.id ? editUser : user
		);
		setUsers(updatedUsers);
		saveUsersToLocalStorage(updatedUsers);
		setEditUser(null);
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<Box
				sx={{
					padding: "20px",
					backgroundColor: "background.default",
					minHeight: "100vh",
				}}>
				<Typography variant='h4' gutterBottom color='primary'>
					Admin Panel
				</Typography>

				<Grid container spacing={2}>
					{users.map((user) => (
						<Grid item xs={12} md={6} lg={4} key={user.id}>
							<Paper
								sx={{ padding: "16px", backgroundColor: "background.paper" }}>
								<Box display='flex' alignItems='center' gap={2}>
									<Avatar
										src={user.avatar}
										alt={user.fullName}
										sx={{ width: 56, height: 56 }}
									/>
									<Box>
										<Typography variant='h6'>{user.fullName}</Typography>
										<Typography variant='body2' color='text.secondary'>
											Email: {user.email}
										</Typography>
										<Typography variant='body2' color='text.secondary'>
											Password: {user.password}
										</Typography>
									</Box>
								</Box>
								<Box display='flex' justifyContent='flex-end' marginTop={2}>
									<Tooltip title='Edit'>
										<IconButton
											color='primary'
											onClick={() => setEditUser(user)}>
											<EditIcon />
										</IconButton>
									</Tooltip>
									<Tooltip title='Delete'>
										<IconButton
											color='error'
											onClick={() => handleDeleteUser(user.id)}>
											<DeleteIcon />
										</IconButton>
									</Tooltip>
								</Box>
							</Paper>
						</Grid>
					))}
				</Grid>

				{/* Діалогове вікно додавання користувача */}
				{isAdding && (
					<Dialog open={isAdding} onClose={() => setIsAdding(false)}>
						<DialogTitle>Add New User</DialogTitle>
						<DialogContent>
							<TextField
								fullWidth
								margin='dense'
								label='Full Name'
								value={newUser.fullName}
								onChange={(e) =>
									setNewUser({ ...newUser, fullName: e.target.value })
								}
							/>
							<TextField
								fullWidth
								margin='dense'
								label='Email'
								value={newUser.email}
								onChange={(e) =>
									setNewUser({ ...newUser, email: e.target.value })
								}
							/>
							<TextField
								fullWidth
								margin='dense'
								label='Password'
								type='password'
								value={newUser.password}
								onChange={(e) =>
									setNewUser({ ...newUser, password: e.target.value })
								}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setIsAdding(false)}>Cancel</Button>
							<Button
								onClick={handleAddUser}
								variant='contained'
								color='primary'>
								Add
							</Button>
						</DialogActions>
					</Dialog>
				)}

				{/* Діалогове вікно редагування користувача */}
				{editUser && (
					<Dialog open={!!editUser} onClose={() => setEditUser(null)}>
						<DialogTitle>Edit User</DialogTitle>
						<DialogContent>
							<TextField
								fullWidth
								margin='dense'
								label='Full Name'
								value={editUser.fullName}
								onChange={(e) =>
									setEditUser({ ...editUser, fullName: e.target.value })
								}
							/>
							<TextField
								fullWidth
								margin='dense'
								label='Email'
								value={editUser.email}
								onChange={(e) =>
									setEditUser({ ...editUser, email: e.target.value })
								}
							/>
							<TextField
								fullWidth
								margin='dense'
								label='Password'
								type='password'
								value={editUser.password}
								onChange={(e) =>
									setEditUser({ ...editUser, password: e.target.value })
								}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setEditUser(null)}>Cancel</Button>
							<Button
								onClick={handleEditUser}
								variant='contained'
								color='primary'>
								Save
							</Button>
						</DialogActions>
					</Dialog>
				)}

				<Fab
					color='secondary'
					aria-label='add'
					onClick={() => setIsAdding(true)}
					sx={{ position: "fixed", bottom: 16, right: 16 }}>
					<AddIcon />
				</Fab>
			</Box>
		</ThemeProvider>
	);
};

export default AdminPanel;
