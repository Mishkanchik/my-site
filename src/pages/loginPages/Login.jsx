import * as React from "react";
import {
	Box,
	Button,
	CssBaseline,
	Typography,
	TextField,
	Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const SignInContainer = styled(Box)(({ theme }) => ({
	height: "100vh",
	padding: theme.spacing(2),
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	[theme.breakpoints.up("sm")]: {
		padding: theme.spacing(4),
	},
}));

const Card = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignSelf: "center",
	width: "100%",
	padding: theme.spacing(4),
	gap: theme.spacing(2),
	margin: "auto",
	[theme.breakpoints.up("sm")]: {
		maxWidth: "450px",
	},
	boxShadow:
		"hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

const validationSchema = Yup.object({
	email: Yup.string()
		.email("Please enter a valid email address.")
		.required("Email is required."),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters long.")
		.required("Password is required."),
});

export default function SignIn({ setIsActive, setIsAdmin }) {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = React.useState("");

	const handleGoogleSuccess = (response) => {
		const userData = jwtDecode(response.credential);

		const user = {
			email: userData.email,
			avatar: userData.picture,
			isActive: true,
			isAdmin: false,
		};

		localStorage.setItem("user", JSON.stringify(user));

		setIsActive(true);
		setIsAdmin(false);
		navigate("/");
	};

	const handleGoogleFailure = () => {
		setErrorMessage("Google sign-in failed. Please try again.");
	};

	const formSubmit = (values) => {
		const users = localStorage.getItem("users");
		const userList = users ? JSON.parse(users) : [];

		const trimmedEmail = values.email.trim();
		const trimmedPassword = values.password.trim();

		if (trimmedEmail === "admin@admin.ad" && trimmedPassword === "admin1111") {
			const adminUser = {
				email: trimmedEmail,
				isActive: true,
				isAdmin: true,
			};

			localStorage.setItem("user", JSON.stringify(adminUser));
			setIsActive(true);
			setIsAdmin(true);
			navigate("/");
			return;
		}

		const user = userList.find(
			(user) =>
				user.email.toLowerCase() === trimmedEmail.toLowerCase() &&
				user.password === trimmedPassword
		);

		if (user) {
			const existingUser = JSON.parse(localStorage.getItem("user")) || {};

			const updatedUser = { ...existingUser, ...user, isActive: true };

			localStorage.setItem("user", JSON.stringify(updatedUser));
			setIsActive(true);
			setIsAdmin(false);
			navigate("/");
		} else {
			setErrorMessage("Incorrect email or password.");
		}
	};

	React.useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem("user"));
		if (storedUser) {
			setIsActive(storedUser.isActive);
			setIsAdmin(storedUser.isAdmin);
		}
	}, []);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema,
		onSubmit: formSubmit,
	});

	return (
		<>
			<GoogleOAuthProvider clientId='808196513552-tvtdtl6qi6n0gjlq2ophnp1hhlbai13k.apps.googleusercontent.com'>
				<CssBaseline />
				<SignInContainer>
					<Card>
						<Typography component='h1' variant='h4' align='center'>
							Sign in
						</Typography>
						{errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
						<Box
							component='form'
							onSubmit={formik.handleSubmit}
							sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
							<TextField
								label='Email'
								name='email'
								type='email'
								fullWidth
								onChange={formik.handleChange}
								value={formik.values.email}
								onBlur={formik.handleBlur}
								error={formik.touched.email && Boolean(formik.errors.email)}
								helperText={formik.touched.email && formik.errors.email}
							/>
							<TextField
								label='Password'
								name='password'
								type='password'
								fullWidth
								onChange={formik.handleChange}
								value={formik.values.password}
								onBlur={formik.handleBlur}
								error={
									formik.touched.password && Boolean(formik.errors.password)
								}
								helperText={formik.touched.password && formik.errors.password}
							/>
							<Button type='submit' fullWidth variant='contained'>
								Sign in
							</Button>
							<Button
								fullWidth
								variant='outlined'
								onClick={() => navigate("/signUp")}>
								Don&apos;t have an account? Sign up
							</Button>

							<GoogleLogin
								onSuccess={handleGoogleSuccess}
								onError={handleGoogleFailure}
							/>
						</Box>
					</Card>
				</SignInContainer>
			</GoogleOAuthProvider>
		</>
	);
}
