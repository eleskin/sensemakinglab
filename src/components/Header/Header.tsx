import NotificationPopup from '../NotificationPopup/NotificationPopup';
import styles from './Header.module.css';
import { FunctionComponent, useEffect, useState } from 'react';
import bell_icon from '../../assets/icons/bell-icon.svg';

export interface INotification {
	id: number;
	title: string;
	text: string;
	checked: boolean;
}

const Header: FunctionComponent = () => {
	const [notifications, setNotifications] = useState([
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
			checked: true,
		},
		{
			id: 5,
			title: 'Ваш профиль просмотрели',
			text: 'Инна Горбачёва просмотрел(а) ваш профиль',
			checked: true,
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
			checked: true,
		},
		{
			id: 8,
			title: 'Ваш профиль просмотрели',
			text: 'Инна Никонова просмотрел(а) ваш профиль',
			checked: true,
		},
	]);
	const [notificationCount, setNotificationCount] = useState(0);
	const [isOpenPopup, setIsOpenPopup] = useState(false);
	
	useEffect(() => {
		setNotificationCount(
			notifications.reduce((accumulator: number, currentValue: INotification): number => {
				return currentValue.checked ? accumulator : accumulator + 1;
			}, 0),
		);
	}, [notifications]);
	
	return (
		<header className={ styles.Header }>
			<button className={ styles.Header__button } onClick={ setIsOpenPopup.bind(this, !isOpenPopup) }>
				<img src={ bell_icon } width={ 24 } height={ 24 } alt=""/>
				{ notificationCount > 0 && <em>{ notificationCount }</em> }
			</button>
			<NotificationPopup
				notifications={ notifications }
				setNotifications={ setNotifications }
				isOpenPopup={ isOpenPopup }
			/>
		</header>
	);
};

export default Header;
