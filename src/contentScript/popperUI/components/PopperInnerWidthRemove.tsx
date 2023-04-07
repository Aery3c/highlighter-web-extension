import * as React from 'react';
import { Button, ButtonGroup } from '../../../common/components/Button';
import { DeleteFilled } from '../../../common/components/icons'
import { Tooltip } from '../../../common/components/Tooltip';

interface Props {
	clickAfterCallback?: () => void;
}

const PopperInnerWidthRemove: React.FC<Props> = () => {

	const handleClickWithRemove = () => {
		console.log('handleClickWithRemove');
	}

	return (
		<ButtonGroup>
			<>
				<Button data-tooltip-id="remove-highlight-tooltip" onClick={handleClickWithRemove}>
					<DeleteFilled style={{ fontSize: 18 }}/>
				</Button>
				<Tooltip id="remove-highlight-tooltip">
					remove them highlight!
				</Tooltip>
			</>
		</ButtonGroup>
	)
}

export default PopperInnerWidthRemove;