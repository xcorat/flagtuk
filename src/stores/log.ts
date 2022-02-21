import {writable} from 'svelte/store'

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export const filesystemread = writable("");
export async function readDummyTextFile() {
    let file;
    try {
        file = await Filesystem.readFile({
            path: 'dummy.txt',
            directory: Directory.Data,
            encoding: Encoding.UTF8
        });
        filesystemread.set(file.data);
    } catch (e) {
        await Filesystem.writeFile({
            path: 'dummy.txt',
            data: 'This is a dummy text file.',
            directory: Directory.Data,
            encoding: Encoding.UTF8
        });
        readDummyTextFile();
    }
}

export const log = writable([]);

