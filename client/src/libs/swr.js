import useSWR from "swr";

import { instance } from "./axios";

const fetcher = (endpoint) => instance.get(endpoint).then((res) => res.data);

export { useSWR, fetcher };
