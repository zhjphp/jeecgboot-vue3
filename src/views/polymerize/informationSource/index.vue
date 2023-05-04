<template>
  <a-row :class="['p-4', `${prefixCls}--box`]" type="flex" :gutter="10" style="max-height: 800px">
    <a-col :xl="6" :lg="24" :md="24" style="margin-bottom: 10px">
      <DepartLeftTree ref="leftTree" @select="onTreeSelect" />
    </a-col>
    <a-col :xl="18" :lg="24" :md="24" style="margin-bottom: 10px">
      <div style="height: 100%;" class="address-book">
        <!--引用表格-->
        <BasicTable @register="registerTable" :rowSelection="rowSelection">
          <!--插槽:table标题-->
          <template #tableTitle>
            <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
<!--            <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>-->
<!--            <j-upload-button  type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>-->
            <a-dropdown v-if="selectedRowKeys.length > 0">
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1" @click="batchHandleDelete">
                    <Icon icon="ant-design:delete-outlined"></Icon>
                    删除
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button>批量操作
                <Icon icon="mdi:chevron-down"></Icon>
              </a-button>
            </a-dropdown>
          </template>
          <!--操作栏-->
          <template #action="{ record }">
            <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
          </template>
          <!--字段回显插槽-->
          <template #htmlSlot="{text}">
            <div v-html="text"></div>
          </template>
          <!--省市区字段回显插槽-->
          <template #pcaSlot="{text}">
            {{ getAreaTextByCode(text) }}
          </template>
          <template #fileSlot="{text}">
            <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
            <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small" @click="downloadFile(text)">下载</a-button>
          </template>
        </BasicTable>
        <!-- 表单区域 -->
        <InformationSourceModal @register="registerModal" @success="handleSuccess"></InformationSourceModal>
        <!-- 规则配置 -->
        <InformationSourceRuleModal ref="informationSourceRuleModalExpose" @register="registerRuleModal" @success="handleRuleSuccess"></InformationSourceRuleModal>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import { provide, ref, unref, computed } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import DepartLeftTree from './components/InformationSourceLeftTree.vue';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { list, deleteOne, batchDelete, getImportUrl,getExportUrl } from './InformationSource.api';
  import { columns, searchFormSchema } from './InformationSource.data';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import InformationSourceModal from './components/InformationSourceModal.vue'
  import { downloadFile } from '/@/utils/common/renderUtils';
  import InformationSourceRuleModal from './components/InformationSourceRuleModal.vue';

  const checkedKeys = ref<Array<string | number>>([]);
  //注册model
  const [registerModal, {openModal}] = useModal();
  const [registerRuleModal, { openModal: ruleOpenModal, setModalProps }] = useModal();
  // 给子组件定义一个ref变量
  const leftTree = ref();
  // 当前选中的部门code
  const categoryId = ref('');
  // 规则组件暴露
  const informationSourceRuleModalExpose = ref({});
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
    tableProps:{
      title: '信源管理',
      api: list,
      columns,
      canResize:false,
      formConfig: {
        //labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter:true,
        showAdvancedButton:true,
        fieldMapToNumber: [
        ],
        fieldMapToTime: [
        ],
      },
      actionColumn: {
        width: 120,
        fixed:'right'
      },
      beforeFetch(params) {
        params.categoryId = categoryId.value;
      },
    },
    exportConfig: {
      name:"信源管理",
      url: getExportUrl,
    },
    importConfig: {
      url: getImportUrl,
      success: handleSuccess
    },
  })

  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext

  // 左侧树选择后触发
  function onTreeSelect(data) {
    categoryId.value = data.key;
    reload();
  }

  /**
   * 新增事件
   */
  function handleAdd() {
    openModal(true, {
      isUpdate: false,
      showFooter: true,
    });
  }
  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      showFooter: true,
    });
  }
  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      showFooter: false,
    });
  }
  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({id: record.id}, handleSuccess);
  }
  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDelete({ids: selectedRowKeys.value}, handleSuccess);
  }
  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }
  /**
   * 配置规则事件
   */
  function handleRule(record: Recordable) {
    console.log("handleRule 传值，执行方法")
    informationSourceRuleModalExpose.value.updateInformationSourceId(record.id);
    setModalProps({ defaultFullscreen: true, canFullscreen: false });
    ruleOpenModal(true, {
      record,
      isUpdate: true,
      showFooter: false,
    });
  }
  /**
   * 配置规则成功回调
   */
  function handleRuleSuccess() {
    console.log("handleRuleSuccess")
  }
  /**
   * 操作栏
   */
  function getTableAction(record){
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
      },
      {
        label: '管理规则',
        onClick: handleRule.bind(null, record),
      },
    ]
  }
  /**
   * 下拉操作栏
   */
  function getDropDownAction(record){
    return [
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      }, {
        label: '删除',
        popConfirm: {
          title: '确认删除',
          confirm: handleDelete.bind(null, record),
        }
      }
    ]
  }
</script>

<style lang="less" scoped>
  @import './index.less';

  /*begin 兼容暗夜模式*/
  .address-book{
    background-color: @component-background !important;
  }
  /*end 兼容暗夜模式*/
</style>
