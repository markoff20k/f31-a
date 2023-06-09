import { CommonState } from '../../../modules/types';

export interface SaleItem {
	id: string;
	host_uid?: string;
	currency_id: string;
	description?: string;
	image_link: string;
	currency_available: string[];
	total_ieo: number;
	remains: number;
	price: number;
	min_buy: number;
	start_date: string;
	end_date: string;
	sale_logo: string;
	bonus: any;
	social: {
		website?: string;
		whitepaper?: string;
		ico?: string;
		facebook?: string;
		twitter?: string;
		telegram?: string;
		instagram?: string;
		linkedin?: string;
	};
	type: 'ongoing' | 'upcoming' | 'ended';
}

export interface SaleItemState extends CommonState {
	payload: SaleItem;
	loading: boolean;
}
