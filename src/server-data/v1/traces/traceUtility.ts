import { prisma } from "src/Utils/DbService"


export const CreateSpans = async (createTraceDto, projectId) => {
    // first we need to create a trace
    const trace = await prisma.trace.create({
        data: {
            name: createTraceDto.name,
            traceId: createTraceDto.traceId,
            project: {
                connect: {
                    id: projectId
                }
            }
        }
    })

    // then we need to create the spans
    console.log('createTraceDto', createTraceDto?.resourceSpans[0]?.resource)
    const resourceAttributes = createTraceDto?.resourceSpans[0]?.resource?.attributes

    const spans = createTraceDto.resourceSpans?.map(rs => {
        const scopeSpans = rs.scopeSpans?.map(span => {
            const attributes = [...resourceAttributes, ...span.attributes,].map(attribute => {
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
                traceId: trace.id,
            }
        })
        return scopeSpans
    })
    console.log('spans', spans)
    return true
    return prisma.traceSpan.createMany({
        data: spans.flat().flat(),
    })
}