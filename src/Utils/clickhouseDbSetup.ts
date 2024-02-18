import { ClickhouseOrm } from "clickhouse-orm";


export const chOrm = ClickhouseOrm({
    db: {
        name: "jsexpertdb",
    },
    debug: true,
    client: {
        url: process.env.CLICKHOUSE_URL,
        port: process.env.CLICKHOUSE_PORT,
        // basicAuth: {
        //     username: "default",
        //     password: "",
        // },
        debug: false,
        isUseGzip: true,
        format: "json", // "json" || "csv" || "tsv"
    },
});