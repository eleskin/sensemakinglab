import { INotification } from '../Header/Header';
import styles from './NotificationPopup.module.css';
import { Dispatch, forwardRef, Fragment, LegacyRef, SetStateAction } from 'react';

interface INotificationPopup {
	notifications: INotification[];
	setNotifications: Dispatch<SetStateAction<INotification[]>>;
	isOpenPopup: boolean;
	notificationCount: number;
}

const NotificationPopup = forwardRef(
	(props: INotificationPopup, forwardedRef: LegacyRef<HTMLDivElement> | undefined) => {
		const { notifications, setNotifications, isOpenPopup, notificationCount } = props;
		
		const notificationsList: JSX.Element[] = notifications.map((notification: INotification, index: number) => !notification.checked ? (
			<div
				className={ `
				${ styles.NotificationPopup__item }
				${ !notification.checked ? styles.NotificationPopup__item_new : '' }
			` }
				key={ notification.id }
			>
				<h4>{ notification.title }</h4>
				<p>{ notification.text }</p>
				{ !notification.checked && <button onClick={ (): void => {
					setTimeout(() => {
						const notificationsArray: INotification[] = Object.assign([], notifications);
						notificationsArray[index].checked = true;
						
						setNotifications(notificationsArray);
					}, 0);
				} }>Отметить, как прочитанное</button> }
			</div>
		) : <Fragment key={ notification.id }/>);
		
		return (
			<div
				className={ `${ styles.NotificationPopup } ${ isOpenPopup ? styles.NotificationPopup_open : '' }` }
				ref={ forwardedRef }
			>
				{ notificationCount > 0 ? notificationsList : <span>Новых уведомлений нет</span> }
			</div>
		);
	},
);

export default NotificationPopup;
