angular.module('app', ['ionic', 'ionic.service.core'])

// app startup

.run(function($ionicPlatform, $rootScope) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if(window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});

})

// ApiUrl = 'http://192.168.2.187';
// ApiUrl = '/ada';

.constant('ApiUrl','/ada')

// define services

.factory('viewConfig', function() {
	var viewConfig = {};

	viewConfig.TRF = {
		mainView: ["Plaka"],
		mainViewSub: [],
		detailedView: ["Sigortali","Plaka","PoliceNo","Marka","FfrkSir","Bitis"]
	};

	viewConfig.BES = {};
	viewConfig.DSK = {};
	viewConfig.HAY = {};
	viewConfig.KKO = viewConfig.TRF;

	viewConfig.KZA = {
		mainView: ["PoliceNo"],
		mainViewSub: [],
		detailedView: ["Sigortali", "FfrkSir", "PoliceNo", "Bitis", "Brans"]
	};

	viewConfig.MHE = {};
	viewConfig.NAK = {};
	viewConfig.SAG = {};
	viewConfig.YNG = {};

	return viewConfig;
})

.factory('viewService', function($rootScope, viewConfig) {
	var viewService = {};

	viewService.userInfo = false;

	viewService.currentView = {};

	viewService.prepareView = function(passed) {
		switch(passed) {
			case "BES":
			viewService.currentView.title = "Bireysel Emeklilik";
			viewService.currentView.policeler = viewService.userInfo.BES;
			viewService.currentView.views = viewConfig.BES ;
			break;
			case "DSK":
			viewService.currentView.title = "Dask";
			viewService.currentView.policeler = viewService.userInfo.DSK;
			viewService.currentView.views = viewConfig.DSK ;
			break;
			case "HAY":
			viewService.currentView.title = "Hayat Sigortası";
			viewService.currentView.policeler = viewService.userInfo.HAY;
			viewService.currentView.views = viewConfig.HAY ;
			break;
			case "KKO":
			viewService.currentView.title = "Kasko";
			viewService.currentView.policeler = viewService.userInfo.KKO;
			viewService.currentView.views = viewConfig.KKO ;
			break;
			case "KZA":
			viewService.currentView.title = "Kaza Sigortası";
			viewService.currentView.policeler = viewService.userInfo.KZA;
			viewService.currentView.views = viewConfig.KZA ;
			break;
			case "MHE":
			viewService.currentView.title = "Mühendislik Sigortası";
			viewService.currentView.policeler = viewService.userInfo.MHE;
			viewService.currentView.views = viewConfig.MHE ;
			break;
			case "NAK":
			viewService.currentView.title = "Nakliyat Sigortası";
			viewService.currentView.policeler = viewService.userInfo.NAK;
			viewService.currentView.views = viewConfig.NAK ;
			break;
			case "SAG":
			viewService.currentView.title = "Sağlık Sigortası";
			viewService.currentView.policeler = viewService.userInfo.SAG;
			viewService.currentView.views = viewConfig.SAG ;
			break;
			case "TRF":
			viewService.currentView.title = "Trafik Sigortası";
			viewService.currentView.policeler = viewService.userInfo.TRF;
			viewService.currentView.views = viewConfig.TRF ;
			break;
			case "YNG":
			viewService.currentView.title = "Yangın Sigortası";
			viewService.currentView.policeler = viewService.userInfo.YNG;
			viewService.currentView.views = viewConfig.YNG ;
			break;
		}
	};

	return viewService;
})

