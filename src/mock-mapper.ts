import { RequestMock } from "./mock-v2.model";

import * as fs from 'fs';
import * as path from 'path';

export function mapRequests(mockFolderAbsolutePath: string, mocksMap?: Map<string, RequestMock>) {
    if (!mocksMap) {
        mocksMap = new Map<string, RequestMock>();
    }

    const entryPaths = fs.readdirSync(mockFolderAbsolutePath);

    for (const entryPath of entryPaths) {
        const absolutePath = path.resolve(mockFolderAbsolutePath, entryPath);
        const lstat = fs.lstatSync(absolutePath);

        if (lstat.isDirectory()) {
            mapRequests(absolutePath, mocksMap);
            continue;
        }

        const mockContent = JSON.parse(fs.readFileSync(absolutePath, 'utf8')) as RequestMock;
        mocksMap.set(`${mockContent.method}_${mockContent.path}`, mockContent);
    }

    return mocksMap;
}
