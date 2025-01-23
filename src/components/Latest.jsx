import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

function Latest({ newsData }) {
	return (
		<div>
			<Typography variant='h2' gutterBottom>
				Latest
			</Typography>
			<Grid container spacing={2}>
				{newsData.slice(0, 4).map((news, index) => (
					<Grid key={index} xs={12} sm={6}>
						<Box>
							<Typography variant='caption' display='block'>
								{news.source.name}
							</Typography>
							<Typography variant='h6'>{news.title}</Typography>
							<Typography variant='body2' color='text.secondary'>
								{news.description || "No description available."}
							</Typography>
						</Box>
					</Grid>
				))}
			</Grid>
		</div>
	);
}

Latest.propTypes = {
	newsData: PropTypes.array.isRequired,
};

export default Latest;
