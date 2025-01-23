import React from "react";

import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Grid from "@mui/material/Grid2";

import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";

const SyledCard = styled(Card)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	padding: 0,
	height: "100%",
	backgroundColor: (theme.vars || theme).palette.background.paper,
	"&:hover": {
		backgroundColor: "transparent",
		cursor: "pointer",
	},
	"&:focus-visible": {
		outline: "3px solid",
		outlineColor: "hsla(210, 98%, 48%, 0.5)",
		outlineOffset: "2px",
	},
}));

const SyledCardContent = styled(CardContent)({
	display: "flex",
	flexDirection: "column",
	gap: 4,
	padding: 16,
	flexGrow: 1,
	"&:last-child": {
		paddingBottom: 16,
	},
});

const StyledTypography = styled(Typography)({
	display: "-webkit-box",
	WebkitBoxOrient: "vertical",
	WebkitLineClamp: 2,
	overflow: "hidden",
	textOverflow: "ellipsis",
});

function Author({ authors }) {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				gap: 2,
				alignItems: "center",
				justifyContent: "space-between",
				padding: "16px",
			}}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					gap: 1,
					alignItems: "center",
				}}>
				<AvatarGroup max={3}>
					{authors.map((author, index) => (
						<Avatar
							key={index}
							alt={author.name}
							src={author.avatar}
							sx={{ width: 24, height: 24 }}
						/>
					))}
				</AvatarGroup>
				<Typography variant='caption'>
					{authors.map((author) => author.name).join(", ")}
				</Typography>
			</Box>
			<Typography variant='caption'>July 14, 2021</Typography>
		</Box>
	);
}

Author.propTypes = {
	authors: PropTypes.arrayOf(
		PropTypes.shape({
			avatar: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default function MainContent({ newsData }) {
	const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

	const handleFocus = (index) => {
		setFocusedCardIndex(index);
	};

	const handleBlur = () => {
		setFocusedCardIndex(null);
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
			<Grid container spacing={2} columns={12}>
				{newsData.map((news, index) => (
					<Grid key={index} size={{ xs: 12, md: 6 }}>
						<SyledCard
							variant='outlined'
							onFocus={() => handleFocus(index)}
							onBlur={handleBlur}
							tabIndex={0}
							className={focusedCardIndex === index ? "Mui-focused" : ""}>
							<CardMedia
								component='img'
								alt={news.title}
								image={
									news.urlToImage ||
									"https://www.smaroadsafety.com/wp-content/uploads/2022/06/no-pic.png"
								}
								sx={{
									aspectRatio: "16 / 9",
									borderBottom: "1px solid",
									borderColor: "divider",
								}}
							/>
							<SyledCardContent>
								<Typography gutterBottom variant='caption' component='div'>
									{news.source.name}
								</Typography>
								<Typography gutterBottom variant='h6' component='div'>
									{news.title}
								</Typography>
								<StyledTypography
									variant='body2'
									color='text.secondary'
									gutterBottom>
									{news.description}
								</StyledTypography>
							</SyledCardContent>
							<Author
								authors={[
									{
										name: news.author || "Unknown",
										avatar: "/static/images/avatar/1.jpg",
									},
								]}
							/>
						</SyledCard>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

MainContent.propTypes = {
	newsData: PropTypes.array.isRequired,
};
