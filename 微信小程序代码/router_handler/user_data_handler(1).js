// 单个摄像头的信息
// 将路由处理函数放到这�?  这部分的代码是实现从数据库调取图片路径以及图片的信息
var moment = require('moment');

const sqldb = require('../db/index')
db_1 = sqldb.db_1
// 查找时间
//const sql = 'select garbage.time from  garbage where camera_id=?'
const sql = 'SELECT  time FROM garbage WHERE time =(select MAX(time) from garbage where  camera_id = ?) limit 1'
// 根据查找到的最大的时间去找到对应的image
const sql_Str = "select * from garbage where image in ( select image from garbage where time = ?)"
// 查找最近七天的所有数�?
const sql_Strall = 'select * from garbage e  where e.camera_id=? and DATE_SUB(CURDATE(), INTERVAL 6 DAY) <= date(time)'
// 统计用户选择的地点的所有摄像头的垃圾信�?
// 获得的三个值分别为ID,部署位置,种类
const sqlStr = 'select camera_info.camera_id,category,camera_position  from garbage  join camera_info on garbage.camera_id=camera_info.camera_id where camera_info.camera_series_positions=? and DATE_SUB(CURDATE(), INTERVAL 6 DAY) <= date(time)'
// 这个用来保存最大的时间
var data_time = 0
// x用来记录是最大的那个时间的数组序�?
var x = 0
var garbage = [] // 存储垃圾信息
var zhongzhuang = []  //
var large_type_1 = []
var large_type_all = []
// 用来进行数组去重的函数并对每一个类别进行数量的统计
function f(arr) {
    var ary = {}
    arr.forEach(function (v, k) {
        if (ary[v]) {
            ary[v]++;
        } else {
            ary[v] = 1;
        }
    })
    return ary;
}
exports.path_handler = (req, res) => {
    // console.log(req.query);
    // console.log(typeof (req.query));
    actions = req.query //get 方法传递的参数
    action_s = req.body //post 方法传递的参数
    // console.log(actions.params);
     console.log(actions);
    console.log(action_s);
    if (actions.action == 'get') {
        db_1.query(sql, [actions.params], (err, result) => {
            if (err) {
                console.log('查询失败' + err.message);
            }
            if (result.length == 0) console.log('暂无数据');
            console.log(result.length);
            var result = JSON.parse(JSON.stringify(result))
            console.log(result)
            //for (var i = 0; i < result.length; i++) {
                // 获取时间
                var time = moment(result[0].time).format('YYYY-MM-DD HH:mm:ss')

                // 将获取的时间转换为时间戳
                var date = new Date(time).getTime()

                //if (date > data_time) {
                    data_time = date
                  // x = i
               // }
           // }
            db_1.query(sql_Str, [result[0].time], (err, result_1) => {
                // console.log(result_1);

                if (err) {
                    console.log('查询失败' + err.message);
                }
                var result_1 = JSON.parse(JSON.stringify(result_1)) //将从数据库获取过来的数据进行特殊处理,使其转换为正常的JSON对象
                for (var key in result_1) {   // 将对象写入数�?
                    // console.log(key); 0,1,2,3
                    zhongzhuang.push(result_1[key]);
                }
                console.log('传输成功');
                garbage = zhongzhuang
               // console.log(garbage[0].time);
                zhongzhuang = []
                console.log(result_1);
                console.log(garbage);
               // var garbage = JSON.parse(JSON.stringify(garbage))
               // console.log(garbage);
                return res.send(garbage)
            })
        }

        )
    }
    if (action_s.action == 'posts') {
        var data = []
        db_1.query(sqlStr, [action_s.data_position], (err, result_2) => {
            if (err) {
                console.log('查询失败' + err.message);
            }
            var result_2 = JSON.parse(JSON.stringify(result_2)) //将从数据库获取过来的数据进行特殊处理,使其转换为正常的JSON对象
            // console.log(result_2);

            console.log('传输成功');
            // 向数据库添加新的属�?
            for (var i = 0; i < result_2.length; i++) {
                result_2[i].num = 1
            }
            // console.log(result_2);
            // 将所有的信息进行统计，并放到
            for (var i = 0; i < result_2.length; i++) {
                for (var j = i + 1; j < result_2.length; j++) {
                    if (result_2[i].category == result_2[j].category&&result_2[i].camera_id==result_2[j].camera_id) {
                        result_2[i].num++
                        // console.log(result_2);
                        console.log('这是进入的第' + i + '�?');
                        result_2.splice(j, 1)
                        j--
                    }
                }
            }
            console.log(result_2);
            return res.send(result_2)
        })
    }
    if (action_s.action == 'post') {
        db_1.query(sql_Strall, [action_s.params], (err, result_2) => {
            console.log(result_2);
            var data_result_2 = {}
            if (err) {
                console.log('查询失败' + err.message);
            }

            for (var i = 0; i < result_2.length; i++) {
                //    这个地方用来保存所有的垃圾数据
                large_type_1[i] = result_2[i].category
                console.log(large_type_1[i]);
            }

            large_type_all = f(large_type_1)
            console.log(large_type_all);

            data_result_1 = large_type_all
            // Object.keys(data_result_1);
            // Object.values(data_result_1);
            console.log('传输成功');
            data_result_2 = {
                data_keys: Object.keys(data_result_1),
                data_values: Object.values(data_result_1)
            }
            data_result_1 = {}
            large_type_1 = []
            large_type_all = []
            return res.send(data_result_2)
        })
    }
}