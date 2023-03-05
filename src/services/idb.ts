import { openDB } from 'idb';

const dbPromise = openDB('MetaDataStorage', 1, {
    upgrade(db) {
        db.createObjectStore('grid-metadata');
    },
});

export async function get(key: string) {
    return (await dbPromise).get('grid-metadata', key);
}

export async function set(key: string, val: any) {
    return (await dbPromise).put('grid-metadata', val, key);
}

export async function del(key: string) {
    return (await dbPromise).delete('grid-metadata', key);
}

export async function clear() {
    return (await dbPromise).clear('grid-metadata');
}

export async function keys() {
    return (await dbPromise).getAllKeys('keyval');
}