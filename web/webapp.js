
var app = angular.module('angularTranslateApp', [
 'pascalprecht.translate']);

//==========================================================================
// Angular translate
//==========================================================================
app.config(['$translateProvider', function($translateProvider) {

	var langMap = {'en-*': 'en', 'es-*': 'es', 'fr-*': 'fr'};

	$translateProvider
		.useSanitizeValueStrategy('escape')
		.useStaticFilesLoader({prefix: 'lang/', suffix: '.json'})
		.registerAvailableLanguageKeys(['es','en','fr'], langMap)
		// .fallbackLanguage(['en'])
		.uniformLanguageTag('bcp47')
		.determinePreferredLanguage()
}])

app.controller('mainController', ['$rootScope',
    '$scope',
    '$log',
    '$location',
    '$translate',
    function($rootScope,
        $scope,
        $log,
        $location,
        $translate
    ) {


    //==========================================================================
    // I18n / angular translate
    //==========================================================================

    $rootScope.availableLanguages = $translate.getAvailableLanguageKeys()
    $rootScope.currentLanguage =  $translate.use() || $translate.preferredLanguage()
    $rootScope.myLang = 'en'

    $rootScope.changeLanguage = function(lang){
    	console.log(lang)
        $rootScope.currentLanguage = lang
        $translate.use($rootScope.currentLanguage)
    }

}]);
