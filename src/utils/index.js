// 根据某个属性值从MenuList查找拥有该属性值的menuItem
export function getMenuItemInMenuListByProperty(menuList, key, value) {
    let stack = [];
    stack = stack.concat(menuList);
    let res;
    while (stack.length) {
      let cur = stack.shift();
      if (cur.children && cur.children.length > 0) {
        stack = cur.children.concat(stack);
      }
      if (value === cur[key]) {
        res = cur;
      }
    }
    console.log(res);
    return res;
  }