.factory('webService', function($http, viewService, $ionicLoading, ApiUrl, $ionicPopup) {
	var webService, loginJson, ApiUrl

	webService = {};
	loginJson = ['Uluc','UlucSen159'];

	webService.serverAsk = function (query,query1) {
		$ionicLoading.show({
		    template: 'Giriş yapılıyor...'
		  });
		$http.post(ApiUrl + '/Login.GirisYap.aaw', loginJson).
		then(function(response) {
			query();
		}, function(response) {
			$ionicPopup.alert({
				title: 'Hata!',
				template: 'Bağlantı kurulamadı.'
			});
		}).
		finally(function() {
			$ionicLoading.hide();
			query1();
		});
	};

	webService.placePoliceler = function(JsonData) {
		for (var i = JsonData.length - 1; i >= 0; i--) {
			switch (JsonData[i].PolGrp) {
				case "BES":
					viewService.userInfo.BES.unshift(JsonData[i]);
					break;
				case "DSK":
					viewService.userInfo.DSK.unshift(JsonData[i]);
					break;
				case "HAY":
					viewService.userInfo.HAY.unshift(JsonData[i]);
					break;
				case "KKO":
					viewService.userInfo.KKO.unshift(JsonData[i]);
					break;
				case "KZA":
					viewService.userInfo.KZA.unshift(JsonData[i]);
					break;
				case "MHE":
					viewService.userInfo.MHE.unshift(JsonData[i]);
					break;
				case "NAK":
					viewService.userInfo.NAK.unshift(JsonData[i]);
					break;
				case "SAG":
					viewService.userInfo.SAG.unshift(JsonData[i]);
					break;
				case "TRF":
					viewService.userInfo.TRF.unshift(JsonData[i]);
					break;
				case "YNG":
					viewService.userInfo.YNG.unshift(JsonData[i]);
					break;
			}
			viewService.userInfo.ready= true;
		};
	};

	return webService;
})

// define controllers

.controller('loginController', function(viewService,$state,$rootScope,$http,$scope,webService,ApiUrl,$ionicPopup) {

	var init = function() {
		viewService.userInfo = {
			BES: [],
			DSK: [],
			HAY: [],
			KKO: [],
			KZA: [],
			MHE: [],
			NAK: [],
			SAG: [],
			TRF: [],
			YNG: []
		};

		// put this back on when server is online

		$http.post(ApiUrl + '/Police.PoliceAra.aaw', ['4810494813']).
		then(function(response2) {
			webService.placePoliceler(response2.data);
		}, function(response2) {
			alert(response2);
		});
		
		// workaround for offline server

		// var exData = {"data":[{"FprkPol":41936,"Tanzim":"2015-08-12T00:00:00","Baslangic":"2015-08-25T00:00:00","Bitis":"2016-08-25T00:00:00","Brans":"108","PolGrp":"TRF","PoliceNo":"8421306","TecditNo":"0","ZeyilNo":"","FfrkSir":10,"FfrkMus":3053,"FfrkTa":3053,"FfrkSat":5546,"FfrkSor":0,"Sigortali":"İHSAN EKİNCİ","SigortaEttiren":"İHSAN EKİNCİ","Plaka":"06BY8462","TeklifDurumu":0,"Il":6,"Ilce":"MAMAK","FyrlkDrm":1,"PolTek":1,"FfrkTt":0,"FpolTip":0,"FTcKimNo":"58024511590","FVerKimNo":"","FSeTcKimNo":"58024511590","FSeVergiNo":"","Marka":"","FfrkMizBlg":0,"GrupSigortaliKimlikNoListesi":""},{"FprkPol":38199,"Tanzim":"2015-05-22T00:00:00","Baslangic":"2015-05-07T00:00:00","Bitis":"2015-07-31T00:00:00","Brans":"143","PolGrp":"KZA","PoliceNo":"305196713","TecditNo":"01","ZeyilNo":"01","FfrkSir":5,"FfrkMus":41,"FfrkTa":0,"FfrkSat":4258,"FfrkSor":0,"Sigortali":"İHSAN EKİNCİ","SigortaEttiren":"TEPE İŞ SAĞLIĞI VE GÜVENLİĞİ HİZMETLERİ A.Ş.","Plaka":"","TeklifDurumu":0,"Il":999,"Ilce":"","FyrlkDrm":3,"PolTek":1,"FfrkTt":0,"FpolTip":0,"FTcKimNo":"58024511590","FVerKimNo":"","FSeTcKimNo":"","FSeVergiNo":"8390546737","Marka":"","FfrkMizBlg":0,"GrupSigortaliKimlikNoListesi":""},{"FprkPol":38198,"Tanzim":"2015-05-22T00:00:00","Baslangic":"2015-05-07T00:00:00","Bitis":"2015-07-31T00:00:00","Brans":"143","PolGrp":"KZA","PoliceNo":"305196713","TecditNo":"01","ZeyilNo":"","FfrkSir":5,"FfrkMus":3053,"FfrkTa":3053,"FfrkSat":5546,"FfrkSor":0,"Sigortali":"İHSAN EKİNCİ","SigortaEttiren":"","Plaka":"","TeklifDurumu":0,"Il":6,"Ilce":"MAMAK","FyrlkDrm":3,"PolTek":1,"FfrkTt":0,"FpolTip":0,"FTcKimNo":"58024511590","FVerKimNo":"","FSeTcKimNo":"","FSeVergiNo":"","Marka":"","FfrkMizBlg":0,"GrupSigortaliKimlikNoListesi":""}],"status":200,"config":{"method":"POST","transformRequest":[null],"transformResponse":[null],"url":"/ada/Police.PoliceAra.aaw","data":["58024511590"],"headers":{"Accept":"application/json,\ntext/plain,\n*/*","Content-Type":"application/json;charset=utf-8"}},"statusText":"OK"};
		// webService.placePoliceler(exData.data);
		// $state.go('policeSelector');

	};

	var initThen = function() {
		$state.go('policeSelector');
	};

	$scope.loginRoutine = function (userName,pass) {
		// POST the data to login server
		// assume this is the success callback
		$rootScope.session = {
			userID : userName,
			userPass : pass
		};
	
		// put this back on when server is online
		webService.serverAsk(init,initThen);

		// workaround for offline server
		// init();

	};
})

