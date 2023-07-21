import Axios from "axios";

export default async function getLocation(ip: string) {
    return Axios({
        headers: {
            apikey: "1mudQokhKL4bcz4mOuLYNVut4FlgfEEi",
        },
        method: "GET",
        url: `https://api.apilayer.com/ip_to_location/${ip}`,
    })
        .then((e) => e.data)
        .catch((e) => false);
}
