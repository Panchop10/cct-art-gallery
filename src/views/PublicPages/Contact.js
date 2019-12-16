/*eslint-disable*/
import React from "react";
// @material-ui/core components
import {
	makeStyles
} from "@material-ui/core/styles";
// @material-ui/icons
import PinDrop from "@material-ui/icons/PinDrop";
import Phone from "@material-ui/icons/Phone";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Snackbar from "components/Snackbar/Snackbar.js";

import contactUsStyle from "assets/jss/material-kit-pro-react/views/contactUsStyle.js";

const useStyles = makeStyles(contactUsStyle);

export default function GalleryPage() {
	const classes = useStyles();

	// form values
	const [name, setName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [phone, setPhone] = React.useState("");
	const [messageForm, setMessageForm] = React.useState("");

	// notification alert
	const [notification, setNotification] = React.useState(false);
	const [message, setMessage] = React.useState("");

	const sendEmail = (e, artpiece_slug) => {
		e.preventDefault();

		setName("");
		setEmail("");
		setPhone("");
		setMessageForm("");

		setMessage("Your message has been successfully sent. We will contact you very soon!");
		showNotification()

	}

	const showNotification = () => {
		if (!notification) {
			setNotification(true);
			setTimeout(function() {
				setNotification(false);
			}, 8000);
		}
	};
	return ( <
		div className = {
			classes.productPage
		} >
		<
		Header brand = "CCT Art Gallery"
		links = {
			< HeaderLinks dropdownHoverColor = "warning" / >
		}
		fixed color = "warning" /
		>
		<
		div className = {
			classes.main
		} >
		<
		div className = {
			classes.contactContent
		} >
		<
		div className = {
			classes.container
		} >
		<
		GridContainer >
		<
		Snackbar place = "bc"
		color = "success"
		icon = {
			AddAlert
		}
		message = {
			message
		}
		open = {
			notification
		}
		closeNotification = {
			() => setNotification(false)
		}
		close /
		>
		<
		GridItem md = {
			6
		}
		sm = {
			6
		} >
		<
		p >
		You can contact us with anything related to our Products.We {
			"'"
		}
		ll get in touch with you as soon as possible. <
		br / >
		<
		br / >
		<
		/p> <
		form >
		<
		CustomInput labelText = "Your Name"
		id = "name"
		formControlProps = {
			{
				fullWidth: true
			}
		}
		inputProps = {
			{
				onChange: event => {
					setName(event.target.value);
				},
				value: name
			}
		}
		/> <
		CustomInput labelText = "Email address"
		id = "email"
		formControlProps = {
			{
				fullWidth: true
			}
		}
		inputProps = {
			{
				onChange: event => {
					setEmail(event.target.value);
				},
				value: email,
				type: "email",
			}
		}
		/> <
		CustomInput labelText = "Phone"
		id = "phone"
		formControlProps = {
			{
				fullWidth: true
			}
		}
		inputProps = {
			{
				onChange: event => {
					setPhone(event.target.value);
				},
				value: phone
			}
		}
		/> <
		CustomInput labelText = "Your message"
		id = "message"
		formControlProps = {
			{
				fullWidth: true
			}
		}
		inputProps = {
			{
				onChange: event => {
					setMessageForm(event.target.value);
				},
				value: messageForm,
				multiline: true,
				rows: 6
			}
		}
		/> <
		div className = {
			classes.textCenter
		} >
		<
		Button color = "warning"
		round onClick = {
			(e) => sendEmail(e)
		} >
		Contact us <
		/Button> <
		/div> <
		/form> <
		/GridItem> <
		GridItem md = {
			4
		}
		sm = {
			4
		}
		className = {
			classes.mlAuto
		} >
		<
		InfoArea className = {
			classes.info
		}
		title = "Find us at the office"
		description = {
			<
			p >
			30 - 34 Westmoreland St,
			< br / > Dublin 2,
			D02 HK35 < br / > {
				" "
			}
			Ireland <
			/p>
		}
		icon = {
			PinDrop
		}
		iconColor = "warning" /
		>
		<
		InfoArea className = {
			classes.info
		}
		title = "Give us a ring"
		description = {
			<
			p >
			John Snel < br / > +353(01) 633 3444 < br / > Mon - Fri,
			8: 30 - 18: 00 <
				/p>
		}
		icon = {
			Phone
		}
		iconColor = "warning" /
		>
		<
		InfoArea className = {
			classes.info
		}
		title = "Legal Information"
		description = {
			<
			p >
			CCT College Dublin. < br / > VAT· EN2341241 < br / > IBAN·
			BOI8732ENGB2300012123 < br / > Bank· Bank of Ireland <
			/p>
		}
		icon = {
			BusinessCenter
		}
		iconColor = "warning" /
		>
		<
		/GridItem> <
		/GridContainer> <
		/div> <
		/div> <
		/div> <
		/div>
	);
}
