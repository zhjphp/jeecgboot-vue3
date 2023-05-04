<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="800">
    <PolymerizeFlow :informationSourceId="informationSourceId"></PolymerizeFlow>
  </BasicModal>
</template>

<script lang="ts" setup>
import { ref, computed, unref, defineExpose } from 'vue';
import { PolymerizeFlow } from "/@/components/PolymerizeFlow"
import { BasicModal, useModalInner } from '/@/components/Modal';
import { useForm } from "/@/components/Form";

// Emits声明
// const emit = defineEmits(['register','success']);
const isUpdate = ref(true);
const informationSourceId = ref('');
//表单配置
const [registerForm, {setProps,resetFields, setFieldsValue, validate}] = useForm({
  //labelWidth: 150,
  showActionButtonGroup: false,
  baseColProps: {span: 24},
});
//表单赋值
const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
  setModalProps(
    {
      confirmLoading: false,
      showCancelBtn:!!data?.showFooter,
      showOkBtn:!!data?.showFooter,
    }
  );
  isUpdate.value = !!data?.isUpdate;
  // 隐藏底部时禁用整个表单
  // setProps({ disabled: !data?.showFooter })
});
//设置标题
const title = computed(() => (!unref(isUpdate) ? '添加规则' : '配置规则'));

// 更新组件信源ID
function updateInformationSourceId(id) {
  console.log("updateId")
  informationSourceId.value = id
}

defineExpose(
  {
    updateInformationSourceId
  }
)
</script>
