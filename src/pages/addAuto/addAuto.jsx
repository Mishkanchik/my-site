import React, { useState, useEffect } from "react";
import {
	TextField,
	Button,
	Card,
	CardContent,
	Typography,
	Grid,
	IconButton,
	Pagination,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const AddCarPage = () => {
	const [cars, setCars] = useState(() => {
		const savedCars = localStorage.getItem("cars");
		return savedCars ? JSON.parse(savedCars) : [];
	});
	const [car, setCar] = useState({
		name: "",
		manufacturer: "",
		year: "",
		volume: "",
		price: "",
		color: "",
		description: "",
		images: [],
	});
	const [imageUrl, setImageUrl] = useState("");
	const [errors, setErrors] = useState({});
	const [page, setPage] = useState(1);
	const itemsPerPage = 5;

	useEffect(() => {
		localStorage.setItem("cars", JSON.stringify(cars));
	}, [cars]);

	const handleChange = (e) => {
		setCar({ ...car, [e.target.name]: e.target.value });
	};

	const addImage = () => {
		if (imageUrl && car.images.length < 10) {
			setCar({ ...car, images: [...car.images, imageUrl] });
			setImageUrl("");
		}
	};

	const removeImage = (index) => {
		setCar({ ...car, images: car.images.filter((_, i) => i !== index) });
	};

	const validate = () => {
		let tempErrors = {};
		if (!car.name) tempErrors.name = "Назва обов'язкова";
		if (!car.manufacturer) tempErrors.manufacturer = "Виробник обов'язковий";
		if (
			!car.year ||
			isNaN(car.year) ||
			car.year < 1900 ||
			car.year > new Date().getFullYear()
		)
			tempErrors.year = "Некоректний рік";
		if (!car.volume || isNaN(car.volume) || car.volume <= 0)
			tempErrors.volume = "Некоректний об'єм";
		if (!car.price || isNaN(car.price) || car.price <= 0)
			tempErrors.price = "Некоректна ціна";
		if (!car.color) tempErrors.color = "Колір обов'язковий";
		if (!car.description) tempErrors.description = "Опис обов'язковий";
		setErrors(tempErrors);
		return Object.keys(tempErrors).length === 0;
	};

	const addCar = () => {
		if (validate()) {
			setCars([...cars, car]);
			setCar({
				name: "",
				manufacturer: "",
				year: "",
				volume: "",
				price: "",
				color: "",
				description: "",
				images: [],
			});
			setErrors({});
		}
	};

	const deleteCar = (index) => {
		setCars(cars.filter((_, i) => i !== index));
	};

	const editCar = (index) => {
		setCar(cars[index]);
		deleteCar(index);
	};

	const handlePageChange = (event, value) => {
		setPage(value);
	};

	const displayedCars = cars.slice(
		(page - 1) * itemsPerPage,
		page * itemsPerPage
	);

	return (
		<div style={{ padding: 20 }}>
			<Typography variant='h4' gutterBottom>
				Додати автомобіль
			</Typography>
			<Grid container spacing={2}>
				{Object.keys(car)
					.filter((key) => key !== "images")
					.map((key) => (
						<Grid item xs={12} sm={6} key={key}>
							<TextField
								fullWidth
								label={key.charAt(0).toUpperCase() + key.slice(1)}
								name={key}
								value={car[key]}
								onChange={handleChange}
								error={!!errors[key]}
								helperText={errors[key]}
							/>
						</Grid>
					))}
				<Grid item xs={12}>
					<TextField
						fullWidth
						label='Додати URL зображення'
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
					/>
					<Button
						style={{ marginTop: 10 }}
						variant='contained'
						color='primary'
						onClick={addImage}
						disabled={car.images.length >= 10}>
						Додати зображення
					</Button>
					<Grid container spacing={1} style={{ marginTop: 10 }}>
						{car.images.map((url, index) => (
							<Grid item key={index}>
								<img
									src={url}
									alt={`car-${index}`}
									width={100}
									height={60}
									style={{ marginRight: 5 }}
								/>
								<IconButton
									color='secondary'
									onClick={() => removeImage(index)}>
									<Delete />
								</IconButton>
							</Grid>
						))}
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Button variant='contained' color='primary' onClick={addCar}>
						Додати автомобіль
					</Button>
				</Grid>
			</Grid>
			<div style={{ marginTop: 20 }}>
				{displayedCars.map((c, index) => (
					<Card key={index} style={{ marginBottom: 10 }}>
						<CardContent>
							<Typography variant='h6'>{c.name}</Typography>
							<Typography>Виробник: {c.manufacturer}</Typography>
							<Typography>Рік випуску: {c.year}</Typography>
							<Typography>Об'єм: {c.volume}</Typography>
							<Typography>Ціна: {c.price}</Typography>
							<Typography>Колір: {c.color}</Typography>
							<Typography>Опис: {c.description}</Typography>
							<Grid container spacing={1}>
								{c.images.map((url, i) => (
									<Grid item key={i}>
										<img src={url} alt={`car-${i}`} width={100} height={60} />
									</Grid>
								))}
							</Grid>
							<IconButton color='primary' onClick={() => editCar(index)}>
								<Edit />
							</IconButton>
							<IconButton color='secondary' onClick={() => deleteCar(index)}>
								<Delete />
							</IconButton>
						</CardContent>
					</Card>
				))}
				<Pagination
					count={Math.ceil(cars.length / itemsPerPage)}
					page={page}
					onChange={handlePageChange}
					style={{ marginTop: 20 }}
				/>
			</div>
		</div>
	);
};

export default AddCarPage;
