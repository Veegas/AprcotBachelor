(function() {
    'use strict';
    angular.module('aprcotApp', [
        'aprcotApp.common.services',
        'aprcotApp.common.controllers',
        'aprcotApp.common.directives',
        'aprcotApp.common.fileupload.controllers',
        'aprcotApp.common.fileupload.services',
        'aprcotApp.common.fileupload.directives',
        'aprcotApp.home.services',
        'aprcotApp.home.controllers',
        'aprcotApp.contact.services',
        'aprcotApp.contact.controllers',
        'aprcotApp.payment.controllers',
        'aprcotApp.facebook.services',
        'aprcotApp.facebook.controllers',
        'aprcotApp.campaign.services',
        'aprcotApp.campaign.controllers',
        'aprcotApp.application.controllers',
        'aprcotApp.application.services',
        'aprcotApp.application.directives',
        'aprcotApp.common.filters',
        'aprcotApp.analytics.controllers',
        'aprcotApp.analytics.services',
        'aprcotApp.directives.fieldDirective',
        'aprcotApp.directives.formDirective',

        'ngAnimate', /* because bootstrap */
        'ui.bootstrap.tpls',
        'ui.bootstrap',
        'ngResource',
        'ui.router',
        'ui.utils',
        'ui.bootstrap.datetimepicker',
        'pascalprecht.translate',
        'colorpicker.module',
        'angular-loading-bar',
        'angularMoment',
        'toaster',
        'uiGmapgoogle-maps',
        'ngAnalytics',
        'ngMessages',
        'angular-bind-html-compile',
        'ngFileUpload',
        'ngDraggable',
        'ngImgur'
    ]);

    // angular.module('aprcotApp.common.controllers.headerController', []);

    // Common module definitions
    angular.module('aprcotApp.home.services', []);
    angular.module('aprcotApp.home.controllers', []);

    angular.module('aprcotApp.contact.services', []);
    angular.module('aprcotApp.contact.controllers', []);

    angular.module('aprcotApp.payment.controllers', []);

    angular.module('aprcotApp.facebook.services', []);
    angular.module('aprcotApp.facebook.controllers', []);

    angular.module('aprcotApp.campaign.services', []);
    angular.module('aprcotApp.campaign.controllers', []);
    angular.module('aprcotApp.campaign.services', []);

    angular.module('aprcotApp.common.filters', []);

    angular.module('aprcotApp.common.services', []);
    angular.module('aprcotApp.common.controllers', []);
    angular.module('aprcotApp.common.directives', []);

    angular.module('aprcotApp.common.fileupload.controllers', []);
    angular.module('aprcotApp.common.fileupload.services', []);
    angular.module('aprcotApp.common.fileupload.directives', []);

    angular.module('aprcotApp.application.services', []);
    angular.module('aprcotApp.application.controllers', []);
    angular.module('aprcotApp.application.filters', []);
    angular.module('aprcotApp.application.directives', []);

    angular.module('aprcotApp.directives.fieldDirective', []);
    angular.module('aprcotApp.directives.formDirective', []);

    angular.module('aprcotApp.analytics.services', []);
    angular.module('aprcotApp.analytics.controllers', []);
})();
