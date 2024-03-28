import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';

import { AppBar } from '@components/AppBar';
import { AppBarTitle } from '@components/AppBar/Title';
import { StepTracker } from '@components/BreadcrumbStepper';
import { BackdropLoader } from '@components/BackdropLoader';
import { AppbarControls } from '@components/AppBarControls';
 
import { LandingLayoutWrapper } from './elements';
import { isEmpty } from 'lodash';

export function LandingLayout(props) {
	const [adornmentComponents,setAdornmentComponents] = React.useState({});
	const path = window.location.pathname;

	React.useEffect(()=>{
		console.log("path:",path)
		//Ideally it shpuld be regex
		if(path.includes('dashboard')) {
			const title = path.includes('adoption') ? 'Adoption Insights' : 'Learning Insights';
			setAdornmentComponents({
				TabSelector: <StepTracker/>,
				AppBarTitle: <AppBarTitle onClick={() =>{}} title={title} />,
				AppbarControls: <AppbarControls />,
			})
		} else {
			setAdornmentComponents({
				TabSelector: <StepTracker/>,
				AppBarTitle: <></>,
				AppbarControls: <></>,
			})
		}
		
	},[window.location.pathname]);

	const adornments = {
		start: {component: 'TabSelector'},
		center: {component: 'AppBarTitle'},
		end: {component: 'AppbarControls'},
	}

	React.useEffect(()=>{
		window.scrollTo(0,0);
	}, [window.location.pathname]);

	return (
		<LandingLayoutWrapper>
			{
				isEmpty(adornmentComponents) ? (
					<BackdropLoader />
				) : (
					<>		
						<AppBar
							onSignout={()=>{}}
							onLogoClick={()=>{}}
							shrunk={false}
							disableCenterTabs={false}

							startAdornment={adornmentComponents[adornments.start.component]}
							centerAdornment={adornmentComponents[adornments.center.component]}
							endAdornment={adornmentComponents[adornments.end.component]}
						/>
						<Grid container component="main" sx={{background:'#f7f7f7'}}>
							{props.children}
						</Grid>
					</>
				)
			}
		</LandingLayoutWrapper>
	);
}

LandingLayout.propTypes = {
	children: PropTypes.element,
};
