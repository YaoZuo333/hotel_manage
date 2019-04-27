const express = require('express');
const router = express.Router();
const conn = require('./../db/db');
const svgCaptcha = require('svg-captcha');
const sms_util = require('./../util/sms_util');


let user = {};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/homecasual', (req, res)=>{
    /* let sqlStr = 'select * from homecasual';
     conn.query(sqlStr, (err, results) => {
         if (err) return res.json({err_code: 1, message: '资料不存在', affextedRows: 0})
         res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
     })*/
    /*const data = require('../data/homecasual');
    res.json({success_code: 200, message: data})*/
    let sqlStr = 'SELECT * FROM pdd_homecasual';
    conn.query(sqlStr,(err,results,fields)=>{
        if (err){
            return res.json({err_code:1, message:'数据不存在'})
        }else {
            res.json({err_code:200,message:results})
        }

    })
});

/**
 * 获取首页导航
 */
router.get('/api/homenav', (req, res)=>{
    /*
    let sqlStr = 'select * from homenav';
     conn.query(sqlStr, (err, results) => {
         if (err) return res.json({err_code: 1, message: '资料不存在', affextedRows: 0})
         res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
     })
     */
    const data = require('../data/homenav');
    res.json({success_code: 200, message: data});
});

/**
 * 测试接口
 */
router.get('/api/test', (req, res)=>{
   let sqlStr = 'select * from user';
    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({err_code: 1, message: '资料不存在', affextedRows: 0})
        res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
    })
    /*setTimeout(function () {
        const data = require('../data/shopList');
        res.json({success_code: 200, message: data})
    }, 300);*/
});

/**
 * 获取推荐商品列表
 */


/**
 * 获取推荐商品列表拼单用户
 */


/**
 * 获取搜索分类列表
 */


/*
一次性图形验证码
* */
router.get('/api/captcha',(req,res)=>{
    let captcha = svgCaptcha.create({
        color:true,
        noise:2,
        ignoreChars:'0oli',
        size:4
    });
    req.session.captcha = captcha.text.toLocaleLowerCase();
    console.log(req.session.captcha);
    //console.log("图形验证码请求中的seesion:");
    //console.log(req.session);

    res.type('svg');
    res.send(captcha.data);
    //console.log(req);
});


/*
* 短信验证码*/
router.get('/api/send_code',(req,res)=>{
    let code = sms_util.randomCode(6);
    console.log(code);
    user[req.query.phone] = code;
    //console.log(req);
    console.log(user);

    res.json({success_code:200,message:code});
    //res.json({err_code:0,message:'获取验证码失败'});
});

/*注册请求*/
router.post('/api/rgeister_post',(req,res)=>{
    let phone = req.body.userPhone;
    let userID = req.body.userPhone;
    let psd = req.body.userPsw;
    let name = req.body.userName;
    let age = req.body.userAge;
    let sex  = req.body.userSex;

    let sqlStr = "SELECT * FROM hotel_user WHERE user_phone ='"+phone+"'";
    conn.query(sqlStr,(err,results,fields)=>{
        if (err){
            res.json({err_code:0,message:'查询数据库失败'+err});
        } else {
            results = JSON.parse(JSON.stringify(results))[0];
            if (results){
                res.json({err_code:0,message:'该手机已经注册'});
            }else {
                let addSql = "INSERT INTO hotel_user(user_Id,user_name, user_phone,user_psw,user_position,user_age,user_sex) VALUES (?, ?, ?, ?, ?, ?, ?)";
                const addparmas = [userID,name,phone,psd,'会员',age,sex];
                conn.query(addSql,addparmas,(err,results,fields)=>{
                    if (err){
                        //console.log(err);
                        res.json({err_code:0,message:'查询数据库失败'+err});
                    }else {
                        results = JSON.parse(JSON.stringify(results));
                        res.json({success_code:200,message:results});
                    }
                })
            }
        }
    })
});

