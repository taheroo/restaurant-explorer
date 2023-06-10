interface BackNavigationProps {
	href: string;
	text: string;
}

function BackNavigation({ href, text }: BackNavigationProps) {
	return (
		<a
			data-testid='backToRestaurantsLink'
			href={href}
			className='text-indigo-600 text-sm font-medium'
		>
			&lt; {text}
		</a>
	);
}

export default BackNavigation;
