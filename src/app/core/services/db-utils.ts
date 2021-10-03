// Convert a database snapshot into an array
export function convertSnaps<T>(results: { docs: any[] })  {
    return <T[]> results.docs.map((snap: { id: any; data: () => any }) => {
        return {
            id: snap.id,
            ...<any>snap.data()
        }
    })

}
