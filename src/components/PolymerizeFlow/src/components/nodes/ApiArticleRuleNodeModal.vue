<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :width="800" :title="getTitle" @ok="handleSubmit" @test="handleTest" :showTestBtn="true">
    <a-form ref="formRef"  :model="formModel" :label-col="{xs: {span: 24}, sm: {span: 6}}" :wrapper-col="{xs: {span: 24}, sm: {span: 18}}" >

      <a-divider>通用配置</a-divider>
      <a-row>
        <a-col :span="16">
          <a-form-item label="测试页URL" name="checkRuleUrl">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-input v-model:value="formModel.checkRuleUrl" placeholder="请输入测试页URL"/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="自定义标签" name="customTags">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-input v-model:value="formModel.customTags" placeholder="请输入自定义标签"/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="固定单页采集" name="singleFlag">
            <a-tooltip placement="topLeft">
              <template #title>固定单页采集</template>
              <a-switch v-model:checked="formModel.singleFlag" />
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="单页采集URL" name="singleUrl">
            <a-tooltip placement="topLeft">
              <template #title>目标URL</template>
              <a-input v-model:value="formModel.articleReqUrl" placeholder="请输入目标URL" />
            </a-tooltip>
          </a-form-item>
        </a-col>
      </a-row>

      <a-divider>自定义参数</a-divider>
      <a-row>
        <a-col :span="16">
          <a-form-item label="自定义参数" name="articleCustomParam">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.articleCustomParam" placeholder="请输入自定义参数" :autoSize="{ minRows: 3}"/>
            </a-tooltip>
          </a-form-item>
        </a-col>
      </a-row>


      <a-divider>请求参数</a-divider>
      <a-row>
        <a-col :span="16">
          <a-form-item label="Method" name="reqMethod">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-select
                ref="select"
                v-model:value="formModel.method"
                style="width: 120px"
                :options="methodOptions"
                @change="methodHandleChange"
              ></a-select>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="Content-Type" name="contentType">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-select
                ref="select"
                v-model:value="formModel.contentType"
                style="width: 320px"
                :options="contentTypeOptions"
                @change="contentTypeHandleChange"
              ></a-select>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="urlParam" name="urlParam">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.reqUrlParam" placeholder="请输入urlParam" :autoSize="{ minRows: 3}"/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="Header" name="reqHeader">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.reqHeader" placeholder="请输入请求header" :autoSize="{ minRows: 3}"/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="Body" name="reqBody">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.reqBody" placeholder="请输入请求body" :autoSize="{ minRows: 3}"/>
            </a-tooltip>
          </a-form-item>
        </a-col>
      </a-row>

      <a-divider>预处理结果</a-divider>
      <a-row>
        <a-col :span="16">
          <a-form-item label="请求结果预处理" name="resultPreprocessor">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.resultPreprocessor" placeholder="请输入请求结果预处理" autoSize/>
            </a-tooltip>
          </a-form-item>
        </a-col>
      </a-row>

      <a-divider>字段配置</a-divider>
      <a-row>
        <a-col :span="16">
          <a-form-item label="栏目匹配" name="topicMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.topicMatch" placeholder="请输入栏目匹配"/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="标题匹配" name="titleMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.titleMatch" placeholder="请输入标题匹配"/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="正文匹配" name="contentMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.contentMatch" placeholder="请输入正文匹配"/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="稿件日期匹配" name="dateMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.dateMatch" placeholder="请输入稿件日期匹配"/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="稿件来源匹配" name="sourceMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.sourceMatch" placeholder="请输入稿件来源匹配"/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="关键词匹配" name="keywordsMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.keywordsMatch" placeholder="请输入关键词匹配"/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="描述匹配" name="descriptionMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.descriptionMatch" placeholder="请输入描述匹配"/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="稿件副标题匹配" name="subtitleMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.subtitleMatch" placeholder="请输入稿件副标题匹配"/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="稿件出处匹配" name="referenceMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.referenceMatch" placeholder="请输入稿件出处匹配"/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="稿件作者匹配" name="authorMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.authorMatch" placeholder="请输入稿件作者匹配"/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="稿件访问量匹配" name="visitMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.visitMatch" placeholder="请输入稿件访问量匹配"/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="稿件评论量匹配" name="commentMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.commentMatch" placeholder="请输入稿件评论量匹配"/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="稿件收藏量匹配" name="collectMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.collectMatch" placeholder="请输入稿件收藏量匹配"/>
            </a-tooltip>
          </a-form-item>
        </a-col>

      </a-row>


    </a-form>
  </BasicModal>

  <!-- 测试规则 -->
  <div>
    <a-modal v-model:visible="dialogVisible" :z-index="9999" width="50%" title="测试规则" :footer="null">
      <div style="padding: 30px">
        <pre><code>{{dialogData}}</code></pre>
        <span class="dialog-footer">
        <a-button @click="dialogVisible = false">关闭</a-button>
      </span>
      </div>
    </a-modal>
  </div>
  <!-- 测试规则 -->


