// 元素高度固定的虚拟列表
import FixedSizeListComponent from './components/fixedSizeList';
// 元素不定高度的虚拟列表
import VariableSizeListComponent from './components/vaiableSizeList';

import './index.css';

const App = () => {
	return (
		<div>
			<FixedSizeListComponent />
			<VariableSizeListComponent />
		</div>
	);
};

export default App;