.controller('policeSelector', function($scope, viewService, $state) {
	$scope.policeTurleri = ["BES", "DSK", "HAY", "KKO", "KZA", "MHE", "NAK", "SAG", "TRF", "YNG"];
	$scope.userInfo = viewService.userInfo;

	$scope.moveToType = function(tur) {
		viewService.prepareView(tur);
		$state.go('genericPolice');
	};
})

.controller('policeController', function($scope,$ionicModal,$state,viewService) {

	$scope.policeler = viewService.currentView.policeler;
	$scope.title =  viewService.currentView.title;
	$scope.views = viewService.currentView.views;

	$scope.viewDetails = function(police) {
		$state.go('policeDetaylari', {viewData: police, viewConf: $scope.views.detailedView});
	}

	$ionicModal.fromTemplateUrl('kasko-modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
		});

	$scope.openModal = function() {
		$scope.modal.show();
	};
	$scope.closeModal = function() {
		$scope.modal.hide();
	};

	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});
	// Execute action on hide modal
	$scope.$on('modal.hidden', function() {
		// Execute action
	});
	// Execute action on remove modal
	$scope.$on('modal.removed', function() {
		// Execute action

	});
})

.controller('pdController', function($scope,$stateParams) {

	$scope.police = $stateParams.viewData;
	$scope.conf = $stateParams.viewConf;

})

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
		
		.state('page1', {
			url: '',
			templateUrl: 'page1.html'
		})
		
		.state('page2', {
			url: '/login',
			templateUrl: 'page2.html',
			controller: 'loginController as loginc'
		})
		
		.state('policeSelector', {
			url: '/policeSelector',
			templateUrl: 'page3.html',
			controller : 'policeSelector'
		})

		.state('genericPolice', {
			url: '/policeler',
			templateUrl: 'genericPolice.html',
			controller: 'policeController'
		})

		.state('policeDetaylari', {
			url: '/detay',
			templateUrl: 'policeDetay.html',
			controller: 'pdController',
			params: { 
				viewData: null,
				viewConf: null
			}
		});
	
	$urlRouterProvider.otherwise('');
	

});

