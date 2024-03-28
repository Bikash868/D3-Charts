// eslint-disable-next-line no-unused-vars

import UploadData from '@views/Upload';
import MapColumn from '@views/MapColumn';
import AdoptionDashboard from '@views/Adoption';
import LearningDashboard from '@views/Learning';
import { LandingLayout } from '@layouts/Landing';

export const Routes = [
	{
		path: '/',
		exact: true,
		layout: LandingLayout,
		private: false,
		component: UploadData,
	},
	{
		path: '/login',
		exact: true,
		layout: LandingLayout,
		private: false,
		component: <div>Login page</div>,
	},
	{
		path: '/signup',
		exact: true,
		layout: LandingLayout,
		private: false,
		component: <div>Signup page</div>,
	},
	{
		path: '/upload',
		exact: true,
		layout: LandingLayout,
		private: false,
		component: UploadData,
	},
	{
		path: '/map-column',
		exact: true,
		layout: LandingLayout,
		private: true,
		component: MapColumn,
	},
	{
		path: '/dashboard/adoption',
		exact: true,
		layout: LandingLayout,
		private: true,
		component: AdoptionDashboard,
	},
	{
		path: '/dashboard/learning',
		exact: true,
		layout: LandingLayout,
		private: true,
		component: LearningDashboard,
	},
	
];
