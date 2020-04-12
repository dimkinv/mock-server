# Simple Mock Server

Simple mock server comes with example endpoing configured. You can find is in `src/mocks/example.json`

Mock file should implement the following interface: 
```
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
```

Mock templte file is at `__mock_example.json`

## Example endpoints
2 example endpoints available
* [http://localhost:3000/api/example](http://localhost:3000/api/example)
* [http://localhost:3000/api/example?someParam=true](http://localhost:3000/api/example?someParam=true)

Enjoy :)