import * as React from "react";
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Container,
	Avatar,
	Tooltip,
	MenuItem,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router";

const settings = ["Profile", "Logout"];

function HeaderMainReg({ setIsActive }) {
	const navigate = useNavigate();
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [avatar, setAvatar] = React.useState("https://via.placeholder.com/100"); // Дефолтна аватарка

	React.useEffect(() => {
		const savedUser = JSON.parse(localStorage.getItem("user"));
		if (savedUser?.avatar) {
			setAvatar(savedUser.avatar);
		}

		const updateAvatar = () => {
			const updatedUser = JSON.parse(localStorage.getItem("user"));
			setAvatar(updatedUser?.avatar || "https://via.placeholder.com/100");
		};

		window.addEventListener("userUpdated", updateAvatar);
		return () => {
			window.removeEventListener("userUpdated", updateAvatar);
		};
	}, []);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleSettingClick = (setting) => {
		switch (setting) {
			case "Profile":
				navigate("/profile");
				break;
			case "Logout":
				localStorage.removeItem("user");
				setIsActive(false);
				navigate("/");
				break;
			default:
				console.log(`Unknown action for ${setting}`);
		}
		handleCloseUserMenu();
	};

	return (
		<AppBar position='static' sx={{ bgcolor: "#1f1f1f" }}>
			<Container maxWidth='xl'>
				<Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
					<Typography
						variant='h6'
						noWrap
						component='a'
						onClick={() => navigate("/")}
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
							cursor: "pointer",
						}}>
						<AdbIcon
							sx={{ display: { xs: "none", md: "flex" }, mr: 0.5, mt: 0.3 }}
						/>
						LOGO
					</Typography>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title='Open settings'>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt='User Avatar' src={avatar} />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							anchorEl={anchorElUser}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}>
							{settings.map((setting) => (
								<MenuItem
									key={setting}
									onClick={() => handleSettingClick(setting)}>
									<Typography textAlign='center'>{setting}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default HeaderMainReg;