/*
* 验证登录*/
router.post('/api/login_code',(req,res)=>{
    let phone = req.body.phone;
    let code = req.body.code;
    console.log(user);
    //res.json({err_code:0,message:{phone,code}});
    console.log(user[phone]);
    if (user[phone] !== code){
        res.json({err_code:0,message:"验证码错误"})
    }

    delete user[phone];


    let sqlStr = "SELECT * FROM hotel_user WHERE user_phone ='"+phone+"'";

    conn.query(sqlStr,(err,results,fields)=>{
        if (err){
            res.json({err_code:0,message:'查询数据库失败'+err});
        }else {

            results = JSON.parse(JSON.stringify(results))[0];
            console.log(results);
            if (results){
                //console.log(11111111);
                req.session.userId = results.user_Id;
                res.json({success_code:200,message:{id: results.user_Id, user_name: results.user_name, user_phone: results.user_phone,user_sex: results.user_sex,user_position: results.user_position, user_address:results.user_address}});
            }else {     //新用户
                let addSql = "INSERT INTO hotel_user(user_name, user_phone) VALUES (?, ?)";
                const addparmas = [phone,phone];
                conn.query(addSql,addparmas,(err,results,fields)=>{
                    results = JSON.parse(JSON.stringify(results));
                    //console.log(results);
                    if (!err){
                        let sqlStr  = "SELECT * FROM hotel_user WHERE user_Id = '" + results.insertId + "' LIMIT 1";
                        conn.query(sqlStr,(err,results,fields)=>{
                            if (err){
                                res.json({err_code: 0, message: '请求数据失败'})
                            } else {
                                results = JSON.parse(JSON.stringify(results))[0];
                                req.session.userId = results.user_Id;
                                res.json({success_code:200,message:results});
                            }
                        })
                    }
                })
            }
        }
    })
});

//账号密码登录
router.post('/api/login_pwd',(req,res)=>{
    let userName = req.body.userNmae;
    let pwd = req.body.pwd;
    let captcha = req.body.captcha.toLowerCase();
    console.log(userName,pwd);
    //console.log("账号密码登录请求中的seeion:");
    //console.log(req.session);
    //console.log("服务器保存的验证码："+req.session.captcha);
    //console.log("浏览器发送过来的验证码："+captcha);
    if (captcha !== req.session.captcha) {
        res.json({err_code:1,message:'验证码错误'});
        return;
    }
    delete req.session.captcha;

    let sqlStr = "SELECT * FROM hotel_user WHERE user_phone = '" + userName + "' LIMIT 1";
    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '用户名不正确!'});
        } else {
            results = JSON.parse(JSON.stringify(results));
            //console.log(results);
            if (results[0]) {  // 用户已经存在
                // 验证密码是否正确
                //console.log(results[0].user_psd,pwd);
                if(results[0].user_psw !== pwd){
                    res.json({err_code: 0, message: '密码不正确!'});
                }else {
                    req.session.userId = results[0].user_Id;
                    //console.log(results[0],"00000000");
                    //console.log(req.session.userId,"1111111111");
                    // 返回数据给客户端
                    res.json({
                        success_code: 200,
                        message: {id: results[0].user_Id, user_name: results[0].user_name, user_phone: results[0].user_phone,user_position: results[0].user_position},
                        info: '登录成功!'
                    });
                }
            }else {
                res.json({err_code:2,message:'用户不存在请注册'})
            }
        }
    })});

router.get('/api/user_info',(req,res)=>{
    let userId = req.session.userId;
    //console.log(req.session,"3333333333");
    let sqlStr = "SELECT * FROM hotel_user WHERE user_Id = '" + userId + "' LIMIT 1";
    conn.query(sqlStr,(err,results,feilds)=>{
        if (err) {
            res.json({err_code: 0, message: '用户名不正确!'});
        } else {
            results = JSON.parse(JSON.stringify(results));
            //console.log(results);
            if (!results[0]){
                delete req.session.userId;
                res.json({error_code: 1, message: '请先登录'});
            }else {
                res.json({
                    success_code: 200,
                    message: {id: results[0].user_Id, user_name: results[0].user_name, user_phone: results[0].user_phone,user_sex: results[0].user_sex,user_address: results[0].user_address,user_birthday: results[0].user_birthday,user_position:results[0].user_position}
                });
            }
        }
    })
});

