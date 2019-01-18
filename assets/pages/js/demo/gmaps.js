$(document).ready(function () {
  var appkey = 'AIzaSyBXmoalxiW7OBxrKEu-7BkefTnc4gOVqjc'

  // Maps
  //
  // # Basic
  var mapBasic = new GMaps({
    div: '#gmap-basic',
    lat: -12.043333,
    lng: -77.028333
  })

  // Maps
  //
  // # Map Events
  var mapEvents = new GMaps({
    div: '#gmap-events',
    zoom: 16,
    lat: -12.043333,
    lng: -77.028333,
    click: function () {
      toastr.info('clicked!')
    },
    dragend: function () {
      toastr.info('dragend!')
    }
  })

  // Maps
  //
  // # Markers
  var mapMarkers = new GMaps({
    div: '#gmap-markers',
    lat: -12.043333,
    lng: -77.028333
  })
  mapMarkers.addMarker({
    lat: -12.043333,
    lng: -77.03,
    title: 'Lima',
    details: {
      database_id: 42,
      author: 'HPNeo'
    },
    click: function () {
      toastr.info('You clicked in this marker.')
    }
  })
  mapMarkers.addMarker({
    lat: -12.042,
    lng: -77.028333,
    title: 'Marker with InfoWindow',
    infoWindow: {
      content: '<p>HTML Content</p>'
    }
  })

  // Services
  //
  // # Geolocation
  var mapGeolocation = new GMaps({
    div: '#gmap-gelocation',
    lat: -12.043333,
    lng: -77.028333
  })
  GMaps.geolocate({
    success: function (position) {
      mapGeolocation.setCenter(position.coords.latitude, position.coords.longitude)
    },
    error: function (error) {
      toastr.error('Geolocation failed: ' + error.message)
    },
    not_supported: function () {
      toastr.warning('Your browser does not support geolocation')
    },
    always: function () {
      toastr.info('mapGeolocation: Done!')
    }
  })

  // Services
  //
  // # Geocoding
  var mapGeocoding = new GMaps({
    div: '#gmap-geocoding',
    lat: -12.043333,
    lng: -77.028333
  })
  $('#geocoding_form').submit(function (e) {
    e.preventDefault()
    GMaps.geocode({
      address: $('#address').val().trim(),
      callback: function (results, status) {
        if (status=='OK') {
          var latlng = results[0].geometry.location
          mapGeocoding.setCenter(latlng.lat(), latlng.lng())
          mapGeocoding.addMarker({
            lat: latlng.lat(),
            lng: latlng.lng()
          })
        }
      }
    })
  })

  // Overlays
  //
  // # Polylines
  var mapPolylines = new GMaps({
    div: '#gmap-polylines',
    lat: -12.043333,
    lng: -77.028333,
    click: function (e) {
      console.log(e)
    }
  })
  var pathPolylines = [[-12.044012922866312, -77.02470665341184], [-12.05449279282314, -77.03024273281858], [-12.055122327623378, -77.03039293652341], [-12.075917129727586, -77.02764635449216], [-12.07635776902266, -77.02792530422971], [-12.076819390363665, -77.02893381481931], [-12.088527520066453, -77.0241058385925], [-12.090814532191756, -77.02271108990476]]
  mapPolylines.drawPolyline({
    path: pathPolylines,
    strokeColor: vision.brandColor('success'),
    strokeOpacity: 0.6,
    strokeWeight: 6
  })

  // Overlays
  //
  // # Overlays
  var mapOverlays = new GMaps({
    div: '#gmap-overlays',
    lat: -12.043333,
    lng: -77.028333
  })
  mapOverlays.drawOverlay({
    lat: mapOverlays.getCenter().lat(),
    lng: mapOverlays.getCenter().lng(),
    content: '<div class="popover top" style="display:block"><div class="arrow"></div><div class="popover-content">Lima</div></div>',
    verticalAlign: 'top',
    horizontalAlign: 'center'
  })

  // Overlays
  //
  // # Polygon
  var mapPolygon = new GMaps({
    div: '#gmap-polygon',
    lat: -12.043333,
    lng: -77.028333
  })
  var pathPolygon = [[-12.040397656836609,-77.03373871559225], [-12.040248585302038,-77.03993927003302], [-12.050047116528843,-77.02448169303511], [-12.044804866577001,-77.02154422636042]]
  var polygon = mapPolygon.drawPolygon({
    paths: pathPolygon,
    strokeColor: vision.brandColor('success'),
    strokeOpacity: 1,
    strokeWeight: 3,
    fillColor: vision.brandColor('success'),
    fillOpacity: 0.6
  })

  // Overlays
  //
  // # GeoJSON Polygon
  var mapGeoJSON = new GMaps({
    div: '#gmap-geojson-polygon',
    lat: 39.743296277167325,
    lng: -105.00517845153809
  })
  var pathsGeoJSON = [
    [
      [
        [-105.00432014465332, 39.74732195489861],
        [-105.00715255737305, 39.74620006835170],
        [-105.00921249389647, 39.74468219277038],
        [-105.01067161560059, 39.74362625960105],
        [-105.01195907592773, 39.74290029616054],
        [-105.00989913940431, 39.74078835902781],
        [-105.00758171081543, 39.74059036160317],
        [-105.00346183776855, 39.74059036160317],
        [-105.00097274780272, 39.74059036160317],
        [-105.00062942504881, 39.74072235994946],
        [-105.00020027160645, 39.74191033368865],
        [-105.00071525573731, 39.74276830198601],
        [-105.00097274780272, 39.74369225589818],
        [-105.00097274780272, 39.74461619742136],
        [-105.00123023986816, 39.74534214278395],
        [-105.00183105468751, 39.74613407445653],
        [-105.00432014465332, 39.74732195489861]
      ],
      [
        [-105.00361204147337, 39.74354376414072],
        [-105.00301122665405, 39.74278480127163],
        [-105.00221729278564, 39.74316428375108],
        [-105.00283956527711, 39.74390674342741],
        [-105.00361204147337, 39.74354376414072]
      ]
    ],
    [
      [
        [-105.00942707061768, 39.73989736613708],
        [-105.00942707061768, 39.73910536278566],
        [-105.00685214996338, 39.73923736397631],
        [-105.00384807586671, 39.73910536278566],
        [-105.00174522399902, 39.73903936209552],
        [-105.00041484832764, 39.73910536278566],
        [-105.00041484832764, 39.73979836621592],
        [-105.00535011291504, 39.73986436617916],
        [-105.00942707061768, 39.73989736613708]
      ]
    ]
  ]
  var polygonGeoJSON = mapGeoJSON.drawPolygon({
    paths: pathsGeoJSON,
    useGeoJSON: true,
    strokeColor: vision.brandColor('success'),
    strokeOpacity: 1,
    strokeWeight: 3,
    fillColor: vision.brandColor('success'),
    fillOpacity: 0.6
  })

  // Routes
  //
  // # Routes
  var mapRoutes = new GMaps({
    div: '#gmap-routes',
    lat: -12.043333,
    lng: -77.028333
  })
  mapRoutes.drawRoute({
    origin: [-12.044012922866312, -77.02470665341184],
    destination: [-12.090814532191756, -77.02271108990476],
    travelMode: 'driving',
    strokeColor: vision.brandColor('success'),
    strokeOpacity: 0.6,
    strokeWeight: 6
  })

  // Routes
  //
  // # Routes (advances)
  var mapRoutesAdvances = new GMaps({
    div: '#gmap-router-advanced',
    lat: -12.043333,
    lng: -77.028333
  })
  $('#start_travel').click(function (e) {
    e.preventDefault()
    mapRoutesAdvances.travelRoute({
      origin: [-12.044012922866312, -77.02470665341184],
      destination: [-12.090814532191756, -77.02271108990476],
      travelMode: 'driving',
      step: function (e) {
        $('#instructions').append('<li class="list-group-item">'+e.instructions+'</li>')
        $('#instructions li:eq('+e.step_number+')').delay(450*e.step_number).fadeIn(200, function () {
          mapRoutesAdvances.setCenter(e.end_location.lat(), e.end_location.lng())
          mapRoutesAdvances.drawPolyline({
            path: e.path,
            strokeColor: vision.brandColor('success'),
            strokeOpacity: 0.6,
            strokeWeight: 6
          })
        })
      }
    })
  })


  // Static Maps
  //
  // # Static maps
  var url = GMaps.staticMapURL({
    size: [610, 300],
    lat: -12.043333,
    lng: -77.028333
  })
  url += '&key=' + appkey
  $('<img/>').attr('src', url)
    .addClass('img-responsive')
    .appendTo('#gmap-static')

  // Static Maps
  //
  // # With markers
  var urlMarkers = GMaps.staticMapURL({
    size: [610, 300],
    lat: -12.043333,
    lng: -77.028333,
    markers: [
      {lat: -12.043333, lng: -77.028333},
      {lat: -12.045333, lng: -77.034, size: 'small'},
      {lat: -12.045633, lng: -77.022, color: 'blue'}
    ]
  })
  urlMarkers += '&key=' + appkey
  $('<img/>').attr('src', urlMarkers)
    .addClass('img-responsive')
    .appendTo('#gmap-static-markers')

  // Static Maps
  //
  // # With Polylines
  var pathStatic = [
    [-12.040397656836609,-77.03373871559225],
    [-12.040248585302038,-77.03993927003302],
    [-12.050047116528843,-77.02448169303511],
    [-12.044804866577001,-77.02154422636042],
    [-12.040397656836609,-77.03373871559225]
  ]
  var urlPolylines = GMaps.staticMapURL({
    size: [610, 300],
    lat: -12.043333,
    lng: -77.028333,
    polyline: {
      path: pathStatic,
      strokeColor: vision.brandColor('success'),
      strokeOpacity: 0.6,
      strokeWeight: 6
    }
  })
  urlPolylines += '&key=' + appkey
  $('<img/>').attr('src', urlPolylines)
    .addClass('img-responsive')
    .appendTo('#gmap-static-polylines')

  // Utils
  //
  // # Context menu
  var mapContextMenu = new GMaps({
    div: '#gmap-context-menu',
    lat: -12.043333,
    lng: -77.028333
  })
  mapContextMenu.setContextMenu({
    control: 'map',
    options: [{
      title: 'Add marker',
      name: 'add_marker',
      action: function (e) {
        this.addMarker({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          title: 'New marker'
        });
        this.hideContextMenu()
      }
    }, {
      title: 'Center here',
      name: 'center_here',
      action: function (e) {
        this.setCenter(e.latLng.lat(), e.latLng.lng())
      }
    }]
  })

  // Utils
  //
  // # Geofences
  var mapGeofences = new GMaps({
    div: '#gmap-geofences',
    lat: -12.043333,
    lng: -77.028333
  })
  var pathGeofences = []
  var p = [[-12.040397656836609,-77.03373871559225],[-12.040248585302038,-77.03993927003302],[-12.050047116528843,-77.02448169303511],[-12.044804866577001,-77.02154422636042]]
  for (var i in p) {
    latlng = new google.maps.LatLng(p[i][0], p[i][1])
    pathGeofences.push(latlng)
  }
  var polygonGeofences = mapGeofences.drawPolygon({
    paths: pathGeofences,
    strokeColor: vision.brandColor('success'),
    strokeOpacity: 1,
    strokeWeight: 3,
    fillColor: vision.brandColor('success'),
    fillOpacity: 0.6
  })
  mapGeofences.addMarker({
    lat: -12.043333,
    lng: -77.028333,
    draggable: true,
    fences: [polygonGeofences],
    outside: function (m, f) {
      toastr.info('This marker has been moved outside of its fence.')
    }
  })

  // Utils
  //
  // # Custom controls
  var mapCustomControls = new GMaps({
    div: '#gmap-custom-controls',
    zoom: 16,
    lat: -12.043333,
    lng: -77.028333
  })
  mapCustomControls.addControl({
    position: 'top_right',
    content: 'Geolocate',
    style: {
      margin: '5px',
      padding: '1px 6px',
      border: 'solid 1px #717B87',
      background: '#fff'
    },
    events: {
      click: function () {
        GMaps.geolocate({
          success: function (position) {
            mapCustomControls.setCenter(position.coords.latitude, position.coords.longitude)
          },
          error: function (error) {
            toastr.error('Geolocation failed: ' + error.message)
          },
          not_supported: function () {
            toastr.warning('Your browser does not support geolocation')
          }
        })
      }
    }
  })

  // Utils
  //
  // # Fusion tables layers
  var infoWindowFusionTables = new google.maps.InfoWindow({})
  var mapFusionTables = new GMaps({
    div: '#gmap-fusion-tables',
    zoom: 11,
    lat: 41.850033,
    lng: -87.6500523
  })
  mapFusionTables.loadFromFusionTables({
    query: {
      select: '\'Geocodable address\'',
      from: '1mZ53Z70NsChnBMm-qEYmSDOvLXgrreLTkQUvvg'
    },
    suppressInfoWindows: true,
    events: {
      click: function (point) {
        infoWindowFusionTables.setContent(point.row['Geocodable address'].value)
        infoWindowFusionTables.setPosition(point.latLng)
        infoWindowFusionTables.open(mapFusionTables.map)
      }
    }
  })

  // Utils
  //
  // # KML and GeoRSS layers
  var infoWindowKML = new google.maps.InfoWindow({})
  var mapKML = new GMaps({
    div: '#gmap-kml-georss',
    zoom: 12,
    lat: 40.65,
    lng: -73.95
  })
  mapKML.loadFromKML({
    url: 'http://api.flickr.com/services/feeds/geo/?g=322338@N20&lang=en-us&format=feed-georss',
    suppressInfoWindows: true,
    events: {
      click: function (point) {
        infoWindowKML.setContent(point.featureData.infoWindowHtml)
        infoWindowKML.setPosition(point.latLng)
        infoWindowKML.open(mapKML.map)
      }
    }
  })

  // Utils
  //
  // # Map Types
  var mapTypes = new GMaps({
    div: '#gmap-map-types',
    lat: -12.043333,
    lng: -77.028333,
    mapTypeControlOptions: {
      mapTypeIds : ['hybrid', 'roadmap', 'satellite', 'terrain', 'osm']
    }
  })
  mapTypes.addMapType('osm', {
    getTileUrl: function (coord, zoom) {
      return 'https://a.tile.openstreetmap.org/' + zoom + '/' + coord.x + '/' + coord.y + '.png'
    },
    tileSize: new google.maps.Size(256, 256),
    name: 'OpenStreetMap',
    maxZoom: 18
  })
  mapTypes.setMapTypeId('osm')

  // Utils
  //
  // # Overlay Map Types
  var getTile = function (coord, zoom, ownerDocument) {
    var div = ownerDocument.createElement('div')
    div.innerHTML = coord
    div.style.width = this.tileSize.width + 'px'
    div.style.height = this.tileSize.height + 'px'
    div.style.background = 'rgba(250, 250, 250, 0.55)'
    div.style.fontFamily = 'Monaco, Andale Mono, Courier New, monospace'
    div.style.fontSize = '10'
    div.style.fontWeight = 'bolder'
    div.style.border = 'dotted 1px #aaa'
    div.style.textAlign = 'center'
    div.style.lineHeight = this.tileSize.height + 'px'
    return div
  }
  mapOverlayTypes = new GMaps({
    el: '#gmap-overlay-map-types',
    lat: -12.043333,
    lng: -77.028333
  });
  mapOverlayTypes.addOverlayMapType({
    index: 0,
    tileSize: new google.maps.Size(256, 256),
    getTile: getTile
  });

  // Utils
  //
  // # Street View Panoramas
  mapPanorama = GMaps.createPanorama({
    el: '#gmap-panorama',
    lat : 42.3455,
    lng : -71.0983
  })
})