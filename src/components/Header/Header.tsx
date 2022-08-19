import { useFetchNotifications, useOutsideClickHandler } from '../../utils/hooks';
import NotificationPopup from '../NotificationPopup/NotificationPopup';
import styles from './Header.module.css';
import { FunctionComponent, RefObject, useEffect, useRef, useState } from 'react';
import bell_icon from '../../assets/icons/bell-icon.svg';

export interface INotification {
	id: number;
	title: string;
	text: string;
	checked: boolean;
}

const Header: FunctionComponent = () => {
	const [notifications, setNotifications] = useFetchNotifications();
	const [notificationCount, setNotificationCount] = useState(0);
	const [isOpenPopup, setIsOpenPopup] = useState(false);
	
	const popupRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
	
	useOutsideClickHandler(popupRef, isOpenPopup, setIsOpenPopup);
	
	useEffect(() => {
		setNotificationCount(
			notifications.reduce((accumulator: number, currentValue: INotification): number => {
				return currentValue.checked ? accumulator : accumulator + 1;
			}, 0),
		);
	}, [notifications]);
	
	const handleButtonClick = () => {
		setTimeout(() => {
			setIsOpenPopup(!isOpenPopup);
		}, 0);
	};
	
	return (
		<header className={ styles.Header }>
			<button className={ styles.Header__button } onClick={ handleButtonClick }>
				<img src={ bell_icon } width={ 24 } height={ 24 } alt=""/>
				{ notificationCount > 0 && <em>{ notificationCount }</em> }
			</button>
			<NotificationPopup
				notifications={ notifications }
				setNotifications={ setNotifications }
				isOpenPopup={ isOpenPopup }
				notificationCount={ notificationCount }
				ref={popupRef}
			/>
		</header>
	);
};

export default Header;
