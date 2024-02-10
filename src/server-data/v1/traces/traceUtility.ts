import { prisma } from "src/Utils/DbService"


export const CreateSpans = async (createTraceDto, projectId) => {
    // first we need to create a trace
    // const trace = await prisma.traceSpan.create({
    //     data: {
    //         name: createTraceDto.name,
    //         traceId: createTraceDto.traceId,
    //         project: {
    //             connect: {
    //                 id: projectId
    //             }
    //         }
    //     }
    // })

    // then we need to create the spans

    const resourceAttributes = createTraceDto?.resourceSpans[0]?.resource?.attributes

    const spans = createTraceDto.resourceSpans?.map(rs => {
        const scopeSpans = rs.scopeSpans
            ?.map(span => {
                return {
                    ...span,
                    spans: span.spans.map(s => {
                        return {
                            ...s,
                            traceId: s.traceId,
                            projectId,
                            scopeName: span?.scope?.name

                        }
                    })
                }
            })?.map(a => a.spans).flat()
            ?.map(span => {

                const eventAttributes = span.events?.map(event => {
                    return event.attributes;
                }).flat() || []

                const attributes = [...resourceAttributes, ...span.attributes, ...eventAttributes].map(attribute => {
                    const valueKey = Object.keys(attribute.value)[0]
                    if (attribute.key === 'http.request.body' || attribute.key === 'http.request.headers') {
                        return {
                            [attribute.key]: JSON.parse(attribute.value[valueKey]),
                        }
                    }
                    return {
                        [attribute.key]: attribute.value[valueKey],
                    }
                })
                return {
                    ...span,
                    attributes: Object.assign({}, ...attributes),
                    traceId: span.traceId,
                    projectId
                }
            }).flat()
            // arrange them in the correct order based on the parentSpanId and spanId such that the parentSpanId comes first
            .sort((a, b) => {
                if (a.parentSpanId === b.spanId) {
                    return 1
                }
                return -1
            })

        return scopeSpans
    }).flat()
    console.log('spans', {
        data: spans?.map(a => {
            return {
                spanId: a.spanId,
                parentSpanId: a.parentSpanId,
            }
        })

    })
    //return true
    return prisma.traceSpan.createMany({
        data: spans?.map(a => {
            return {
                ...a
            }
        })
    })
}