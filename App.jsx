import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

import LocationSelector from './src/components/LocationSelector';
import AusMap from './src/components/AusMap';
import AUS_STATE from './src/constants/ausState';

export default function App() {
	const [selectedLocation, setSelectedLocation] = useState();
	const [userLocation, setUserLocation] = useState(false);
	const [latitude, setLatitude] = useState(-37.840935);
	const [longitude, setLongitude] = useState(144.946457);
	const [currentLocation, setCurrentLocation] = useState(null);
	const [latitudeDelta, setLatitudeDelta] = useState(0.0922);
	const [longitudeDelta, setLongitudeDelta] = useState(0.0922);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				return;
			}
			let location = await Location.getCurrentPositionAsync({});
			setCurrentLocation(location);
		})();
	}, []);

	const changeLocationHandler = location => {
		if (location === null) {
			setUserLocation(true);
			setSelectedLocation(null);
			setLatitude(currentLocation.coords.latitude);
			setLongitude(currentLocation.coords.longitude);
			setLatitudeDelta(0.0922);
			setLongitudeDelta(0.0421);
		} else {
			setSelectedLocation(location);
			setUserLocation(false);
			const currentCoordinate = AUS_STATE.find(
				state => state.value === location
			);
			setLatitude(currentCoordinate?.coordinate.latitude);
			setLongitude(currentCoordinate?.coordinate.longitude);
			setLatitudeDelta(currentCoordinate?.latitudeDelta ?? 20);
			setLongitudeDelta(currentCoordinate?.longitudeDelta ?? 20);
		}
	};

	return (
		<View style={styles.container}>
			<LocationSelector
				selectedLocation={selectedLocation}
				changeLocationHandler={changeLocationHandler}
			/>
			<AusMap
				latitude={latitude}
				longitude={longitude}
				latitudeDelta={latitudeDelta}
				longitudeDelta={longitudeDelta}
				userLocation={userLocation}
				selectedLocation={selectedLocation}
			/>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
