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
          <a-form-item label="起始API" name="startUrls">
            <a-tooltip placement="topLeft">
              <template #title>逗号间隔多个地址，回车可以换行</template>
              <a-textarea v-model:value="formModel.startUrls" placeholder="请输入起始URL" autoSize/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="列表采集" name="inListFlag">
            <a-tooltip placement="topLeft">
              <template #title>列表采集</template>
              <a-switch v-model:checked="formModel.inListFlag" />
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="有效天数" name="effectiveDays">
            <a-tooltip placement="topLeft">
              <template #title>只采集从当前日期开始往前算，有效天数内的数据</template>
              <a-input-number v-model:value="formModel.effectiveDays" placeholder="请输入有效天数" defaultValue="1" :precision="0" style="width:140px"/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="翻页深度" name="pageDepth">
            <a-tooltip placement="topLeft">
              <template #title>只采集限定页数内的数据</template>
              <a-input-number v-model:value="formModel.pageDepth" placeholder="请输入翻页深度" :precision="0" style="width:140px"/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="起始时间" name="startTime">
            <a-tooltip placement="topLeft">
              <template #title>目标数据的开始时间</template>
              <a-date-picker v-model:value="startTime" placeholder="请选择起始时间" :showNow="true" :showTime="true" @change="onStartTimeChange"/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="截止时间" name="endTime">
            <a-tooltip placement="topLeft">
              <template #title>目标数据的结束时间</template>
              <a-date-picker v-model:value="endTime" placeholder="请选择截止时间"  :showNow="true" :showTime="true" @change="onEndTimeChange"/>
            </a-tooltip>
          </a-form-item>
        </a-col>
      </a-row>




      <a-divider>自定义参数</a-divider>
      <a-row>
        <a-col :span="16">
          <a-form-item label="自定义参数" name="customParam">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.customParam" placeholder="请输入自定义参数" :autoSize="{ minRows: 3}"/>
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

      <a-divider>请求参数</a-divider>
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



      <a-divider>请求结果解析---列表区块解析</a-divider>
      <a-row>
        <a-col :span="16">
          <a-form-item label="区块匹配规则" name="listMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.listMatch" placeholder="请输区块匹配规则" autoSize/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="详情id匹配" name="articleIdMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.articleIdMatch" placeholder="请输详情id匹配规则" autoSize/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="标题匹配" name="articleTitleMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.articleTitleMatch" placeholder="请输标题匹配规则" autoSize/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="日期匹配" name="articleDateMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.articleDateMatch" placeholder="请输日期匹配规则" autoSize/>
            </a-tooltip>
          </a-form-item>
        </a-col>
      </a-row>

      <a-divider>请求结果解析---分页配置</a-divider>
      <a-row>
        <a-col :span="16">
          <a-form-item label="页码匹配" name="pageCountMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.pageCountMatch" placeholder="请输页码匹配规则" autoSize/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="总页数匹配" name="totalPageMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.totalPageMatch" placeholder="请输总页数匹配规则" autoSize/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="页容量匹配" name="pageSizeMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.pageSizeMatch" placeholder="请输每页数量匹配规则" autoSize/>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="16">
          <a-form-item label="总数量匹配" name="totalCountMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.totalCountMatch" placeholder="请输总数量匹配规则" autoSize/>
            </a-tooltip>
          </a-form-item>
        </a-col>

      </a-row>

      <a-divider>请求结果解析---自定义结果抽取</a-divider>
      <a-row>
        <a-col :span="30">
          <a-form-item
            v-for="(param, index) in resultCustomParam"
            :key="param.key"
            :label="'自定义参数-' + (index + 1) "
            :name="['params', index, 'value']"
          >
            <a-row>
              <a-col :span="6">
                <a-input
                  v-model:value="param.name" placeholder="请输入参数名" />
              </a-col>
              <a-col :span="12" style="margin-left: 10px">
                <a-textarea v-model:value="param.value" placeholder="请输入表达式" autoSize/>
              </a-col>
              <a-col :span="4">
                <MinusCircleOutlined
                  v-if="resultCustomParam.length > 1"
                  class="dynamic-delete-button"
                  :disabled="resultCustomParam.length === 1"
                  @click="removeParam(param)"
                  style="margin-left: 10px;"
                />
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item v-bind="formItemLayoutWithOutLabel">
            <a-button type="dashed" @click="addParam">
              <PlusOutlined />
              Add field
            </a-button>
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
          <a-form-item label="正文匹配" name="contentMatch">
            <a-tooltip placement="topLeft">
              <!--              <template #title></template>-->
              <a-textarea v-model:value="formModel.contentMatch" placeholder="请输入正文匹配"/>
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
  resultCustomParam = formModel.value.resultCustomParam

  // 处理时间
  startTime.value = dayjs(formModel.value.startTime)
  endTime.value = dayjs(formModel.value.endTime)
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

  // 处理resultCustomParam
  console.log("resultCustomParam")
  console.log(resultCustomParam)
  console.log(resultCustomParam.value)
  formModel.value.resultCustomParam = resultCustomParam

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
  await checkApiListRule(formModel.value).then(
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
    error("checkApiListRule: " + err.message);
  });
}

// 起始时间
const startTime = ref()
function onStartTimeChange(value: Dayjs, dateString: string) {
  formModel.value.startTime = dateString
}
// 结束时间
const endTime = ref()
function onEndTimeChange(value: Dayjs, dateString: string) {
  formModel.value.endTime = dateString
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
