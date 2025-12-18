module.exports = {
    uiPort: process.env.PORT || 1880,
    httpStatic: '/data/ui', // Tutaj będą tylko style.css i skrypty js, ale NIE index.html
    httpNodeRoot: '/',
    httpAdminRoot: '/admin', // Ważne: włącz admina pod /admin, żebyś mógł zaimportować flow!
    adminAuth: null,
    userDir: '/data/',
    flowFile: 'flows.json',
    functionExternalModules: true,
    functionGlobalContext: {
        fs: require('fs'), 
        path: require("path"),
        os: require('os')
    },
    logging: {
        console: {
            level: "info",
            metrics: false,
            audit: false
        }
    },
    editorTheme: {
        projects: {
            enabled: false
        }
    }
}