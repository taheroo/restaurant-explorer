import { useNavigate } from '@remix-run/react';
import { useModal } from '~/hooks/useModal';

export const useModalHandlers = () => {
	const navigate = useNavigate();

	const {
		isOpen: openReviewForm,
		openModal: openReviewFormModal,
		closeModal: closeReviewFormModal,
	} = useModal();
	const {
		isOpen: openProductReviews,
		openModal: openProductReviewsModal,
		closeModal: closeProductReviewsModal,
	} = useModal();
	const {
		isOpen: openRestaurantReviews,
		openModal: openRestaurantReviewsModal,
		closeModal: closeRestaurantReviewsModal,
	} = useModal();

	const handleClickOpenProductReviewForm = (
		event: React.MouseEvent<HTMLButtonElement>,
		productId: string,
		restaurantId: string
	) => {
		navigate(`/restaurants/${restaurantId}/products/${productId}`);
		event.preventDefault();
		event.stopPropagation();
		openReviewFormModal();
	};

	const handleClickOpenRestaurantReviewForm = (
		event: React.MouseEvent<HTMLButtonElement>,
		restaurantId: string
	) => {
		navigate(`/restaurants/${restaurantId}/review`);
		event.preventDefault();
		event.stopPropagation();
		openReviewFormModal();
	};

	const handleClickOpenProductReviews = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
		event.stopPropagation();
		openProductReviewsModal();
	};

	const handleCloseProductReviews = () => {
		closeProductReviewsModal();
	};

	const handleClickOpenRestaurantReviews = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
		event.stopPropagation();
		openRestaurantReviewsModal();
	};

	const handleCloseRestaurantReviews = () => {
		closeRestaurantReviewsModal();
	};

	return {
		openReviewForm,
		openProductReviews,
		openRestaurantReviews,
		handleClickOpenProductReviewForm,
		handleClickOpenRestaurantReviewForm,
		handleClickOpenProductReviews,
		handleCloseProductReviews,
		handleClickOpenRestaurantReviews,
		handleCloseRestaurantReviews,
		closeReviewFormModal,
	};
};
