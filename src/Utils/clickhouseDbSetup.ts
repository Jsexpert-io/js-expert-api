import { ClickhouseOrm } from "clickhouse-orm";

export const chOrm = ClickhouseOrm({
    db: {
        name: "jsexpertdb",
    },
    debug: true,
    client: {
        url: process.env.CLICKHOUSE_URL || '64.227.137.36',
        port: process.env.CLICKHOUSE_PORT || '8123',
        // basicAuth: {
        //     username: "default",
        //     password: "",
        // },
        debug: false,
        isUseGzip: true,
        format: "json", // "json" || "csv" || "tsv"
    },
});