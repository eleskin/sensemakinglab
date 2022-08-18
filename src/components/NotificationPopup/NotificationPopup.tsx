import { INotification } from '../Header/Header';
import styles from './NotificationPopup.module.css';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';

interface INotificationPopup {
	notifications: INotification[];
	setNotifications: Dispatch<SetStateAction<INotification[]>>;
	isOpenPopup: boolean;
}

const NotificationPopup: FunctionComponent<INotificationPopup> = (props) => {
	const { notifications, setNotifications, isOpenPopup } = props;
	
	const notificationsList: JSX.Element[] = notifications.map((notification: INotification, index: number) => (
		<div
			className={ `
				${ styles.NotificationPopup__item }
				${ !notification.checked ? styles.NotificationPopup__item_new : '' }
			` }
			key={ notification.id }
		>
			<h4>{ notification.title }</h4>
			<p>{ notification.text }</p>
			{ !notification.checked && <button onClick={ () => {
				const notificationsArray: INotification[] = Object.assign([], notifications);
				notificationsArray[index].checked = true;
				
				setNotifications(notificationsArray);
			} }>Отметить, как прочитанное</button> }
		</div>
	));
	
	return (
		<div className={ `${ styles.NotificationPopup } ${ isOpenPopup ? styles.NotificationPopup_open : '' }` }>
			{ notificationsList }
		</div>
	);
};

export default NotificationPopup;
