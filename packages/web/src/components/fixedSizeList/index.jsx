// 元素固定高度的虚拟列表
import FixedSizeList from './fixedSizeList';

// eslint-disable-next-line react/prop-types
const Row = ({ index, style, forwardRef }) => {
	return (
		<div
			className={index % 2 ? 'list-item-odd' : 'list-item-even'}
			style={style}
			ref={forwardRef}
		>
			{`Row ${index}`}
		</div>
	);
};

export default function Index() {
	return (
		<FixedSizeList
			className="list"
			height={200}
			width={200}
			itemSize={50}
			itemCount={1000}
		>
			{Row}
		</FixedSizeList>
	);
}
