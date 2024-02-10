import { prisma } from "src/Utils/DbService";
function sortWithHierarchy(data) {
    // Create a map to easily access children based on parentSpanId
    const map = new Map();
    data.forEach(item => {
        if (!map.has(item.parentSpanId)) {
            map.set(item.parentSpanId, []);
        }
        map.get(item.parentSpanId).push(item);
    });

    // Recursive function to get items and their children
    function getItemsWithChildren(parentSpanId) {
        const items = map.get(parentSpanId) || [];
        let sortedItems = [];
        items.forEach(item => {
            // Add the parent item
            sortedItems.push(item);
            // Recursively add children of the current item
            sortedItems = sortedItems.concat(getItemsWithChildren(item.spanId));
        });
        return sortedItems;
    }

    // Start with undefined parentSpanId to get top-level parents first
    return getItemsWithChildren(undefined);
}

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


        return scopeSpans
    }).flat()
    const sortedSpans = sortWithHierarchy(spans)
    console.log('sortedSpans', sortedSpans?.map(a => {
        return {
            spanId: a.spanId,
            parentSpanId: a.parentSpanId,
        }
    }))
    //return true
    return prisma.traceSpan.createMany({
        data: sortedSpans?.map(a => {
            return {
                ...a
            }
        })
    })
}