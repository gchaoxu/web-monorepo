//!!! 二叉树的三种遍历形式

// 二叉树代码形式
const root = {
  value: "A",
  left: {
    value: "B",
    left: {
      value: "D",
    },
    right: {
      value: "E",
    },
  },
  right: {
    value: "C",
    right: {
      value: "F",
    },
  },
};

// 先序遍历
function preOrderFn(root) {
  let res = [];
  const preOrder = (root) => {
    // 递归遍历的边界，也就是如果没有下一级的节点就返回
    if (!root) {
      return;
    }

    // 输出当前遍历的结点值
    res.push(root.value);

    // 递归遍历左子树
    preOrder(root.left);

    // 递归遍历右子树
    preOrder(root.right);
  };
  preOrder(root);
  return res;
}

// console.log(preOrderFn(root));

function inOrderFn(root) {
  let res = [];
  const inOrder = (root) => {
    if (!root) {
      return;
    }

    // 递归遍历左子树
    inOrder(root.left);

    // 输出当前遍历的结点值
    res.push(root.value);

    //递归遍历右子树
    inOrder(root.right);
  };

  inOrder(root);
  return res;
}

// console.log(inOrderFn(root));

function postOrderFn(root) {
  let res = [];

  const postOrder = (root) => {
    if (!root) {
      return;
    }
    // 递归遍历左子树
    postOrder(root.left);

    // 递归遍历右子树
    postOrder(root.right);

    // 输出当前遍历的结点值
    res.push(root.value);
  };
  postOrder(root);
  return res;
}

console.log(postOrderFn(root));
