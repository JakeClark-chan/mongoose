function checkSamsVnode(a, b) {
  return a.sel === b.sel && a.key === b.key
}
import createElemeng from './createElemeng'
import patchVnode from './patchVnode'
export default function updateChildren(parentElm, oldVnodeCh, newVnodeCh) {
  console.log('updateChildren')
  console.log(oldVnodeCh, newVnodeCh)
  // 新前
  let newStartIdx = 0
  // 旧前
  let oldStartIdx = 0
  // 新后
  let newEntIdx = newVnodeCh.length - 1
  // 旧后
  let oldEntIdx = oldVnodeCh.length - 1
  // 新前节点
  let newStartVnode = newVnodeCh[0]
  // 旧前节点
  let oldStartVnode = oldVnodeCh[0]
  // 新后节点
  let newEndVnode = newVnodeCh[newEntIdx]
  // 旧后节点
  let oldEndVnode = oldVnodeCh[oldEntIdx]
  console.log(newEndVnode)
  while (oldStartIdx <= oldEntIdx && newStartIdx <= newEntIdx) {
    if (checkSamsVnode(oldStartVnode, newStartVnode)) {
      console.log(1)
      patchVnode(oldStartVnode, newStartVnode)
      newStartVnode = newVnodeCh[++newStartIdx]
      oldStartVnode = oldVnodeCh[++oldStartIdx]
    } else if (checkSamsVnode(oldEndVnode, newEndVnode)) {
      console.log(2)
      patchVnode(oldEndVnode, newEndVnode)
      newEndVnode = newVnodeCh[--newEntIdx]
      oldEndVnode = oldVnodeCh[--oldEntIdx]
    } else if (checkSamsVnode(oldStartVnode, newEndVnode)) {
      console.log(newEndVnode, oldEndVnode.elm)
      console.log(3)
      patchVnode(oldStartVnode, newEndVnode)
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      oldStartVnode = oldVnodeCh[++oldStartIdx]
      newEndVnode = newVnodeCh[--newEntIdx]
    } else if (checkSamsVnode(oldEndVnode, newStartVnode)) {
      console.log(4)

      patchVnode(oldEndVnode, newStartVnode)
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm.nextSibling)
      oldEndVnode = oldVnodeCh[--oldEntIdx]
      newStartVnode = newVnodeCh[++newStartIdx]
    } else {
    }
    if (newStartIdx > newEntIdx) {
      console.log('删除')
    }
    if (oldStartIdx > oldEntIdx) {
      console.log('新增')
      let bat = newStartVnode === null ? null : newStartVnode.elm
    }
  }
}
