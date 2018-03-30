const jwt = require('jsonwebtoken');
const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const Mock = require('mockjs');

// 封装接口
function queryApi (url, methods, params) {
    return new Promise((resolve, reject) => {
        let data = '';
        const options = {
            hostname: 'www.lb717.com',
            port: 80,
            path: url,
            method: methods,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        };
        let request = http.request(options, (response) => {
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                resolve(JSON.stringify(data));
            });
        });
        if (methods.toLowerCase() == 'post') {
            request.write(querystring.stringify(params));
        }
        request.end();
    });
}

module.exports = function (app) {
    // 商品列表的接口
    // const options = {
    //     hostname: 'www.lb717.com',
    //     port: 80,
    //     path: '/mall/index/getGoodsChannel',
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //     }
    // };
    app.post('/mall/index/getGoodsChannel', function (req, res) {
        // let data = '';
        // let request = http.request(options, (response) => {
        //     response.setEncoding('utf8');
        //     response.on('data', (chunk) => {
        //         data += chunk;
        //     });
        //     response.on('end', () => {
        //         res.end(JSON.stringify(data));
        //     });
        // });
        // request.write(querystring.stringify(req.body));
        // request.end();

        queryApi('/mall/index/getGoodsChannel', 'post', req.body)
            .then((data) => {
                res.end(data);
            })
    });

    // 注册接口
    app.post('/user/register', function (req, res) {
        // console.log(req.body);

        let user = fs.readFileSync(__dirname + '/user.json', { encoding: 'utf-8' });
        user = JSON.parse(user);
        user.push(req.body);
        fs.writeFile('./server/user.json', JSON.stringify(user), function () {
            res.end(JSON.stringify({
                'success': 1,
                'info': 'register success'
            }));
        });
    });

    // 登录接口
    app.post('/user/login', function (req, res) {
        let user = fs.readFileSync(__dirname + '/user.json', { encoding: 'utf-8' });
        user = JSON.parse(user);
        let login = req.body;
        let resInfo = {
            success: 0,
            info: '用户名或密码输入错误',
            token: ''
        }
        user.forEach(usr => {
            if (usr.username == login.username && usr.password == login.password) {
                resInfo.success = 1;
                resInfo.info = 'login success';
            }
        });

        if (resInfo.success == 1) {
            resInfo.token = jwt.sign(login, '1511', {
                expiresIn: 60 * 60
            });
        }

        res.end(JSON.stringify(resInfo));
    });

    // 添加购物车
    app.post('/user/Cart/addCart', function (req, res) {
        // console.log(req.body);
        jwt.verify(req.body.token, '1511', (err, decoded) => {
            if (err) {
                // console.log(err);
                res.end(JSON.stringify({
                    info: '登陆过期，请重新登录',
                    detail: err.TokenExpiredError
                }));
            } else {
                let cartInfo = JSON.parse(fs.readFileSync(__dirname + '/cart_info.json', { encoding: 'utf-8' }));

                if (cartInfo[decoded.username]) {
                    let recordList = cartInfo[decoded.username];
                    let flag = false; // 新添加商品
                    recordList.forEach((item, index) => {
                        if (item.goods_id == req.body.goods_info.goods_id) { // 如果有重复的
                            ++item.count;
                            flag = true; // 重复商品
                        }
                    });
                    if (!flag) {
                        let record = req.body.goods_info;
                        record.count = 1;
                        record.selected = 0;
                        cartInfo[decoded.username].push(record);
                    }
                    // cartInfo[decoded.username].push([req.body.goods_info]);
                } else {
                    let record = req.body.goods_info;
                    record.count = 1;
                    record.selected = 0;
                    cartInfo[decoded.username] = [record];
                    // cartInfo[decoded.username] = [req.body.goods_info];
                }
                fs.writeFile(__dirname + '/cart_info.json', JSON.stringify(cartInfo), function () {
                    res.end('1');
                });

            }
        });
    });

    // 分类接口
    app.get('/mobile/Category/categorySon', function (req, res) {
        // console.log(querystring.stringify(req.query));
        http.request({}, function () {

        })
        res.json(1);
    });

    app.post('/user/Cart/goodsList', function (req, res) {
        // console.log(req.body);
        jwt.verify(req.body.token, '1511', (err, decoded) => {
            if (err) {
                // console.log(err);
                res.end(JSON.stringify({
                    info: '登陆过期，请重新登录',
                    detail: err.TokenExpiredError,
                    error: 1
                }));
            } else {
                try {
                    let goodsRecord = JSON.parse(fs.readFileSync('./server/cart_info.json', { encoding: 'utf-8' }));
                    res.json(goodsRecord[decoded.username]);
                }
                catch (error) {
                    res.json(error);
                }
            }
        })
        
    });
}