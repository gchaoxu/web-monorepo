/**
 * 如何用栈实现一个队列？
 */

/**
 * 初始化构造函数
 */
const MyQueue = function () {
	// 初始化两个栈
	this.stack1 = [];
	this.stack2 = [];
};

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
	// 直接调度数组的 push 方法
	this.stack1.push(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
	// 假如 stack2 为空，需要将 stack1 的元素转移进来
	if (this.stack2.length <= 0) {
		// 当 stack1 不为空时，出栈
		while (this.stack1.length !== 0) {
			// 将 stack1 出栈的元素推入 stack2
			this.stack2.push(this.stack1.pop());
		}
	}
	// 为了达到逆序的目的，我们只从 stack2 里出栈元素
	return this.stack2.pop();
};

/**
 * Get the front element.
 * @return {number}
 * 这个方法和 pop 唯一的区别就是没有将定位到的值出栈
 */
MyQueue.prototype.peek = function () {
	if (this.stack2.length <= 0) {
		// 当 stack1 不为空时，出栈
		while (this.stack1.length != 0) {
			// 将 stack1 出栈的元素推入 stack2
			this.stack2.push(this.stack1.pop());
		}
	}
	// 缓存 stack2 的长度
	const stack2Len = this.stack2.length;
	return stack2Len && this.stack2[stack2Len - 1];
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
	// 若 stack1 和 stack2 均为空，那么队列空
	return !this.stack1.length && !this.stack2.length;
};

const myQueue = new MyQueue();
myQueue.push(1);

// 认识双端队列-双端队列就是允许在队列的两端进行插入和删除的队列。
// *** 双端队列衍生出的滑动窗口问题是一个经久不衰的命题热点

/**
 * 题目描述：给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
 * 示例: 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3 输出: [3,3,5,5,6,7]
 */

// 方法一：双指针 + 遍历法
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSlidingWindowOne = function (nums, k) {
	// 缓存数组的长度
	const len = nums.length;
	// 定义结果数组
	const res = [];
	// 初始化左指针
	let left = 0;
	// 初始化右指针
	let right = k - 1;
	// 当数组没有被遍历完时，执行循环体内的逻辑
	while (right < len) {
		// 计算当前窗口内的最大值
		const max = calMax(nums, left, right);
		// 将最大值推入结果数组
		res.push(max);
		// 左指针前进一步
		left++;
		// 右指针前进一步
		right++;
	}
	// 返回结果数组
	return res;
};

// 这个函数用来计算最大值
function calMax(arr, left, right) {
	// 处理数组为空的边界情况
	if (!arr || !arr.length) {
		return;
	}
	// 初始化 maxNum 的值为窗口内第一个元素
	let maxNum = arr[left];
	// 遍历窗口内所有元素，更新 maxNum 的值
	for (let i = left; i <= right; i++) {
		if (arr[i] > maxNum) {
			maxNum = arr[i];
		}
	}
	// 返回最大值
	return maxNum;
}

/**
 * !!! 这里存在待优化的点
 * 以上代码涉及了两层循环，外层循环是 while，它和滑动窗口前进的次数有关。滑动窗口前进了多少次，while 就执行了多少次。
 * 假设数组的规模是 n，那么从起始位置开始，滑动窗口每次走一步，一共可以走 n - k 次。注意别忘了初始位置也算作一步的，因此一共走了 n - k + 1次。
 * 然后每个窗口内部我们又会固定执行 k 次遍历。注意 k 可不是个常数，它和 n 一样是个变量。因此这个时间复杂度简化后用大 O 表示法可以记为 O(kn)。
 * !!! 如何将 O(kn) --> O(n)
 * k 之所以会产生，是因为我们现在通过遍历来更新最大值。那么更新最大值，有没有更高效的方法呢？
 * 在窗口移动的时候，只根据发生变化的元素对最大值进行更新，那么复杂度就降低了很多
 */

// !!! 使用双端队列法，其核心的思想是维护一个有效的递减队列。
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSlidingWindowTwo = function (nums, k) {
	// 缓存数组的长度
	const len = nums.length;
	// 初始化结果数组
	const res = [];
	// 初始化双端队列
	const deque = [];
	// 开始遍历数组
	for (let i = 0; i < len; i++) {
		// 当队尾元素小于当前元素时
		while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
			// 将队尾元素（索引）不断出队，直至队尾元素大于等于当前元素
			deque.pop();
		}
		// 入队当前元素索引（注意是索引）
		deque.push(i);
		// 当队头元素的索引已经被排除在滑动窗口之外时
		while (deque.length && deque[0] <= i - k) {
			// 将队头元素索引出队
			deque.shift();
		}
		// 判断滑动窗口的状态，只有在被遍历的元素个数大于 k 的时候，才更新结果数组
		if (i >= k - 1) {
			res.push(nums[deque[0]]);
		}
	}
	// 返回结果数组
	return res;
};
