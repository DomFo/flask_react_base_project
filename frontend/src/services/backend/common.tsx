const apiMainEntryPoint =
    import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_API_MAIN_ENTRY_POINT_PROD
        : import.meta.env.VITE_API_MAIN_ENTRY_POINT_DEV;


export const apiGet = async (path: string) => {
    const response = await fetch(`${apiMainEntryPoint}${path}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await handleErrorResponse(response);
};


export const apiPost = async (path: string, body: any) => {
    const response = await fetch(`${apiMainEntryPoint}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    console.log(response)
    return await handleErrorResponse(response);
};


export const apiPut = async (path: string, body: any) => {
    console.log(path);
    console.log(body);
    const response = await fetch(`${apiMainEntryPoint}${path}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    console.log(response)
    return await handleErrorResponse(response);
};


export const apiDelete = async (path: string) => {
    const response = await fetch(`${apiMainEntryPoint}${path}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await handleErrorResponse(response);
};


export const handleErrorResponse = async (response: Response) => {
    const data = await response.json()
    if (!response.ok) {
        const errorMessage = data.error.message || 'An error occurred';
        throw new Error(errorMessage);
    }
    else {
        return data;
    }
};


function toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

function toCamelCase(str: string): string {
    return str.replace(/([-_][a-z])/g, group => group.toUpperCase()
        .replace('-', '')
        .replace('_', ''));
}


export function keysToCamelCase(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(v => keysToCamelCase(v));
    } else if (obj !== null && obj.constructor === Object) {
        return Object.keys(obj).reduce(
            (result, key) => ({
                ...result,
                [toCamelCase(key)]: keysToCamelCase(obj[key]),
            }),
            {},
        );
    }
    return obj;
}


export function keysToSnakeCase(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(v => keysToSnakeCase(v));
    } else if (obj !== null && obj.constructor === Object) {
        return Object.keys(obj).reduce(
            (result, key) => ({
                ...result,
                [toSnakeCase(key)]: keysToSnakeCase(obj[key]),
            }),
            {},
        );
    }
    return obj;
}