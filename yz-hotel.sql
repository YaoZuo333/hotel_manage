/*
Navicat MySQL Data Transfer

Source Server         : yz
Source Server Version : 50718
Source Host           : localhost:3306
Source Database       : yz-hotel

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2019-04-30 09:25:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for hotel_order
-- ----------------------------
DROP TABLE IF EXISTS `hotel_order`;
CREATE TABLE `hotel_order` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_enddate` date DEFAULT NULL,
  `order_startdate` date DEFAULT NULL,
  `order_state` varchar(255) DEFAULT NULL,
  `u_id` bigint(20) DEFAULT NULL,
  `order_type` varchar(255) DEFAULT NULL,
  `order_price` int(11) DEFAULT NULL,
  `order_number` int(11) DEFAULT NULL,
  `order_total` int(11) DEFAULT NULL,
  `order_others` varchar(255) DEFAULT NULL,
  `order_roomId` varchar(255) DEFAULT NULL,
  `order_peoples` int(5) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `order_user` (`u_id`),
  CONSTRAINT `order_user` FOREIGN KEY (`u_id`) REFERENCES `hotel_user` (`user_Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10020 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hotel_order
-- ----------------------------
INSERT INTO `hotel_order` VALUES ('1', '2019-01-02', '2019-01-01', '已付款', '2', '豪华大床房', '298', '1', '596', null, null, null);
INSERT INTO `hotel_order` VALUES ('2', '2019-04-15', '2019-04-14', '已处理', '13511111111', '普通大床房', '168', '2', '336', '我是周杰伦', '202', null);
INSERT INTO `hotel_order` VALUES ('3', '2019-01-01', '2019-01-02', '已付款', '2', '豪华大床房', '298', '1', '596', null, null, null);
INSERT INTO `hotel_order` VALUES ('4', '2019-01-01', '2019-01-02', '已付款', '2', '豪华大床房', '298', '1', '596', null, null, null);
INSERT INTO `hotel_order` VALUES ('5', '2019-04-15', '2019-04-14', '已处理', '13511111111', '普通大床房', '168', '2', '336', '我是周杰伦', null, null);
INSERT INTO `hotel_order` VALUES ('6', '2019-04-15', '2019-04-14', '已处理', '13511111111', '普通大床房', '168', '2', '336', '我是周杰伦', null, null);
INSERT INTO `hotel_order` VALUES ('7', '2019-04-16', '2019-04-17', '已处理', '2', '豪华大床房', '298', '1', '596', null, '201', null);
INSERT INTO `hotel_order` VALUES ('8', '2019-04-16', '2019-04-17', '已处理', '2', '豪华大床房', '298', '1', '596', null, '208', null);
INSERT INTO `hotel_order` VALUES ('9', '2019-04-16', '2019-04-17', '已处理', '2', '豪华大床房', '298', '1', '596', null, '203', null);
INSERT INTO `hotel_order` VALUES ('11', '2019-01-01', '2019-01-02', '已付款', '2', '豪华大床房', '298', '1', '596', null, null, null);
INSERT INTO `hotel_order` VALUES ('12', '2019-04-15', '2019-04-14', '已处理', '13511111111', '普通大床房', '168', '2', '336', '我是周杰伦', null, '2');
INSERT INTO `hotel_order` VALUES ('13', '2019-01-01', '2019-01-02', '已付款', '2', '豪华大床房', '298', '1', '596', null, null, '2');
INSERT INTO `hotel_order` VALUES ('14', '2019-01-01', '2019-01-02', '已付款', '2', '豪华大床房', '298', '1', '596', null, null, '1');
INSERT INTO `hotel_order` VALUES ('15', '2019-04-15', '2019-04-14', '已处理', '13511111111', '普通大床房', '168', '2', '336', '我是周杰伦', null, '6');
INSERT INTO `hotel_order` VALUES ('16', '2019-04-15', '2019-04-14', '已入住', '13511111111', '普通大床房', '168', '2', '336', '我是周杰伦', null, '4');
INSERT INTO `hotel_order` VALUES ('17', '2019-04-16', '2019-04-17', '已处理', '2', '豪华大床房', '298', '1', '596', null, '201', '4');
INSERT INTO `hotel_order` VALUES ('18', '2019-04-16', '2019-04-17', '已入住', '2', '豪华大床房', '298', '1', '596', null, null, '1');
INSERT INTO `hotel_order` VALUES ('19', '2019-04-16', '2019-04-17', '已入住', '2', '豪华大床房', '298', '1', '596', null, null, '3');
INSERT INTO `hotel_order` VALUES ('28', '2019-04-16', '2019-04-17', '已入住', '2', '豪华大床房', '298', '1', '596', null, null, '3');
INSERT INTO `hotel_order` VALUES ('29', '2019-04-16', '2019-04-17', '已入住', '2', '豪华大床房', '298', '1', '596', null, null, '1');
INSERT INTO `hotel_order` VALUES ('38', '2019-04-16', '2019-04-17', '已入住', '2', '豪华大床房', '298', '1', '596', null, null, '2');
INSERT INTO `hotel_order` VALUES ('48', '2019-04-16', '2019-04-17', '已入住', '2', '豪华大床房', '298', '1', '596', null, null, '3');
INSERT INTO `hotel_order` VALUES ('49', '2019-04-16', '2019-04-17', '已入住', '2', '豪华大床房', '298', '1', '596', null, null, '1');
INSERT INTO `hotel_order` VALUES ('58', '2019-04-16', '2019-04-17', '未处理', '2', '豪华大床房', '298', '1', '596', null, null, '3');
INSERT INTO `hotel_order` VALUES ('59', '2015-04-16', '2019-04-17', '未处理', '2', '豪华大床房', '298', '1', '596', null, null, '2');
INSERT INTO `hotel_order` VALUES ('68', '2019-04-16', '2019-04-17', '未处理', '2', '豪华大床房', '298', '1', '596', null, null, '3');
INSERT INTO `hotel_order` VALUES ('101', '2019-01-01', '2019-01-02', '已付款', '2', '豪华大床房', '298', '1', '506', null, null, '1');
INSERT INTO `hotel_order` VALUES ('102', '2019-01-01', '2019-01-03', '已付款', '2', '豪华大床房', '298', '1', '100', null, null, '1');
INSERT INTO `hotel_order` VALUES ('103', '2019-01-02', '2019-01-03', '已付款', '2', '豪华大床房', '298', '1', '333', null, null, '2');
INSERT INTO `hotel_order` VALUES ('104', '2019-01-05', '2019-01-06', '已付款', '2', '豪华大床房', '298', '1', '233', null, null, '3');
INSERT INTO `hotel_order` VALUES ('105', '2019-01-07', '2019-01-08', '已付款', '2', '豪华大床房', '298', '1', '596', null, null, '1');
INSERT INTO `hotel_order` VALUES ('106', '2019-01-10', '2019-01-11', '已付款', '2', '豪华大床房', '298', '1', '596', null, null, '2');
INSERT INTO `hotel_order` VALUES ('111', '2019-02-01', '2019-02-02', '已付款', '2', '豪华大床房', '298', '1', '596', null, null, '5');
INSERT INTO `hotel_order` VALUES ('112', '2019-02-02', '2019-02-03', '已付款', '2', '豪华大床房', '298', '1', '596', null, null, '4');
INSERT INTO `hotel_order` VALUES ('113', '2019-02-02', '2019-02-03', '已付款', '2', '豪华大床房', '298', '1', '596', null, null, '3');
INSERT INTO `hotel_order` VALUES ('114', '2019-02-05', '2019-02-10', '已付款', '2', '豪华大床房', '298', '1', '596', null, null, '2');
INSERT INTO `hotel_order` VALUES ('115', '2019-02-07', '2019-02-08', '已付款', '2', '豪华大床房', '298', '1', '596', null, null, '1');
INSERT INTO `hotel_order` VALUES ('116', '2019-02-10', '2019-02-18', '已付款', '2', '豪华大床房', '298', '1', '596', null, null, '2');
INSERT INTO `hotel_order` VALUES ('117', '2019-02-22', '2019-02-24', '已付款', '2', '豪华大床房', '298', '1', '865', null, null, '2');
INSERT INTO `hotel_order` VALUES ('118', '2019-02-23', '2019-02-25', '已付款', '2', '豪华大床房', '298', '1', '777', null, null, '3');
INSERT INTO `hotel_order` VALUES ('119', '2019-02-26', '2019-02-27', '已付款', '2', '豪华大床房', '298', '1', '777', null, null, '3');
INSERT INTO `hotel_order` VALUES ('120', '2019-03-03', '2019-03-04', '已付款', '2', '豪华大床房', '298', '1', '666', null, null, '1');
INSERT INTO `hotel_order` VALUES ('10015', '2015-01-01', '2015-01-01', '已付款', null, '', null, null, '64233', null, null, '3');
INSERT INTO `hotel_order` VALUES ('10016', '2016-01-01', '2016-01-01', '已付款', null, null, null, null, '68777', null, null, '2');
INSERT INTO `hotel_order` VALUES ('10017', '2017-01-01', '2017-01-01', '已付款', null, null, null, null, '78654', null, null, '3');
INSERT INTO `hotel_order` VALUES ('10018', '2018-01-01', '2018-01-01', '已付款', null, null, null, null, '84931', null, null, '1');
INSERT INTO `hotel_order` VALUES ('10019', '2019-05-03', '2019-04-30', '未处理', '1', '标准大床房', '198', '1', '594', '', null, '3');

-- ----------------------------
-- Table structure for hotel_room
-- ----------------------------
DROP TABLE IF EXISTS `hotel_room`;
CREATE TABLE `hotel_room` (
  `room_id` int(11) NOT NULL,
  `room_type` varchar(255) DEFAULT NULL,
  `room_price` int(10) DEFAULT NULL,
  `room_state` varchar(255) DEFAULT NULL,
  `room_orderId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hotel_room
-- ----------------------------
INSERT INTO `hotel_room` VALUES ('201', '普通大床房', '168', '空闲', ' ');
INSERT INTO `hotel_room` VALUES ('202', '普通大床房', '168', '已预订', '202');
INSERT INTO `hotel_room` VALUES ('203', '普通大床房', '168', '已预订', '9');
INSERT INTO `hotel_room` VALUES ('205', '标准大床房', '198', '空闲', null);
INSERT INTO `hotel_room` VALUES ('206', '标准大床房', '198', '空闲', null);
INSERT INTO `hotel_room` VALUES ('207', '标准大床房', '198', '空闲', null);
INSERT INTO `hotel_room` VALUES ('208', '豪华大床房', '298', '已预订', '208');
INSERT INTO `hotel_room` VALUES ('209', '豪华大床房', '298', '空闲', null);
INSERT INTO `hotel_room` VALUES ('210', '豪华大床房', '298', '空闲', null);
INSERT INTO `hotel_room` VALUES ('301', '标准双床房', '268', '已预订', '301,302');
INSERT INTO `hotel_room` VALUES ('302', '标准双床房', '268', '已预订', '301,302');
INSERT INTO `hotel_room` VALUES ('303', '标准双床房', '268', '已预订', '303,305');
INSERT INTO `hotel_room` VALUES ('305', '豪华双床房', '368', '已预订', '303,305');
INSERT INTO `hotel_room` VALUES ('306', '豪华双床房', '368', '空闲', null);
INSERT INTO `hotel_room` VALUES ('307', '豪华双床房', '368', '空闲', null);
INSERT INTO `hotel_room` VALUES ('308', '行政套房', '688', '空闲', null);
INSERT INTO `hotel_room` VALUES ('309', '豪华套房', '888', '空闲', null);
INSERT INTO `hotel_room` VALUES ('310', '总统套房', '1688', '空闲', null);

-- ----------------------------
-- Table structure for hotel_staff
-- ----------------------------
DROP TABLE IF EXISTS `hotel_staff`;
CREATE TABLE `hotel_staff` (
  `staff_id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_name` varchar(255) DEFAULT NULL,
  `staff_sex` varchar(255) DEFAULT NULL,
  `staff_department` varchar(255) DEFAULT NULL,
  `staff_position` varchar(255) DEFAULT NULL,
  `staff_salary` char(10) DEFAULT NULL,
  `staff_work_age` char(255) DEFAULT NULL,
  PRIMARY KEY (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hotel_staff
-- ----------------------------
INSERT INTO `hotel_staff` VALUES ('2', '张三', '男', '行政部', '部门总监', '50000', '5');
INSERT INTO `hotel_staff` VALUES ('3', '李四', '女', '行政部', '部门经理', '30000', '3');
INSERT INTO `hotel_staff` VALUES ('4', '王五', '男', '客房部', '部门总监', '40000', '4');
INSERT INTO `hotel_staff` VALUES ('12', '张三', '男', '行政部', '部门总监', '50000', '5');
INSERT INTO `hotel_staff` VALUES ('13', '张三', '男', '行政部', '部门总监', '50000', '5');
INSERT INTO `hotel_staff` VALUES ('17', '张三', '男', '行政部', '部门总监', '50000', '5');
INSERT INTO `hotel_staff` VALUES ('18', '张三', '男', '行政部', '部门总监', '50000', '5');
INSERT INTO `hotel_staff` VALUES ('19', '张三', '男', '行政部', '部门总监', '50000', '5');
INSERT INTO `hotel_staff` VALUES ('20', '张三', '男', '行政部', '部门总监', '50000', '5');
INSERT INTO `hotel_staff` VALUES ('21', '张三', '男', '行政部', '部门总监', '50000', '5');

-- ----------------------------
-- Table structure for hotel_user
-- ----------------------------
DROP TABLE IF EXISTS `hotel_user`;
CREATE TABLE `hotel_user` (
  `user_Id` bigint(20) NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_psw` varchar(255) NOT NULL,
  `user_position` varchar(255) DEFAULT NULL,
  `user_phone` varchar(255) NOT NULL,
  `user_age` int(11) DEFAULT NULL,
  `user_sex` varchar(255) DEFAULT NULL,
  `user_address` varchar(255) DEFAULT NULL,
  `user_birthday` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hotel_user
-- ----------------------------
INSERT INTO `hotel_user` VALUES ('1', 'YZ', '123456', '管理员', '13982641004', '20', '男', '广安', '');
INSERT INTO `hotel_user` VALUES ('2', 'jay', '123456', '会员', '18888888888', null, '男', '成都', '');
INSERT INTO `hotel_user` VALUES ('13511111111', '周杰伦', '123456', '会员', '13511111111', '20', '男', '上海', '');
