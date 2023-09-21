// export interface EmailResponse {
// 	alias?: boolean;
// 	disposable?: boolean;
// 	domain?: string;
// 	dns?: boolean;
// 	format: boolean;
// }

export interface EmailResponse {
	format: boolean;
	alias?: boolean;
	disposable?: boolean;
	domain?: string;
	dns?: boolean;
}

export interface EmailData extends EmailResponse {
	email: string;
}
