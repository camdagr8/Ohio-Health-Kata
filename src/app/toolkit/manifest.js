module.exports = {
    menu: {
        'babysitter-app': {
            label: 'Babysitter App',
            route: '/toolkit/babysitter-app',
            elements: {
                dialog: {
                    type: 'organism',
                    label: 'Dialog',
                    route: '/toolkit/babysitter-app/dialog',
                    dna: '/toolkit/babysitter-app/elements/Dialog',
                    component: require('appdir/toolkit/babysitter-app/elements/Dialog')
                        .default,
                    readme: require('appdir/toolkit/babysitter-app/elements/Dialog/readme')
                        .default
                }
            }
        },
        typography: {
            label: 'Typography',
            route: '/toolkit/typography',
            elements: {
                headings: {
                    type: 'atom',
                    label: 'Headings',
                    route: '/toolkit/typography/headings',
                    dna: '/toolkit/typography/elements/Headings',
                    component: require('appdir/toolkit/typography/elements/Headings')
                        .default
                }
            }
        }
    },
    header: {
        logo: '/assets/images/atomic-reactor-logo.svg',
        title: 'Style Guide',
        version: 'ver 2.0.1'
    },
    overview: require('appdir/toolkit/overview').default,
    themes: [
        {
            name: 'Default',
            css: '/assets/style/style.css',
            selected: true
        }
    ],
    sidebar: {
        closed: false,
        position: 'left'
    },
    toolbar: {
        buttons: [
            {
                icon: '#re-icon-dna',
                name: 'filter-all',
                label: 'All Elements'
            },
            {
                icon: '#re-icon-atom',
                name: 'filter-atom',
                label: 'Atoms'
            },
            {
                icon: '#re-icon-molecule',
                name: 'filter-molecule',
                label: 'Molecules'
            },
            {
                icon: '#re-icon-organism',
                name: 'filter-organism',
                label: 'Organisms'
            },
            {
                icon: '#re-icon-catalyst',
                name: 'filter-catalyst',
                label: 'Catalyst'
            },
            {
                icon: '#re-icon-page',
                name: 'filter-page',
                label: 'Pages'
            },
            {
                icon: '#re-icon-template',
                name: 'filter-template',
                label: 'Templates'
            },
            {
                name: 'spacer'
            },
            {
                icon: '#re-icon-settings',
                name: 'toggle-settings',
                cls: 'toggle'
            }
        ]
    },
    settings: [
        {
            text: ['Sidebar position: left', 'Sidebar position: right'],
            values: ['left', 'right'],
            pref: 'sidebar.position',
            labels: ['R', 'L'],
            default: 'left'
        },
        {
            text: ['Documentation: collapsed', 'Documentation: expanded'],
            values: [false, true],
            pref: 'docs.all',
            help: 'Expand or collapse all documentation',
            default: false
        },
        {
            text: ['DNA: collapsed', 'DNA: expanded'],
            values: [false, true],
            pref: 'link.all',
            help: 'Expand or collapse all DNA views',
            default: false
        },
        {
            text: ['Code view: collapsed', 'Code view: expanded'],
            values: [false, true],
            pref: 'code.all',
            help: 'Expand or collapse all code views',
            default: false
        },
        {
            text: ['Syntax highlighting: light', 'Syntax highlighting: dark'],
            values: ['light', 'dark'],
            pref: 'codeColor.all',
            help: 'Switch the code view syntax highlighting',
            default: 'light'
        }
    ]
};
