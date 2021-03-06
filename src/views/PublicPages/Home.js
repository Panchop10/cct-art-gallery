/*eslint-disable*/
import React from "react";

// API
import {
	ARTPIECES,
	LIKEARTPIECES
} from "constants/api";
// nodejs library that concatenates classes
import classNames from "classnames";
// react component used to create nice image meadia player
import ImageGallery from "react-image-gallery";
// @material-ui/core components
import {
	makeStyles
} from "@material-ui/core/styles";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Accordion from "components/Accordion/Accordion.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Tooltip from "@material-ui/core/Tooltip";
import Snackbar from "components/Snackbar/Snackbar.js";

import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";

// images
import cardProduct1 from "assets/img/examples/ga_1.jpg";
import cardProduct3 from "assets/img/examples/ga_2.jpg";
import cardProduct4 from "assets/img/examples/ga_3.jpg";
import cardProduct2 from "assets/img/examples/ga_4.jpg";
import product1 from "assets/img/examples/ga_1.jpg";

import placeholder from "assets/img/image_placeholder.jpg";

const useStyles = makeStyles(productStyle);

export default function Home() {
	const classes = useStyles();

	const [artPieces, setArtPieces] = React.useState([]);

	// notification alert
	const [notification, setNotification] = React.useState(false);
	const [message, setMessage] = React.useState("");

	// fetch code
	var codefetchArtPieces = 0;
	var codelikeArtPiece = 0;
	var codeunLikeArtPiece = 0;

	React.useEffect(() => {
		fetchArtPieces();
	}, []);

	const fetchArtPieces = () => {
		fetch(ARTPIECES, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			})
			.then(response => {
				//console.log(response)
				codefetchArtPieces = response.status
				return response.json()
			})
			.then(data => {
				//console.log(data)
				if (codefetchArtPieces === 200) {
					setArtPieces(data);
				}

				//}
			}).catch(err => {
				setMessage("The website encountered an unexpected error. Please try again later.");
				showNotification()
				//console.log(err);
			});

	};

	const likeArtPiece = (e, artpiece_slug) => {
		e.preventDefault();

		if (localStorage.getItem('username') == undefined) {
			setMessage("You must login to perform this action.");
			showNotification();
		} else {
			var data = {
				artpiece: artpiece_slug
			};

			//it will be changed to api/likes/
			var endpoint = LIKEARTPIECES + localStorage.getItem('username') + "/likes/";

			fetch(endpoint, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + localStorage.getItem('token')
					},
					body: JSON.stringify(data)
				})
				.then(response => {
					//console.log(response)
					codelikeArtPiece = response.status
					return response.json()
				})
				.then(data => {
					//console.log(data)
					if (codelikeArtPiece === 201) {
						fetchArtPieces();
					}
				}).catch(err => {
					setMessage("The website encountered an unexpected error. Please try again later.");
					showNotification()
					//console.log(err);
				});
		}
	}

	const unLikeArtPiece = (e, artpiece_slug) => {
		e.preventDefault();

		//it will be changed to api/likes/
		var username = localStorage.getItem('username');
		var endpoint = LIKEARTPIECES + username + "/likes/" + artpiece_slug + "/";

		fetch(endpoint, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem('token')
				}
			})
			.then(response => {
				//console.log(response)
				codeunLikeArtPiece = response.status
				return response
			})
			.then(data => {
				//console.log(data)
				if (codeunLikeArtPiece === 204) {
					fetchArtPieces();
				}
			}).catch(err => {
				setMessage("The website encountered an unexpected error. Please try again later.");
				showNotification()
				//console.log(err);
			});

	}

	const images = [{
		original: product1,
		thumbnail: product1
	}];

	const showNotification = () => {
		if (!notification) {
			setNotification(true);
			setTimeout(function() {
				setNotification(false);
			}, 6000);
		}
	};
	return (
		<div className = {classes.productPage} >
			<Header
			brand = "CCT Art Gallery"
			links = {< HeaderLinks dropdownHoverColor = "warning" / >}
			fixed color = "transparent"
			changeColorOnScroll = {{
				height: 100,
				color: "warning"
			}}
		/>
		<Parallax
			image = {require("assets/img/bg6.jpg")}
			filter = "warning"
			className = {classes.pageHeader}
		>
		</Parallax>
		<div className = {classNames(classes.section, classes.sectionGray)}>
			<div className = {classes.container}>
				<div className = {classNames(classes.main, classes.mainRaised)}>
					<Snackbar
						place = "bc"
						color = "danger"
						icon = {AddAlert}
						message = {message}
						open = {notification}
						closeNotification = {() => setNotification(false)}
						close
					/>
					<GridContainer>
						<GridItem md={12} sm={12}>
							<iframe src='https://www.youtube.com/embed/dq0wSKDVLGY?autoplay=1&mute=1'
							        frameBorder='0'
							        allow='autoplay; encrypted-media'
							        allowFullScreen
							        title='video'
											style={{
							          position: "relative",
							          top: 0,
							          left: 0,
							          width: "100%",
							          height: "400px"
							        }}
							/>
						</GridItem>
					</GridContainer>
				</div>
			<div className = {classes.relatedProducts} >
				<h3 className = {classNames(classes.title, classes.textCenter)}>
					You may be interested in:
				</h3>
				<GridContainer>

		{
			artPieces.map((artPiece, index) => (
				<GridItem key={index}	sm={6} md={3}>
				<Card product >
					<CardHeader image >
						<a href = "#top" >
							<img src={artPiece.photo===null ? placeholder : artPiece.photo} alt={artPiece.slug_name}/>
						</a>
					</CardHeader>
				<CardBody >
				<h6 className = {classNames(classes.cardCategory,	classes.textRose)}>
					{artPiece.category.name}
				</h6>
				<h4 className = {classes.cardTitle}> {artPiece.name} </h4>
				<h6 className = {classNames(classes.cardArtist)}>
					by {artPiece.artist.first_name + " " + artPiece.artist.last_name}
				</h6>
				<div className = {classes.cardDescription}>
				 {
					artPiece.description != null && artPiece.description.length > 75 ? (
						artPiece.description.substring(0, 75) + "..."
					) : (
						artPiece.description
					)
					}
				</div>
				</CardBody>
				<CardFooter className = {classes.justifyContentBetween}>
					<div className = {classes.price} >
						<h4 > €{artPiece.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} </h4>
					</div>
					<div className = {classes.stats}>
					{
						artPiece['liked'] = false
					}
					{
						artPiece.likes.map((user, index) => (
							user.username === localStorage.getItem('username') &&
							(artPiece['liked'] = true)
						))
					}
					{
						artPiece['liked'] ?
							<Tooltip
								id = "tooltip-top"
								title = "Remove from Favourites"
								placement = "top"
								classes = {{tooltip: classes.tooltip}}
							>
								<Button
									justIcon
									color = "danger"
									simple
									onClick = {(e) => unLikeArtPiece(e, artPiece.slug_name)}
								>
									<Favorite / >
								</Button>
							</Tooltip>
						:
						<Tooltip
							id = "tooltip-top"
							title = "Save to Favourites"
							placement = "top"
							classes = {{tooltip: classes.tooltip}}
						>
							<Button
								justIcon
								link
								onClick = {(e) => likeArtPiece(e, artPiece.slug_name)}
							>
								< Favorite / >
							</Button>
						</Tooltip>
					}
					</div>
				</CardFooter>
				</Card>
				</GridItem>
			))}
		</GridContainer>
		</div>
		</div>
		</div>
	</div>
	);
}
