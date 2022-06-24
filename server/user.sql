/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 50730
 Source Host           : localhost:3306
 Source Schema         : user

 Target Server Type    : MySQL
 Target Server Version : 50730
 File Encoding         : 65001

 Date: 16/06/2021 10:57:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `gender` tinyint(1) NOT NULL DEFAULT 1,
  `age` int(11) NOT NULL DEFAULT 0,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `authority` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1代表疫情管理员，2代表系统管理员',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `last_login_time` datetime(0) NOT NULL,
  `last_login_ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, '张家辉', 0, 23, '3a50d8c3581204a54e2a47bccd9e61bb.jpeg', 2, '15467894321', 'hcc987@qq.com', 'e10adc3949ba59abbe56e057f20f883e', '2021-03-16 16:10:44', '');
INSERT INTO `admin` VALUES (2, '古天乐', 0, 31, '3a50d8c3581204a54e2a47bccd9e61bb.jpeg', 1, '15467894378', 'hcc96923@163.com', 'e10adc3949ba59abbe56e057f20f883e', '2021-03-17 10:55:17', '127.0.0.1');
INSERT INTO `admin` VALUES (3, '刘青云', 0, 33, 'ecfd51b208298f730f5df3bff8a120b1.png', 2, '15467894324', 'hcc96923@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '2021-03-17 11:30:07', '127.0.0.1');

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `originalname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of file
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '123456',
  `gender` tinyint(1) NOT NULL,
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `role` tinyint(1) NOT NULL DEFAULT 1,
  `last_login_time` datetime(0) NOT NULL,
  `last_login_ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '韩畅畅', 'e10adc3949ba59abbe56e057f20f883e', 0, '15657122362', 'hcc96923@gmail.com', '2021-06-16 10:46:58', 'cc252cb38976f6d8215423508f83b747.jpg', '韩畅畅上传头像', 3, '2021-06-16 10:46:58', '127.0.0.1');
INSERT INTO `user` VALUES (2, '曹青青', 'e10adc3949ba59abbe56e057f20f883e', 1, '15157122361', 'hcc96923@gmail.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1, '0000-00-00 00:00:00', '');
INSERT INTO `user` VALUES (3, '韩文龙', 'e10adc3949ba59abbe56e057f20f883e', 0, '15157122365', '734499162@qq.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1, '0000-00-00 00:00:00', '');
INSERT INTO `user` VALUES (4, '曹操', 'e10adc3949ba59abbe56e057f20f883e', 0, '15657122369', 'hcc96923@163.com', '2020-10-26 19:01:33', 'eae700998f461c56c59234648b2dd65e.png', '', 1, '0000-00-00 00:00:00', '');
INSERT INTO `user` VALUES (5, '刘备', 'e10adc3949ba59abbe56e057f20f883e', 0, '18147275149', '734499162@qq.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1, '0000-00-00 00:00:00', '');
INSERT INTO `user` VALUES (6, '孙权', 'e10adc3949ba59abbe56e057f20f883e', 0, '18147275149', 'hcc96923@gmail.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1, '0000-00-00 00:00:00', '');
INSERT INTO `user` VALUES (7, '诸葛亮', 'e10adc3949ba59abbe56e057f20f883e', 0, '15157122361', 'hcc96923@163.com', '2020-10-26 19:01:30', 'eae700998f461c56c59234648b2dd65e.png', '', 1, '0000-00-00 00:00:00', '');
INSERT INTO `user` VALUES (8, '貂蝉', 'e10adc3949ba59abbe56e057f20f883e', 1, '15657122362', '734499162@qq.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1, '0000-00-00 00:00:00', '');
INSERT INTO `user` VALUES (9, '大乔', 'e10adc3949ba59abbe56e057f20f883e', 1, '15657122362', 'hcc96923@gmail.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1, '0000-00-00 00:00:00', '');
INSERT INTO `user` VALUES (10, '小乔', 'e10adc3949ba59abbe56e057f20f883e', 1, '15657122369', 'hcc96923@163.com', '2020-10-26 19:01:29', 'eae700998f461c56c59234648b2dd65e.png', '', 1, '0000-00-00 00:00:00', '');
INSERT INTO `user` VALUES (11, '张飞', 'e10adc3949ba59abbe56e057f20f883e', 1, '15657122362', 'hcc96923@gmail.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1, '0000-00-00 00:00:00', '');
INSERT INTO `user` VALUES (12, '赵云', 'e10adc3949ba59abbe56e057f20f883e', 1, '18147275149', 'hcc96923@gmail.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1, '0000-00-00 00:00:00', '');
INSERT INTO `user` VALUES (13, '关羽', 'e10adc3949ba59abbe56e057f20f883e', 1, '15157122365', 'hcc96923@gmail.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1, '0000-00-00 00:00:00', '');
INSERT INTO `user` VALUES (14, '蔡夫人', 'e10adc3949ba59abbe56e057f20f883e', 0, '15657122362', 'hcc96923@gmail.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1, '0000-00-00 00:00:00', '');
INSERT INTO `user` VALUES (16, '静姝', 'e10adc3949ba59abbe56e057f20f883e', 0, '15157122361', 'hcc96923@gmail.com', '2020-10-26 19:00:22', 'eae700998f461c56c59234648b2dd65e.png', '', 1, '0000-00-00 00:00:00', '');
INSERT INTO `user` VALUES (19, '古天乐', 'e10adc3949ba59abbe56e057f20f883e', 0, '15157122365', 'hcc96923@163.com', '2020-10-26 19:01:42', 'eae700998f461c56c59234648b2dd65e.png', '', 1, '0000-00-00 00:00:00', '');
INSERT INTO `user` VALUES (20, '刘青云', 'e10adc3949ba59abbe56e057f20f883e', 0, '18147275149', 'hcc96923@163.com', '2020-10-26 19:01:35', 'eae700998f461c56c59234648b2dd65e.png', '', 1, '0000-00-00 00:00:00', '');
INSERT INTO `user` VALUES (37, '张家辉', 'e10adc3949ba59abbe56e057f20f883e', 0, '15657122369', 'hcc96923@163.com', '2020-10-26 19:01:36', 'eae700998f461c56c59234648b2dd65e.png', '', 1, '0000-00-00 00:00:00', '');
INSERT INTO `user` VALUES (38, '三上悠亚', 'e10adc3949ba59abbe56e057f20f883e', 1, '15157122365', 'hcc96923@163.com', '2020-10-26 19:01:37', 'eae700998f461c56c59234648b2dd65e.png', '', 1, '0000-00-00 00:00:00', '');
INSERT INTO `user` VALUES (39, '王祖贤', 'e10adc3949ba59abbe56e057f20f883e', 0, '15157122365', 'hcc96923@163.com', '2020-10-26 19:01:47', 'eae700998f461c56c59234648b2dd65e.png', '', 1, '0000-00-00 00:00:00', '');
INSERT INTO `user` VALUES (40, '桥本有菜', 'e10adc3949ba59abbe56e057f20f883e', 1, '18147275149', 'hcc96923@163.com', '2020-10-26 19:01:40', 'eae700998f461c56c59234648b2dd65e.png', '', 3, '0000-00-00 00:00:00', '');

SET FOREIGN_KEY_CHECKS = 1;
