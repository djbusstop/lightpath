import L from 'leaflet';

const routeStyle = {
  color: '#F9971E',
  weight: 5,
};

const startEndPointsStyle = {
  color: '#F9971E',
  radius: 10,
  fillOpacity: 1,
};

export default class Map extends L.Map {
  constructor(id, params) {
    super(id, params);
    // Custom Map Setup
    const tonerUrl = '//tile.stamen.com/terrain/{Z}/{X}/{Y}.png';
    const url = tonerUrl.replace(/({[A-Z]})/g, s => s.toLowerCase());
    const basemap = L.tileLayer(url, {
      subdomains: ['', 'a.', 'b.', 'c.', 'd.'],
      minZoom: 0,
      maxZoom: 17,
      type: 'png',
      attribution: 'Map tiles by <a href="//stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>',
    });
    basemap.addTo(this);
    this.setView([51.505, -0.09], 13);
  }

  drawRoute(route) {
    L.geoJSON(route.geojson, routeStyle).addTo(this);
    this.drawStartEndPoints([route.startPoint, route.endPoint]);
  }

  drawStartEndPoints(startEndPoints) {
    startEndPoints.forEach((coords) => {
      const circle = L.circle(coords.reverse(), startEndPointsStyle);
      circle.addTo(this);
    });
  }

  fitZoomToRoute(startEndPoints) {
    this.fitBounds(startEndPoints);
  }
}
