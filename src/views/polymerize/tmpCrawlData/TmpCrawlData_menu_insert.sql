-- 注意：该页面对应的前台目录为views/polymerize文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2023070108105220440', NULL, '爬虫临时数据存储', '/polymerize/tmpCrawlDataList', 'polymerize/TmpCrawlDataList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2023-07-01 20:10:44', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023070108105220441', '2023070108105220440', '添加爬虫临时数据存储', NULL, NULL, 0, NULL, NULL, 2, 'polymerize:tmp_crawl_data:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-01 20:10:44', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023070108105220442', '2023070108105220440', '编辑爬虫临时数据存储', NULL, NULL, 0, NULL, NULL, 2, 'polymerize:tmp_crawl_data:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-01 20:10:44', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023070108105220443', '2023070108105220440', '删除爬虫临时数据存储', NULL, NULL, 0, NULL, NULL, 2, 'polymerize:tmp_crawl_data:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-01 20:10:44', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023070108105220444', '2023070108105220440', '批量删除爬虫临时数据存储', NULL, NULL, 0, NULL, NULL, 2, 'polymerize:tmp_crawl_data:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-01 20:10:44', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023070108105220445', '2023070108105220440', '导出excel_爬虫临时数据存储', NULL, NULL, 0, NULL, NULL, 2, 'polymerize:tmp_crawl_data:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-01 20:10:44', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023070108105220446', '2023070108105220440', '导入excel_爬虫临时数据存储', NULL, NULL, 0, NULL, NULL, 2, 'polymerize:tmp_crawl_data:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-01 20:10:44', NULL, NULL, 0, 0, '1', 0);