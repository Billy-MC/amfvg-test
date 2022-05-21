import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

import AUS_STATE from '../../constants/ausState';

const LocationSelector = props => {
	const { Item } = Picker;
	const { selectedLocation, changeLocationHandler } = props;

	return (
		<Picker
			selectedValue={selectedLocation}
			onValueChange={changeLocationHandler}
			style={styles.picker}
			mode="dropdown"
		>
			<Item label="Please select your country" value="" />
			{AUS_STATE.map(({ name, value }) => (
				<Item key={name} label={name} value={value} />
			))}
		</Picker>
	);
};

const styles = StyleSheet.create({
	picker: {
		flex: 1,
		marginVertical: 10,
		width: 300,
		padding: 10,
	},
});

export default LocationSelector;
