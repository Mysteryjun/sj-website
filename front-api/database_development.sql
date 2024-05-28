/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : 127.0.0.1:3306
 Source Schema         : database_development

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 09/03/2021 11:48:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for departments
-- ----------------------------
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments`  (
  `deptId` int(11) NOT NULL AUTO_INCREMENT,
  `parentId` int(11) NOT NULL COMMENT '父Id',
  `deptName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '部门名称',
  `orderNum` int(11) NOT NULL COMMENT '显示顺序',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '部门状态（0正常 1停用）',
  `isDelete` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '删除标志（0代表存在 1代表删除）',
  `createdAt` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建者',
  `updatedAt` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `updatedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '更新者',
  PRIMARY KEY (`deptId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of departments
-- ----------------------------
INSERT INTO `departments` VALUES (1, 0, '总部', 1, '0', '0', '2020-11-10 15:43:15', 'admin', NULL, NULL);
INSERT INTO `departments` VALUES (2, 1, '技术部', 1, '0', '0', '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `departments` VALUES (3, 1, '测试', 3, '0', '0', '2020-11-10 10:56:36', NULL, '2020-11-10 10:56:36', NULL);
INSERT INTO `departments` VALUES (4, 3, '测试1', 1, '0', '0', '2020-11-10 10:56:44', NULL, '2020-11-10 10:56:44', NULL);

-- ----------------------------
-- Table structure for dict_datas
-- ----------------------------
DROP TABLE IF EXISTS `dict_datas`;
CREATE TABLE `dict_datas`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dictSort` int(11) NOT NULL COMMENT '字典排序',
  `dictLabel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '字典标签',
  `dictValue` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '字典键值',
  `dictType` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '字典类型',
  `cssClass` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '样式属性（其他样式扩展）',
  `listClass` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '表格回显样式',
  `isDefault` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'Y' COMMENT '是否默认（Y是 N否）',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '菜单状态（0正常 1停用）',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `createdAt` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建者',
  `updatedAt` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `updatedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '更新者',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dict_datas
-- ----------------------------
INSERT INTO `dict_datas` VALUES (3, 2, '公告', '2', 'sys_notice_type', NULL, NULL, 'Y', '0', '公告', '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `dict_datas` VALUES (4, 1, '通知', '1', 'sys_notice_type', NULL, NULL, 'Y', '0', '通知', '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `dict_datas` VALUES (5, 1, '正常', '0', 'sys_notice_status', NULL, NULL, 'Y', '0', '正常', '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `dict_datas` VALUES (6, 2, '停用', '1', 'sys_notice_status', NULL, NULL, 'Y', '0', '停用', '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `dict_datas` VALUES (7, 1, '正常', '0', 'sys_show_hide', NULL, NULL, 'Y', '0', '正常', '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `dict_datas` VALUES (8, 2, '停用', '1', 'sys_show_hide', NULL, NULL, 'Y', '0', '停用', '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `dict_datas` VALUES (9, 1, '正常', '0', 'sys_normal_disable', NULL, NULL, 'Y', '0', '正常', '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `dict_datas` VALUES (10, 2, '停用', '1', 'sys_normal_disable', NULL, NULL, 'Y', '0', '停用', '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `dict_datas` VALUES (11, 2, '男', '1', 'sys_user_sex', NULL, NULL, 'Y', '0', '男', '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `dict_datas` VALUES (12, 1, '女', '0', 'sys_user_sex', NULL, NULL, 'Y', '0', '女', '2020-11-06 15:43:15', 'admin', NULL, NULL);

-- ----------------------------
-- Table structure for dict_types
-- ----------------------------
DROP TABLE IF EXISTS `dict_types`;
CREATE TABLE `dict_types`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dictName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '字典名称',
  `dictType` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '字典类型',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '菜单状态（0正常 1停用）',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `createdAt` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建者',
  `updatedAt` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `updatedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '更新者',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dict_types
-- ----------------------------
INSERT INTO `dict_types` VALUES (2, '公告类型', 'sys_notice_type', '0', '公告类型', '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `dict_types` VALUES (3, '类型数据', 'sys_notice_status', '0', '类型数据', '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `dict_types` VALUES (4, '显示状态', 'sys_show_hide', '0', '显示状态', '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `dict_types` VALUES (5, '状态数据', 'sys_normal_disable', '0', '状态数据', '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `dict_types` VALUES (6, '性别', 'sys_user_sex', '0', '性别', '2020-11-06 15:43:15', 'admin', NULL, NULL);

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parentId` int(11) NOT NULL COMMENT '父Id',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单名称',
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单路径',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名称',
  `component` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '组件路径',
  `is_frame` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1' COMMENT '是否为外链（0是 1否）',
  `menu_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'M' COMMENT '菜单类型（M目录 C菜单 F按钮）',
  `visible` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '菜单显示状态（0显示 1隐藏）',
  `orderNum` int(11) NOT NULL COMMENT '显示顺序',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '菜单状态（0正常 1停用）',
  `perms` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '权限标识',
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图标',
  `isDelete` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '删除标志（0代表存在 1代表删除）',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `createdAt` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建者',
  `updatedAt` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `updatedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '更新者',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 50 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES (1, 0, '首页', '/layout/home', 'Home', 'Home', '1', 'C', '0', 1, '0', '', 'nav-home', '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (2, 0, '系统管理', '/system', 'Layout', 'Layout', '1', 'M', '0', 20, '0', '', 'system', '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (3, 2, '用户中心', 'user', 'User', 'User', '1', 'C', '0', 1, '0', '', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (4, 2, '角色管理', 'role', 'Role', 'Role', '1', 'C', '0', 2, '0', '', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (5, 2, '菜单管理', 'menu', 'Menu', 'Menu', '1', 'C', '0', 3, '0', '', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (6, 2, '部门管理', 'dept', 'Dept', 'Dept', '1', 'C', '0', 4, '0', '', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (7, 2, '字典管理', 'dict', 'Dict', 'Dict', '1', 'C', '0', 6, '0', '', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (8, 2, '通告管理', 'notice', 'Notice', 'Notice', '1', 'C', '0', 7, '0', '', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (9, 3, '新增', NULL, NULL, NULL, '1', 'F', '0', 2, '0', 'system:user:add', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (16, 3, '查询', NULL, NULL, NULL, '1', 'F', '0', 1, '0', 'system:user:query', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (17, 3, '修改', NULL, NULL, NULL, '1', 'F', '0', 3, '0', 'system:user:update', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (18, 3, '删除', NULL, NULL, NULL, '1', 'F', '0', 4, '0', 'system:user:delete', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (19, 4, '查询', NULL, NULL, NULL, '1', 'F', '0', 1, '0', 'system:role:query', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (20, 4, '新增', NULL, NULL, NULL, '1', 'F', '0', 2, '0', 'system:role:add', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (21, 4, '修改', NULL, NULL, NULL, '1', 'F', '0', 3, '0', 'system:role:update', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (22, 4, '删除', NULL, NULL, NULL, '1', 'F', '0', 4, '0', 'system:role:delete', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (23, 5, '查询', NULL, NULL, NULL, '1', 'F', '0', 1, '0', 'system:menu:query', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (24, 5, '新增', NULL, NULL, NULL, '1', 'F', '0', 2, '0', 'system:menu:add', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (25, 5, '修改', NULL, NULL, NULL, '1', 'F', '0', 3, '0', 'system:menu:update', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (26, 5, '删除', NULL, NULL, NULL, '1', 'F', '0', 4, '0', 'system:menu:delete', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (27, 6, '查询', NULL, NULL, NULL, '1', 'F', '0', 1, '0', 'system:dept:query', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (28, 6, '新增', NULL, NULL, NULL, '1', 'F', '0', 2, '0', 'system:dept:add', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (29, 6, '修改', NULL, NULL, NULL, '1', 'F', '0', 3, '0', 'system:dept:update', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (30, 6, '删除', NULL, NULL, NULL, '1', 'F', '0', 4, '0', 'system:dept:delete', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (31, 7, '字典类型查询', NULL, NULL, NULL, '1', 'F', '0', 1, '0', 'system:dictType:query', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (32, 7, '字典类型新增', NULL, NULL, NULL, '1', 'F', '0', 2, '0', 'system:dictType:add', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (33, 7, '字典类型修改', NULL, NULL, NULL, '1', 'F', '0', 3, '0', 'system:dictType:update', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (34, 7, '字典类型删除', NULL, NULL, NULL, '1', 'F', '0', 4, '0', 'system:dictType:delete', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (35, 7, '字典数据查询', NULL, NULL, NULL, '1', 'F', '0', 5, '0', 'system:dictData:query', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (36, 7, '字典数据新增', NULL, NULL, NULL, '1', 'F', '0', 6, '0', 'system:dictData:add', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (37, 7, '字典数据修改', NULL, NULL, NULL, '1', 'F', '0', 7, '0', 'system:dictData:update', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (38, 7, '字典数据删除', NULL, NULL, NULL, '1', 'F', '0', 8, '0', 'system:dictData:delete', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (39, 8, '查询', NULL, NULL, NULL, '1', 'F', '0', 1, '0', 'system:notice:query', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (40, 8, '新增', NULL, NULL, NULL, '1', 'F', '0', 2, '0', 'system:notice:add', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (41, 8, '修改', NULL, NULL, NULL, '1', 'F', '0', 3, '0', 'system:notice:update', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (42, 8, '删除', NULL, NULL, NULL, '1', 'F', '0', 4, '0', 'system:notice:delete', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (43, 3, '修改密码', NULL, NULL, NULL, '1', 'F', '0', 5, '0', 'system:user:updatePwd', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (44, 3, '修改用户状态', NULL, NULL, NULL, '1', 'F', '0', 6, '0', 'system:user:updateStatus', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (45, 3, '上传图片', NULL, NULL, NULL, '1', 'F', '0', 7, '0', 'system:user:uploadImg', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `menus` VALUES (46, 4, '修改状态', NULL, NULL, NULL, '1', 'F', '0', 5, '0', 'system:role:updateStatus', NULL, '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);

-- ----------------------------
-- Table structure for notices
-- ----------------------------
DROP TABLE IF EXISTS `notices`;
CREATE TABLE `notices`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `noticeTitle` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '公告标题',
  `noticeType` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '公告类型',
  `noticeContent` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1' COMMENT '公告类型（1通知 2公告）',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '公告状态（0正常 1停用）',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `createdAt` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建者',
  `updatedAt` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `updatedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '更新者',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for role_menus
-- ----------------------------
DROP TABLE IF EXISTS `role_menus`;
CREATE TABLE `role_menus`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` int(11) NOT NULL COMMENT '角色roleId',
  `menuId` int(11) NOT NULL COMMENT '菜单menuId',
  `createdAt` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建者',
  `updatedAt` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `updatedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '更新者',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 48 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_menus
-- ----------------------------
INSERT INTO `role_menus` VALUES (1, 1, 1, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (2, 1, 2, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (3, 1, 3, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (4, 1, 16, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (5, 1, 9, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (6, 1, 17, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (7, 1, 18, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (8, 1, 43, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (9, 1, 44, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (10, 1, 45, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (11, 1, 4, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (12, 1, 19, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (13, 1, 20, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (14, 1, 21, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (15, 1, 22, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (16, 1, 46, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (17, 1, 5, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (18, 1, 23, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (19, 1, 24, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (20, 1, 25, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (21, 1, 26, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (22, 1, 6, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (23, 1, 27, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (24, 1, 28, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (25, 1, 29, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (26, 1, 30, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (27, 1, 7, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (28, 1, 31, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (29, 1, 32, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (30, 1, 33, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (31, 1, 34, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (32, 1, 35, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (33, 1, 36, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (34, 1, 37, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (35, 1, 38, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (36, 1, 8, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (37, 1, 39, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (38, 1, 40, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (39, 1, 41, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (40, 1, 42, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (41, 1, 43, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (42, 1, 44, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (43, 1, 45, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (44, 1, 46, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (45, 1, 47, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (46, 1, 48, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (47, 1, 49, NULL, NULL, NULL, NULL);
INSERT INTO `role_menus` VALUES (48, 1, 50, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色名称',
  `roleKey` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色权限字符串',
  `roleSort` int(11) NOT NULL COMMENT '显示顺序',
  `dataScope` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '2' COMMENT '数据范围（1：全部数据权限 2：本部门及以下数据权限 3：本部门数据权限 4：仅本人权限）',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '角色状态（0正常 1停用）',
  `isDelete` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '删除标志（0代表存在 1代表删除）',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `createdAt` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建者',
  `updatedAt` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `updatedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '更新者',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, '超级管理员', 'admin', 1, '1', '0', '0', NULL, '2020-11-06 15:43:15', 'admin', NULL, NULL);

-- ----------------------------
-- Table structure for sequelizemeta
-- ----------------------------
DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE `sequelizemeta`  (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sequelizemeta
-- ----------------------------
INSERT INTO `sequelizemeta` VALUES ('20200828021838-create-user.js');
INSERT INTO `sequelizemeta` VALUES ('20200831061523-create-role.js');
INSERT INTO `sequelizemeta` VALUES ('20200831061618-create-department.js');
INSERT INTO `sequelizemeta` VALUES ('20200831061653-create-menu.js');
INSERT INTO `sequelizemeta` VALUES ('20200831061739-create-dict-data.js');
INSERT INTO `sequelizemeta` VALUES ('20200831061747-create-dict-type.js');
INSERT INTO `sequelizemeta` VALUES ('20200831061901-create-notice.js');
INSERT INTO `sequelizemeta` VALUES ('20200831061953-create-role-menu.js');
INSERT INTO `sequelizemeta` VALUES ('20200831062016-create-user-role.js');
INSERT INTO `sequelizemeta` VALUES ('20201113083154-init-users.js');

-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL COMMENT '用户id',
  `roleId` int(11) NOT NULL COMMENT '角色id',
  `createdAt` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建者',
  `updatedAt` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `updatedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '更新者',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_roles
-- ----------------------------
INSERT INTO `user_roles` VALUES (1, 1, 1, '2020-11-06 15:43:15', 'admin', NULL, NULL);
INSERT INTO `user_roles` VALUES (2, 2, 1, '2020-11-11 17:27:34', NULL, '2020-11-11 17:27:34', NULL);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deptId` int(11) NOT NULL COMMENT '部门deptId',
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `nickName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1' COMMENT '性别（0代表女 1代表男）',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `mobile` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `isDelete` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '删除标志（0代表存在 1代表删除）',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '帐号状态（0正常 1停用）',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `createdAt` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建者',
  `updatedAt` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `updatedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '更新者',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `userName`(`userName`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 1, 'admin', 'admin', '1', '$2b$10$./tkPcqHWsAYsLqZezh92..DmQyZrxtLrn5SnwrSRasokXrVyvLr6', '/upload/16050872015229067.jpg', '123ss@qq.com', '13433666520', '0', '0', 'test', '2020-11-06 15:43:15', 'admin', '2020-11-11 17:33:21', NULL);
INSERT INTO `users` VALUES (2, 4, 'dsf', 'tes', '1', '$2b$10$hZMdJQfVNtzRo1bXrpB8Ou2r/.wyWVlzSs2SpdEU/hzzgUuvOSIFW', NULL, NULL, NULL, '0', '0', NULL, '2020-11-11 17:27:34', NULL, '2020-11-11 17:27:34', NULL);

SET FOREIGN_KEY_CHECKS = 1;
