import createElemeng from './createElemeng'
import updateChildren from './updateChildren'
export default function patchVnode(oldVnode, newVnode) {
  // 当新老节点一致就直接返回
  if (oldVnode === newVnode) return
  // 如果新节有文字，没有子节点就直接替换文字
  if (
    newVnode.text != undefined &&
    (newVnode.children == undefined || newVnode.children.length == 0)
  ) {
    // 如果新旧节点的text不同直接把新节点的text赋值给老的节点，如果老的节点中是children也会立即消失
    if (newVnode.text !== oldVnode.text) {
      oldVnode.elm.innerText = newVnode.text
    }
  } else {
    // 如果新节点有子节点，如果旧节点没有子节点就去除旧节点的内容，把新节点的子节点添加到旧的子节点上
    if (oldVnode.children == undefined || oldVnode.children.length == 0) {
      // 清楚旧节点内容
      oldVnode.elm.innerText = ''
      // 遍历新节点的子节点把新节点添加到旧节点的树上
      for (let item of newVnode.children) {
        oldVnode.elm.appendChild(createElemeng(item))
      }
    } else {
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
      // 如果都有新节点和旧节点都有子节点就要进行详细的对比
      // // 记录一下旧节点的指针
      // let un = 0
      // // 遍历新节点的子节点
      // for(let item of newVnode.children) {
      //   // 保存子节点
      //   let ch = item
      //   // 记录一下是否新旧子节点一致
      //   let isExist = false
      //   // 遍历老节点和新节点进行对比，如果相同，进行记录isExist状态
      //   for(let item of oldVnode.children) {
      //     if(ch.sel === item.sel && ch.key === item.key) {
      //       isExist = true
      //     }
      //   }
      //   // 如果isExist为false就是新旧节点不同
      //   if(!isExist) {
      //     // 如果un指针小于旧节点的长度，那就说明指针指向一个旧节点，而就可以在这个旧节点的前面插入新节点人内容
      //     if(un < oldVnode.children.length) {
      //       console.log('un<',un)
      //       let dom = createElemeng(ch)
      //       ch.elm = dom
      //       oldVnode.elm.insertBefore(dom,oldVnode.children[un].elm)
      //     }else {
      //       // 如果小于长度，那就直接在旧节点的最后面插入
      //       console.log('un>',un)
      //       let dom = createElemeng(ch)
      //       oldVnode.elm.appendChild(dom)
      //     }
      //   }else{
      //     // 如果相同旧节点的指针++
      //     un++
      //   }
      // }
    }
  }
  // console.log(newVnode)
}
