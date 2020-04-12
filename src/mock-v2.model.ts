export interface RequestMock {
    method: 'get' | 'post' | 'put' | 'delete';
    path: string;
    mocks: Mock[];
}

export interface Mock {
    request: {
        queryParams: { [id: string]: string };
        body: object;
    },
    response: {
        code: number;
        payload: unknown
    }
}