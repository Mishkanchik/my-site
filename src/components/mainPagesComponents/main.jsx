import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import AppTheme from "../../theme/AppTheme";
import Footer from "../Footer";
import Latest from "../Latest";
import MainContent from "../MainContent";

function Blog(props) {
	return (
		<AppTheme {...props}>
			<CssBaseline enableColorScheme />
			<Container
				maxWidth='lg'
				component='main'
				sx={{ display: "flex", flexDirection: "column", my: 6, gap: 4 }}>
				<MainContent />
				<Latest />
			</Container>
			<Footer />
		</AppTheme>
	);
}

export default Blog;
