<template>
  <div class="wrapper">
    <!-- 节点列表 -->
    <div class="col">
      <div class="drag-drawflow" v-for="n in listNodes" :key="n" draggable="true" :data-node="n.item" @dragstart="drag($event)">
        <i class="fab"></i><span> {{ n.name }}</span>
      </div>
    </div>
    <!-- 节点列表 -->

    <!-- 主工作区 -->
    <div class="col-right">
      <div id="drawflow" @drop="drop($event)" @dragover="allowDrop($event)"></div>
      <div class="btn-export" @click="exportEditor">导出</div>
      <div class="btn-clear" @click="clearEditor">清空</div>
      <div class="btn-submit" @click="submitEditor">保存</div>
      <div class="bar-zoom">
        <div class="btn-zoom-in" @click="zoomIN">放大</div>
        <div class="btn-zoom-reset" @click="zoomReset">还原</div>
        <div class="btn-zoom-out" @click="zoomOut">缩小</div>
      </div>
    </div>
    <!-- 主工作区 -->
  </div>

  <!-- 查看配置 -->
  <div>
    <a-modal v-model:visible="dialogVisible" width="50%" title="Export">
      <span>Data:</span>
      <pre><code>{{dialogData}}</code></pre>
      <span class="dialog-footer">
        <a-button @click="dialogVisible = false">Cancel</a-button>
        <a-button type="primary" @click="dialogVisible = false"
        >Confirm</a-button
        >
      </span>
    </a-modal>
  </div>
  <!-- 查看配置 -->
</template>

<script>
// TODO: 信源规则配置进入时,连接点会有错乱(CSS样式问题)

import 'drawflow/dist/drawflow.min.css'
import '../assets/drawflow.css'
import '../assets/beautiful.css'
// import '../assets/google.css'
// import '../assets/font-awesome.css'

import Drawflow from 'drawflow'
import {
  onMounted,
  shallowRef,
  h,
  getCurrentInstance,
  render,
  readonly,
  ref,
  toRefs
} from 'vue'
import StartNode from './nodes/StartNode.vue'
import ListRuleNode from './nodes/ListRuleNode.vue'
import ArticleRuleNode from './nodes/ArticleRuleNode.vue'
import { testApi, configureRuleApi, getRuleApi } from './PolymerizeFlow.api'
import { defineComponent } from "@vue/runtime-core";
import {useMessage} from "/@/hooks/web/useMessage";

