import useSWR from "swr";

import axios from "./axios";

const fetcher = (endpoint) => axios.get(endpoint).then((res) => res.data);

export { useSWR, fetcher };
