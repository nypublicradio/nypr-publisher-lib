import config from 'ember-get-config';
import Service from '@ember/service';
import { get } from '@ember/object';
import fetch from 'fetch';

export default Service.extend({
  endPoint: 'v1/whats_on/',
  isLive(pk) {
    let endPoint = get(this, 'endPoint');
    let url = `${config.publisherAPI}/${endPoint}`;

    return fetch(url)
      .then(r => r.json())
      .then(d => this._extractStatus(d, pk));
  },

  _extractStatus(data, pk) {
    let stations = Object.keys(data);
    for (let i = 0; i < stations.length; i++) {
      let stationSlug = stations[i];
      let station = data[stationSlug];
      let stationName = get(station, 'name');
      // for some reason if the what's on story is an EPISODE, it's under episode_pk,
      // but if it's a SEGMENT, that pk is just on pk
      let onAirPk = get(station, 'current_show.episode_pk') || get(station, 'current_show.pk');
      let endtime = get(station, 'current_show.end');

      if (String(onAirPk) === pk) {
        return [true, endtime, stationSlug, stationName];
      }
    }

    return [false, false];
  }
});
