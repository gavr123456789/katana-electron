import { Box, Button, SwipeableDrawer } from '@mui/material';
import { FC } from 'react';

export const GlobalMenu: FC<{ open: boolean }> = ({ open }) => {

  const toggleDrawer =
  ( open: boolean) =>
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    // setState({ ...state, [anchor]: open });
    // manualOpenCloseGlobalMenu(open)
  };


	return (
    <>
    <SwipeableDrawer
            anchor={"bottom"}
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            // BackdropProps={{ invisible: true }}
            variant="persistent"
          >
            <Box>
              <Button>Delete</Button>
              <Button>Copy</Button>
              <Button>Move</Button>
            </Box>
          </SwipeableDrawer>
    </>
	);
};
