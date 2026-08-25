import { AppData } from '../types';

export interface ProjectMeta {
  id: number;
  name: string;
  lastModified: Date;
}

const DB_NAME = 'AppWireframerDB';
const DB_VERSION = 1;
const STORE_NAME = 'projects';

let db: IDBDatabase;

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (db) {
      return resolve(db);
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('IndexedDB error:', request.error);
      reject('Error opening database');
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = () => {
      const dbInstance = request.result;
      if (!dbInstance.objectStoreNames.contains(STORE_NAME)) {
        const store = dbInstance.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('name', 'name', { unique: false });
        store.createIndex('lastModified', 'lastModified', { unique: false });
      }
    };
  });
};

const getStore = (mode: IDBTransactionMode) => {
  const transaction = db.transaction(STORE_NAME, mode);
  return transaction.objectStore(STORE_NAME);
};

export const addProject = (projectData: AppData): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    await initDB();
    const store = getStore('readwrite');
    const project = {
      name: projectData.idea.name || 'Untitled Project',
      lastModified: new Date(),
      data: projectData,
    };
    const request = store.add(project);
    request.onsuccess = () => resolve(request.result as number);
    request.onerror = () => reject(request.error);
  });
};


export const getAllProjects = (): Promise<ProjectMeta[]> => {
    return new Promise(async (resolve, reject) => {
        await initDB();
        const store = getStore('readonly');
        const request = store.getAll();

        request.onsuccess = () => {
            const projects = request.result.map(p => ({
                id: p.id,
                name: p.name,
                lastModified: p.lastModified,
            }));
            // Sort by last modified descending
            projects.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
            resolve(projects);
        };
        request.onerror = () => reject(request.error);
    });
};

export const getProject = (id: number): Promise<AppData | null> => {
    return new Promise(async (resolve, reject) => {
        await initDB();
        const store = getStore('readonly');
        const request = store.get(id);

        request.onsuccess = () => {
            resolve(request.result ? request.result.data : null);
        };
        request.onerror = () => reject(request.error);
    });
};

export const updateProject = (id: number, projectData: AppData): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        await initDB();
        const store = getStore('readwrite');
        
        const getRequest = store.get(id);

        getRequest.onsuccess = () => {
            const existingProject = getRequest.result;
            if (existingProject) {
                const updatedProject = {
                    ...existingProject,
                    name: projectData.idea.name || 'Untitled Project',
                    lastModified: new Date(),
                    data: projectData,
                };

                const updateRequest = store.put(updatedProject);
                updateRequest.onsuccess = () => resolve();
                updateRequest.onerror = () => reject(updateRequest.error);
            } else {
                // If for some reason it doesn't exist, just add it.
                addProject(projectData).then(() => resolve()).catch(reject);
            }
        };
        getRequest.onerror = () => reject(getRequest.error);
    });
};

export const deleteProject = (id: number): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        await initDB();
        const store = getStore('readwrite');
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

export { initDB };
