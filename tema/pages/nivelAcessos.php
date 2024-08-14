<?php
// Criado por: Josélio Dias Mendonça

include_once '../services/connection/conexao-login.php';

$menuItems = [
    "0" => [
        "dashboard" => ["label" => "Dashboards", "url" => "#", "icon" => "fas fa-fw fa-tachometer-alt", "subItems" => []],
        "arquivo" => ["label" => "Arquivo", "url" => "../pages/arquivo.php", "icon" => "fa-solid fa-file", "subItems" => []],
        "configuracao" => ["label" => "Configuração do Sistema", "url" => "http://10.1.1.108:10000/", "target" => "_blank", "icon" => "fas fa-fw fa-wrench", "subItems" => []],
    ],
    "1" => [
        "dashboard" => [
            "label" => "Dashboards",
            "url" => "#",
            "icon" => "fas fa-fw fa-tachometer-alt",
            "subItems" => [
                "Tecnologia da informação" => ["url" => "../pages/dashboard.php", "icon" => "ni ni-chart-bar-32"],
                "Laboratório" => ["url" => "../pages/dashboardLab.php", "icon" => "ni ni-chart-bar-32"],
                "Agência Tranfusional" => ["url" => "../pages/dashAgenciaTranfusional.php", "icon" => "ni ni-favourite-28"],
                "Nir-Eletivas" => ["url" => "../pages/dashboardNir.php", "icon" => "ni ni-chart-bar-32"],
                "Utin" => ["url" => "../pages/dashboardUtin.php", "icon" => "ni ni-chart-bar-32"],
                "Internação" => ["url" => "../pages/dashboardInter.php", "icon" => "ni ni-chart-bar-32"],
            ]
        ],
        "cadastro" => ["label" => "Cadastros", "url" => "../pages/cadastros.php", "icon" => "fas fa-laptop", "subItems" => []],
        "arquivo" => ["label" => "Arquivo", "url" => "../pages/arquivo.php", "icon" => "fas fa-file", "subItems" => []],
        "laboratorio" => ["label" => "Laboratório", "url" => "../pages/laboratorio.php", "icon" => "fas fa-flask", "subItems" => []],
        "Nir-Eletivas" => ["label" => "Nir Eletivas", "url" => "../pages/nir.php", "icon" => "fas fa-folder-open", "subItems" => []],
        "cadastaVagas" => ["label" => "Vagas internas", "url" => "../pages/cadastrarVagas.php", "icon" => "fas fa-table", "subItems" => []],
        "espacoJasmim" => ["label" => "Espaco Jasmim", "url" => "../pages/espacoJasmin.php", "icon" => "fas fa-user-nurse", "subItems" => []],
        "espacoRosa" => ["label" => "Espaco Rosa", "url" => "../pages/espacoRosa.php", "icon" => "fas fa-user-nurse", "subItems" => []],
        "gestaoPessoas" => ["label" => "Catracas", "url" => "../pages/gestaoPessoas.php", "icon" => "fas fa-user", "subItems" => []],
        "controleUsuario" => ["label" => "Cadastro de pessoas", "url" => "../pages/cadastrarUser.php", "icon" => "fas fa-users", "subItems" => []],
        "configuracao" => ["label" => "Configuração do Sistema", "url" => "http://10.1.1.108:10000/", "target" => "_blank", "icon" => "fas fa-fw fa-wrench", "subItems" => []],
    ],
    "2" => [
        "dashboard" => ["label" => "Dashboards", "url" => "", "icon" => "fas fa-fw fa-tachometer-alt", "subItems" => []],
        "laboratorio" => ["label" => "Laboratório", "url" => "../pages/laboratorio.php", "icon" => "fas fa-flask", "subItems" => []],
        "Agência Tranfusional" => ["label" => "Agência Tranfusional","url" => "../pages/dashAgenciaTranfusional.php", "icon" => "ni ni-favourite-28"],
        "configuracao" => ["label" => "Configuração do Sistema", "url" => "http://10.1.1.108:10000/", "target" => "_blank", "icon" => "fas fa-fw fa-wrench", "subItems" => []],
    ],
    "3" => [
        "dashboard" => [
            "label" => "Dashboards",
            "url" => "#",
            "icon" => "fas fa-fw fa-tachometer-alt",
            "subItems" => [
                "Laboratório" => ["url" => "../pages/dashboardLab.php", "icon" => "ni ni-chart-bar-32"],
                "Agência Tranfusional" => ["url" => "../pages/dashAgenciaTranfusional.php", "icon" => "ni ni-favourite-28"]
                ]
        ],
        "laboratorio" => ["label" => "Laboratório", "url" => "../pages/laboratorio.php", "icon" => "fas fa-flask", "subItems" => []],
        "configuracao" => ["label" => "Configuração do Sistema", "url" => "http://10.1.1.108:10000/", "target" => "_blank", "icon" => "fas fa-fw fa-wrench", "subItems" => []],
    ],
    "4" => [
        "dashboard" => [
            "label" => "Dashboards",
            "url" => "#",
            "icon" => "fas fa-fw fa-tachometer-alt",
            "subItems" => [
                "Nir Eletivas" => ["url" => "../pages/dashboardNir.php", "icon" => "ni ni-chart-bar-32"],
            ]
        ],
        "Nir Eletivas" => ["label" => "Nir Eletivas", "url" => "../pages/nir.php", "icon" => "fas fa-folder-open", "subItems" => []],
        "configuracao" => ["label" => "Configuração do Sistema", "url" => "http://10.1.1.108:10000/", "target" => "_blank", "icon" => "fas fa-fw fa-wrench", "subItems" => []],
    ],
    "5" => [
        "dashboard" => [
            "label" => "Dashboards",
            "url" => "#",
            "icon" => "fas fa-fw fa-tachometer-alt",
            "subItems" => [
                
            ]
        ],
        "Nir Eletivas" => ["label" => "Nir Eletivas", "url" => "../pages/nir.php", "icon" => "fas fa-folder-open", "subItems" => []],
        "configuracao" => ["label" => "Configuração do Sistema", "url" => "http://10.1.1.108:10000/", "target" => "_blank", "icon" => "fas fa-fw fa-wrench", "subItems" => []],
    ],
    "6" => [
        "dashboard" => [
            "label" => "Dashboards",
            "url" => "#",
            "icon" => "fas fa-fw fa-tachometer-alt",
            "subItems" => [
                
            ]
        ],
        "gestaoPessoas" => ["label" => "Catracas", "url" => "../pages/gestaoPessoas.php", "icon" => "fas fa-user", "subItems" => []],
        "configuracao" => ["label" => "Configuração do Sistema", "url" => "http://10.1.1.108:10000/", "target" => "_blank", "icon" => "fas fa-fw fa-wrench", "subItems" => []],
    ],
    "7" => [
        "dashboard" => [
            "label" => "Dashboards",
            "url" => "#",
            "icon" => "fas fa-fw fa-tachometer-alt",
            "subItems" => [
                
            ]
        ],
        "espacoJasmim" => ["label" => "Espaco Jasmim", "url" => "../pages/espacoJasmin.php", "icon" => "fas fa-user-nurse", "subItems" => []],
        "espacoRosa" => ["label" => "Espaco Rosa", "url" => "../pages/espacoRosa.php", "icon" => "fas fa-user-nurse", "subItems" => []],
        "configuracao" => ["label" => "Configuração do Sistema", "url" => "http://10.1.1.108:10000/", "target" => "_blank", "icon" => "fas fa-fw fa-wrench", "subItems" => []],
    ],
    "8" => [
        "dashboard" => [
            "label" => "Dashboards",
            "url" => "#",
            "icon" => "fas fa-fw fa-tachometer-alt",
            "subItems" => [
                
            ]
        ],
        "espacoJasmim" => ["label" => "Espaco Jasmim", "url" => "../pages/espacoJasmin.php", "icon" => "fas fa-user-nurse", "subItems" => []],
        "espacoRosa" => ["label" => "Espaco Rosa", "url" => "../pages/espacoRosa.php", "icon" => "fas fa-user-nurse", "subItems" => []],
        "configuracao" => ["label" => "Configuração do Sistema", "url" => "http://10.1.1.108:10000/", "target" => "_blank", "icon" => "fas fa-fw fa-wrench", "subItems" => []],
    ]
];

