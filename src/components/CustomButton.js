import React from "react";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

// const theme3 = createMuiTheme({
// 	palette: {
// 		primary: {
// 			main: "#00acee",
// 		},

// 		contrastThreshold: 3,
// 		tonalOffset: 0.2,
// 	},
// });

function CustomButton({ color, href, children }) {
	const ColorButton = withStyles((theme) => ({
		root: {
			color: color,
		},
	}))(IconButton);

	return (
		<ColorButton aria-label="Youtube" color="primary" component={Link} href={href}>
			{children}
		</ColorButton>
	);
}

export default CustomButton;
