import React, {Component} from 'react';
import {Button, List, Avatar, Checkbox, Spin, Slider} from 'antd';
import starlinkLogo from '../assets/images/Satellite.svg';


class SatelliteList extends Component {
    constructor(){
        super();
        this.state = {
            duration: 0,
        }
    }

    onChangeDuration = (value) => {
        this.setState({
            duration: value
        })
    }

    onChange = e =>{
        const {dataInfo, checked} = e.target;
        this.props.onSelectionChange(dataInfo, checked);
    }

    render() {
        const satList = this.props.satInfo ? this.props.satInfo :[];
        const marks = {
            0: {
                style:{
                    color: '#69c0ff',
                },
                label: <strong>0</strong>
            },
            10: {
                style:{
                    color: '#69c0ff',
                },
                label: <strong>10</strong>
            },
        }

        return (
            <div className="sat-list-box">
                <Button
                    className="sat-list-btn"
                    size="large"
                    disabled={this.props.disableTrack}
                    onClick={()=> this.props.trackOnclick(this.state.duration)}
                    >
                        Track on the map
                </Button>
                <div className="list-item">
                    <Slider className="slider"
                        marks={marks}
                        min={0}
                        max={10}
                        defaultValue={0}
                        onChange={this.onChangeDuration}
                    />
                    <label>Track Duration</label>
                </div>
                <hr/>
                {
                    this.props.loading?
                    <div>
                        <Spin tip="Loading..."/>
                    </div>
                    :
                    <List
                        className="sat-list"
                        itemLayout="horizontal"
                        size="small"
                        dataSource={satList}
                        renderItem={item => (
                            <List.Item
                            actions={[<Checkbox dataInfo={item} onChange={this.onChange}/>]}>
                            <List.Item.Meta
                                avatar={<Avatar size={50} src={starlinkLogo} />}
                                title={<p>{item.satname}</p>}
                                description={`Launch Date: ${item.launchDate}`}
                            />
                            </List.Item>
                    )}
                />
                }
            </div>
        );
    }
}

export default SatelliteList;