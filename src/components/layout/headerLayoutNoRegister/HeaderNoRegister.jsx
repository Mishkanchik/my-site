import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";

import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";

function HeaderMainNoReg() {
	const navigate = useNavigate();

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

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							sx={{ display: { xs: "block", md: "none" } }}></Menu>
					</Box>
					<AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
					<Typography
						variant='h5'
						noWrap
						component='a'
						href='#app-bar-with-responsive-menu'
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}>
						LOGO
					</Typography>

					<Box sx={{ flexGrow: 0 }}>
						<NavLink to='signIn'>
							<Button sx={{ color: "white" }}>Login</Button>
						</NavLink>
						<NavLink to='signUp'>
							<Button sx={{ color: "white" }}>Register</Button>
						</NavLink>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default HeaderMainNoReg;
