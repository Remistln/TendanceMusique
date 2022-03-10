import React, {useState} from 'react';
import {Button, StyleSheet, Text, View, SafeAreaView, ScrollView, ImageBackground} from 'react-native';
import Card from "./src/Components/Card";
import {Title} from "react-native-paper";

export default function App() {

	const [artistList, SetArtistList] = useState([])
	const [songList, SetSongList] = useState([])
	const [genreList, SetGenreList] = useState([])

	let recommendedArtist = []
	let recommandedSong = []
	let recommandedGenre = []

	// Fonction pour recuperer la liste des 6 premiers artistes
	async function getTopArtist() {                                                                             //changer cle api ici
		const res = await fetch('http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit=6&api_key=05e6b3cbc3eccece9238b14a48197b1f&format=json', {
			method: 'GET',
		}).then(response => {
			return response.json();
		}).then(res => {
			if (
				typeof res.artists.artist === 'object' &&
				res.artists.artist !== null
			) {
				SetArtistList(res.artists.artist);
			}
		}).catch(function(error) {
			// ADD THIS THROW error
			throw error;
		});
	}

	// Appel de la fonction
	getTopArtist()

	// Affiche une carte par artiste
	artistList.map(item => {
		recommendedArtist.push(
			<View key={item.name}>
				<Card
					texte={item.name}
					rank={item.playcount}
					type="Artist"
					url={item.url}
				/>
			</View>
		)
	});


	// Fonction pour recuperer les 6 meilleures musiques du moment
	async function getTopSong() {                                                                               //changer cle api ici
		const res = await fetch('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=6&api_key=05e6b3cbc3eccece9238b14a48197b1f&format=json', {
			method: 'GET',
		}).then(response => {
			return response.json();
		}).then(res => {
			if (
				typeof res.tracks.track === 'object' &&
				res.tracks.track !== null
			) {
				SetSongList(res.tracks.track);
			}

		}).catch(function(error) {
			// ADD THIS THROW error
			throw error;
		});
	}

	getTopSong()

	// Affiche une carte par musique
	songList.map(item => {
		recommandedSong.push(
			<View key={item.name}>
				<Card
					texte={item.name}
					rank={item.listeners}
					type="Song"
					url={item.url}
				/>
			</View>
		)
	});

	// Fonction pour recuperer les 6 meilleurs genre musicaux en tendance
	async function getTopGenre() {                                                                          //changer cle api ici
		const res = await fetch('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&limit=6&api_key=05e6b3cbc3eccece9238b14a48197b1f&format=json', {
			method: 'GET',
		}).then(response => {
			return response.json();
		}).then(res => {
			SetGenreList(res.tags.tag)
		});
	}

	getTopGenre()

	// Affiche une carte pour chaque genre
	genreList.map(item => {
		recommandedGenre.push(
			<View key={item.name}>
				<Card
					texte={item.name}
					rank={item.taggings}
					type="Genre"
					url={item.url}
				/>
			</View>
		)
	});

	return (
		<SafeAreaView>
			<ScrollView contentContainerStyle={styles.container}>
				<Title style={styles.titleStyle}>Tendances Musicales</Title>
				<Title style={styles.titleStyle}>Artistes du moment</Title>
				<View style={styles.list}>{recommendedArtist}</View>
				<Title style={styles.titleStyle}>Les musiques que tout le monde écoute</Title>
				<View style={styles.list}>{recommandedSong}</View>
				<Title style={styles.titleStyle}>Decouvrir de nouveaux genres</Title>
				<View style={styles.list}>{recommandedGenre}</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		color: "white",
		backgroundColor: "#1e2229"

	},
	list: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around"
	},
	titleStyle: {
		marginBottom: 30,
		color: "white",
		fontFamily: "Roboto",
		fontWeight: "bold"
	},
	image: {
		height: 1000
	}

});