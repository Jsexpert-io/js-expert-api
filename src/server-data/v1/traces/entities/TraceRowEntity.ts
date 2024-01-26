
export interface TraceRaw {
    resourceSpans: ResourceSpan[];
}

export interface ResourceSpan {
    resource: Resource;
    scopeSpans: ScopeSpan[];
}

export interface Resource {
    attributes: Attribute[];
    droppedAttributesCount: number;
}

export interface Attribute {
    key: string;
    value: any;
}

export interface ScopeSpan {
    scope: Scope;
    spans: Span[];
}

export interface Scope {
    name: string;
    version: string;
}

export interface Span {
    traceId: string;
    spanId: string;
    parentSpanId: string;
    name: string;
    kind: number;
    startTimeUnixNano: string;
    endTimeUnixNano: string;
    attributes: Attribute[];
    droppedAttributesCount: number;
    events: any[];
    droppedEventsCount: number;
    status: Status;
    links: any[];
    droppedLinksCount: number;
}



export interface Status {
    code: number;
}
