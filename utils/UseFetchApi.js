//:>--------------------------------------------------------------------------------------+
//:>
//:>  $Source: UseFetchApi.tsx $
//:>
//:>  $Copyright: (c) 2017 Bentley Systems, Incorporated. All rights reserved. $
//:>
//:>+--------------------------------------------------------------------------------------
import * as React from 'react';
import { useSnackbar } from 'notistack';
import { useReactOidc } from '@axa-fr/react-oidc-context';
async function handleErrors(response) {
    if (!response.ok) {
        let errText = `${response.status} : ${await response.text()}`;
        console.log(errText);
        throw Error(errText);
    }
    return response;
}
export function useFetchApi(url, init) {
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = React.useState();
    const [response, setResponse] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    const [fetchCount, setFetchCount] = React.useState(0);
    const [error, SetError] = React.useState(undefined);
    const { oidcUser } = useReactOidc();
    function buildRequest(init) {
        if (init)
            return injectToken(init);
        return injectToken({ method: 'GET' });
    }
    function injectToken(options) {
        const update = { ...options };
        update.headers = {
            ...update.headers,
            Authorization: `Bearer ${oidcUser.access_token}`,
        };
        return update;
    }
    function run(newUrl, newInit) {
        console.log("Fetching...");
        let fetchUrl = newUrl ? newUrl : url;
        if (!fetchUrl) {
            SetError("Missing fetch URI");
            return Promise.reject("Missing fetch URI");
        }
        setIsLoading(true);
        SetError(undefined);
        return fetch(fetchUrl, buildRequest(newInit ? newInit : init))
            .then(res => { setResponse(res); return res; })
            .then(res => handleErrors(res))
            .then(res => {
            if (res.status !== 204) {
                return res.json();
            }
            return undefined;
        })
            .then(d => {
            setData(d);
            return d;
        })
            .catch(err => {
            enqueueSnackbar(`Failed to fetch data: ${err}`, { variant: "error" });
            SetError(err);
            if ((fetchUrl === null || fetchUrl === void 0 ? void 0 : fetchUrl.toString().includes("messageCount")) && err.message.toString().includes("403"))
                return err;
            else
                return undefined;
        })
            .finally(() => {
            setIsLoading(false);
            setFetchCount(fetchCount => fetchCount + 1);
        });
    }
    return {
        response,
        data,
        run,
        hasData: typeof data !== "undefined",
        isFetching: isLoading,
        fetchCount,
        error
    };
}
