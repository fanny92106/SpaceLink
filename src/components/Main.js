import React, {Component} from 'react';
import SatSetting from './SatSetting';
import SatelliteList from './SatelliteList';
import {NEARBY_SATELLITE, STARLINK_CATEGORY, SAT_API_KEY} from '../constant';
import axios from 'axios';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            satInfo: null,
            loadingSatellites: false,
        }
    }

    showNearbySatellite = (setting) => {
        this.fetchSatellite(setting);
    }

    fetchSatellite = (setting) => {
        const {observerLat, observerLong, observerAlt, radius} = setting;
        const url = `${NEARBY_SATELLITE}/${observerLat}/${observerLong}/${observerAlt}/${radius}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;

        this.setState({
            loadingSatellites: true,
        })

        axios.get(url)
            .then(response => {
                console.log(response.data);
                this.setState({
                    satInfo: response.data.above,
                    loadingSatellites: false,
                })
            })
            .catch(error => {
                console.log('err in fetch satellite -> ', error);
                this.setState({
                    loadingSatellites: false,
                })
            })
        }

    render() {
        return (
            <div className='main'>
                <div className='left-side'>
                    <SatSetting onShow={this.showNearbySatellite}/>
                    <SatelliteList satInfo={this.state.satInfo} loading={this.state.loadingSatellites}/>
                </div>
                <div className='right-side'>
                    right
                </div>
            </div>
        )
    }
}

export default Main;