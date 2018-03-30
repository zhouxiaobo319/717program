import React, { Component } from 'react';
import './search.css';

class Search extends Component {
    constructor () {
        super();
        this.state = {
            historylist: []
        }
        this.toSearch = this.toSearch.bind(this);
        this.clearHistory = this.clearHistory.bind(this);
    }
    render () {
        let { historylist } = this.state;
        return <div id="search">
            <header>
                <input type="text" ref='keyWords'/>
                <button onClick={this.toSearch}>搜索</button>
            </header>
            <section className="recent-search">
                <p>最近搜索<span onClick={this.clearHistory} className="iconfont icon-shanchu-01"></span></p>
                { // 判断是否有搜索记录
                    historylist.length == 0 ? <p>暂无搜索记录...</p> :
                        <ul>
                            {
                                this.state.historylist.map((item, index) => {
                                    return <li key={index} onClick={() => {this.toResult(item)}}>{item}</li>
                                })
                            }
                        </ul>
                }
            </section>
            <section className="common-search">
                <p>大家都在搜</p>
                <ol>
                    <li>苹果</li>
                </ol>
            </section>
        </div>;
    }
    clearHistory () { // 点击删除搜索记录
        localStorage.removeItem('SearchHistory');
        this.setState({
            historylist: []
        })
    }
    toSearch () { // 点击搜索按钮
        if (!this.refs.keyWords.value) return; // 如果搜索框内容为空
        let keyWords = this.refs.keyWords.value;
        let ls = localStorage;

        if (ls.getItem('SearchHistory')) { // 本地存储
            let shArr = JSON.parse(ls.getItem('SearchHistory'));
            if (shArr.indexOf(keyWords) > -1)return;
            shArr.push(keyWords);
            ls.setItem('SearchHistory', JSON.stringify(shArr));
        } else {
            ls.setItem('SearchHistory', JSON.stringify([keyWords]));
        }

        this.props.history.push('/index/result', { // 跳转搜索结果页
            key_words: keyWords
        });
    }
    toResult (keyWords) { // 点击搜索记录
        this.props.history.push('/index/result', { // 跳转搜索结果页
            key_words:keyWords
        });
    }
    componentDidMount () {
        if (localStorage.getItem('SearchHistory')) {
            this.setState({
                historylist: JSON.parse(localStorage.getItem('SearchHistory'))
            })
        }
    }
}

export default Search;