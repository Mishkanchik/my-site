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
	Chip,
	createTheme,
	ThemeProvider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
	addRole,
	removeRole,
} from "../../store/reducers/rolesReducer/rolesAction";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: { main: "#90caf9" },
		secondary: { main: "#f48fb1" },
		background: { default: "#121212", paper: "#1e1e1e" },
	},
	typography: { fontFamily: "Roboto, sans-serif" },
});

const AdminPanel = () => {
	const [users, setUsers] = useState([]);
	const [isAdding, setIsAdding] = useState(false);
	const [editUser, setEditUser] = useState(null);
	const [newUser, setNewUser] = useState({
		fullName: "",
		email: "",
		password: "",
		isActive: false,
		avatar: "",
	});
	const [confirmDelete, setConfirmDelete] = useState(null);

	const handleConfirmDelete = (user) => {
		setConfirmDelete(user);
	};

	const handleDeleteConfirmed = () => {
		if (confirmDelete) {
			handleDeleteUser(confirmDelete.email);
			setConfirmDelete(null);
		}
	};

	const dispatch = useDispatch();
	const roles = useSelector((state) => state.roles.roles) || [];
	const [roleInput, setRoleInput] = useState("");

	useEffect(() => {
		const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
		setUsers(storedUsers);
	}, []);

	const saveUsersToLocalStorage = (updatedUsers) => {
		localStorage.setItem("users", JSON.stringify(updatedUsers));
	};

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

	const handleDeleteUser = (email) => {
		const updatedUsers = users.filter((user) => user.email !== email);
		setUsers(updatedUsers);
		saveUsersToLocalStorage(updatedUsers);
	};

	const handleEditUser = () => {
		if (editUser) {
			const updatedUsers = users.map((user) =>
				user.email === editUser.email ? editUser : user
			);
			setUsers(updatedUsers);
			saveUsersToLocalStorage(updatedUsers);
			setEditUser(null);
		}
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
						<Grid item xs={12} md={6} lg={4} key={user.email}>
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
											onClick={() => handleConfirmDelete(user)}>
											<DeleteIcon />
										</IconButton>
									</Tooltip>
								</Box>
							</Paper>
						</Grid>
					))}
				</Grid>
				<Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
					<DialogTitle>Підтвердження видалення</DialogTitle>
					<DialogContent>
						<Typography>
							Ви впевнені, що хочете видалити {confirmDelete?.fullName}?
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setConfirmDelete(null)} color='primary'>
							Скасувати
						</Button>
						<Button
							onClick={handleDeleteConfirmed}
							variant='contained'
							color='error'>
							Видалити
						</Button>
					</DialogActions>
				</Dialog>

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

				<Box mt={4} p={2} bgcolor='background.paper'>
					<Typography variant='h6'>Roles Management</Typography>
					<Box display='flex' alignItems='center' gap={1} mt={2}>
						<TextField
							fullWidth
							margin='dense'
							label='Add Role'
							value={roleInput}
							onChange={(e) => setRoleInput(e.target.value)}
						/>
						<IconButton
							color='primary'
							onClick={() => {
								if (roleInput.trim()) {
									dispatch(addRole(roleInput.trim()));
									setRoleInput("");
								}
							}}>
							<AddIcon />
						</IconButton>
					</Box>

					<Box mt={2} display='flex' flexWrap='wrap' gap={1}>
						{roles.length > 0 ? (
							roles.map((role, index) => (
								<Chip
									key={index}
									label={role}
									onDelete={() => dispatch(removeRole(role))}
									color='secondary'
								/>
							))
						) : (
							<Typography variant='body2' color='text.secondary'>
								No roles available
							</Typography>
						)}
					</Box>
				</Box>

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
