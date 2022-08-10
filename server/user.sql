/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50738
 Source Host           : localhost:3306
 Source Schema         : user

 Target Server Type    : MySQL
 Target Server Version : 50738
 File Encoding         : 65001

 Date: 10/08/2022 10:01:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `originalname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES (1, 'profile-fb-kid-02.png', '944cc31907adde46737737c10f29106f.png', '2022-08-10 10:00:27', 4);
INSERT INTO `file` VALUES (2, 'profile-fb-kid-03.png', 'f680eb8c754391b887fe91181e6962d5.png', '2022-08-10 10:00:27', 4);
INSERT INTO `file` VALUES (3, 'profile-fb-kid-04.png', '7e9b832c66ec15817271145821c91b79.png', '2022-08-10 10:00:27', 4);
INSERT INTO `file` VALUES (4, '全部信息 (1).xlsx', 'b70c4b1b5e2c5be4d21036a3f7c900be.xlsx', '2022-08-10 10:00:42', 4);
INSERT INTO `file` VALUES (5, '20220705-093120.jpg', '92cdf867d5bc1524d110b21316179922.jpg', '2022-08-10 10:00:42', 4);

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `taskname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tasklevel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES (2, '优化接口的防抖与节流', '1');
INSERT INTO `task` VALUES (3, '升级react-router v6', '1');
INSERT INTO `task` VALUES (4, '配置vite开发环境和生产环境', '2');
INSERT INTO `task` VALUES (5, '实现响应式布局，兼容移动设备', '2');
INSERT INTO `task` VALUES (6, '动态主题颜色，动态换', '2');
INSERT INTO `task` VALUES (7, '使用TS重写', '3');
INSERT INTO `task` VALUES (8, '配置自动化更新部署，CI/CD', '3');

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
  `time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `role` tinyint(1) NOT NULL DEFAULT 1,
  `last_login_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `last_login_ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 54 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'CC', 'e10adc3949ba59abbe56e057f20f883e', 0, '15657122361', 'hcc960923@gmail.com', '2022-08-04 16:51:35', '489608837435e386d53d419a913340a7.png', 'LKLKLKLKLKLKLKLKLKLKLKLKLKLK', 2, '2022-08-04 16:51:35', '127.0.0.1');
INSERT INTO `user` VALUES (2, '曹青青', 'e10adc3949ba59abbe56e057f20f883e', 1, '15157122361', 'hcc96923@gmail.com', '2022-08-04 16:12:05', '9771b1e3eadfad366ec5daefcd37b3f9.png', '', 2, '2022-08-04 16:12:05', '127.0.0.1');
INSERT INTO `user` VALUES (3, '张家辉', 'e10adc3949ba59abbe56e057f20f883e', 1, '15825759654', 'zjh987@qq.com', '2022-08-10 09:52:08', 'bebeec2dd941b1258d286c6408e2e1bd.png', '', 1, '2022-08-10 09:52:08', '');
INSERT INTO `user` VALUES (4, '曹操', 'e10adc3949ba59abbe56e057f20f883e', 0, '15657122369', 'hcc96923@163.com', '2022-08-09 16:50:23', '93f913b7884c82712c54ff1a98b07efe.png', '', 3, '2022-08-09 16:50:23', '127.0.0.1');
INSERT INTO `user` VALUES (5, '刘备', 'e10adc3949ba59abbe56e057f20f883e', 0, '18147275149', '734499162@qq.com', '2022-08-04 15:10:40', 'c7a95b58b97f341d9584fe004a07c1b8.png', '', 1, '2022-08-04 15:10:40', '');
INSERT INTO `user` VALUES (6, '孙权', 'e10adc3949ba59abbe56e057f20f883e', 0, '18147275149', 'hcc96923@gmail.com', '2022-08-04 15:10:47', 'ecb8a0162adad52b748b5de62567a8a7.png', '', 2, '2022-08-04 15:10:47', '');
INSERT INTO `user` VALUES (7, '诸葛亮', 'e10adc3949ba59abbe56e057f20f883e', 0, '15157122361', 'hcc96923@163.com', '2022-08-04 15:10:53', '5bff662e84cbb344c4f2ac0e5ccd7165.png', '', 1, '2022-08-04 15:10:53', '');
INSERT INTO `user` VALUES (8, '貂蝉', 'e10adc3949ba59abbe56e057f20f883e', 1, '15657122362', '734499162@qq.com', '2022-08-04 15:11:00', 'e1d0a06db9d0af08bad24578610d331a.png', '', 1, '2022-08-04 15:11:00', '');
INSERT INTO `user` VALUES (49, '张家辉', '123456', 0, '15825759654', 'zjh9811171@qq.com', '2022-08-04 15:24:31', '94022e68963d925e715e2b9a0fa0eccd.png', '', 1, '2022-08-04 15:24:31', '');
INSERT INTO `user` VALUES (50, '张家辉', '123456', 0, '15825759654', 'hcc096923@163.com', '2022-08-04 15:24:35', '8b018f203e07a9eb37f7a179b919e7d0.png', '', 1, '2022-08-04 15:24:35', '');
INSERT INTO `user` VALUES (51, '小乔s', '123456', 0, '15157122361', 'hcc96923@gmail.com', '2022-08-04 15:49:29', 'e308b36ca5d021df45bd2f80bfc20201.png', '', 1, '2022-08-04 15:49:29', '');
INSERT INTO `user` VALUES (52, 'CCCf', '123456', 0, '15157122361', 'zjh981117@qq.com', '2022-08-04 15:16:49', '7ad4f474de0a9470f3b929992b24506f.png', '', 1, '2022-08-04 15:16:49', '');
INSERT INTO `user` VALUES (53, 'xxxxx', '123456', 1, '15657122361', 'hcc960923@gmail.com', '2022-08-04 15:20:09', '5463611981d4800d7c70ec12b651de3d.png', '', 1, '2022-08-04 15:20:09', '');

SET FOREIGN_KEY_CHECKS = 1;