</template>

<script lang="ts" setup>
import { BasicModal, useModalInner } from '/@/components/Modal';
import {computed, reactive, ref, unref} from "vue";
import type { SelectProps } from 'ant-design-vue';
import dayjs, {Dayjs} from "dayjs";
import {
  checkApiArticleRule,
  checkApiListRule,
} from "/@/components/PolymerizeFlow/src/components/PolymerizeFlow.api";
import {useMessage} from "/@/hooks/web/useMessage";

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';


// 获取emit
const formEl = ref();
const emit = defineEmits(['register', 'success']);
const isUpdate = ref(false);

// 测试规则
const dialogVisible = ref(false);
const dialogData = ref({});

const { createMessage } = useMessage();
const { error } = createMessage;

//表单modal
const formModel = ref({
});
// 自定义结果抽取表单
const resultCustomParam = reactive<Param[]>([]);


const dateFormat = 'YYYY-MM-DD HH:mm:ss';

//表单赋值
const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
  console.log("console.log(data);console.log(data);console.log(data);console.log(data);console.log(data);console.log(data);");
  // console.log(data);
  setModalProps({confirmLoading: false});
  isUpdate.value = !!data?.isUpdate;

  // 填入节点配置数据
  formModel.value = data.dataNode.data;

  console.log(formModel.value);
});

//设置标题
const getTitle = computed(() => (!unref(isUpdate) ? '新增配置' : '编辑配置'));

function validateRules() {
}

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 30, offset: 0 },
    sm: { span: 30, offset: 4 },
  },
};
interface Param {
  value: string;
  name: String;
}
const removeParam = (item: Param) => {
  let index = resultCustomParam.indexOf(item);
  if (index !== -1) {
    resultCustomParam.splice(index, 1);
  }
};
const addParam = () => {
  resultCustomParam.push({
    value: '',
    name: ''
  });
};

//表单提交事件
async function handleSubmit() {
  // let values = await validate();
  // modalData.value = values

  // 通过父组件更新节点配置
  console.log("handleSubmit")
  console.log(formModel.value)
  emit('success', {
    isUpdate: unref(isUpdate),
    values: formModel.value
  });
  //关闭弹窗
  closeModal();
}

//测试规则
async function handleTest() {
  dialogData.value = "数据采集中...";
  dialogVisible.value = true;
  await checkApiArticleRule(formModel.value).then(
    (res) => {
      console.log(res)
      if (res.success) {
        dialogData.value = res.result;
        dialogVisible.value = true;
      } else {
        dialogData.value = res.message;
        dialogVisible.value = true;
        error(res.message)
      }
    }
  ).catch((err) => {
    error("checkApiArticleRule: " + err.message);
  });
}


// reqMethod 选择
const methodOptions = ref<SelectProps['options']>([
  {
    value: 'get',
    label: 'get',
  },
  {
    value: 'post',
    label: 'post',
  },
]);
function methodHandleChange(value) {
  console.log(`methodHandleChange ${value}`);
  formModel.value.reqMethod = value;
}



// contentType 选择
const contentTypeOptions = ref<SelectProps['options']>([
  {
    value: '无',
    label: null,
  },
  {
    value: 'multipart/form-data',
    label: 'multipart/form-data',
  },
  {
    value: 'application/x-www-form-urlencoded',
    label: 'application/x-www-form-urlencoded',
  },
  {
    value: 'application/json;charset=utf-8',
    label: 'application/json;charset=utf-8',
  },
  // {
  //   value: 'text/html',
  //   label: 'text/html',
  // },
  // {
  //   value: 'text/plain',
  //   label: 'text/plain',
  // },
]);
function contentTypeHandleChange(value) {
  console.log(`contentTypeHandleChange ${value}`);
  formModel.value.contentType = value;
};
</script>
