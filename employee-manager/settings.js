module.exports = {
    // Port, na którym Node-RED nasłuchuje (musi pasować do config.json)
    uiPort: 1880,

    // Gdzie Node-RED ma szukać Twoich plików index.html, style.css?
    httpStatic: '/data/ui', 

    // Ścieżka API (wszystkie Twoje endpointy będą pod /)
    httpNodeRoot: '/',

    // Wyłączamy edytor Node-RED dla użytkownika końcowego!
    // Jeśli chcesz widzieć edytor do debugowania, zmień false na '/admin'
    httpAdminRoot: false, 

    // Wyłączenie logowania Node-RED (autoryzację załatwia Home Assistant Ingress)
    adminAuth: null,
    
    // Ustawienia zapisu (flowy zapisujemy w /data)
    userDir: '/data/',
    flowFile: 'flows.json',
    
    // Logowanie błędów
    logging: {
        console: {
            level: "info",
            metrics: false,
            audit: false
        }
    }
}