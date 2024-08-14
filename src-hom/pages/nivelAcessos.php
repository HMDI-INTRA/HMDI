<?php
// Criado por: Josélio Dias Mendonça

include_once '../services/connection/conexao-login.php';

$menuItems = [
    "0" => [
        "dashboard" => ["label" => "Dashboards", "url" => "#", "icon" => "ni ni-chart-bar-32", "subItems" => []],
        "arquivo" => ["label" => "Arquivo", "url" => "../pages/arquivo.php", "icon" => "ni ni-archive-2", "subItems" => []],
        "configuracao" => ["label" => "Configuração do Sistema", "url" => "http://10.1.1.108:10000/", "target" => "_blank", "icon" => "ni ni-settings", "subItems" => []],
    ],
    "1" => [
        "dashboard" => [
            "label" => "Dashboards",
            "url" => "#",
            "icon" => "ni ni-chart-bar-32",
            "subItems" => [
                "Tecnologia da informação" => ["url" => "../pages/dashboard.php", "icon" => "ni ni-chart-bar-32"],
                "Laboratório" => ["url" => "../pages/dashboardLab.php", "icon" => "ni ni-chart-bar-32"],
                "Agência Tranfusional" => ["url" => "../pages/dashAgenciaTranfusional.php", "icon" => "ni ni-favourite-28"],
                "Nir-Eletivas" => ["url" => "../pages/dashboardNir.php", "icon" => "ni ni-chart-bar-32"],
                "Utin" => ["url" => "../pages/dashboardUtin.php", "icon" => "ni ni-chart-bar-32"],
                "Internação" => ["url" => "../pages/dashboardInter.php", "icon" => "ni ni-chart-bar-32"],
            ]
        ],
        "cadastro" => ["label" => "Cadastros", "url" => "../pages/cadastros.php", "icon" => "ni ni-single-copy-04", "subItems" => []],
        "arquivo" => ["label" => "Arquivo", "url" => "../pages/arquivo.php", "icon" => "ni ni-archive-2", "subItems" => []],
        "laboratorio" => ["label" => "Laboratório", "url" => "../pages/laboratorio.php", "icon" => "ni ni-ruler-pencil", "subItems" => []],
        "Nir-Eletivas" => ["label" => "Nir Eletivas", "url" => "../pages/nir.php", "icon" => "ni ni-folder-17", "subItems" => []],
        "cadastaVagas" => ["label" => "Cadastrar vagas internas", "url" => "../pages/cadastrarVagas.php", "icon" => "ni ni-briefcase-24", "subItems" => []],
        "espacoJasmim" => ["label" => "Espaco Jasmim", "url" => "../pages/espacoJasmin.php", "icon" => "ni ni-sound-wave", "subItems" => []],
        "espacoRosa" => ["label" => "Espaco Rosa", "url" => "../pages/espacoRosa.php", "icon" => "ni ni-sound-wave", "subItems" => []],
        "gestaoPessoas" => ["label" => "Gestão de Pessoas", "url" => "../pages/gestaoPessoas.php", "icon" => "ni ni-circle-08", "subItems" => []],
        "controleUsuario" => ["label" => "Controle de usuários", "url" => "../pages/cadastrarUser.php", "icon" => "ni ni-single-02", "subItems" => []],
        "configuracao" => ["label" => "Configuração do Sistema", "url" => "http://10.1.1.108:10000/", "target" => "_blank", "icon" => "ni ni-settings", "subItems" => []],
    ],
    "2" => [
        "dashboard" => ["label" => "Dashboards", "url" => "", "icon" => "ni ni-chart-bar-32", "subItems" => []],
        "laboratorio" => ["label" => "Laboratório", "url" => "../pages/laboratorio.php", "icon" => "ni ni-ruler-pencil", "subItems" => []],
        "Agência Tranfusional" => ["label" => "Agência Tranfusional","url" => "../pages/dashAgenciaTranfusional.php", "icon" => "ni ni-favourite-28"],
        "configuracao" => ["label" => "Configuração do Sistema", "url" => "http://10.1.1.108:10000/", "target" => "_blank", "icon" => "ni ni-settings", "subItems" => []],
    ],
    "3" => [
        "dashboard" => [
            "label" => "Dashboards",
            "url" => "#",
            "icon" => "ni ni-chart-bar-32",
            "subItems" => [
                "Laboratório" => ["url" => "../pages/dashboardLab.php", "icon" => "ni ni-chart-bar-32"],
                "Agência Tranfusional" => ["url" => "../pages/dashAgenciaTranfusional.php", "icon" => "ni ni-favourite-28"]
                ]
        ],
        "laboratorio" => ["label" => "Laboratório", "url" => "../pages/laboratorio.php", "icon" => "ni ni-ruler-pencil", "subItems" => []],
        "configuracao" => ["label" => "Configuração do Sistema", "url" => "http://10.1.1.108:10000/", "target" => "_blank", "icon" => "ni ni-settings", "subItems" => []],
    ],
    "4" => [
        "dashboard" => [
            "label" => "Dashboards",
            "url" => "#",
            "icon" => "ni ni-chart-bar-32",
            "subItems" => [
                "Nir Eletivas" => ["url" => "../pages/dashboardNir.php", "icon" => "ni ni-chart-bar-32"],
            ]
        ],
        "Nir Eletivas" => ["label" => "Nir Eletivas", "url" => "../pages/nir.php", "icon" => "ni ni-folder-17", "subItems" => []],
        "configuracao" => ["label" => "Configuração do Sistema", "url" => "http://10.1.1.108:10000/", "target" => "_blank", "icon" => "ni ni-settings", "subItems" => []],
    ],
    "5" => [
        "dashboard" => [
            "label" => "Dashboards",
            "url" => "#",
            "icon" => "ni ni-chart-bar-32",
            "subItems" => [
                
            ]
        ],
        "Nir Eletivas" => ["label" => "Nir Eletivas", "url" => "../pages/nir.php", "icon" => "ni ni-folder-17", "subItems" => []],
        "configuracao" => ["label" => "Configuração do Sistema", "url" => "http://10.1.1.108:10000/", "target" => "_blank", "icon" => "ni ni-settings", "subItems" => []],
    ],
    "6" => [
        "dashboard" => [
            "label" => "Dashboards",
            "url" => "#",
            "icon" => "ni ni-chart-bar-32",
            "subItems" => [
                
            ]
        ],
        "gestaoPessoas" => ["label" => "Gestão de Pessoas", "url" => "../pages/gestaoPessoas.php", "icon" => "ni ni-circle-08", "subItems" => []],
        "configuracao" => ["label" => "Configuração do Sistema", "url" => "http://10.1.1.108:10000/", "target" => "_blank", "icon" => "ni ni-settings", "subItems" => []],
    ],
    "7" => [
        "dashboard" => [
            "label" => "Dashboards",
            "url" => "#",
            "icon" => "ni ni-chart-bar-32",
            "subItems" => [
                
            ]
        ],
        "espacoJasmim" => ["label" => "Espaco Jasmim", "url" => "../pages/espacoJasmin.php", "icon" => "ni ni-sound-wave", "subItems" => []],
        "espacoRosa" => ["label" => "Espaco Rosa", "url" => "../pages/espacoRosa.php", "icon" => "ni ni-sound-wave", "subItems" => []],
        "configuracao" => ["label" => "Configuração do Sistema", "url" => "http://10.1.1.108:10000/", "target" => "_blank", "icon" => "ni ni-settings", "subItems" => []],
    ],
    "8" => [
        "dashboard" => [
            "label" => "Dashboards",
            "url" => "#",
            "icon" => "ni ni-chart-bar-32",
            "subItems" => [
                
            ]
        ],
        "espacoJasmim" => ["label" => "Espaco Jasmim", "url" => "../pages/espacoJasmin.php", "icon" => "ni ni-sound-wave", "subItems" => []],
        "espacoRosa" => ["label" => "Espaco Rosa", "url" => "../pages/espacoRosa.php", "icon" => "ni ni-sound-wave", "subItems" => []],
        "configuracao" => ["label" => "Configuração do Sistema", "url" => "http://10.1.1.108:10000/", "target" => "_blank", "icon" => "ni ni-settings", "subItems" => []],
    ]
];

