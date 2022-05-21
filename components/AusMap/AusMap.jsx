import MapView, { Marker, Geojson } from 'react-native-maps';
import { StyleSheet } from 'react-native';

const AusMap = props => {
	const {
		latitude,
		longitude,
		latitudeDelta,
		longitudeDelta,
		userLocation,
		selectedLocation,
	} = props;

	const locationGeoJson = location => {
		switch (location) {
			case 'vic':
				return require('../../data/vic.json');
				break;
			case 'qld':
				return require('../../data/qld.json');
				break;
			case 'nsw':
				return require('../../data/nsw.json');
				break;
			case 'nt':
				return require('../../data/nt.json');
				break;
			case 'sa':
				return require('../../data/sa.json');
				break;
			case 'wa':
				return require('../../data/wa.json');
				break;
			case 'tas':
				return require('../../data/tas.json');
				break;
			default:
				null;
		}
	};

	return (
		<MapView
			region={{
				latitude: latitude ?? -37.840935,
				longitude: longitude ?? 144.946457,
				latitudeDelta: latitudeDelta,
				longitudeDelta: latitudeDelta,
			}}
			style={styles.map}
			provider="google"
			showsUserLocation={userLocation}
			followsUserLocation={userLocation}
		>
			{!!selectedLocation && typeof selectedLocation === 'string' && (
				<Geojson
					geojson={locationGeoJson(selectedLocation)}
					strokeWidth={1}
					strokeColor="#4099FF"
					fillColor="#4099AD"
				/>
			)}
		</MapView>
	);
};

const styles = StyleSheet.create({
	map: {
		flex: 4,
		width: '100%',
		height: 100,
	},
});

export default AusMap;
