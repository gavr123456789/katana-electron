import { Box, Card, CardActions, CardContent, CardMedia, IconButton, LinearProgress, List, Stack } from '@mui/material';
import { FC, useCallback, useState } from 'react';
// import { Page } from 'renderer/model/types';
import { DirRow } from './DirRow';
import { FileRow } from './FileRow';
import { InfoPanel } from './InfoPanel';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Loading } from './Loading';
// import { selectPage } from '../model/lastSelectedPage';
import SwiperCore, { Scrollbar, Mousewheel, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Page } from './types';

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

export interface PageProps {
	page: Page;
}
SwiperCore.use([ Scrollbar, Mousewheel, FreeMode ]);

export const FilePage: FC<PageProps> = ({ page }) => {
	const [ infoPanelOpened, setOpenInfoPanel ] = useState(false);

	const handleSelect = useCallback((e: React.MouseEvent<HTMLDivElement | HTMLUListElement, MouseEvent>) => {
		if (e.target !== e.currentTarget) return;
		// selectPage(page);
	}, []);

	return (
		<SwiperSlide style={{width: 200}}>
			<Card > 
				<CardContent onClick={handleSelect} style={{height: "500px"}}>
					<Swiper
						wrapperTag="div"
						slidesPerView={'auto'}
						direction={'vertical'}
						mousewheel={true}
						freeMode={true}
						spaceBetween={1}
						modules={[ Scrollbar, Mousewheel, FreeMode ]}
						// virtual={{
						// 	addSlidesBefore: 10,
						// 	addSlidesAfter: 10
						// }}
						scrollbar={{
							hide: true,
							draggable: true
						}}
						// height={500}
					>
						{page.dirsAndFiles.map(
							(x, i) =>
								x.kind === 'file' ? (
									<SwiperSlide style={{ height: '50px' }} key={x.name} virtualIndex={i}>
										<FileRow page={page} item={x} />
									</SwiperSlide>
								) : (
									<SwiperSlide style={{ height: '50px' }} key={x.name} virtualIndex={i}>
										<DirRow page={page} item={x} />
									</SwiperSlide>
								)
						)}
					</Swiper>
				
				</CardContent>

				<CardActions disableSpacing>
					<IconButton
						onClick={() => {
							setOpenInfoPanel(!infoPanelOpened);
						}}
					>
						<ArrowForwardIosIcon fontSize="small" />
					</IconButton>
				</CardActions>

				<CardMedia>
					<InfoPanel open={infoPanelOpened} />
					<Loading open={page.selected} />
				</CardMedia>
			</Card>
		</SwiperSlide>
	);
};

FilePage.displayName = 'SwiperSlide';
