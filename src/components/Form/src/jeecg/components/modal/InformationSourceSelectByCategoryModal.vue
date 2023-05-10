<!--通过部门选择用户-->
<template>
  <BasicModal v-bind="$attrs" @register="register" :title="modalTitle" width="1200px" @ok="handleOk" destroyOnClose @visible-change="visibleChange">
    <a-row :gutter="10">
      <a-col :md="7" :sm="24">
        <a-card :style="{ minHeight: '613px', overflow: 'auto' }">
          <!--组织机构-->
          <BasicTree
            ref="treeRef"
            :style="{ minWidth: '250px' }"
            selectable
            @select="onDepSelect"
            :load-data="loadChildrenTreeData"
            :treeData="catgoryTree"
            :selectedKeys="selectedDepIds"
            :expandedKeys="expandedKeys"
            :clickRowToExpand="false"
          ></BasicTree>
        </a-card>
      </a-col>
      <a-col :md="17" :sm="24">
        <a-card :style="{ minHeight: '613px', overflow: 'auto' }">
          <!--用户列表-->
          <BasicTable ref="tableRef" v-bind="getBindValue" :searchInfo="searchInfo" :api="componentList" :rowSelection="rowSelection"></BasicTable>
        </a-card>
      </a-col>
    </a-row>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, unref, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTree } from '/@/components/Tree/index';
  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
  import { useSelectBiz } from '/@/components/Form/src/jeecg/hooks/useSelectBiz';
  import { useAttrs } from '/@/hooks/core/useAttrs';
  import { loadTreeData } from '/@/views/polymerize/category/PolymerizeCategory.api';
  import { componentList } from '/@/views/polymerize/informationSource/InformationSource.api';
  import { selectProps } from '/@/components/Form/src/jeecg/props/props';
  export default defineComponent({
    name: 'InformationSourceSelectByCategoryModal',
    components: {
      //此处需要异步加载BasicTable
      BasicModal,
      BasicTree,
      BasicTable: createAsyncComponent(() => import('/@/components/Table/src/BasicTable.vue'), {
        loading: true,
      }),
    },
    props: {
      ...selectProps,
      //选择框标题
      modalTitle: {
        type: String,
        default: '选择需要爬取的信源',
      },
    },
    emits: ['register', 'getSelectResult'],
    setup(props, { emit, refs }) {
      const tableRef = ref();
      const treeRef = ref();
      //注册弹框
      const [register, { closeModal }] = useModalInner(async (data) => {
        await queryCatgoryTree();
      });
      const attrs = useAttrs();
      const catgoryTree = ref([]);
      const selectedDepIds = ref([]);
      const expandedKeys = ref([]);
      const searchInfo = {};
      /**
       *表格配置
       */
      const tableProps = {
        columns: [
          {
            title: '信源名称',
            dataIndex: 'name',
            width: 50,
          },
          {
            title: '协议',
            dataIndex: 'scheme',
            width: 50
          },
          {
            title: '域名',
            dataIndex: 'domain',
            width: 50,
          },
          {
            title: '端口',
            dataIndex: 'port',
            width: 50
          },
        ],
        useSearchForm: true,
        canResize: false,
        showIndexColumn: false,
        striped: true,
        bordered: true,
        size: 'small',
        formConfig: {
          //labelWidth: 200,
          baseColProps: {
            xs: 24,
            sm: 24,
            md: 24,
            lg: 24,
            xl: 24,
            xxl: 16,
          },
          schemas: [
            {
              label: '信源名称',
              field: 'name',
              component: 'Input',
            },
          ],
          resetFunc: customResetFunc,
        },
      };
      const getBindValue = Object.assign({}, unref(props), unref(attrs), tableProps);
      const [{ rowSelection, visibleChange, indexColumnProps, getSelectResult, reset }] = useSelectBiz(componentList, getBindValue);
      /**
       * 加载树形数据
       */
      function queryCatgoryTree() {
        let param = {
          async: false,
          pid: 0
        }
        loadTreeData(param).then((res) => {
          if (res) {
            catgoryTree.value = res;
            // 默认展开父节点
            //expandedKeys.value = unref(catgoryTree).map(item => item.id)
          }
        });
      }
      /**
       * 加载子级部门
       */
      async function loadChildrenTreeData(treeNode) {
        try {
          const result = await loadTreeData({
            async: false,
            pid: treeNode.eventKey,
          });
          const asyncTreeAction = unref(treeRef);
          if (asyncTreeAction) {
            asyncTreeAction.updateNodeByKey(treeNode.eventKey, { children: result });
            asyncTreeAction.setExpandedKeys([treeNode.eventKey, ...asyncTreeAction.getExpandedKeys()]);
          }
        } catch (e) {
          console.error(e);
        }
        return Promise.resolve();
      }
      /**
       * 点击树节点,筛选出对应的用户
       */
      function onDepSelect(keys) {
        if (keys[0] != null) {
          if (unref(selectedDepIds)[0] !== keys[0]) {
            selectedDepIds.value = [keys[0]];
          }
          searchInfo['categoryId'] = unref(selectedDepIds).join(',');
          tableRef.value.reload();
        }
      }
      /**
       * 自定义重置方法
       * */
      async function customResetFunc() {
        console.log('自定义查询');
        //树节点清空
        selectedDepIds.value = [];
        //查询条件清空
        searchInfo['categoryId'] = '';
        //选择项清空
        reset();
      }
      /**
       * 确定选择
       */
      function handleOk() {
        getSelectResult((options, values) => {
          //回传选项和已选择的值
          emit('getSelectResult', options, values);
          //关闭弹窗
          closeModal();
        });
      }

      return {
        //config,
        handleOk,
        searchInfo,
        register,
        indexColumnProps,
        visibleChange,
        getBindValue,
        rowSelection,

        catgoryTree,
        selectedDepIds,
        expandedKeys,
        treeRef,
        tableRef,
        componentList,
        onDepSelect,
        loadChildrenTreeData,
      };
    },
  });
</script>

<style scoped lang="less"></style>
