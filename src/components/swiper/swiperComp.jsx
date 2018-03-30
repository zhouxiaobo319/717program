import React, { Component } from 'react';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
import './swiperComp.css';

let img2 = require('../../static/img/banner/banner2.png');
let img3 = require('../../static/img/banner/banner3.png');
let img4 = require('../../static/img/banner/banner4.png');
let img5 = require('../../static/img/banner/banner5.png');

class SwiperComponent extends Component {
    render () {
        return <div className="swiper-container" ref="scDom">
            <div className="swiper-wrapper">
                <div className="swiper-slide"><img src={require('../../static/img/banner/banner1.jpg')} alt=""/></div>
                <div className="swiper-slide"><img src={img2} alt=""/></div>
                <div className="swiper-slide"><img src={img3} alt=""/></div>
                <div className="swiper-slide"><img src={img4} alt=""/></div>
                <div className="swiper-slide"><img src={img5} alt=""/></div>
            </div>
        </div>
    }
    componentDidMount () {
        new Swiper(this.refs.scDom, {
            autoplay: true,
            loop: true
        })
    }
}

export default SwiperComponent;