import { opendir } from 'fs/promises';
import { Page } from '../components/types';
import { basename, dirname, extname } from "path";
import { echo } from '../utils/printUtils';

export const DEFAULT_PATH = '/home/gavr/test';

export async function openDir(path: string): Promise<Page> {
	const result: Page = {
		dirsAndFiles: [],
		path,
		selected: true,
		
	}

	try {
		const dir = await opendir('./');
		for await (const dirent of dir) {
			const name = dirent.name
			console.log(name);
			if (dirent.isDirectory()) {
			} else if (dirent.isFile()) {
				result.dirsAndFiles.push({
					ext: extname(name),
					kind: "file",
					name: name,
				})
			}
		}
		
	} catch (err) {
		console.error(err);
	}
	echo("result = ", result)
	return result
}