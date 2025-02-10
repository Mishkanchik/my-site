import React, { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	Typography,
	Grid,
	Pagination,
	TextField,
	Box,
	Button,
} from "@mui/material";
import Footer from "../Footer";

const Blog = () => {
	const [cars, setCars] = useState(() => {
		const savedCars = localStorage.getItem("cars");
		return savedCars ? JSON.parse(savedCars) : [];
	});
	const [filteredCars, setFilteredCars] = useState(cars);
	const [filters, setFilters] = useState({
		manufacturer: "",
		year: "",
		color: "",
		volume: "",
		minPrice: "",
		maxPrice: "",
	});
	const [page, setPage] = useState(1);
	const [showFilters, setShowFilters] = useState(false);
	const itemsPerPage = 5;

	useEffect(() => {
		localStorage.setItem("cars", JSON.stringify(cars));
	}, [cars]);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [page]);

	useEffect(() => {
		applyFilters();
	}, [filters, cars]);

	const handlePageChange = (event, value) => {
		setPage(value);
	};

	const handleFilterChange = (event) => {
		const { name, value } = event.target;
		setFilters((prev) => ({ ...prev, [name]: value }));
	};

	const applyFilters = () => {
		let filtered = cars.filter((car) => {
			return (
				(filters.manufacturer
					? car.manufacturer === filters.manufacturer
					: true) &&
				(filters.year ? car.year.toString() === filters.year : true) &&
				(filters.color
					? car.color.toLowerCase() === filters.color.toLowerCase()
					: true) &&
				(filters.volume ? car.volume.toString() === filters.volume : true) &&
				(filters.minPrice ? car.price >= parseFloat(filters.minPrice) : true) &&
				(filters.maxPrice ? car.price <= parseFloat(filters.maxPrice) : true)
			);
		});
		setFilteredCars(filtered);
	};

	const displayedCars = filteredCars.slice(
		(page - 1) * itemsPerPage,
		page * itemsPerPage
	);

	return (
		<Box style={{ padding: 20 }}>
			<Typography variant='h4' gutterBottom>
				Список автомобілів
			</Typography>

			<Button variant='contained' onClick={() => setShowFilters(!showFilters)}>
				{showFilters ? "Сховати фільтри" : "Показати фільтри"}
			</Button>

			{showFilters && (
				<Grid container spacing={2} sx={{ marginBottom: 2, marginTop: 2 }}>
					<TextField
						sx={{ mb: 1 }}
						name='manufacturer'
						label='Виробник'
						value={filters.manufacturer}
						onChange={handleFilterChange}
						fullWidth
					/>
					<TextField
						sx={{ mb: 1 }}
						name='year'
						label='Рік випуску'
						value={filters.year}
						onChange={handleFilterChange}
						fullWidth
					/>
					<TextField
						sx={{ mb: 1 }}
						name='color'
						label='Колір'
						value={filters.color}
						onChange={handleFilterChange}
						fullWidth
					/>
					<TextField
						sx={{ mb: 1 }}
						name='volume'
						label="Об'єм"
						value={filters.volume}
						onChange={handleFilterChange}
						fullWidth
					/>
					<TextField
						sx={{ mb: 1 }}
						name='minPrice'
						label='Мін. ціна'
						value={filters.minPrice}
						onChange={handleFilterChange}
						fullWidth
					/>
					<TextField
						name='maxPrice'
						label='Макс. ціна'
						value={filters.maxPrice}
						onChange={handleFilterChange}
						fullWidth
					/>
				</Grid>
			)}

			<Grid container spacing={2} sx={{ minHeight: "100vh" }}>
				{displayedCars.map((car, index) => (
					<Grid item xs={12} key={index}>
						<Card>
							<CardContent>
								<Typography variant='h6'>{car.name}</Typography>
								<Typography>Виробник: {car.manufacturer}</Typography>
								<Typography>Рік випуску: {car.year}</Typography>
								<Typography>Об'єм: {car.volume}</Typography>
								<Typography>Ціна: {car.price}</Typography>
								<Typography>Колір: {car.color}</Typography>
								<Typography>Опис: {car.description}</Typography>
								<Grid container spacing={1} style={{ marginTop: 10 }}>
									{car.images.map((url, i) => (
										<Grid item key={i}>
											<img src={url} alt={`car-${i}`} width={100} height={60} />
										</Grid>
									))}
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>

			<Pagination
				count={Math.ceil(filteredCars.length / itemsPerPage)}
				page={page}
				onChange={handlePageChange}
				style={{ marginTop: 20 }}
			/>
			<Footer />
		</Box>
	);
};

export default Blog;
