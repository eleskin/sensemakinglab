import { ChangeEvent, Dispatch, Fragment, FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import data from '../../db.json';
import { chunk } from '../../utils/functions';
import styles from './Table.module.css';
import bell_icon from '../../assets/icons/arrow-icon.svg';

interface IPost {
	id: number;
	title: string;
	description: string;
	completed: boolean;
	date: string;
	author: string,
}

const { posts: postsArray }: { posts: IPost[] } = data;

const Table: FunctionComponent = () => {
	const [posts, setPosts] = useState(postsArray);
	const [postsByPages, setPostsByPages]: [IPost[][], Dispatch<SetStateAction<IPost[][]>>]
		= useState([] as IPost[][]);
	const [activePage, setActivePage] = useState(0);
	const [activeColumn, setActiveColumn] = useState('id' as string);
	const [isReversed, setIsReversed] = useState(false);
	const [idSearchValue, setIdSearchValue] = useState('');
	const [titleSearchValue, setTitleSearchValue] = useState('');
	
	useEffect((): void => {
		setPostsByPages(chunk(posts, 40));
	}, [posts]);
	
	const pagesList: JSX.Element[] = postsByPages.map((page: IPost[], index: number) => {
		const handleTHeadClick = (prop: string) => {
			setActiveColumn(prop);
			if (activeColumn === prop) {
				setIsReversed(!isReversed);
			} else {
				setIsReversed(false);
			}
		};
		
		const postsList: JSX.Element[] = page.sort((a: IPost, b: IPost) => {
			if (a[activeColumn as keyof typeof a] > b[activeColumn as keyof typeof b]) {
				return isReversed ? -1 : 1;
			} else if (a[activeColumn as keyof typeof a] < b[activeColumn as keyof typeof b]) {
				return isReversed ? 1 : -1;
			} else {
				return 0;
			}
		}).map((post: IPost) => (
			<tr key={ post.id }>
				<td>{ post.id }</td>
				<td>{ post.title }</td>
				<td>{ post.description }</td>
				<td>{ post.completed ? 'True' : 'False' }</td>
				<td>{ post.date }</td>
				<td>{ post.author }</td>
			</tr>
		));
		
		return activePage === index ? (
			<table key={ index }>
				<thead>
				<tr>
					{
						['id', 'title', 'description', 'completed', 'date', 'author'].map((key: string, index: number) => (
							<th
								style={ { backgroundColor: activeColumn === key ? '#ffffff' : '' } }
								onClick={ handleTHeadClick.bind(this, key) }
								key={ index }
							>
								{ key }
								<img
									src={ bell_icon }
									style={ { transform: `rotate(${ isReversed && activeColumn === key ? '0' : '180deg' })` } }
									alt=""
								/>
							</th>
						))
					}
				</tr>
				</thead>
				<tbody>
				{ postsList }
				</tbody>
			</table>
		) : <Fragment key={ index }/>;
	});
	
	const handleInputIDChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setIdSearchValue(event.target.value);
		setActivePage(0);
		if (event.target.value !== '') {
			setPosts(postsArray.filter((post: IPost) => post.id === Number(event.target.value)));
		} else {
			setPosts(postsArray);
		}
	};
	
	const handleInputTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setTitleSearchValue(event.target.value);
		setActivePage(0);
		if (event.target.value !== '') {
			const regexp: RegExp = new RegExp(event.target.value, 'gi');
			setPosts(postsArray.filter((post: IPost) => post.title.match(regexp)));
		} else {
			setPosts(postsArray);
		}
	};
	
	return (
		<div className={ styles.Table }>
			<header className={ styles.Table__header }>
				<div>
					<input
						type="text"
						placeholder="Поиск по id"
						value={ idSearchValue }
						onInput={ handleInputIDChange }
						disabled={ titleSearchValue !== '' }
					/>
					<input
						type="text"
						placeholder="Поиск по имени"
						value={ titleSearchValue }
						onInput={ handleInputTitleChange }
						disabled={ idSearchValue !== '' }
					/></div>
				<div>
					<button
						onClick={ setActivePage.bind(this, activePage - 1) }
						disabled={ activePage <= 0 }
					>Предыдущая страница
					</button>
					<button
						onClick={ setActivePage.bind(this, activePage + 1) }
						disabled={ activePage >= postsByPages.length - 1 }
					>Следующая страница
					</button>
				</div>
			</header>
			{ pagesList }
		</div>
	);
};

export default Table;
