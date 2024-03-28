
// export const visualizeTabList = {
// 	summary: {
// 		key: 'summary',
// 		label: 'Analytics',
// 		active: true,
// 		visible: true,
// 		path: '/visualize/summary',
// 	},
// 	compare: {
// 		key: 'compare',
// 		label: 'Quick View',
// 		active: true,
// 		visible: true,
// 		path: '/visualize/compare',
// 		updatedTags: true,
// 	},
// 	analyze: {
// 		key: 'analyze',
// 		label: 'Analyze',
// 		active: false,
// 		visible: false,
// 		path: '/visualize/analyze',
// 	},
// };


export const pathAppbarAdornmentData = {
	default: {
		adornment: {
			centerAdornment: {
				component: '',
				data: {
					disableTabs: false,
					shrunk: false,
				},
			},
			startAdornment: {
				component: '',
				data: {},
			},
			endAdornment: {
				component: '',
				data: {},
			},
		},
	},
	'/dashboard': {
		title: 'Indicators',
		adornment: {
			centerAdornment: {
				component: '',
				data: {
					shrunk: false,
				},
			},
			startAdornment: {
				component: 'AppBarTitle',
				data: {},
			},
			endAdornment: {
				component: 'AppbarIndicatorControls',
				data: {},
			},
		},
	},
	'/insights': {
		title: 'Insights',
		adornment: {
			centerAdornment: {
				component: 'TabSelector',
				data: {
					backPath: '/',
					disableTabs: true,
					shrunk: true,
				},
			},
			startAdornment: {
				component: '',
				data: {},
			},
			endAdornment: {
				component: '',
				data: {},
			},
		},
	},
	'/visualize/summary': {
		title: 'Visualize',
		adornment: {
			centerAdornment: {
				component: 'TabSelector',
				data: {
					shrunk: false,
					disableTabs: false,
					selectedTab: 'summary',
					tabs: visualizeTabList,
				},
			},
			startAdornment: {
				component: '',
			},
			endAdornment: {
				component: '',
			},
		},
	},
	'/visualize/compare': {
		title: 'Visualize',
		adornment: {
			centerAdornment: {
				component: 'TabSelector',
				data: {
					shrunk: false,
					disableTabs: false,
					selectedTab: 'compare',
					tabs: visualizeTabList,
				},
			},
			startAdornment: {
				component: '',
			},
			endAdornment: {
				component: '',
			},
		},
	},
	'/explore': {
		title: 'Explore',
		adornment: {
			centerAdornment: {
				component: 'TabSelector',
				data: {
					shrunk: true,
					disableTabs: true,
				},
			},
			startAdornment: {
				component: '',
			},
			endAdornment: {
				component: '',
			},
		},
	},
	'/explore/results': {
		title: 'Explore results',
		adornment: {
			centerAdornment: {
				component: 'TabSelector',
				data: {
					shrunk: true,
					disableTabs: true,
				},
			},
			startAdornment: {
				component: '',
			},
			endAdornment: {
				component: '',
			},
		},
	},
	'/pricing': {
		title: 'Pricing',
		adornment: {
			centerAdornment: {
				component: 'TabSelector',
				data: {
					shrunk: true,
					disableTabs: true,
				},
			},
			startAdornment: {
				component: '',
			},
			endAdornment: {
				component: '',
			},
		},
	},
};

export function getPathAppBarAdornments(path, pathAppbarAdornment) {
	return pathAppbarAdornment?.[path] || false;
}