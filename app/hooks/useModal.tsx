import { useState } from 'react';

export const useModal = (initialState = false) => {
	const [isOpen, setIsOpen] = useState(initialState);

	const openModal = () => {
		console.log('debug: opening review form');
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	return { isOpen, openModal, closeModal };
};