/**
 * 退出登录
 */
router.get('/api/logout', (req, res) => {
    // 1.清除session中的userid
    delete req.session.userId;
    // 2. 返回客户端
    res.json({
        success_code: 200,
        message: '退出登录成功'
    });
});

//修改个人信息
router.post('/api/change_user_msg',(req,res)=>{
    // 1. 获取数据
    const id = req.body.user_id;
    const user_name = req.body.user_name || '';
    const user_sex = req.body.user_sex || '';
    const user_address = req.body.user_address || '';
    const user_birthday = req.body.user_birthday || '';
    //console.log("000000000000");

    if (!id){
        res.json({err_code:0,message:'用户ID错误'})
    }

    let sqlStr = "UPDATE hotel_user SET user_name = ? , user_sex = ?, user_address = ?, user_birthday = ? WHERE user_Id = " + id;
    let strParams = [user_name, user_sex, user_address, user_birthday];
    console.log(id);
    conn.query(sqlStr,strParams,(err,results,fields)=>{
        if (err){
            res.json({err_code:0,message:'数据库修改失败',err})
        } else {
            results = JSON.parse(JSON.stringify(results));
            console.log(results);
            res.json({success_code:200,message:'修改个人信息成功！'})
        }
    })

});

router.post('/api/user_detail_change',(req,res)=>{
    // 1. 获取数据
    const id = req.body.user_id;
    const user_name = req.body.user_name || '';
    const user_sex = req.body.user_sex || '';
    const user_address = req.body.user_address || '';
    const user_birthday = req.body.user_birthday || '';
    const user_sign = req.body.user_sign || '';
    //console.log("000000000000");

    if (!id){
        res.json({err_code:0,message:'用户ID错误'})
    }

    let sqlStr = "UPDATE pdd_user_info SET user_name = ? , user_sex = ?, user_address = ?, user_birthday = ?, user_sign = ? WHERE user_Id = " + id;
    let strParams = [user_name, user_sex, user_address, user_birthday, user_sign];
    conn.query(sqlStr,strParams,(err,results,fields)=>{
        if (err){
            res.json({err_code:0,message:'数据库修改失败',err})
        } else {
            results = JSON.parse(JSON.stringify(results));
            console.log(results);
            res.json({success_code:200,message:'修改个人信息成功！'})
        }
    })

});

router.post('/api/add_shop_cart',(req,res)=>{


    // 1. 验证用户
    /*let user_id = req.body.user_id;
    if(!user_id || user_id !== req.session.userId){
      res.json({err_code:0, message:'非法用户'});
      return;
    }*/

    // 2. 获取客户端传过来的商品信息
    let goods_id = req.body.goods_id;
    let goods_name = req.body.goods_name;
    let thumb_url = req.body.thumb_url;
    let price = req.body.price;
    let buy_count = 1;
    let is_pay = 0; // 0 未购买 1购买

    // 3. 查询数据
    let sql_str = "SELECT * FROM pdd_shop_cart WHERE goods_id = '" + goods_id + "' LIMIT 1";
    conn.query(sql_str, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '服务器内部错误!',error});
        } else {
            results = JSON.parse(JSON.stringify(results));
            // console.log(results);
            if (results[0]) { // 3.1 商品已经存在
                console.log(results[0]);
                let buy_count = results[0].buy_count + 1;
                let sql_str = "UPDATE pdd_shop_cart SET buy_count = " + buy_count + " WHERE goods_id = '" + goods_id + "'";
                conn.query(sql_str, (error, results, fields) => {
                    if (error) {
                        res.json({err_code: 0, message: '加入购物车失败!'});
                    } else {
                        res.json({success_code: 200, message: '加入购物车成功!'});
                    }
                });
            } else { // 3.2 商品不存在
                let add_sql = "INSERT INTO pdd_shop_cart(goods_id, goods_name, thumb_url, price, buy_count, is_pay) VALUES (?, ?, ?, ?, ?, ?)";
                let sql_params = [goods_id, goods_name, thumb_url, price, buy_count, is_pay];
                conn.query(add_sql, sql_params, (error, results, fields) => {
                    if (error) {
                        res.json({err_code: 0, message: '加入购物车失败!'});
                    } else {
                        res.json({success_code: 200, message: '加入购物车成功!'});
                    }
                });
            }
        }
    });

});

