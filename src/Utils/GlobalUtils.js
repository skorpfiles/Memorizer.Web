import { ApiHostUrl } from './GlobalConstants';

export async function callApi(relativePath, method, accessToken, body) {
    const headers = {
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin,Access-Control-Allow-Headers,content-type, Authorization'
    }

    if (accessToken != null) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const init = {
        method: method,
        headers: headers
    };

    if (body != null) {
        init['body'] = body;
    }

    return await fetch(ApiHostUrl + relativePath, init);
}

export function getAccessTokenFromCookies() {
    try {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('accessToken='))
            .split('=')[1];
        return cookieValue;
    }
    catch {
        return null;
    }
}

export function getUserLoginFromCookies() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('userLogin='))
        .split('=')[1];
    return cookieValue;
}