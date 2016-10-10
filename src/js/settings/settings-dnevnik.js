export const OAuthOptions = {
	provider: 'dnevnikTrolls',
	authUrl: 'https://login.dnevnik.ru/oauth2',
	grantUrl: 'https://api.dnevnik.ru/v1/authorizations',
	scope: 'Avatar,FullName,Birthday,Age,Roles,Files,Sex,Friends,Wall',	
	clientId: '0c0e75e23c2f4c9aa40f5fd3103479b8',
	redirectUrl: 'https://ad.dnevnik.ru/promo/oauth2',
}

export const APIoptions = {	
	base: 'https://api.dnevnik.ru/v1/',
}

export const PromoOptions = {	
	cdn: 'https://ad.csdnevnik.ru/special/staging/trolls/',
	url: 'https://ad.dnevnik.ru/promo/trolls',
	server: 'https://dnevnik.ru',
	galeryLabel: 'gallery', 
	pageSize: 10, 
}


