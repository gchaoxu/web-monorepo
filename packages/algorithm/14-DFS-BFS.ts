/**
 * 理解 DNF 和 BNF 的概念
 */

/**
 * DNF 深度优先搜索的本质——栈结构：
 * 深度优先搜索的过程可以转化为一系列的入栈、出栈操作。
 * 那么深度优先搜索在编码上一般会如何实现呢？这里，就需要用到二叉树中先序遍历的内容了——DFS 中，我们往往使用递归来模拟入栈、出栈的逻辑。
 * */

// 所有遍历函数的入参都是树的根结点对象
interface TreeNode {
	value: number;
	left: TreeNode | null;
	right: TreeNode | null;
}
function preorder(root: TreeNode | null) {
	// 递归边界，root 为空
	if (!root) {
		return;
	}

	// 输出当前遍历的结点值
	console.log('当前遍历的结点值是：', root.value);
	// 递归遍历左子树
	preorder(root.left);
	// 递归遍历右子树
	preorder(root.right);
}

/**
 * 广度优先搜索思想-分层遍历,存在两个重要的规律
 * 1. 每访问完毕一个坐标，这个坐标在后续的遍历中都不会再被用到了，也就是说它可以被丢弃掉。
 * 2. 站在某个确定坐标的位置上，我们所观察到的可直接抵达的坐标，是需要被记录下来的，因为后续的遍历还要用到它们。
 */

// !!!丢弃已访问的坐标、记录新观察到的坐标，这个顺序毫无疑问符合了“先进先出”的原则，因此整个 BFS 算法的实现过程，和队列有着密不可分的关系。

// 这里结合二叉树的层序遍历-实现 BFS 思想
const root = {
	val: 'A',
	left: {
		val: 'B',
		left: {
			val: 'D'
		},
		right: {
			val: 'E'
		}
	},
	right: {
		val: 'C',
		right: {
			val: 'F'
		}
	}
};

function BFS(root: TreeNode) {
	const queue: TreeNode[] = []; // 初始化队列queue
	// 根结点首先入队
	queue.push(root);
	// 队列不为空，说明没有遍历完全
	while (queue.length) {
		const top = queue[0]; // 取出队头元素
		// 访问 top
		console.log(top.value);
		// 如果左子树存在，左子树入队
		if (top.left) {
			queue.push(top.left);
		}
		// 如果右子树存在，右子树入队
		if (top.right) {
			queue.push(top.right);
		}
		queue.shift(); // 访问完毕，队头元素出队
	}
}
