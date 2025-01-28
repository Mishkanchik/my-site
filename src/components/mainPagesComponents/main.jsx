import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import axios from "axios";

import AppTheme from "../../theme/AppTheme";
import Footer from "../Footer";
import Latest from "../Latest";
import MainContent from "../MainContent";
import SearchBar from "../Search";

function Blog(props) {
	const [page, setPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredNews, setFilteredNews] = useState([]);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {	
		const fetchNews = async () => {
			try {
				const response = await axios.get("https://newsapi.org/v2/everything", {
					params: {
						apiKey: "52bd04328fad42a792a5b323ff488786",
						q: searchTerm || "news",
						page: page,
						pageSize: 6,
					},
				});

				setFilteredNews(response.data.articles);
				setTotalPages(Math.ceil(response.data.totalResults / 6));
			} catch (error) {
				console.error("Error fetching news:", error);
			}
		};
		fetchNews();
		window.scrollTo(0,0);
		
	}, [page, searchTerm]);

	const handleSearch = (searchTerm) => {
		setSearchTerm(searchTerm);
		setPage(1);
	};

	const handlePageChange = (event, value) => {
		setPage(value);
		
	};

	return (
		<AppTheme {...props}>
			<CssBaseline enableColorScheme />
			<Container
				maxWidth='lg'
				component='main'
				sx={{ display: "flex", flexDirection: "column", my: 6, gap: 4 }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: 2,
						gap: 2,
					}}>
					<SearchBar onSearch={handleSearch} />
				</Box>
				<MainContent newsData={filteredNews} />
				<Latest newsData={filteredNews} />
				<Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
					<Pagination
						count={totalPages}
						page={page}
						onChange={handlePageChange}
					/>
				</Box>
			</Container>
			<Footer />
		</AppTheme>
	);
}

export default Blog;
