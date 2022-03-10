import {Animated, FlatList, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, Linking} from "react-native";

const Card = (props) => {
	let textItem = props.texte;
	let rankItem = props.rank;
	let typeItem = props.type;
	let urlItem = props.url;
	let unit
	let img

	// Change l'affichage celon le type de données
	switch (typeItem) {
		case 'Artist':
			img = require("../Images/dj.png");
			unit = "d'écoutes";
			break;
		case 'Song':
			img = require("../Images/la-musique.png");
			unit = "fois jouée";
			break;
		case 'Genre':
			img = require("../Images/dj_2.png");
			unit = " de Musiques";
			break;
		default:
			unit = "blabla";
	}

	// Redirige vers la page de l'artiste
	const redirection = () => {
		Linking.openURL(urlItem)
	}
	return (
		<TouchableOpacity style={styles.cardItem} onPress={redirection}>
			{/*On a pas d'image dans la reponse d'API donc on en rajoute une manuellement*/}
			<Image style={styles.ImageItem} source={img}/>
			<View style={styles.text}>
				<Text style={styles.names}>{textItem}</Text>
				<Text style={styles.items}>{rankItem}</Text>
				<Text style={styles.items}>{unit}</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	cardItem: {
		width: 100,
		display: "flex",
		alignItems: "center",
		borderWidth: 1,
		marginBottom: 30,
		borderRadius: 20,
		backgroundColor: "#1c64d9"
		// backgroundColor: '#6C8077'
	},
	ImageItem: {
		height: 50,
		width: 50,
		marginTop: 10
	},
	text: {
		marginTop: 10,
		paddingTop: 10,
		alignItems: "center",
		borderTopWidth: 1,
	},
	names: {
		fontSize: 13,
		marginBottom: 5,
		color: "white"
	},
	items:{
		fontSize: 12,
		color: "white"
	}

});

export default Card;