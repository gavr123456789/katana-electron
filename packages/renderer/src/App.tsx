// import vite from '@/assets/vite.svg';
import { Stack } from '@mui/material';
import { Observer, observer, useLocalObservable } from 'mobx-react';
import { FreeMode, Pagination, Scrollbar } from 'swiper';
import { FilePage } from './components/FilePage';
import { Swiper } from 'swiper/react';
import { useEffect, useState } from 'react';
import { GlobalMenu } from './components/GloabalMenu';
import { Page } from './components/types';
import { DEFAULT_PATH, openDir } from './services/DirReader';
import { $pages } from './GlobalStores/MainStore';
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { height } from '@mui/system';
import { $selectedPages } from './GlobalStores/SelectedStore';
import { echo } from './utils/printUtils';

const App = () => {
	// const todo = useLocalObservable(() => ({
	// 	count: 0,
	// 	increment() {
	// 		this.count += 1 
	// 	}
	// }));

	const [selectedIsNotEmpty] = useState(false)

	useEffect(() => {
		// openDir(DEFAULT_PATH).then(x => {$pages.addPage(x.path); $pages.addPage(x.path)})
	  $pages.addPage(DEFAULT_PATH).then(() => {
			const firstPage = $pages.pages[0]
			// if (firstPage) {
				// $selectedPages.selectPage(firstPage)
				// echo("first page selected: ", $pages.pages[0])
			// }

		})
	}, [])

	return (
		// <Observer>
			// {() => (
				// <Stack direction="column" alignItems="stretch" height={'100vh'}>
				<div style={{width: "100%", height: "100%"}}>
				<Swiper
					spaceBetween={30}
					scrollbar={{
						hide: true
					}}
					// freeMode={true}
					direction={"horizontal"}
					slidesPerView={'auto'}
					modules={[ Scrollbar, FreeMode, Pagination ]}
					style={{ marginLeft: "10px", marginRight: "10px"}}
				>
					{$pages.pages.map((page, i) => <FilePage key={page.path + i} page={page} />)}
				</Swiper>
				<GlobalMenu open={selectedIsNotEmpty} />
				</div>
			// </Stack>

			// )}
		// </Observer>
	);
};

export default observer(App);
