'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">vrs-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-bc8839d23c4545a2015151ed479f80149d53f1094eff61654c7f02f75b0254b36f712b52445c5b0dd3eef8d765b90e57e70f590b530c009015afeebbe30533d8"' : 'data-bs-target="#xs-controllers-links-module-AppModule-bc8839d23c4545a2015151ed479f80149d53f1094eff61654c7f02f75b0254b36f712b52445c5b0dd3eef8d765b90e57e70f590b530c009015afeebbe30533d8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-bc8839d23c4545a2015151ed479f80149d53f1094eff61654c7f02f75b0254b36f712b52445c5b0dd3eef8d765b90e57e70f590b530c009015afeebbe30533d8"' :
                                            'id="xs-controllers-links-module-AppModule-bc8839d23c4545a2015151ed479f80149d53f1094eff61654c7f02f75b0254b36f712b52445c5b0dd3eef8d765b90e57e70f590b530c009015afeebbe30533d8"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-bc8839d23c4545a2015151ed479f80149d53f1094eff61654c7f02f75b0254b36f712b52445c5b0dd3eef8d765b90e57e70f590b530c009015afeebbe30533d8"' : 'data-bs-target="#xs-injectables-links-module-AppModule-bc8839d23c4545a2015151ed479f80149d53f1094eff61654c7f02f75b0254b36f712b52445c5b0dd3eef8d765b90e57e70f590b530c009015afeebbe30533d8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-bc8839d23c4545a2015151ed479f80149d53f1094eff61654c7f02f75b0254b36f712b52445c5b0dd3eef8d765b90e57e70f590b530c009015afeebbe30533d8"' :
                                        'id="xs-injectables-links-module-AppModule-bc8839d23c4545a2015151ed479f80149d53f1094eff61654c7f02f75b0254b36f712b52445c5b0dd3eef8d765b90e57e70f590b530c009015afeebbe30533d8"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-3db3fa5e7c1a1a5ade8c3afc402e31b996d685e41131541b48f9f6e9c63ac0de955dc79f8924d4db16177e9b392b3856a8f331114f3fa584bd1f84f86c04e27e"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-3db3fa5e7c1a1a5ade8c3afc402e31b996d685e41131541b48f9f6e9c63ac0de955dc79f8924d4db16177e9b392b3856a8f331114f3fa584bd1f84f86c04e27e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-3db3fa5e7c1a1a5ade8c3afc402e31b996d685e41131541b48f9f6e9c63ac0de955dc79f8924d4db16177e9b392b3856a8f331114f3fa584bd1f84f86c04e27e"' :
                                            'id="xs-controllers-links-module-AuthModule-3db3fa5e7c1a1a5ade8c3afc402e31b996d685e41131541b48f9f6e9c63ac0de955dc79f8924d4db16177e9b392b3856a8f331114f3fa584bd1f84f86c04e27e"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-3db3fa5e7c1a1a5ade8c3afc402e31b996d685e41131541b48f9f6e9c63ac0de955dc79f8924d4db16177e9b392b3856a8f331114f3fa584bd1f84f86c04e27e"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-3db3fa5e7c1a1a5ade8c3afc402e31b996d685e41131541b48f9f6e9c63ac0de955dc79f8924d4db16177e9b392b3856a8f331114f3fa584bd1f84f86c04e27e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-3db3fa5e7c1a1a5ade8c3afc402e31b996d685e41131541b48f9f6e9c63ac0de955dc79f8924d4db16177e9b392b3856a8f331114f3fa584bd1f84f86c04e27e"' :
                                        'id="xs-injectables-links-module-AuthModule-3db3fa5e7c1a1a5ade8c3afc402e31b996d685e41131541b48f9f6e9c63ac0de955dc79f8924d4db16177e9b392b3856a8f331114f3fa584bd1f84f86c04e27e"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReservationsModule.html" data-type="entity-link" >ReservationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ReservationsModule-89710955f939e43830e6653cae6834a28817db94ff8c241831a1b04ce0bd23b15dd18bc7607a1bc9b2f536c192c69c9e98d64796ec7d501aca95b3fb10ec58ff"' : 'data-bs-target="#xs-controllers-links-module-ReservationsModule-89710955f939e43830e6653cae6834a28817db94ff8c241831a1b04ce0bd23b15dd18bc7607a1bc9b2f536c192c69c9e98d64796ec7d501aca95b3fb10ec58ff"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReservationsModule-89710955f939e43830e6653cae6834a28817db94ff8c241831a1b04ce0bd23b15dd18bc7607a1bc9b2f536c192c69c9e98d64796ec7d501aca95b3fb10ec58ff"' :
                                            'id="xs-controllers-links-module-ReservationsModule-89710955f939e43830e6653cae6834a28817db94ff8c241831a1b04ce0bd23b15dd18bc7607a1bc9b2f536c192c69c9e98d64796ec7d501aca95b3fb10ec58ff"' }>
                                            <li class="link">
                                                <a href="controllers/ReservationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ReservationsModule-89710955f939e43830e6653cae6834a28817db94ff8c241831a1b04ce0bd23b15dd18bc7607a1bc9b2f536c192c69c9e98d64796ec7d501aca95b3fb10ec58ff"' : 'data-bs-target="#xs-injectables-links-module-ReservationsModule-89710955f939e43830e6653cae6834a28817db94ff8c241831a1b04ce0bd23b15dd18bc7607a1bc9b2f536c192c69c9e98d64796ec7d501aca95b3fb10ec58ff"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReservationsModule-89710955f939e43830e6653cae6834a28817db94ff8c241831a1b04ce0bd23b15dd18bc7607a1bc9b2f536c192c69c9e98d64796ec7d501aca95b3fb10ec58ff"' :
                                        'id="xs-injectables-links-module-ReservationsModule-89710955f939e43830e6653cae6834a28817db94ff8c241831a1b04ce0bd23b15dd18bc7607a1bc9b2f536c192c69c9e98d64796ec7d501aca95b3fb10ec58ff"' }>
                                        <li class="link">
                                            <a href="injectables/ReservationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservationsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoutesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoutesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StopsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StopsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoutesModule.html" data-type="entity-link" >RoutesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RoutesModule-ca5e6f8783b2ace766135626764c931b1ef8df80b3d2e4b3d10ed73ea2f82c16a4e0ebd995b38c8259cc79d6c270b9f024df29b83523993b8ea183b4c278bf53"' : 'data-bs-target="#xs-controllers-links-module-RoutesModule-ca5e6f8783b2ace766135626764c931b1ef8df80b3d2e4b3d10ed73ea2f82c16a4e0ebd995b38c8259cc79d6c270b9f024df29b83523993b8ea183b4c278bf53"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RoutesModule-ca5e6f8783b2ace766135626764c931b1ef8df80b3d2e4b3d10ed73ea2f82c16a4e0ebd995b38c8259cc79d6c270b9f024df29b83523993b8ea183b4c278bf53"' :
                                            'id="xs-controllers-links-module-RoutesModule-ca5e6f8783b2ace766135626764c931b1ef8df80b3d2e4b3d10ed73ea2f82c16a4e0ebd995b38c8259cc79d6c270b9f024df29b83523993b8ea183b4c278bf53"' }>
                                            <li class="link">
                                                <a href="controllers/RoutesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoutesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RoutesModule-ca5e6f8783b2ace766135626764c931b1ef8df80b3d2e4b3d10ed73ea2f82c16a4e0ebd995b38c8259cc79d6c270b9f024df29b83523993b8ea183b4c278bf53"' : 'data-bs-target="#xs-injectables-links-module-RoutesModule-ca5e6f8783b2ace766135626764c931b1ef8df80b3d2e4b3d10ed73ea2f82c16a4e0ebd995b38c8259cc79d6c270b9f024df29b83523993b8ea183b4c278bf53"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoutesModule-ca5e6f8783b2ace766135626764c931b1ef8df80b3d2e4b3d10ed73ea2f82c16a4e0ebd995b38c8259cc79d6c270b9f024df29b83523993b8ea183b4c278bf53"' :
                                        'id="xs-injectables-links-module-RoutesModule-ca5e6f8783b2ace766135626764c931b1ef8df80b3d2e4b3d10ed73ea2f82c16a4e0ebd995b38c8259cc79d6c270b9f024df29b83523993b8ea183b4c278bf53"' }>
                                        <li class="link">
                                            <a href="injectables/RoutesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoutesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StopsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StopsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SearchModule.html" data-type="entity-link" >SearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SearchModule-27c3c330459ea8e354e548b387d2d8a160c0b7b006717045baa9a1edfd958f8912fa145629b633dc703e41a493db6e3a9d6db6891adbb376e71fbc08b173e061"' : 'data-bs-target="#xs-controllers-links-module-SearchModule-27c3c330459ea8e354e548b387d2d8a160c0b7b006717045baa9a1edfd958f8912fa145629b633dc703e41a493db6e3a9d6db6891adbb376e71fbc08b173e061"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SearchModule-27c3c330459ea8e354e548b387d2d8a160c0b7b006717045baa9a1edfd958f8912fa145629b633dc703e41a493db6e3a9d6db6891adbb376e71fbc08b173e061"' :
                                            'id="xs-controllers-links-module-SearchModule-27c3c330459ea8e354e548b387d2d8a160c0b7b006717045baa9a1edfd958f8912fa145629b633dc703e41a493db6e3a9d6db6891adbb376e71fbc08b173e061"' }>
                                            <li class="link">
                                                <a href="controllers/SearchController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SearchModule-27c3c330459ea8e354e548b387d2d8a160c0b7b006717045baa9a1edfd958f8912fa145629b633dc703e41a493db6e3a9d6db6891adbb376e71fbc08b173e061"' : 'data-bs-target="#xs-injectables-links-module-SearchModule-27c3c330459ea8e354e548b387d2d8a160c0b7b006717045baa9a1edfd958f8912fa145629b633dc703e41a493db6e3a9d6db6891adbb376e71fbc08b173e061"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SearchModule-27c3c330459ea8e354e548b387d2d8a160c0b7b006717045baa9a1edfd958f8912fa145629b633dc703e41a493db6e3a9d6db6891adbb376e71fbc08b173e061"' :
                                        'id="xs-injectables-links-module-SearchModule-27c3c330459ea8e354e548b387d2d8a160c0b7b006717045baa9a1edfd958f8912fa145629b633dc703e41a493db6e3a9d6db6891adbb376e71fbc08b173e061"' }>
                                        <li class="link">
                                            <a href="injectables/RoutesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoutesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SearchService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StopsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StopsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StopsModule.html" data-type="entity-link" >StopsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-StopsModule-63803247e80be3386b9f1d623ef826ddb08d3533eff26426e90a69b7c25d88bc3fe60e7aa6ebe6e113030134262e55cdfe268bdba95c15bcf8a09e4cd0380a1b"' : 'data-bs-target="#xs-controllers-links-module-StopsModule-63803247e80be3386b9f1d623ef826ddb08d3533eff26426e90a69b7c25d88bc3fe60e7aa6ebe6e113030134262e55cdfe268bdba95c15bcf8a09e4cd0380a1b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StopsModule-63803247e80be3386b9f1d623ef826ddb08d3533eff26426e90a69b7c25d88bc3fe60e7aa6ebe6e113030134262e55cdfe268bdba95c15bcf8a09e4cd0380a1b"' :
                                            'id="xs-controllers-links-module-StopsModule-63803247e80be3386b9f1d623ef826ddb08d3533eff26426e90a69b7c25d88bc3fe60e7aa6ebe6e113030134262e55cdfe268bdba95c15bcf8a09e4cd0380a1b"' }>
                                            <li class="link">
                                                <a href="controllers/StopsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StopsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-StopsModule-63803247e80be3386b9f1d623ef826ddb08d3533eff26426e90a69b7c25d88bc3fe60e7aa6ebe6e113030134262e55cdfe268bdba95c15bcf8a09e4cd0380a1b"' : 'data-bs-target="#xs-injectables-links-module-StopsModule-63803247e80be3386b9f1d623ef826ddb08d3533eff26426e90a69b7c25d88bc3fe60e7aa6ebe6e113030134262e55cdfe268bdba95c15bcf8a09e4cd0380a1b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StopsModule-63803247e80be3386b9f1d623ef826ddb08d3533eff26426e90a69b7c25d88bc3fe60e7aa6ebe6e113030134262e55cdfe268bdba95c15bcf8a09e4cd0380a1b"' :
                                        'id="xs-injectables-links-module-StopsModule-63803247e80be3386b9f1d623ef826ddb08d3533eff26426e90a69b7c25d88bc3fe60e7aa6ebe6e113030134262e55cdfe268bdba95c15bcf8a09e4cd0380a1b"' }>
                                        <li class="link">
                                            <a href="injectables/StopsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StopsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-a8e0f7e3757b2c7c69ba98c4f6356ccf670192c3d73fff55f46b3c33e47b56b223aab56b3203c1683681b5e22c590d1a3cd99aec1663c5f1c995038a1f932884"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-a8e0f7e3757b2c7c69ba98c4f6356ccf670192c3d73fff55f46b3c33e47b56b223aab56b3203c1683681b5e22c590d1a3cd99aec1663c5f1c995038a1f932884"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-a8e0f7e3757b2c7c69ba98c4f6356ccf670192c3d73fff55f46b3c33e47b56b223aab56b3203c1683681b5e22c590d1a3cd99aec1663c5f1c995038a1f932884"' :
                                            'id="xs-controllers-links-module-UsersModule-a8e0f7e3757b2c7c69ba98c4f6356ccf670192c3d73fff55f46b3c33e47b56b223aab56b3203c1683681b5e22c590d1a3cd99aec1663c5f1c995038a1f932884"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-a8e0f7e3757b2c7c69ba98c4f6356ccf670192c3d73fff55f46b3c33e47b56b223aab56b3203c1683681b5e22c590d1a3cd99aec1663c5f1c995038a1f932884"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-a8e0f7e3757b2c7c69ba98c4f6356ccf670192c3d73fff55f46b3c33e47b56b223aab56b3203c1683681b5e22c590d1a3cd99aec1663c5f1c995038a1f932884"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-a8e0f7e3757b2c7c69ba98c4f6356ccf670192c3d73fff55f46b3c33e47b56b223aab56b3203c1683681b5e22c590d1a3cd99aec1663c5f1c995038a1f932884"' :
                                        'id="xs-injectables-links-module-UsersModule-a8e0f7e3757b2c7c69ba98c4f6356ccf670192c3d73fff55f46b3c33e47b56b223aab56b3203c1683681b5e22c590d1a3cd99aec1663c5f1c995038a1f932884"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ReservationsController.html" data-type="entity-link" >ReservationsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RoutesController.html" data-type="entity-link" >RoutesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SearchController.html" data-type="entity-link" >SearchController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/StopsController.html" data-type="entity-link" >StopsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Reservation.html" data-type="entity-link" >Reservation</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Route.html" data-type="entity-link" >Route</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Stop.html" data-type="entity-link" >Stop</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AuthLoginDto.html" data-type="entity-link" >AuthLoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthRegisterDto.html" data-type="entity-link" >AuthRegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReservationDto.html" data-type="entity-link" >CreateReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRouteDto.html" data-type="entity-link" >CreateRouteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateStopDto.html" data-type="entity-link" >CreateStopDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditReservationDto.html" data-type="entity-link" >EditReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditRouteDto.html" data-type="entity-link" >EditRouteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditStopDto.html" data-type="entity-link" >EditStopDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditUserDto.html" data-type="entity-link" >EditUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReservationsService.html" data-type="entity-link" >ReservationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoutesService.html" data-type="entity-link" >RoutesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SearchService.html" data-type="entity-link" >SearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StopsService.html" data-type="entity-link" >StopsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/JwtPayload.html" data-type="entity-link" >JwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginInterface.html" data-type="entity-link" >LoginInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReservationI.html" data-type="entity-link" >ReservationI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Route.html" data-type="entity-link" >Route</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Stop.html" data-type="entity-link" >Stop</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StopResponse.html" data-type="entity-link" >StopResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserFindOne.html" data-type="entity-link" >UserFindOne</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserI.html" data-type="entity-link" >UserI</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});