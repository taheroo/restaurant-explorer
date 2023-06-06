interface UserAvatarWithInfoProps {
	user: {
		email: string;
		name: string;
	};
}

function UserAvatarWithInfo({ user }: UserAvatarWithInfoProps) {
	return (
		<button
			type='button'
			className='group flex shrink-0 items-center rounded-lg transition'
		>
			<img
				alt='Man'
				src='https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
				className='h-10 w-10 rounded-full object-cover'
			/>

			<p className='ms-2 hidden text-left text-xs sm:block'>
				<strong className='block font-medium'>{user.name}</strong>

				<span className='text-gray-500'> {user.email} </span>
			</p>

			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='ms-4 hidden h-5 w-5 text-gray-500 transition group-hover:text-gray-700 sm:block'
				viewBox='0 0 20 20'
				fill='currentColor'
			>
				<path
					fillRule='evenodd'
					d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
					clipRule='evenodd'
				/>
			</svg>
		</button>
	);
}

export default UserAvatarWithInfo;
