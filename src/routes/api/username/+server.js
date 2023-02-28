import { json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const token = await request.json();
	const decodedToken = jwt.verify(token.token, 'secret')
	const username = decodedToken.sub;
	const isAdmin = decodedToken.roles.includes('ADMIN');
	return json({username,isAdmin });
}
