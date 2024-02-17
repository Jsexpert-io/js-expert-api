import { DATA_TYPE, ModelSyncTableConfig } from 'clickhouse-orm';

interface TraceAttributes {
    id: string;
    name: string;
    scopeName: string;
    traceId: string;
    spanId: string;
    parentSpanId: string;
    kind: number;
    startTimeUnixNano: number;
    endTimeUnixNano: number;
    attributes: string; // Simplified representation of the attributes object as a JSON string
    droppedAttributesCount: number;
    events: string; // Assuming a JSON string representation of the events array
    droppedEventsCount: number;
    links: string; // Assuming a JSON string representation of the links array
    droppedLinksCount: number;
    status: number; // Simplified representation of the status object
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
}

export const traceTableSchema: ModelSyncTableConfig<TraceAttributes> = {
    tableName: "trace_data",
    schema: {
        id: { type: DATA_TYPE.String },
        name: { type: DATA_TYPE.String },
        scopeName: { type: DATA_TYPE.String },
        traceId: { type: DATA_TYPE.String },
        spanId: { type: DATA_TYPE.String },
        parentSpanId: { type: DATA_TYPE.String },
        kind: { type: DATA_TYPE.Int64 },
        startTimeUnixNano: { type: DATA_TYPE.String },
        endTimeUnixNano: { type: DATA_TYPE.String },
        attributes: {
            type: DATA_TYPE.String
        },
        droppedAttributesCount: { type: DATA_TYPE.UInt64 },
        events: { type: DATA_TYPE.String }, // Consider using DATA_TYPE.JSON if supported
        droppedEventsCount: { type: DATA_TYPE.Int64 },
        links: { type: DATA_TYPE.String }, // Consider using DATA_TYPE.JSON if supported
        droppedLinksCount: { type: DATA_TYPE.Int64 },
        status: { type: DATA_TYPE.String },
        projectId: { type: DATA_TYPE.String },
        createdAt: { type: DATA_TYPE.DateTime, default: Date },
        updatedAt: { type: DATA_TYPE.DateTime, default: Date },
    },
    options: `ENGINE = MergeTree()
    PARTITION BY toYYYYMM(createdAt)
    ORDER BY (traceId, spanId)`,
    autoCreate: true,
    autoSync: true,
};

// lets create the table in clickhouse
