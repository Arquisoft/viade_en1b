import GPX from 'gpx-parser-builder'

export const parseGPX = (file) =>
{
    const gpx = GPX.parse(file)
    //console.log(gpx)
    const routeList = []
    gpx.trk.forEach(track => {
        const routePositions = []
        track.trkseg.forEach(trSegment =>{
            const segmentPositions = []
            trSegment.trkpt.forEach(pt =>{
                segmentPositions.push([pt.$.lat,pt.$.lon])
            })
            segmentPositions.forEach(pos => routePositions.push(pos))
        })
        routeList.push(routePositions)
    })
    return routeList[0] //en caso de haber más de un track por archivo solo devolvemos el primer track
}