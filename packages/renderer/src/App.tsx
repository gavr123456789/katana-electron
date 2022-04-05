import electron from '@/assets/electron.png';
import react from '@/assets/react.svg';
import vite from '@/assets/vite.svg';
import styles from '@/styles/app.module.scss';
import { Observer, observer, useLocalObservable } from 'mobx-react';
import { echo } from './utils/printUtils';
import { opendir } from 'fs/promises';




try {
  const dir = await opendir('./');
  for await (const dirent of dir)
    echo(dirent.name);
} catch (err) {
  console.error(err);
}


const App = () => {
	const todo = useLocalObservable(() => ({
		count: 0,
		increment() {
			this.count += 1 
		}
	}));

	return (
		<Observer>
			{() => (
				<>sas</>
			)}
		</Observer>
	);
};

export default observer(App);