if (isset($_SESSION['funcao']) && array_key_exists($_SESSION['funcao'], $menuItems)) {
    echo '<ul class="navbar-nav">';
    foreach ($menuItems[$_SESSION['funcao']] as $menuKey => $menuItem) {
        if ($menuKey === "dropdown") {
            echoDropdownMenu($menuItem);
        } else {
            echoMenuItem($menuKey, $menuItem);
        }
    }
    echo '<li class="nav-item">';
    echo '<a class="nav-link" href="http://10.1.1.108/intranet/src/">Sair</a>';
    echo '</li>';
    echo '</ul>';
}
function echoDropdownMenu($menuItem) {
    echo '<li class="nav-item dropdown">';
    echo '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">';
    echo $menuItem['label'];
    echo '</a>';
    echo '<ul class="dropdown-menu" aria-labelledby="navbarDropdown">';
    
    foreach ($menuItem['subItems'] as $subItemLabel => $subItem) {
        if ($subItemLabel === 'divider') {
            echo '<li><hr class="dropdown-divider"></li>';
        } else {
            echo '<li><a class="dropdown-item" href="' . $subItem['url'] . '">' . $subItemLabel . '</a></li>';
        }
    }
    
    echo '</ul>';
    echo '</li>';
}



function echoMenuItem($menuKey, $menuItem) {
    echo '<li class="nav-item" id="' . $menuKey . '">';
    if (!empty($menuItem['subItems'])) {
        echo '<a data-bs-toggle="collapse" href="#dropdown' . $menuKey . '" class="nav-link d-flex align-items-center" aria-controls="' . $menuKey . '" role="button" aria-expanded="false">';
    } else {
        echo '<a class="nav-link d-flex align-items-center" href="' . $menuItem['url'] . '" target="' . ($menuItem['target'] ?? '') . '">';
    }
    echo '<div class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center me-2">';
    echo '<i class="ni ' . $menuItem['icon'] . ' text-secondary text-sm opacity-10"></i>';
    echo '</div>';
    echo '<span class="nav-link-text ms-1">' . $menuItem['label'] . '</span>';
    echo '</a>';
    if (!empty($menuItem['subItems'])) {
        echo '<div class="collapse" id="dropdown' . $menuKey . '">';
        echo '<ul class="nav ms-4">';
        foreach ($menuItem['subItems'] as $subItemLabel => $subItem) {
            echo '<li class="nav-item">';
            echo '<a class="nav-link" href="' . $subItem['url'] . '">';
            echo '<span class="sidenav-normal">' . $subItemLabel . '</span>';
            echo '</a>';
            echo '</li>';
        }
        echo '</ul>';
        echo '</div>';
    }
    echo '</li>';
}

?>