router.get('/api/get_chart_goods',(req,res)=>{
    // 1.1 数据库查询的语句
    let sqlStr = "SELECT * FROM pdd_shop_cart";
    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '请求数据失败',error});
        } else {
            // 返回数据给客户端
            res.json({success_code: 200, message: results});
        }
    });
});

router.get('/api/get_staff_info',(req,res)=>{
    let sqlStr = "SELECT * FROM hotel_staff";

    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '请求数据失败',error});
        } else {
            // 返回数据给客户端
            res.json({success_code: 200, message: results});
        }
    });
});

router.post('/api/search_staff',(req,res)=>{
    // 1. 获取数据
    const name = req.body.searchName;
    console.log("searchName:"+name);

    //console.log("000000000000");

    if (!name){
        res.json({err_code:0,message:'员工姓名错误'});
        return
    }

    let sqlStr = "SELECT * FROM hotel_staff WHERE staff_name = '"+name+"'";

    conn.query(sqlStr,(err,results,fields)=>{
        if (err){
            res.json({err_code:0,message:'数据库查询失败',err})
        } else {
            results = JSON.parse(JSON.stringify(results));
            console.log(results);
            res.json({success_code:200,message:results});
        }
    })

});

router.post('/api/add_staff_info',(req,res)=>{
    // 1. 获取数据
    const name = req.body.staff_name;
    const sex = req.body.staff_sex || '';
    const department = req.body.staff_department || '';
    const position = req.body.staff_position || '';
    const salary = req.body.staff_salary || '';
    const age = req.body.staff_age || '';
    //console.log("000000000000");
    //console.log(name);

    let addSql = "INSERT INTO hotel_staff(staff_name,staff_sex, staff_department,staff_position,staff_salary,staff_work_age) VALUES (?, ?, ?, ?, ?, ?)";
    const addparmas = [name,sex,department,position,salary,age];
    console.log(addparmas);
    conn.query(addSql,addparmas,(err,results,fields)=>{
        if (err){
            res.json({err_code:0,message:'查询数据库失败'+err});
        }else {
            results = JSON.parse(JSON.stringify(results));
            console.log(results);
            res.json({success_code:200,message:results});
        }
    })

});

/*移除员工信息*/
router.post('/api/remove_staff',(req,res)=>{
    // 1. 获取数据
    const removeLis = req.body.removeArr || '';
    let delSql = "DELETE FROM hotel_staff WHERE staff_id in (?)";
    for (let i=0;i<removeLis.length;i++){
        conn.query(delSql,removeLis[i],(err,results,fields)=>{
            if (err){
                res.json({err_code:0,message:'查询数据库失败'+err});
            }
            if (i == removeLis.length-1){
                    results = JSON.parse(JSON.stringify(results));
                    console.log(results);
                    res.json({success_code:200,message:'删除员工信息成功！'})
                }

        })
    }

});

/*修改员工信息*/
router.post('/api/change_staff',(req,res)=>{
    // 1. 获取数据
    const id = req.body.changeInfo.staff_id;
    const name = req.body.changeInfo.staff_name || '';
    const sex = req.body.changeInfo.staff_sex || '';
    const department = req.body.changeInfo.staff_department || '';
    const position = req.body.changeInfo.staff_position || '';
    const salary = req.body.changeInfo.staff_salary || '';
    const age = req.body.changeInfo.staff_work_age || '';
    //console.log("000000000000");
    //console.log(id,name,department,age);

    if (!id){
        res.json({err_code:0,message:'用户ID错误'})
    }

    let sqlStr = "UPDATE hotel_staff SET staff_name = ? , staff_sex = ?, staff_department = ?, staff_position = ? ,staff_salary = ? , staff_work_age = ? WHERE staff_id = " + id;
    let strParams = [name, sex, department,
    position,salary,age];
    console.log(id);
    conn.query(sqlStr,strParams,(err,results,fields)=>{
        if (err){
            res.json({err_code:0,message:'数据库修改失败',err})
        } else {
            results = JSON.parse(JSON.stringify(results));
            console.log(results);
            res.json({success_code:200,message:'修改员工信息成功！'})
        }
    })

});

