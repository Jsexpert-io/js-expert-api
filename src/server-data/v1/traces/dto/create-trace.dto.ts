import { Status } from "aws-sdk/clients/directconnect";
import { Attribute } from "aws-sdk/clients/directoryservice";

export class CreateTraceDto {
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
