import { db } from '~/utils/db.server';

export async function getUserByEmail(email: string) {
	const user = await db.user.findUnique({
		where: { email },
	});
	return user;
}
