<template>
  <a-card :bordered="false" style="height: 100%">
    <a-spin :spinning="loading">
      <a-input-search placeholder="按分类名称搜索…" style="margin-bottom: 10px" @search="onSearch" allowClear />
      <!--组织机构树-->
      <template v-if="treeData.length > 0">
        <a-tree
          v-if="!treeReloading"
          showLine
          :clickRowToExpand="false"
          :treeData="treeData"
          :selectedKeys="selectedKeys"
          :load-data="loadChildrenTreeData"
          v-model:expandedKeys="expandedKeys"
          @select="onSelect"
        ></a-tree>
      </template>
      <a-empty v-else description="暂无数据" />
    </a-spin>
  </a-card>
</template>

<script lang="ts" setup>
  import { inject, nextTick, ref, unref, defineExpose } from 'vue';
  import { loadTreeRoot, loadTreeChildren, loadTreeListByPidCondition } from '../InformationSource.api';
  import { Popconfirm } from 'ant-design-vue';

  const prefixCls = inject('prefixCls');
  const emit = defineEmits(['select', 'rootTreeData']);

  const loading = ref<boolean>(false);
  // 树列表数据
  const treeData = ref<any[]>([]);
  // 当前展开的项
  const expandedKeys = ref<any[]>([]);
  // 当前选中的项
  const selectedKeys = ref<any[]>([]);
  // 树组件重新加载
  const treeReloading = ref<boolean>(false);
  // 当前选中的部门
  const currentCategory = ref<any>(null);
  // 搜索关键字
  const searchKeyword = ref('');

  // 加载顶级分类信息
  async function loadRootTreeData() {
    try {
      loading.value = true;
      treeData.value = [];
      const result = await loadTreeRoot(
        {
          async: true,
          pid: '0'
        }
      );
      if (Array.isArray(result)) {
        treeData.value = result;
      }
      if (expandedKeys.value.length === 0) {
        autoExpandParentNode();
      }
    } finally {
      loading.value = false;
    }
  }

  loadRootTreeData();

  // 加载子级分类信息
  async function loadChildrenTreeData(treeNode) {
    try {
      const result = await loadTreeChildren({
        pid: treeNode.dataRef.key,
      });
      if (result.length == 0) {
        treeNode.dataRef.isLeaf = true;
      } else {
        treeNode.dataRef.children = result;
        if (expandedKeys.value.length > 0) {
          // 判断获取的子级是否有当前展开的项
          let subKeys: any[] = [];
          for (let key of expandedKeys.value) {
            if (result.findIndex((item) => item.id === key) !== -1) {
              subKeys.push(key);
            }
          }
          if (subKeys.length > 0) {
            expandedKeys.value = [...expandedKeys.value];
          }
        }
      }
      treeData.value = [...treeData.value];
    } catch (e) {
      console.error(e);
    }
    return Promise.resolve();
  }

  // 自动展开父节点，只展开一级
  function autoExpandParentNode() {
    let item = treeData.value[0];
    if (item) {
      if (!item.isLeaf) {
        expandedKeys.value = [item.key];
      }
      reloadTree();
    }
  }

  // 重新加载树组件，防止无法默认展开数据
  async function reloadTree() {
    await nextTick();
    treeReloading.value = true;
    await nextTick();
    treeReloading.value = false;
  }

  /**
   * 设置当前选中的行
   */
  function setSelectedKey(key: string, data?: object) {
    selectedKeys.value = [key];
    if (data) {
      currentCategory.value = data;
      emit('select', data);
    }
  }

  // 搜索事件
  async function onSearch(value: string) {
    if (value) {
      try {
        loading.value = true;
        treeData.value = [];
        let result = await loadTreeListByPidCondition({
          // 写死pccode
          pid: '0',
          condition: {
            // 目前只能查询name
            category_name: value
          },
        });
        if (Array.isArray(result)) {
          treeData.value = result;
        }
        autoExpandParentNode();
      } finally {
        loading.value = false;
      }
    } else {
      loadRootTreeData();
    }
    searchKeyword.value = value;
  }

  // 树选择事件
  function onSelect(selKeys, event) {
    if (selKeys.length > 0 && selectedKeys.value[0] !== selKeys[0]) {
      setSelectedKey(selKeys[0], event.selectedNodes[0]);
    } else {
      // 这样可以防止用户取消选择
      setSelectedKey(selectedKeys.value[0]);
    }
  }

  defineExpose({
    loadRootTreeData,
  });
</script>
