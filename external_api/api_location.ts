import axios from "axios";
import Axios from "axios";

const object = {
    ip: "156.217.162.253",
    continent_code: "AF",
    continent_name: "Africa",
    country_code2: "EG",
    country_code3: "EGY",
    country_name: "Egypt",
    country_capital: "Cairo",
    state_prov: "Giza",
    state_code: "EG-GZ",
    district: "",
    city: "El Dokki",
    zipcode: "",
    latitude: "30.03808",
    longitude: "31.20930",
    is_eu: false,
    calling_code: "+20",
    country_tld: ".eg",
    languages: "ar-EG,en,fr",
    country_flag: "https://ipgeolocation.io/static/flags/eg_64.png",
    geoname_id: 7929057,
    isp: "TE-AS",
    connection_type: "",
    organization: "TE-AS",
    currency: {
      code: "EGP",
      name: "Egyptian Pound",
      symbol: "E£"
    },
    time_zone: {
      name: "Africa/Cairo",
      offset: 2,
      current_time: "2023-07-22 02:30:55.133+0300",
      current_time_unix: 1689982255.133,
      is_dst: true,
      dst_savings: 1
    }
  }

type Ip_To_LocationType = typeof object;
export default async function getLocation(ip: string): Promise<Ip_To_LocationType | null> {
    try {
        const x = await axios.get(`https//api.ipgeolocation.io/ipgeo?apiKey=${process.env.IP_TO_LOCATION_API_KEY}&ip=${ip}`);
        const data = x.data as Ip_To_LocationType;
        return data
    } catch (error) {
        return null
    }
        
}
