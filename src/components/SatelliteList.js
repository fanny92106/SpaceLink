import React, {Component} from 'react';
import {Button, List, Avatar, Checkbox, Spin} from 'antd';
import starlinkLogo from '../assets/images/Satellite.svg';


class SatelliteList extends Component {
    render() {
        const satList = this.props.satInfo ? this.props.satInfo :[];

        return (
            <div className="sat-list-box">
                <Button className="sat-list-btn" size="large">Track on the map</Button>
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