import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router";

const settings = ["Admin Panel", "Logout"];

function HeaderAdmin({ setIsActive, setIsAdmin }) {
	const navigate = useNavigate();

	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const user = JSON.parse(localStorage.getItem("user"));
	const handleSettingClick = (setting) => {
		switch (setting) {
			case "Admin Panel":
				navigate("/adminPanel");
				break;
			case "Logout":
				if (user) {
					user.isActive = false;
					user.isAdmin = false;
					localStorage.setItem("user", JSON.stringify(user));
				}
				setIsActive(false);
				setIsAdmin(false);
				navigate("/");
				break;
			default:
				console.log(`Unknown action for ${setting}`);
		}
		handleCloseUserMenu();
	};

	const handleOpenNavMenu = () => {
		navigate("/");
	};

	return (
		<AppBar position='static' sx={{ bgcolor: "#1f1f1f" }}>
			<Container maxWidth='xl'>
				<Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
					<Typography
						variant='h6'
						noWrap
						component='a'
						onClick={handleOpenNavMenu}
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
								<Avatar
									alt='Remy Sharp'
									src='https://pngcore.com/files/preview/960x960/11694532441f7xttwthhk686wgcagm71b84znfjy39usdvu0yrjfvlxflwlhmgbus0szosphh85sfhz9mkj6rorpkf9aozsmwxxfwg1chfkmzez.png'
								/>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}>
							{settings.map((setting) => (
								<MenuItem
									key={setting}
									onClick={() => handleSettingClick(setting)}>
									<Typography sx={{ textAlign: "center" }}>
										{setting}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default HeaderAdmin;
