mapboxgl.accessToken = mapToken;

console.log("Map Token:", mapToken);
console.log("Coordinates:",coordinates);

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/standard',
    center: listing.geometry.coordinates,
    zoom: 9
});

 const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({offset:25}).setHTML(`<h4> ${listing.location} </h4>` ,'<p> Exact location provided by booking </p>'))
    .addTo(map);

    // map.on('load', () => {
    //     // Load an image from an external URL.
    //     map.loadImage(
    //         'https://cdn-icons-png.flaticon.com/256/25/25694.png',
    //         (error, image) => {
    //             if (error) throw error;

    //             // Add the image to the map style.
    //             map.addImage('home', image);

    //             // Add a data source containing one point feature.
    //             map.addSource('point', {
    //                 'type': 'geojson',
    //                 'data': {
    //                     'type': 'FeatureCollection',
    //                     'features': [
    //                         {
    //                             'type': 'Feature',
    //                             'geometry': {
    //                                 'type': 'Point',
    //                                 'coordinates':listing.geometry.coordinates
    //                             }
    //                         }
    //                     ]
    //                 }
    //             });
    //             // Add a layer to use the image to represent the data.
    //             map.addLayer({
    //                 'id': 'points',
    //                 'type': 'symbol',
    //                 'source': 'point', // reference the data source
    //                 'layout': {
    //                     'icon-image': 'home', // reference the image
    //                     'icon-size': 0.25
    //                 }
    //             });
    //         }
    //     );
    // });
