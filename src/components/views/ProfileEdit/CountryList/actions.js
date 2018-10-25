export const onSearchCountry = (payload) => {
	return {
		type: 'country_list_search',
		payload : payload
	}
};

export const selectCountry = (payload) => {
	return {
		type: 'country_list_select',
		payload : payload
	}
};
