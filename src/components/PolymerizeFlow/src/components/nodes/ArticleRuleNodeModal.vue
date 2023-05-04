<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :width="800" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm"/>
  </BasicModal>
</template>

<script lang="ts" setup>
import { ref, computed, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form';
import { formSchema } from '../ArticleRule.data'

// 获取emit
const emit = defineEmits(['register', 'success']);
const isUpdate = ref(false);
// 获取dataNode
// defineProps({
//   dataNode: {}
// })

//表单配置
const [registerForm, {setProps,resetFields, setFieldsValue, validate, updateSchema}] = useForm({
  schemas: formSchema,
  showActionButtonGroup: false,
  baseColProps: {span: 24},
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
});
const modalData = ref({});

//表单赋值
const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {

  //重置表单
  await resetFields();
  setModalProps({confirmLoading: false, minHeight: 80 ,showOkBtn: !!!data?.hideFooter});
  isUpdate.value = !!data?.isUpdate;
  modalData.value = data.dataNode.data;
  if (modalData?.value) {
    //表单赋值
    await setFieldsValue({
      ...modalData.value
    });
  } else {
    modalData.value = {}
  }
  // 隐藏底部时禁用整个表单
  // setProps({ disabled: !!data?.hideFooter })
});

//设置标题
const getTitle = computed(() => (!unref(isUpdate) ? '新增配置' : '编辑配置'));

//表单提交事件
async function handleSubmit() {
  let values = await validate();
  modalData.value = values
  // 通过父组件更新节点配置
  emit('success', {
    isUpdate: unref(isUpdate),
    values: modalData.value
  });
  //关闭弹窗
  closeModal();
}
</script>
