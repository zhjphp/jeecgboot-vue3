<template>
  <div ref="el">
    <NodeHeader  title="Api稿件采集节点"/>
    <div class="box">
      <!--      <p>稿件采集节点</p>-->
      <a-button type="primary" @click="handleEdit"> 编辑配置 </a-button>
    </div>
  </div>

  <ApiArticleRuleNodeModal @register="registerModal" @success="handleSuccess"></ApiArticleRuleNodeModal>
</template>

<script lang="ts" setup>
import { provide, ref, unref, computed, getCurrentInstance, onMounted, nextTick } from 'vue';
import { useDesign } from '/@/hooks/web/useDesign';
import NodeHeader from './NodeHeader.vue'
import ApiArticleRuleNodeModal from "./ApiArticleRuleNodeModal.vue";
import { useModal } from "/@/components/Modal";

//注册model
const [registerModal, {openModal, setModalProps}] = useModal();

const el = ref(null);
const nodeId = ref(0);
let df = null;
const dataNode = ref({});
// const matchPage = ref('');

df = getCurrentInstance().appContext.config.globalProperties.$df.value;

onMounted(async () => {
  await nextTick()
  // 获取当前节点ID
  nodeId.value = el.value.parentElement.parentElement.id.slice(5)
  // 获取当前节点配置数据
  dataNode.value = df.getNodeFromId(nodeId.value)
  // matchPage.value = dataNode.value.data.matchPage;
});

// 弹出节点配置表单
async function handleEdit() {
  setModalProps({ canFullscreen: false });
  openModal(true, {
    dataNode,
    isUpdate: true,
    showFooter: true
  });
}

// 编辑成功
function handleSuccess(value) {
  dataNode.value.data = value.values
  // 更新节点数据
  df.updateNodeDataFromId(nodeId.value, dataNode.value.data);
}
</script>
