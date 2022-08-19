import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { INotification } from '../components/Header/Header';

const notificationsArray: INotification[] = [
	{
		id: 0,
		title: 'Ваш профиль просмотрели',
		text: 'Никита Горбачёв просмотрел(а) ваш профиль',
		checked: false,
	},
	{
		id: 1,
		title: 'Ваш профиль просмотрели',
		text: 'Марина Меркушева просмотрел(а) ваш профиль',
		checked: false,
	},
	{
		id: 2,
		title: 'Ваш профиль просмотрели',
		text: 'Евгений Никонов просмотрел(а) ваш профиль',
		checked: false,
	},
	{
		id: 3,
		title: 'Ваш профиль просмотрели',
		text: 'Инна Белова просмотрел(а) ваш профиль',
		checked: false,
	},
	{
		id: 4,
		title: 'Ваш профиль просмотрели',
		text: 'Евгений Никонов просмотрел(а) ваш профиль',
		checked: false,
	},
	{
		id: 5,
		title: 'Ваш профиль просмотрели',
		text: 'Инна Горбачёва просмотрел(а) ваш профиль',
		checked: false,
	},
	{
		id: 6,
		title: 'Ваш профиль просмотрели',
		text: 'Джозеф Фролов просмотрел(а) ваш профиль',
		checked: false,
	},
	{
		id: 7,
		title: 'Ваш профиль просмотрели',
		text: 'Евгений Меркушев просмотрел(а) ваш профиль',
		checked: false,
	},
	{
		id: 8,
		title: 'Ваш профиль просмотрели',
		text: 'Инна Никонова просмотрел(а) ваш профиль',
		checked: false,
	},
	{
		id: 9,
		title: 'Ваш профиль просмотрели',
		text: 'Джозеф Никонов просмотрел(а) ваш профиль',
		checked: false,
	},
];

export const useFetchNotifications = (): [INotification[], Dispatch<SetStateAction<INotification[]>>] => {
	const [notifications, setNotifications]: [INotification[], Dispatch<SetStateAction<INotification[]>>]
		= useState([] as INotification[]);
	
	useEffect((): () => void => {
		let count: number = 1;

		setNotifications(notificationsArray.slice(0, count + 1).reverse());

		const interval: NodeJS.Timer = setInterval((): void => {
			if (count < notificationsArray.length - 1) {
				count += 1;
				
				setNotifications((prevState: any) => {
					const state = Object.assign([], prevState);
					state.unshift(notificationsArray[count])
					return state;
				});
			}
		}, 10000 / 8);
		
		return (): void => clearInterval(interval);
	}, []);
	
	return [notifications, setNotifications];
};

export const useOutsideClickHandler = (
	ref: any,
	isActive: boolean,
	setIsActive: Dispatch<SetStateAction<boolean>>,
): void => {
	return useEffect((): () => void => {
		const onClick: (event: Event) => void = (event: Event): void => {
			if (ref) ref.current?.contains(event.target as Node) || (isActive && setIsActive(false));
		};
		document.addEventListener('click', onClick);
		return (): void => document.removeEventListener('click', onClick);
	}, [ref, isActive, setIsActive]);
};
