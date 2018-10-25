import realm from '../../../models';
import axios from 'axios';

export const loadPaymentsFromRealm = () => {
	return {
		type: 'payment_history_reload'
	}
};