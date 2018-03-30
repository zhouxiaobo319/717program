import React, { Component } from 'react';
import './mine.scss';

class Mine extends Component {
    constructor () {
        super();
        this.toSetting = this.toSetting.bind(this);
    }
    render () {
        return <div id="mine">
            <header>
                <p>
                    <span className="iconfont icon-shezhi1" onClick={this.toSetting}></span>
                    <span>我的717商城</span>
                </p>
            </header>
            <section className="mine-cont">
                <dl>
                    <dt>
                        <img src={require('../../static/img/default_avatar.png')} alt=""/>
                    </dt>
                    <dd>user name</dd>
                </dl>
            </section>
        </div>;
    }
    toSetting () {
        this.props.history.push('/setting');
    }
}

export default Mine;