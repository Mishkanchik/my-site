import React from "react";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

function SearchBar({ onSearch }) {
	const handleChange = (event) => {
		onSearch(event.target.value);
	};

	return (
		<FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant='outlined'>
			<OutlinedInput
				size='small'
				id='search'
				placeholder='Search…'
				onChange={handleChange}
				startAdornment={
					<InputAdornment position='start' sx={{ color: "text.primary" }}>
						<SearchRoundedIcon fontSize='small' />
					</InputAdornment>
				}
				inputProps={{
					"aria-label": "search",
				}}
			/>
		</FormControl>
	);
}

export default SearchBar;
