import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

import { StyledTab } from './elements';
import { StyledIcon } from './elements';
import { StyledTabs } from './elements';
import { TabSelectorBackButton } from './elements';
import { AppbarTabSelectorWrapper } from './elements';

import { Image } from '@components/Image';
import BACK_SVG from '@assets/svg/back.svg';
import { UpdatedTag } from '@components/updatedTag';

export function TabSelector(props) {
	function handleTabSelection(event, newValue) {
		const selectedTab = Object.values(props.tabs)[newValue];

		props.onChange({
			path: selectedTab.path,
			key: selectedTab.key,
		});
	}

	return (
		<AppbarTabSelectorWrapper className={props.className} alignLeft={props.disableTabs}>
			<TabSelectorBackButton
				onClick={props.onBack}
				startIcon={
					<StyledIcon>
						<Image src={BACK_SVG} size="small" />
					</StyledIcon>
				}
			/>

			<Typography color="#1B2031" variant="body1" fontWeight="700" marginRight="1.375rem">
				{props.title}
			</Typography>

			{!props.disableTabs && (
				<StyledTabs
					onChange={handleTabSelection}
					disabled={props.disableTabs}
					value={Object.keys(props.tabs).indexOf(props.selectedTab)}
				>
					{Object.values(props.tabs).map((tab, index) =>
						tab.visible ? (
							<StyledTab
								index={index}
								key={`${tab.key}-${index}`}
								label={tab.label}
								disabled={!tab.active}
								iconPosition="end"
								icon={
									tab.updatedTags && (
										<UpdatedTag title={'NEW'} background={'#FFF7E6'} titleColor={'#FA8C16'} borderColor={'#FFD591'} />
									)
								}
							/>
						) : null
					)}
				</StyledTabs>
			)}
		</AppbarTabSelectorWrapper>
	);
}

TabSelector.defaultProps = {
	tabs: {},
};

TabSelector.propTypes = {
	className: PropTypes.string,
	disableTabs: PropTypes.bool,
	selectedTab: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onBack: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	tabs: PropTypes.objectOf(
		PropTypes.shape({
			key: PropTypes.string,
			label: PropTypes.string,
			visible: PropTypes.bool,
			active: PropTypes.bool,
		})
	),
};