export default defineComponent (
  {
    name: 'PolymerizeFlow',

    props: {
      informationSourceId: {
        type: String
      }
    },

    setup(props, { expose }) {
      const { createMessage } = useMessage();
      const { error } = createMessage;
      const { informationSourceId } = toRefs(props)
      // console.log("informationSourceId: " + informationSourceId.value)
      const listNodes = readonly([
        {
          name: '开始',
          color: '#49494970',
          item: 'StartNode',
          input:0,
          output:1
        },
        {
          name: '列表采集节点',
          color: '#ff9900',
          item: 'ListRuleNode',
          input:1,
          output:1
        },
        {
          name: '稿件采集节点',
          color: '#ff9900',
          item: 'ArticleRuleNode',
          input:1,
          output:1
        },
      ])
      const editor = shallowRef({});
      const dialogVisible = ref(false);
      const dialogData = ref({});
      const Vue = { version: 3, h, render };
      const internalInstance = getCurrentInstance();
      const submitData = ref({});

      internalInstance.appContext.app._context.config.globalProperties.$df = editor;

      function exportEditor() {
        dialogData.value = editor.value.export();
        dialogVisible.value = true;
      }

      function clearEditor() {
        editor.value.clear();
      }

      // 提交配置
      async function submitEditor() {
        submitData.value = {
          drawflowConfig: editor.value.export(),
          informationSourceId: informationSourceId.value
        }
        console.log("submitData")
        console.log(submitData.value)
        await configureRuleApi(submitData.value);
      }

      function zoomOut() {
        editor.value.zoom_out();
      }

      function zoomIN() {
        editor.value.zoom_in();
      }

      function zoomReset() {
        editor.value.zoom_reset();
      }

      const drag = (ev) => {
        if (ev.type === "touchstart") {
          mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute('data-node');
        } else {
          ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
        }
      }
      const drop = (ev) => {
        if (ev.type === "touchend") {
          var parentdrawflow = document.elementFromPoint( mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY).closest("#drawflow");
          if(parentdrawflow != null) {
            addNodeToDrawFlow(mobile_item_selec, mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY);
          }
          mobile_item_selec = '';
        } else {
          ev.preventDefault();
          var data = ev.dataTransfer.getData("node");
          addNodeToDrawFlow(data, ev.clientX, ev.clientY);
        }

      }
      const allowDrop = (ev) => {
        ev.preventDefault();
      }

      let mobile_item_selec = '';
      let mobile_last_move = null;

      function positionMobile(ev) {
        mobile_last_move = ev;
      }

      function addNodeToDrawFlow(name, pos_x, pos_y) {
        pos_x = pos_x * ( editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)) - (editor.value.precanvas.getBoundingClientRect().x * ( editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)));
        pos_y = pos_y * ( editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)) - (editor.value.precanvas.getBoundingClientRect().y * ( editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)));
        const nodeSelected = listNodes.find(ele => ele.item == name);
        editor.value.addNode(name, nodeSelected.input,  nodeSelected.output, pos_x, pos_y, name, {}, name, 'vue');
      }

      onMounted(() => {
        // console.log("onMounted informationSourceId:" + informationSourceId.value)
        var elements = document.getElementsByClassName('drag-drawflow');
        for (var i = 0; i < elements.length; i++) {
          elements[i].addEventListener('touchend', drop, false);
          elements[i].addEventListener('touchmove', positionMobile, false);
          elements[i].addEventListener('touchstart', drag, false );
        }

        const id = document.getElementById("drawflow");
        editor.value = new Drawflow(id, Vue, internalInstance.appContext.app._context);
        editor.value.start();

        editor.value.registerNode('StartNode', StartNode, {}, {});
        editor.value.registerNode('ArticleRuleNode', ArticleRuleNode, {}, {});
        editor.value.registerNode('ListRuleNode', ListRuleNode, {}, {});

        // 按信源ID查出配置
        let param = {
          informationSourceId: informationSourceId.value
        }
        getRuleApi(param).then(
          (res) => {
            console.log("导入信源ID为: " + informationSourceId.value + " 的配置")
            console.log(res)
            if (res.success) {
              // 判断drawflowConfig是否为空
              if (typeof res.result === 'undefined' || res.result == null || typeof res.result.drawflowConfig === 'undefined' || res.result.drawflowConfig == null || res.result.drawflowConfig === '') {
                editor.value.import(
                  {
                    "drawflow": {
                      "Home": {
                        "data": {}
                      }
                    }
                  }
                );
              } else {
                console.log("drawflowConfig: " + res.result.drawflowConfig);
                let obj = {};
                try {
                  obj = JSON.parse(res.result.drawflowConfig)
                } catch (e) {
                  error("解析配置错误: " + e);
                }
                editor.value.import(obj);
              }
            } else {
              error(res.message);
            }
          }
        ).catch((err) => {
          error("getRuleApi: " + err.message);
        });

        // 监听事件
        editor.value.on('nodeCreated', function(id) {
          console.log("Node created " + id);
        })
        editor.value.on('nodeRemoved', function(id) {
          console.log("Node removed " + id);
        })
        editor.value.on('nodeSelected', function(id) {
          console.log("Node selected " + id);
        })
        editor.value.on('moduleCreated', function(name) {
          console.log("Module Created " + name);
        })
        editor.value.on('moduleChanged', function(name) {
          console.log("Module Changed " + name);
        })
        editor.value.on('connectionCreated', function(connection) {
          console.log('Connection created');
          console.log(connection);
        })
        editor.value.on('connectionRemoved', function(connection) {
          console.log('Connection removed');
          console.log(connection);
        })
        /*
            editor.value.on('mouseMove', function(position) {
              console.log('Position mouse x:' + position.x + ' y:'+ position.y);
            })
        */
        editor.value.on('nodeMoved', function(id) {
          console.log("Node moved " + id);
        })
        editor.value.on('zoom', function(zoom) {
          console.log('Zoom level ' + zoom);
        })
        editor.value.on('translate', function(position) {
          console.log('Translate x:' + position.x + ' y:'+ position.y);
        })
        editor.value.on('addReroute', function(id) {
          console.log("Reroute added " + id);
        })
        editor.value.on('removeReroute', function(id) {
          console.log("Reroute removed " + id);
        })
        /* 事件 */
      })

      return {
        exportEditor, clearEditor, submitEditor, listNodes, drag, drop, allowDrop, dialogVisible, dialogData, zoomOut, zoomIN, zoomReset,
      }
    },

  }
)
</script>
