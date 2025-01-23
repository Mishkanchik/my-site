import * as React from "react";
import { Typography, TextField, Button, Box, CssBaseline } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const SignUpContainer = styled(Box)(({ theme }) => ({
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
	fullName: Yup.string().required("Full name is required."),
	email: Yup.string()
		.email("Please enter a valid email address.")
		.required("Email is required."),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters long.")
		.required("Password is required."),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords must match.")
		.required("Confirm password is required."),
});

export default function SignUp({ setIsActive }) {
	const navigate = useNavigate();

	const formSubmit = (values) => {
		try {
			const newUser = {
				fullName: values.fullName,
				email: values.email,
				password: values.password,
				isActive: true,
				avatar: "",
			};
			localStorage.setItem("user", JSON.stringify(newUser));
			const localData = localStorage.getItem("users");
			if (!localData) {
				localStorage.setItem("users", JSON.stringify([newUser]));
			} else {
				const updatedUsers = JSON.parse(localData);
				updatedUsers.push(newUser);
				localStorage.setItem("users", JSON.stringify(updatedUsers));
			}

			setIsActive(true);
			navigate("/");
		} catch (error) {
			console.error("Error during sign up:", error);
		}
	};

	const formik = useFormik({
		initialValues: {
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema,
		onSubmit: formSubmit,
	});

	return (
		<>
			<CssBaseline />
			<SignUpContainer sx={{ bgcolor: "f1f1f1f" }}>
				<Card>
					<Typography component='h1' variant='h4' align='center'>
						Sign up
					</Typography>
					<Box
						component='form'
						onSubmit={formik.handleSubmit}
						sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
						{[
							{
								id: "fullName",
								label: "Full Name",
								placeholder: "John Doe",
								type: "text",
							},
							{
								id: "email",
								label: "Email",
								placeholder: "example@mail.com",
								type: "email",
							},
							{
								id: "password",
								label: "Password",
								placeholder: "••••••",
								type: "password",
							},
							{
								id: "confirmPassword",
								label: "Confirm Password",
								placeholder: "••••••",
								type: "password",
							},
						].map((field) => (
							<TextField
								key={field.id}
								id={field.id}
								name={field.id}
								label={field.label}
								placeholder={field.placeholder}
								type={field.type}
								fullWidth
								onChange={formik.handleChange}
								value={formik.values[field.id]}
								onBlur={formik.handleBlur}
								error={
									formik.touched[field.id] && Boolean(formik.errors[field.id])
								}
								helperText={formik.touched[field.id] && formik.errors[field.id]}
							/>
						))}

						<Button type='submit' fullWidth variant='contained'>
							Sign up
						</Button>
						<Button
							fullWidth
							variant='outlined'
							onClick={() => navigate("/signIn")}>
							Already have an account? Sign in
						</Button>
					</Box>
				</Card>
			</SignUpContainer>
		</>
	);
}
