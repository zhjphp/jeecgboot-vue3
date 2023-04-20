-- 注意：该页面对应的前台目录为views/polymerize文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2023042010422510450', NULL, '总分类树', '/polymerize/polymerizeCategoryList', 'polymerize/PolymerizeCategoryList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2023-04-20 10:42:45', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023042010422520451', '2023042010422510450', '添加总分类树', NULL, NULL, 0, NULL, NULL, 2, 'polymerize:polymerize_category:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-04-20 10:42:45', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023042010422520452', '2023042010422510450', '编辑总分类树', NULL, NULL, 0, NULL, NULL, 2, 'polymerize:polymerize_category:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-04-20 10:42:45', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023042010422520453', '2023042010422510450', '删除总分类树', NULL, NULL, 0, NULL, NULL, 2, 'polymerize:polymerize_category:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-04-20 10:42:45', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023042010422520454', '2023042010422510450', '批量删除总分类树', NULL, NULL, 0, NULL, NULL, 2, 'polymerize:polymerize_category:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-04-20 10:42:45', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023042010422520455', '2023042010422510450', '导出excel_总分类树', NULL, NULL, 0, NULL, NULL, 2, 'polymerize:polymerize_category:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-04-20 10:42:45', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023042010422520456', '2023042010422510450', '导入excel_总分类树', NULL, NULL, 0, NULL, NULL, 2, 'polymerize:polymerize_category:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-04-20 10:42:45', NULL, NULL, 0, 0, '1', 0);