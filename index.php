<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">

<head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-141207476-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'UA-141207476-1');
    </script>

    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="apple-touch-icon" sizes="120x120" href="./apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <link rel="stylesheet" type="text/css" href="css/bubbles.css?v=ag1">
    <link rel="stylesheet" type="text/css" href="css/waves.css?v=ag1">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js?v=ag1"
        integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="js/kin-sdk.min.js?v=ag1"></script>
    <script type="text/javascript" src="js/kin-blockchain.js?v=ag1"></script>
    <title>Kin Transaction Viewer</title>
    <meta property="og:title" content="Kin Transaction Visualizer" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://kin-bubbles.herokuapp.com/" />
    <meta property="og:image" content="https://i.imgur.com/Vi37RlM.png" />
    <meta property="og:description" content="Transaction visualizer for the Kin blockchain" />
</head>

<body>
    <!-- start waves-->
    <div class="header">
        <!--Content before waves-->
        <div class="inner-header flex">
            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzJweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgNzIgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU3ICg4MzA3NykgLSBodHRwczovL3NrZXRjaC5jb20gLS0+CiAgICA8dGl0bGU+TE9HTy9TTUFMTC9XaGl0ZSBDb3B5PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkxPR08vU01BTEwvV2hpdGUiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8ZyBpZD0iS2luX2xvZ29fUkdCLTA0LUNvcHkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTE1Ljc4MTMzMzMsMTEuODY5MzMzMyBMMTUuNzgxMzMzMywxMi4wMTYgQzE1Ljc4NzE5OTMsMTQuMTA1OTI0MSAxNy40ODA3MzksMTUuNzk4MjcyIDE5LjU3MDY2NjcsMTUuODAyNjY2NyBMMjEuNjUwNjY2NywxNS44MDI2NjY3IEMyMi41MTIyMzA5LDE1LjgwMjY2NjcgMjMuMjEwNjY2NywxNi41MDExMDI1IDIzLjIxMDY2NjcsMTcuMzYyNjY2NyBMMjMuMjEwNjY2NywyMy43NjI2NjY3IEwxNi43MTQ2NjY3LDIzLjc2MjY2NjcgQzE1Ljg1MzEwMjUsMjMuNzYyNjY2NyAxNS4xNTQ2NjY3LDIzLjA2NDIzMDkgMTUuMTU0NjY2NywyMi4yMDI2NjY3IEwxNS4xNTQ2NjY3LDE5LjU3ODY2NjcgQzE1LjE0ODgxNDcsMTcuNDg5MzQ0NCAxMy40NTczMTc3LDE1Ljc5NjY1NjEgMTEuMzY4LDE1Ljc4OTMzMzMgTDExLjIyMTMzMzMsMTUuNzg5MzMzMyBDOS4xMzIwMTU2OCwxNS43OTY2NTYxIDcuNDQwNTE4NjIsMTcuNDg5MzQ0NCA3LjQzNDY2NjY3LDE5LjU3ODY2NjcgTDcuNDM0NjY2NjcsMjMuNzYyNjY2NyBMMC4xNzMzMzMzMzMsMjMuNzYyNjY2NyBMMC4xNzMzMzMzMzMsMC4xMzMzMzMzMzMgTDcuNDM0NjY2NjcsMC4xMzMzMzMzMzMgTDcuNDM0NjY2NjcsNC4zNjggQzcuNDM5MDYxMzgsNi40NTc5Mjc2OSA5LjEzMTQwOTI1LDguMTUxNDY3MzYgMTEuMjIxMzMzMyw4LjE1NzMzMzMzIEwxMS4zNjgsOC4xNTczMzMzMyBDMTMuNDU3OTI0MSw4LjE1MTQ2NzM2IDE1LjE1MDI3Miw2LjQ1NzkyNzY5IDE1LjE1NDY2NjcsNC4zNjggTDE1LjE1NDY2NjcsMS43MDEzMzMzMyBDMTUuMTU0NjY2NywxLjI4NzU5NTYxIDE1LjMxOTAyMzMsMC44OTA4MDM1MDUgMTUuNjExNTgwMSwwLjU5ODI0Njc1NSBDMTUuOTA0MTM2OCwwLjMwNTY5MDAwNCAxNi4zMDA5Mjg5LDAuMTQxMzMzMzMzIDE2LjcxNDY2NjcsMC4xNDEzMzMzMzMgTDIzLjIsMC4xNDEzMzMzMzMgTDIzLjIsNi41NDEzMzMzMyBDMjMuMiw3LjQwMjg5NzU0IDIyLjUwMTU2NDIsOC4xMDEzMzMzMyAyMS42NCw4LjEwMTMzMzMzIEwxOS41Niw4LjEwMTMzMzMzIEMxNy40ODE0NzQ3LDguMTExNDg5MSAxNS43OTczNjQ3LDkuNzkwODQ1MDggMTUuNzgxMzMzMywxMS44NjkzMzMzIEwxNS43ODEzMzMzLDExLjg2OTMzMzMgWiIgaWQ9IlBhdGgiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHBvaW50cz0iMzkuMTI4IDAuMTMzMzMzMzMzIDM5LjEyOCAyMy43NTIgMzIuMjY2NjY2NyAyMy43NTIgMzIuMjY2NjY2NyAwLjEzMzMzMzMzMyI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTcxLjI2NCwwLjA1NTk5NTExNCBMNzEuMjY0LDIzLjc1MjAwMDEgTDY0Ljk4NCwyMy43NTIwMDAxIEM2NC40NzM0MDcsMjMuNzUyMDAwMSA2My45OTUxNDI5LDIzLjUwMjEyIDYzLjcwNCwyMy4wODI2NjY3IEw1NC44MzczMzMzLDEwLjM1MiBMNTQuODM3MzMzMywyMy43NTIwMDAxIEw0OC4xNzA2NjY3LDIzLjc1MjAwMDEgTDQ4LjE3MDY2NjcsMC4wNTU5OTUxMTQgTDU0LjQ1NiwwLjA1NTk5NTExNCBDNTQuOTY2MjExOCwwLjA1NDcyMjkwNDcgNTUuNDQ0NTc2MSwwLjMwMzg3MDk2MyA1NS43MzYsMC43MjI2NjY2NjcgTDY0LjYsMTMuNDUzMzMzMyBMNjQuNiwwLjA1NTk5NTExNCBMNzEuMjY0LDAuMDU1OTk1MTE0IFoiIGlkPSJQYXRoIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="
        font-family:verdana;
        alt="Icon" class="styles__icon-unbmdd-3 JDyIO">
            <h2 class="app-name"></h2>
            <table id="stats-table" style="display:none;">
                <tr>
                    <td class="left-align card-stats" colspan="2">
                        <div class="app-name"></div>
                    </td>
                    <td class="left-align" colspan="2">
                        <div>Kin Ecosystem</div>
                    </td>
                </tr>
                <tr>
                    <td class="right-align app-kin" style="width:100px;">
                        <div id="app-kin"></div>
                    </td>
                    <td class="left-align" style="width:120px;">
                        <small>Kin/s</small>
                    </td>
                    <td class="right-align"  style="width:20px;">
                        <div id="ecosystem-kin"></div>
                    </td>
                    <td class="left-align" style="width:50px;">
                        <small>Kin/s</small>
                    </td>
                </tr>
                <tr>
                    <td class="right-align app-accounts">
                        <div id="app-accounts"></div>
                    </td>
                    <td class="left-align">
                        <small>New users/s</small>
                    </td>
                    <td class="right-align">
                        <div id="ecosystem-accounts"></div>
                    </td>
                    <td class="left-align"  style="width:110px;">
                        <small>New users/s</small>
                    </td>
                </tr>
                <tr>
                    <td class="right-align app-spends">
                        <div id="app-spends"></div>
                    </td>
                    <td class="left-align">
                        <small>Spends/s</small>
                    </td>
                    <td class="right-align">
                        <div id="ecosystem-spends"></div>
                    </td>
                    <td class="left-align">
                        <small>Spends/s</small>
                    </td>
                </tr>
            </table>
        </div>

        <!--Waves Container-->
        <div>
            <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                    <path id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g class="parallax">
                    <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                    <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                    <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                    <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
                </g>
            </svg>
        </div>
        <!--Waves end-->

    </div>
    <!--Header ends-->

    <!--Content starts-->
    <div class="content">
        <div class="top" id="bubble-stats"></div>
        <div class="bottom" id="bubbles"></div>
    </div>
    <!--Content ends-->
    <script src="js/helper.js?v=ag1"></script>
    <script src="js/anime.min.js?v=ag1"></script>
    <script src="js/balls.js?v=ag1"></script>
    <style id="progress-modifier">

    </style>
</body>

</html>