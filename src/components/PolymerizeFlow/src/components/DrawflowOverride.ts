import Drawflow from 'drawflow'

// 重写核心库方法可以解决某些问题,https://github.com/jerosoler/Drawflow/issues/10
class DrawflowOverride extends Drawflow {

  dragEnd(e){
    if ("touchend" === e.type) var t = this.mouse_x, n = this.mouse_y,
      i = document.elementFromPoint(t, n); else t = e.clientX, n = e.clientY, i = e.target;
    if (this.drag && (this.pos_x_start == t && this.pos_y_start == n || this.dispatch("nodeMoved", this.ele_selected.id.slice(5))), this.drag_point && (this.ele_selected.classList.remove("selected"), this.pos_x_start == t && this.pos_y_start == n || this.dispatch("rerouteMoved", this.ele_selected.parentElement.classList[2].slice(14))), this.editor_selected && (this.canvas_x = this.canvas_x + -(this.pos_x - t), this.canvas_y = this.canvas_y + -(this.pos_y - n), this.editor_selected = !1), !0 === this.connection) if ("input" === i.classList[0] || this.force_first_input && (null != i.closest(".drawflow_content_node") || "drawflow-node" === i.classList[0])) {
      if (!this.force_first_input || null == i.closest(".drawflow_content_node") && "drawflow-node" !== i.classList[0]) s = i.parentElement.parentElement.id, o = i.classList[1]; else {
        if (null != i.closest(".drawflow_content_node")) var s = i.closest(".drawflow_content_node").parentElement.id; else var s = i.id;
        if (0 === Object.keys(this.getNodeFromId(s.slice(5)).inputs).length) var o = !1; else var o = "input_1"
      }
      var l = this.ele_selected.parentElement.parentElement.id,
        c = this.ele_selected.classList[1];
      if (l !== s && !1 !== o) {
        if (0 === this.container.querySelectorAll(".connection.node_in_" + s + ".node_out_" + l + "." + c + "." + o).length) {
          this.connection_ele.classList.add("node_in_" + s), this.connection_ele.classList.add("node_out_" + l), this.connection_ele.classList.add(c), this.connection_ele.classList.add(o);
          var d = s.slice(5), a = l.slice(5);
          // 加入自定义节点链接逻辑
          if (this.getNodeFromId(a).name == "ListRuleNode" && this.getNodeFromId(d).name == "ListRuleNode") {
            // 列表节点后不能链接列表节点
            alert("【列表节点采集节】点后只能链接【稿件采集节点】")
            this.dispatch("connectionCancel", !0), this.connection_ele.remove(), this.connection_ele = null
          } else {
            this.drawflow.drawflow[this.module].data[a].outputs[c].connections.push({
              node: d,
              output: o
            }), this.drawflow.drawflow[this.module].data[d].inputs[o].connections.push({
              node: a,
              input: c
            }), this.updateConnectionNodes("node-" + a), this.updateConnectionNodes("node-" + d), this.dispatch("connectionCreated", {
              output_id: a,
              input_id: d,
              output_class: c,
              input_class: o
            })
          }
        } else this.dispatch("connectionCancel", !0), this.connection_ele.remove();
        this.connection_ele = null
      } else { this.dispatch("connectionCancel", !0), this.connection_ele.remove(), this.connection_ele = null }
    } else { this.dispatch("connectionCancel", !0), this.connection_ele.remove(), this.connection_ele = null; }
    this.drag = !1, this.drag_point = !1, this.connection = !1, this.ele_selected = null, this.editor_selected = !1, this.dispatch("mouseUp", e)
  }

}

export { DrawflowOverride }
