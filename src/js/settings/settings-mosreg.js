export const OAuthOptions = {
	provider: 'mosregTrolls',
	authUrl: 'https://login.school.mosreg.ru/oauth2',
	grantUrl: 'https://api.school.mosreg.ru/v1/authorizations',
	scope: 'Avatar,FullName,Birthday,Age,Roles,Schools,Organizations,EduGroups,Lessons,Marks,EduWorks,Relatives,Files,Contacts,Friends,Groups,Networks,Events,Wall,Messages,EmailAddress,Sex,SocialEntityMembership',	
	clientId: '5123975fe9eb415390fb7aa316a15e4e',
	redirectUrl: '//localhost:9000/oauth.html',
}

export const APIoptions = {	
	base: 'https://api.school.mosreg.ru/v1/',
}

export const PromoOptions = {	
	cdn: 'https://ad.csdnevnik.ru/special/staging/trolls/',
	url: 'https://ad.school.mosreg.ru/promo/trolls',
	server: 'https://school.mosreg.ru',
	galeryLabel: 'gallery', 
	pageSize: 10, 
}