/*添加订单信息*/
router.post('/api/add_order',(req,res)=>{
    // 1. 获取数据
    const type = req.body.type;
    const start = req.body.start;
    const end = req.body.end ;
    const userId = req.body.userId;
    const price = req.body.price;
    const number = req.body.number;
    const total = req.body.total;
    const others = req.body.others;
    //console.log("000000000000");
    //console.log(name);

    let addSql = "INSERT INTO hotel_order(order_type,order_startdate,order_enddate,u_id,order_price,order_number,order_total,order_state,order_others) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const addparmas = [type,start,end,userId,price,number,total,"未处理", others];
    console.log(addparmas);
    conn.query(addSql,addparmas,(err,results,fields)=>{
        if (err){
            res.json({err_code:0,message:'查询数据库失败'+err});
        }else {
            results = JSON.parse(JSON.stringify(results));
            console.log(results);
            res.json({success_code:200,message:"订单预订成功"});
        }
    })

});

/*获取个人订单信息*/
router.get('/api/get_self_order',(req,res)=>{
    let userId = req.query.userId;
    console.log(userId);
    let sqlStr = "SELECT * FROM hotel_order WHERE u_id = '" + userId + "'";

    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '请求数据失败',error});
        } else {
            // 返回数据给客户端
            results = JSON.parse(JSON.stringify(results));
            res.json({success_code: 200, message: results});
        }
    });
});

/*管理员获取所有订单信息*/
router.get('/api/get_all_order',(req,res)=>{

    let sqlStr = "SELECT * FROM hotel_order";

    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '请求数据失败',error});
        } else {
            // 返回数据给客户端
            results = JSON.parse(JSON.stringify(results));
            res.json({success_code: 200, message: results});
        }
    });
});


router.get('/api/get_order_user',(req,res)=>{
    let userId = req.query.userId;
    //console.log(userId);
    //console.log(req.session,"3333333333");
    let sqlStr = "SELECT * FROM hotel_user WHERE user_Id = '" + userId + "' LIMIT 1";
    conn.query(sqlStr,(err,results,feilds)=>{
        if (err) {
            res.json({err_code: 0, message: '查询数据库失败!'});
        } else {
            results = JSON.parse(JSON.stringify(results));
                res.json({
                    success_code: 200,
                    message: {id: results[0].user_Id, user_name: results[0].user_name, user_phone: results[0].user_phone,user_sex: results[0].user_sex}
                });
            }
    })
});


/*修改房间状态*/
router.get('/api/updata_room',(req,res)=>{
    let state;
    let roomIdLis = req.query.roomStr.split(',');
    let orderId = req.query.orderId;
    console.log(roomIdLis);
    if (req.query.roomState !== "undefined"){
        state = req.query.roomState;
    } else {
        state = '已预订'
    }
    console.log(state);

    let queryStr = "SELECT * FROM hotel_room WHERE room_id in ("+roomIdLis+") AND room_state != '空闲'";

    conn.query(queryStr,(err,results,feilds)=>{
        if (err){
            res.json({err_code: 101, message: '查询数据库失败!'});
        } else {
            results = JSON.parse(JSON.stringify(results))[0];
            if (results) {
                res.json({err_code:102,message:'该房间不是空闲状态！请重新分配'})
            }else {
                let sqlStr = "UPDATE hotel_room SET room_state = '"+state+"' ,room_orderId = '"+orderId+"'WHERE room_id in ("+roomIdLis+")";

                conn.query(sqlStr,(err,results,feilds)=>{
                    if (err) {
                        res.json({err_code: 0, message: '查询数据库失败!'});
                    } else {
                        res.json({
                            success_code: 200,
                            message: "房间状态更新成功"
                        });
                    }
                })
            }
        }
    });

});

