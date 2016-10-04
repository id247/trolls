export const OAuthOptions = {
	provider: 'app',
	authUrl: 'https://login.dnevnik.ru/oauth2',
	grantUrl: 'https://api.dnevnik.ru/v1/authorizations',
	scope: 'Avatar,FullName,Birthday,Age,Roles,Files,Sex',	
	clientId: '7d0d92280bd34aa9a5afec1c749bf0e1',
	redirectUrl: 'https://ad.dnevnik.ru/promo/oauth2',
}

export const APIoptions = {	
	base: 'https://api.dnevnik.ru/v1/',
}

export const PromoOptions = {	
	url: 'https://ad.dnenvik.ru/promo/wishlist3',
	server: 'https://dnevnik.ru',
}

export const ForumOptions = {	
	pageSize: 15,
	psyhoId: '1000005449055',
	anonAvatar: 'https://static.dnevnik.ru/images/avatars/user/a.m.jpg',
	postsLabel: {
		mothers: 'forum-mothers',
		girls: 'forum-girls',
		competition: 'competition-mothers',
	},
}
