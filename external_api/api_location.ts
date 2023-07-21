import Axios from "axios";

const object = {
    ip: "182.48.79.85",
    type: "ipv4",
    country_code: "BD",
    country_name: "Bangladesh",
    region_name: "Dhaka",
    city: "Dhaka",
    latitude: 23.7104,
    longitude: 90.40744,
    continent_code: "AS",
    continent_name: "Asia",
    is_eu: false,
    connection: {
      asn: 58715,
      isp: "Earth Telecommunication ( pvt ) Limited"
    },
    location: {
      capital: "Dhaka",
      native_name: "Bangladesh",
      flag: "http://assets.apilayer.com/flags/BD.svg",
      top_level_domains: [
        ".bd"
      ],
      calling_codes: [
        "880"
      ]
    },
    currencies: [
      {
        name: "Bangladeshi taka",
        code: "BDT",
        symbol: "৳"
      }
    ],
    timezones: [
      "UTC+06:00"
    ]
  }

type Ip_To_LocationType = typeof object;
export default async function getLocation(ip: string) : Promise<Ip_To_LocationType> {
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
