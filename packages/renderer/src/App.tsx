// import vite from '@/assets/vite.svg';
import { Stack } from '@mui/material';
import { Observer, observer, useLocalObservable } from 'mobx-react';
import { Scrollbar } from 'swiper';
import { FilePage } from './components/FilePage';
import { Swiper } from 'swiper/react';
import { useState } from 'react';
import { GlobalMenu } from './components/GloabalMenu';
import { Page } from './components/types';
import { DEFAULT_PATH } from './services/DirReader';


const App = () => {
	const todo = useLocalObservable(() => ({
		count: 0,
		increment() {
			this.count += 1 
		}
	}));

	const [pages] = useState<Page[]>([
    {
      path: DEFAULT_PATH,
      dirsAndFiles: [],
      selected: false
    }
  ])

	const [selectedIsNotEmpty] = useState(false)

	return (
		<Observer>
			{() => (
				<Stack direction="column" alignItems="stretch" height={'100vh'}>
				<Swiper
					spaceBetween={30}
					scrollbar={{
						hide: true
					}}
					slidesPerView={'auto'}
					modules={[ Scrollbar ]}
				>
					{pages.map((page) => <FilePage page={page} />)}
				</Swiper>
				<GlobalMenu open={selectedIsNotEmpty} />
			</Stack>
			)}
		</Observer>
	);
};

export default observer(App);
