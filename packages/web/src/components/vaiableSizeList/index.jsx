import VariableSizeList from './variableSizeList';
const rowSizes = new Array(1000)
	.fill(true)
	.map(() => 25 + Math.round(Math.random() * 55));
const getItemSize = (index) => rowSizes[index];

// eslint-disable-next-line react/prop-types
const Row = ({ index, style }) => {
	return (
		<div
			className={index % 2 ? 'list-item-odd' : 'list-item-even'}
			style={style}
		>
			Row {index}
		</div>
	);
};

export default function Index() {
	return (
		<VariableSizeList
			className="list"
			height={200}
			width={200}
			itemSize={getItemSize}
			itemCount={1000}
		>
			{Row}
		</VariableSizeList>
	);
}
