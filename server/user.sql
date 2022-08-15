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

 Date: 15/08/2022 17:25:50
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
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES (12, 'profile-fb-adult-01.png', '67d162d71165ddae6f869f73434e43b3.png', '2022-08-12 09:13:13', 4);
INSERT INTO `file` VALUES (13, 'profile-fb-adult-02.png', 'd6dbc0f346650a02ce984bb9b47794e9.png', '2022-08-12 09:13:13', 4);
INSERT INTO `file` VALUES (14, 'profile-fb-adult-03.png', '566bbf607f7ec1489ff00c0215e6c4b5.png', '2022-08-12 09:13:13', 4);
INSERT INTO `file` VALUES (15, 'profile-fb-kid-04.png', '31ba5bd5352d1ed1962b5656c455aa9a.png', '2022-08-12 09:13:13', 4);
INSERT INTO `file` VALUES (16, 'profile-fb-kid-02.png', '2d370646e8b2d4113db4fb06783463c2.png', '2022-08-12 09:13:13', 4);
INSERT INTO `file` VALUES (17, 'profile-fb-adult-04.png', '1f90bffab27731b805dd1346353deaaa.png', '2022-08-12 09:13:13', 4);
INSERT INTO `file` VALUES (18, 'profile-fb-adult-05.png', '728aa4ed5516f36077da36ea7233bd09.png', '2022-08-12 09:13:13', 4);
INSERT INTO `file` VALUES (19, 'profile-fb-kid-03.png', 'a5b6ecf5be85ceadd6384242018b7559.png', '2022-08-12 09:13:13', 4);
INSERT INTO `file` VALUES (20, '20220705-093120.jpg', 'da90921ed172af384492a06b8fa4fb8c.jpg', '2022-08-15 16:52:06', 5);
INSERT INTO `file` VALUES (21, 'index.html', 'a7a39491ab7cb49d3f40bd3e4078670b.html', '2022-08-15 16:52:06', 5);
INSERT INTO `file` VALUES (22, '全部信息 (1).xlsx', '58958f060664d9dd08d4c7f7e09ae2cd.xlsx', '2022-08-15 16:52:06', 5);

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `taskname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tasklevel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES (1, '实现响应式布局，兼容移动设备', '3');
INSERT INTO `task` VALUES (2, '使用TS重写', '2');
INSERT INTO `task` VALUES (3, '配置自动化更新部署，CI/CD', '2');
INSERT INTO `task` VALUES (4, '修复在登陆的时候表单默认行为，多次登录才跳转成功', '1');
INSERT INTO `task` VALUES (5, '大文件断点续传', '3');
INSERT INTO `task` VALUES (6, '修复邮箱验证', '3');
INSERT INTO `task` VALUES (13, '国际化', '3');

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
) ENGINE = InnoDB AUTO_INCREMENT = 60 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'CC', 'e10adc3949ba59abbe56e057f20f883e', 0, '15657122361', 'hcc960923@gmail.com', '2022-08-10 15:09:42', '489608837435e386d53d419a913340a7.png', 'LKLKLKLKLKLKLKLKLKLKLKLKLKLK', 2, '2022-08-10 15:09:42', '127.0.0.1');
INSERT INTO `user` VALUES (2, '曹青青', 'e10adc3949ba59abbe56e057f20f883e', 1, '15157122361', 'hcc96923@gmail.com', '2022-08-15 16:48:28', '9771b1e3eadfad366ec5daefcd37b3f9.png', 'SSSSSSSSSSSSS', 2, '2022-08-15 16:48:28', '127.0.0.1');
INSERT INTO `user` VALUES (3, '张家辉', 'e10adc3949ba59abbe56e057f20f883e', 1, '15825759654', 'zjh987@qq.com', '2022-08-15 16:48:30', 'bebeec2dd941b1258d286c6408e2e1bd.png', 'SSSSSSSSSSSSSSCCCCCCCCCCCCCCCC', 1, '2022-08-15 16:48:30', '127.0.0.1');
INSERT INTO `user` VALUES (4, '曹操', 'e10adc3949ba59abbe56e057f20f883e', 1, '15657122369', 'hcc96923@163.com', '2022-08-15 16:48:33', '93f913b7884c82712c54ff1a98b07efe.png', 'CXXXXXXXXXXXXXXXXXXXXXXX', 3, '2022-08-15 16:48:33', '127.0.0.1');
INSERT INTO `user` VALUES (5, '刘备', 'e10adc3949ba59abbe56e057f20f883e', 0, '18147275149', '734499162@qq.com', '2022-08-15 16:51:09', 'c7a95b58b97f341d9584fe004a07c1b8.png', 'XXXXXXXXXXXXXXX', 1, '2022-08-15 16:51:09', '127.0.0.1');
INSERT INTO `user` VALUES (6, '孙权', 'e10adc3949ba59abbe56e057f20f883e', 1, '18147275149', 'hcc96923@gmail.com', '2022-08-15 16:48:34', 'ecb8a0162adad52b748b5de62567a8a7.png', 'VVVVVVVVVVVVVVV', 2, '2022-08-15 16:48:34', '127.0.0.1');
INSERT INTO `user` VALUES (7, '诸葛亮', 'e10adc3949ba59abbe56e057f20f883e', 0, '15157122361', 'hcc96923@163.com', '2022-08-15 16:48:35', '5bff662e84cbb344c4f2ac0e5ccd7165.png', 'VVVVVDDDDDDDDDDDDD', 1, '2022-08-15 16:48:35', '127.0.0.1');
INSERT INTO `user` VALUES (8, '貂蝉', 'e10adc3949ba59abbe56e057f20f883e', 1, '15657122362', '734499162@qq.com', '2022-08-15 16:51:26', '97279875d9f836600d152497994c1b39.png', 'TTTTTTTTTTTTTTTTTTTTT', 2, '2022-08-15 16:51:26', '127.0.0.1');
INSERT INTO `user` VALUES (49, '张家辉', 'e10adc3949ba59abbe56e057f20f883e', 0, '15825759654', 'zjh9811171@qq.com', '2022-08-15 16:48:40', '94022e68963d925e715e2b9a0fa0eccd.png', 'GHHHHHHHHHHHHHHHHH', 1, '2022-08-15 16:48:40', '127.0.0.1');
INSERT INTO `user` VALUES (50, '张家辉2', 'e10adc3949ba59abbe56e057f20f883e', 0, '15825759654', 'hcc096923@163.com', '2022-08-15 16:48:59', '8b018f203e07a9eb37f7a179b919e7d0.png', 'NNNNNNNNNNNNFGFGFG', 1, '2022-08-15 16:48:59', '127.0.0.1');
INSERT INTO `user` VALUES (51, '小乔', 'e10adc3949ba59abbe56e057f20f883e', 1, '15157122361', 'hcc96923@gmail.com', '2022-08-15 16:48:58', 'e308b36ca5d021df45bd2f80bfc20201.png', 'NNNNNNHFGFGFGFG', 1, '2022-08-15 16:48:58', '127.0.0.1');
INSERT INTO `user` VALUES (52, '古天乐', 'e10adc3949ba59abbe56e057f20f883e', 0, '15167122361', '15657122362@163.com', '2022-08-15 16:48:57', 'c7a95b58b97f341d9584fe004a07c1b8.png', 'GFHGFHGFHFGFGFGFGFG', 1, '2022-08-15 16:48:57', '127.0.0.1');
INSERT INTO `user` VALUES (53, '古天乐2', 'e10adc3949ba59abbe56e057f20f883e', 0, '15157122363', 'hcc09923@163.com', '2022-08-15 16:48:55', 'bebeec2dd941b1258d286c6408e2e1bd.png', 'GFBHNBGFNBGFGFGFGFG', 1, '2022-08-15 16:48:55', '127.0.0.1');
INSERT INTO `user` VALUES (54, '刘青云', 'e10adc3949ba59abbe56e057f20f883e', 0, '15157122561', 'ccccccvvv@163.com', '2022-08-15 16:48:53', 'e308b36ca5d021df45bd2f80bfc20201.png', 'FGDHFDGGFDGFDGFGFG', 1, '2022-08-15 16:48:53', '127.0.0.1');
INSERT INTO `user` VALUES (55, '刘青云2', 'e10adc3949ba59abbe56e057f20f883e', 0, '15157322361', 'cccc@154.com', '2022-08-15 16:48:52', '94022e68963d925e715e2b9a0fa0eccd.png', 'HGFDHFDGFDGFDGFDGFDG', 1, '2022-08-15 16:48:52', '127.0.0.1');
INSERT INTO `user` VALUES (56, '刘青云3', 'e10adc3949ba59abbe56e057f20f883e', 0, '18143275149', 'vvvv@456.com', '2022-08-15 16:48:50', '9771b1e3eadfad366ec5daefcd37b3f9.png', 'GFDDDTGHGHGHGHGHGH', 1, '2022-08-15 16:48:50', '127.0.0.1');
INSERT INTO `user` VALUES (57, '小鬼', 'e10adc3949ba59abbe56e057f20f883e', 0, '15152122361', 'vvvvs@qwsq.com', '2022-08-15 16:49:02', 'ecb8a0162adad52b748b5de62567a8a7.png', 'RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR', 1, '2022-08-15 16:49:02', '127.0.0.1');
INSERT INTO `user` VALUES (58, '小鬼1', 'e10adc3949ba59abbe56e057f20f883e', 0, '18147295149', 'vvvddvs@qwsq.com', '2022-08-15 16:49:04', '489608837435e386d53d419a913340a7.png', 'YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY', 1, '2022-08-15 16:49:04', '127.0.0.1');
INSERT INTO `user` VALUES (59, '小鬼2', 'e10adc3949ba59abbe56e057f20f883e', 0, '18147275140', 'vvvvv@8956.com', '2022-08-15 16:49:07', '97279875d9f836600d152497994c1b39.png', 'IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII', 3, '2022-08-15 16:49:07', '127.0.0.1');

SET FOREIGN_KEY_CHECKS = 1;
