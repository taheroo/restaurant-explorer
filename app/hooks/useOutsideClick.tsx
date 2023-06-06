import type { RefObject } from 'react';
import { useEffect } from 'react';

const useOutsideClick = <T extends HTMLElement>(
	ref: RefObject<T>,
	callback: () => void,
	isOpen: boolean
): void => {
	const handleClickOutside = (event: MouseEvent) => {
		if (!event.target.closest('#popup-content') && isOpen) {
			callback();
		}
	};

	useEffect(() => {
		const handleClick = (event: MouseEvent) => handleClickOutside(event);

		window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [ref, callback, isOpen]);
};

export default useOutsideClick;
