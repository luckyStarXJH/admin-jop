const baseUrl = '/super-mkt/activity-set'

const menu = {
    appName: '活动设置',
    appCode: 'activitySet',
    canAccess: false,
    path: baseUrl,
    icon: 'icon-shezhi1',
    children: [
        {
            appName: '活动类型',
            appCode: 'asActivityType',
            canAccess: false,
            path: `${baseUrl}/activity-type`,
            children: [
                {
                    appName: '九宫格',
                    appCode: 'asJiugongge',
                    canAccess: false,
                    path: `${baseUrl}/activity-type/nine`,
                    children: [
                        {
                            appName: '九宫格',
                            appCode: '',
                            canAccess: true,
                            path: `${baseUrl}/activity-type/nine/home`,
                        },
                        {
                            appName: '九宫格',
                            appCode: '',
                            canAccess: true,
                            path: `${baseUrl}/activity-type/nine/add`,
                        },
                        {
                            appName: '九宫格',
                            appCode: '',
                            canAccess: true,
                            path: `${baseUrl}/activity-type/nine/edit`,
                        },
                        {
                            appName: '九宫格',
                            appCode: '',
                            canAccess: true,
                            path: `${baseUrl}/activity-type/nine/viewdata`,
                        },
                    ]
                },
                {
                    appName: '翻牌',
                    appCode: 'asFlop',
                    canAccess: false,
                    path: `${baseUrl}/activity-type/playing-card`,
                    children: [
                        {
                            appName: '翻牌',
                            appCode: '',
                            canAccess: true,
                            path: `${baseUrl}/activity-type/playing-card/home`,
                        },
                        {
                            appName: '翻牌',
                            appCode: '',
                            canAccess: true,
                            path: `${baseUrl}/activity-type/playing-card/add`,
                        },
                        {
                            appName: '翻牌',
                            appCode: '',
                            canAccess: true,
                            path: `${baseUrl}/activity-type/playing-card/data`,
                        },
                        {
                            appName: '翻牌',
                            appCode: '',
                            canAccess: true,
                            path: `${baseUrl}/activity-type/playing-card/edit`,
                        },
                    ]
                },
                {
                    appName: '老虎机',
                    appCode: 'asTiger',
                    canAccess: false,
                    path: `${baseUrl}/activity-type/tiger`,
                    children: [
                        {
                            appName: '老虎机',
                            appCode: '',
                            canAccess: true,
                            path: `${baseUrl}/activity-type/tiger/home`,
                        },
                        {
                            appName: '老虎机',
                            appCode: '',
                            canAccess: true,
                            path: `${baseUrl}/activity-type/tiger/add`,
                        },
                        {
                            appName: '老虎机',
                            appCode: '',
                            canAccess: true,
                            path: `${baseUrl}/activity-type/tiger/viewdata`,
                        },
                        {
                            appName: '老虎机',
                            appCode: '',
                            canAccess: true,
                            path: `${baseUrl}/activity-type/tiger/edit`
                        },
                    ]
                },
                {
                    appName: '人气值千金',
                    appCode: 'asPopularValue',
                    canAccess: false,
                    path: `${baseUrl}/activity-type/fans`,
                    children: [
                        {
                            appName: '人气值千金',
                            appCode: '',
                            canAccess: true,
                            path: `${baseUrl}/activity-type/fans/home`,
                        },
                        {
                            appName: '人气值千金',
                            appCode: '',
                            canAccess: true,
                            path: `${baseUrl}/activity-type/fans/add`,
                        },
                        {
                            appName: '人气值千金',
                            appCode: '',
                            canAccess: true,
                            path: `${baseUrl}/activity-type/fans/data`,
                        },
                        {
                            appName: '人气值千金',
                            appCode: '',
                            canAccess: true,
                            path: `${baseUrl}/activity-type/fans/recommend`,
                        },
                    ]
                },
            ]
        }
    ]
}

export default menu;