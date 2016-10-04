export const OAuthOptions = {
	provider: 'app',
	authUrl: 'https://login.feature01.dnevnik.ru/oauth2',
	grantUrl: 'https://api.feature01.dnevnik.ru/v1/authorizations',
	scope: 'Avatar,FullName,Birthday,Age,Roles,Schools,Organizations,EduGroups,Lessons,Marks,EduWorks,Relatives,Files,Contacts,Friends,Groups,Networks,Events,Wall,Messages,EmailAddress,Sex,SocialEntityMembership',	
	clientId: '5123975fe9eb415390fb7aa316a15e4e',
	redirectUrl: '//localhost:9000/oauth.html',
}

export const APIoptions = {	
	base: 'https://api.feature01.dnevnik.ru/v1/',
}

export const PromoOptions = {	
	url: 'http://localhost:9000',
	server: 'https://feature01.dnevnik.ru',
}

export const ForumOptions = {	
	pageSize: 5,
	psyhoId: '1000005449055,1000001035607',
	anonAvatar: 'https://static.dnevnik.ru/images/avatars/user/a.m.jpg',
	postsLabel: {
		mothers: 'posts-test-1',
		girls: 'posts-test-2',
		competition: 'posts-test-3',
	},
}