/*房间管理页面修改房间状态*/
router.get('/api/chang_room_state',(req,res)=>{
    let state = req.query.roomstate;
    let roomid = req.query.roomid;

    console.log(state);
    if (state == '空闲'){
        let sqlStr = "UPDATE hotel_room SET room_state = '"+state+"' ,room_orderId = ' ' WHERE room_id = '"+ roomid+"'";
        conn.query(sqlStr,(err,results,feilds)=>{
            if (err){
                res.json({err_code:102,message:'更新房间信息失败'+err})
            } else {
                res.json({
                    success_code: 200,
                    message: "房间状态更新成功"
                });
            }
        })
    } else {
        let sqlStr = "UPDATE hotel_room SET room_state = '"+state+"' WHERE room_id = '"+ roomid+"'";
        conn.query(sqlStr,(err,results,feilds)=>{
            if (err){
                res.json({err_code:102,message:'更新房间信息失败'+err})
            } else {
                res.json({
                    success_code: 200,
                    message: "房间状态更新成功"
                });
            }
        })
    }

});


/*查询可分配*/
router.get('/api/get_free_room',(req,res)=>{
    let type = req.query.type;
    console.log(type);
    let queryStr = "SELECT room_id FROM hotel_room WHERE room_type = '"+type+"' AND room_state = '空闲'";

    conn.query(queryStr,(err,results,feilds)=>{
        if (err){
            console.log(err);
            res.json({err_code: 101, message: '查询数据库失败!'});
        } else {
            res.json({success_code:200,message:results});

        }
    });

});

/*修改订单状态*/
router.get('/api/updata_order',(req,res)=>{
    let orderId = req.query.orderId;
    let state = req.query.orderState;
    let roomIdStr = req.query.roomIdStr;

    let sqlStr = "UPDATE hotel_order SET order_state = '"+state+"',order_roomId = '"+ roomIdStr+ "' WHERE order_id  = '"+orderId+"'";

    conn.query(sqlStr,(err,results,feilds)=>{
        if (err) {
            res.json({err_code: 0, message: '查询数据库失败!'});
        } else {
            res.json({
                success_code: 200,
                message: "订单状态更新成功"
            });
        }
    })
});

/*管理员获取所有客房信息*/
router.get('/api/get_all_room',(req,res)=>{

    let sqlStr = "SELECT * FROM hotel_room";

    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '请求数据失败',error});
        } else {
            // 返回数据给客户端
            results = JSON.parse(JSON.stringify(results));
            res.json({success_code: 200, message: results});
        }
    });
});

/*获取年销售额*/
router.get('/api/get_year_total',(req,res)=>{

    let sqlStr = "SELECT DATE_FORMAT(order_enddate,'%Y') days,sum(order_total) order_total from hotel_order WHERE order_state = '已付款' group by days ;";

    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '请求数据失败',error});
        } else {
            // 返回数据给客户端
            results = JSON.parse(JSON.stringify(results));
            res.json({success_code: 200, message: results});
        }
    });
});

/*获取月份销售额*/
router.get('/api/get_month_data',(req,res)=>{
    let year = req.query.year;
    let sqlStr = "SELECT DATE_FORMAT(order_enddate,'%Y-%m') days,sum(order_total) order_total from hotel_order WHERE order_state = '已付款' AND order_enddate LIKE '"+year+"%'  group by days  ;";

    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '请求数据失败',error});
        } else {
            // 返回数据给客户端
            results = JSON.parse(JSON.stringify(results));
            res.json({success_code: 200, message: results});
        }
    });
});

/*按日获取销售额*/
router.get('/api/get_days_data',(req,res)=>{
    let month = req.query.month;
    let sqlStr = "SELECT DATE_FORMAT(order_enddate,'%Y-%m-%d') days,sum(order_total) order_total from hotel_order WHERE order_state = '已付款' AND order_enddate LIKE '"+month+"%'  group by days  ;";

    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '请求数据失败',error});
        } else {
            // 返回数据给客户端
            results = JSON.parse(JSON.stringify(results));
            res.json({success_code: 200, message: results});
        }
    });
});

module.exports = router;
