import { openWeatherMapKey, apiURL } from "./config";

export function getUrl(path: string) {
    let url = apiURL + path;
    if (path.indexOf("?") === -1) {
        url += "?";
    } else {
        url += "&";
    }

    url += "appid=" + openWeatherMapKey;
    return url;
}
