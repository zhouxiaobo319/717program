import React, { Component } from 'react';
import $http from '../../utils/http';
import './catagory.css';

class Catagory extends Component {
    constructor () {
        super();
        this.state = {
            activeIndex: 0
        };
        this.toSearch = this.toSearch.bind(this);
    }
    render () {
        let catList = ['家乡味道', '进口食品', '牛奶乳品', '休闲零食', '生鲜果蔬', '米面粮油', '调味调料', '酒水饮料'];
        return <div id="catagory">
            <header>
                <input type="text" onFocus={this.toSearch}/>
            </header>
            <section className="catagory-wrap">
                <div className="left-side">
                    <ul>
                        {
                            catList.map((item, index) => {
                                return <li
                                    className={this.state.activeIndex == index ? 'catagory-active' : ''}
                                    key={index}
                                    onClick={() => {this.toggleAction(index)}}
                                >
                                    {item}
                                </li>;
                            })
                        }
                    </ul>
                </div>
                <div className="right-side">

                </div>
            </section>
        </div>;
    }
    toSearch () { // 点击文本框
        let { history } = this.props;
        history.push('./search');
    }
    toggleAction (idx) { // 点击li
        this.setState({
            activeIndex: idx
        });

        // $http.get('/mobile/Category/categorySon', {sonid: idx + 1})
        //     .then((res) => {
        //         console.log(res);
        //     })
        // let url = 'https://acs.m.taobao.com/h5/mtop.relationrecommend.wirelessrecommend.recommend/2.0/?appKey=12574478&t=1521775687317&sign=ff491ceebe4688610a6f47b9bdc1a4f7&api=mtop.relationrecommend.WirelessRecommend.recommend&v=2.0&type=jsonp&dataType=jsonp&callback=mtopjsonp3&data=%7B%22appId%22%3A%223113%22%2C%22vm%22%3A%22nw%22%2C%22params%22%3A%22%7B%5C%22industry%5C%22%3A%5C%222%5C%22%2C%5C%22catmap_version%5C%22%3A%5C%222.0%5C%22%7D%22%2C%22nxtype%22%3A%22h5%22%7D';
        // let url_men = 'https://acs.m.taobao.com/h5/mtop.relationrecommend.wirelessrecommend.recommend/2.0/?appKey=12574478&t=1521775554341&sign=5263e6a84f67da3d103138e2e96036fa&api=mtop.relationrecommend.WirelessRecommend.recommend&v=2.0&type=jsonp&dataType=jsonp&callback=mtopjsonp2&data=%7B%22appId%22%3A%223113%22%2C%22vm%22%3A%22nw%22%2C%22params%22%3A%22%7B%5C%22industry%5C%22%3A%5C%223%5C%22%2C%5C%22catmap_version%5C%22%3A%5C%222.0%5C%22%7D%22%2C%22nxtype%22%3A%22h5%22%7D';
        // $http.jsonp(url, 'mtopjsonp3')
        //     .then((res) => {
        //         console.log(res);
        //     });
        // $http.jsonp(url_men, 'mtopjsonp2')
        //     .then((res) => {
        //         console.log(res);
        //     });
    }
}

export default Catagory;