if (isset($_SESSION['funcao']) && array_key_exists($_SESSION['funcao'], $menuItems)) {
    echo '<ul class="navbar-nav">';
    foreach ($menuItems[$_SESSION['funcao']] as $menuKey => $menuItem) {
        if (!empty($menuItem['subItems'])) {
            echoDropdownMenu($menuKey, $menuItem);
        } else {
            echoMenuItem($menuKey, $menuItem);
        }
    }
    echo '</ul>';
}

function echoDropdownMenu($menuKey, $menuItem) {
    echo '<li class="nav-item">';
    echo '<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapse' . $menuKey . '" aria-expanded="true" aria-controls="collapse' . $menuKey . '">';
    echo '<i class="ni ' . $menuItem['icon'] . '"></i>';
    echo '<span>' . $menuItem['label'] . '</span>';
    echo '</a>';
    echo '<div id="collapse' . $menuKey . '" class="collapse" aria-labelledby="heading' . $menuKey . '" data-parent="#accordionSidebar">';
    echo '<div class="bg-white py-2 collapse-inner rounded">';
    foreach ($menuItem['subItems'] as $subItemLabel => $subItem) {
        echo '<a class="collapse-item" href="' . $subItem['url'] . '">';
        echo '<i class="ni ' . $subItem['icon'] . '"></i>';
        echo '<span>' . $subItemLabel . '</span>';
        echo '</a>';
    }
    echo '</div>';
    echo '</div>';
    echo '</li>';
}

function echoMenuItem($menuKey, $menuItem) {
    echo '<li class="nav-item">';
    echo '<a class="nav-link" href="' . $menuItem['url'] . '" target="' . ($menuItem['target'] ?? '') . '">';
    echo '<i class="ni ' . $menuItem['icon'] . '"></i>';
    echo '<span>' . $menuItem['label'] . '</span>';
    echo '</a>';
    echo '</li>';
}
?>
