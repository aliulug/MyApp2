describe('Testing webService', function(){
  var webService, httpBackend;

  beforeEach(module('app'));
  beforeEach(function(){

    inject(function(_webService_,$httpBackend,_$rootScope_){
      webService = _webService_;
      httpBackend = $httpBackend;
      $rootScope = _$rootScope_;
    });
  });

  it('should have a serverAsk function', function() {
    expect(angular.isFunction(webService.serverAsk)).toBe(true);
  });

  describe('serverAsk', function() {

    beforeEach(function() {
      webService.temp = 0;

      query = function() {
        webService.temp = {"a":'aa'};
      };

      httpBackend.when('POST', '/ada/Login.GirisYap.aaw')
      .respond({things : 'and stuff'});

      httpBackend.when('GET').respond('hello');
    });

    it('should return an object', function() {
      webService.serverAsk(query);

      expect(webService.temp).toBeDefined();
      httpBackend.flush();
    });
    
  });

  describe('placePoliceler', function() {
    it('should correctly place JSON into userInfo', function() {

      $rootScope.userInfo = {
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

      var exJson = {"data":[{"FprkPol":41936,"Tanzim":"2015-08-12T00:00:00","Baslangic":"2015-08-25T00:00:00","Bitis":"2016-08-25T00:00:00","Brans":"108","PolGrp":"TRF","PoliceNo":"8421306","TecditNo":"0","ZeyilNo":"","FfrkSir":10,"FfrkMus":3053,"FfrkTa":3053,"FfrkSat":5546,"FfrkSor":0,"Sigortali":"İHSAN EKİNCİ","SigortaEttiren":"İHSAN EKİNCİ","Plaka":"06BY8462","TeklifDurumu":0,"Il":6,"Ilce":"MAMAK","FyrlkDrm":1,"PolTek":1,"FfrkTt":0,"FpolTip":0,"FTcKimNo":"58024511590","FVerKimNo":"","FSeTcKimNo":"58024511590","FSeVergiNo":"","Marka":"","FfrkMizBlg":0,"GrupSigortaliKimlikNoListesi":""},{"FprkPol":38199,"Tanzim":"2015-05-22T00:00:00","Baslangic":"2015-05-07T00:00:00","Bitis":"2015-07-31T00:00:00","Brans":"143","PolGrp":"KZA","PoliceNo":"305196713","TecditNo":"01","ZeyilNo":"01","FfrkSir":5,"FfrkMus":41,"FfrkTa":0,"FfrkSat":4258,"FfrkSor":0,"Sigortali":"İHSAN EKİNCİ","SigortaEttiren":"TEPE İŞ SAĞLIĞI VE GÜVENLİĞİ HİZMETLERİ A.Ş.","Plaka":"","TeklifDurumu":0,"Il":999,"Ilce":"","FyrlkDrm":3,"PolTek":1,"FfrkTt":0,"FpolTip":0,"FTcKimNo":"58024511590","FVerKimNo":"","FSeTcKimNo":"","FSeVergiNo":"8390546737","Marka":"","FfrkMizBlg":0,"GrupSigortaliKimlikNoListesi":""},{"FprkPol":38198,"Tanzim":"2015-05-22T00:00:00","Baslangic":"2015-05-07T00:00:00","Bitis":"2015-07-31T00:00:00","Brans":"143","PolGrp":"KZA","PoliceNo":"305196713","TecditNo":"01","ZeyilNo":"","FfrkSir":5,"FfrkMus":3053,"FfrkTa":3053,"FfrkSat":5546,"FfrkSor":0,"Sigortali":"İHSAN EKİNCİ","SigortaEttiren":"","Plaka":"","TeklifDurumu":0,"Il":6,"Ilce":"MAMAK","FyrlkDrm":3,"PolTek":1,"FfrkTt":0,"FpolTip":0,"FTcKimNo":"58024511590","FVerKimNo":"","FSeTcKimNo":"","FSeVergiNo":"","Marka":"","FfrkMizBlg":0,"GrupSigortaliKimlikNoListesi":""}],"status":200,"config":{"method":"POST","transformRequest":[null],"transformResponse":[null],"url":"/ada/Police.PoliceAra.aaw","data":["58024511590"],"headers":{"Accept":"application/json,\ntext/plain,\n*/*","Content-Type":"application/json;charset=utf-8"}},"statusText":"OK"};

      webService.placePoliceler(exJson.data);

      expect($rootScope.userInfo.BES).toEqual([]);
      expect($rootScope.userInfo.DSK).toEqual([]);
      expect($rootScope.userInfo.HAY).toEqual([]);
      expect($rootScope.userInfo.KKO).toEqual([]);
      expect($rootScope.userInfo.KZA).toEqual([{"FprkPol":38199,"Tanzim":"2015-05-22T00:00:00","Baslangic":"2015-05-07T00:00:00","Bitis":"2015-07-31T00:00:00","Brans":"143","PolGrp":"KZA","PoliceNo":"305196713","TecditNo":"01","ZeyilNo":"01","FfrkSir":5,"FfrkMus":41,"FfrkTa":0,"FfrkSat":4258,"FfrkSor":0,"Sigortali":"İHSAN EKİNCİ","SigortaEttiren":"TEPE İŞ SAĞLIĞI VE GÜVENLİĞİ HİZMETLERİ A.Ş.","Plaka":"","TeklifDurumu":0,"Il":999,"Ilce":"","FyrlkDrm":3,"PolTek":1,"FfrkTt":0,"FpolTip":0,"FTcKimNo":"58024511590","FVerKimNo":"","FSeTcKimNo":"","FSeVergiNo":"8390546737","Marka":"","FfrkMizBlg":0,"GrupSigortaliKimlikNoListesi":""},{"FprkPol":38198,"Tanzim":"2015-05-22T00:00:00","Baslangic":"2015-05-07T00:00:00","Bitis":"2015-07-31T00:00:00","Brans":"143","PolGrp":"KZA","PoliceNo":"305196713","TecditNo":"01","ZeyilNo":"","FfrkSir":5,"FfrkMus":3053,"FfrkTa":3053,"FfrkSat":5546,"FfrkSor":0,"Sigortali":"İHSAN EKİNCİ","SigortaEttiren":"","Plaka":"","TeklifDurumu":0,"Il":6,"Ilce":"MAMAK","FyrlkDrm":3,"PolTek":1,"FfrkTt":0,"FpolTip":0,"FTcKimNo":"58024511590","FVerKimNo":"","FSeTcKimNo":"","FSeVergiNo":"","Marka":"","FfrkMizBlg":0,"GrupSigortaliKimlikNoListesi":""}].reverse());
      expect($rootScope.userInfo.MHE).toEqual([]);
      expect($rootScope.userInfo.NAK).toEqual([]);
      expect($rootScope.userInfo.SAG).toEqual([]);
      expect($rootScope.userInfo.TRF).toEqual([{"FprkPol":41936,"Tanzim":"2015-08-12T00:00:00","Baslangic":"2015-08-25T00:00:00","Bitis":"2016-08-25T00:00:00","Brans":"108","PolGrp":"TRF","PoliceNo":"8421306","TecditNo":"0","ZeyilNo":"","FfrkSir":10,"FfrkMus":3053,"FfrkTa":3053,"FfrkSat":5546,"FfrkSor":0,"Sigortali":"İHSAN EKİNCİ","SigortaEttiren":"İHSAN EKİNCİ","Plaka":"06BY8462","TeklifDurumu":0,"Il":6,"Ilce":"MAMAK","FyrlkDrm":1,"PolTek":1,"FfrkTt":0,"FpolTip":0,"FTcKimNo":"58024511590","FVerKimNo":"","FSeTcKimNo":"58024511590","FSeVergiNo":"","Marka":"","FfrkMizBlg":0,"GrupSigortaliKimlikNoListesi":""}]);
      expect($rootScope.userInfo.YNG).toEqual([]);
    });
  });

});

describe('Testing viewService', function() {

  beforeEach(module('app'));
  beforeEach(function(){

    inject(function(_$rootScope_){
      $rootScope = _$rootScope_;
    });
  });

  it
});

describe('Testing controllers: ', function() {

  beforeEach(module('app'));

  var $controller;
 
  // This function will be called before every "it" block.
  // This should be used to "reset" state for your tests.
  beforeEach(function (){

    inject(function(_$controller_) {
      
      $controller = _$controller_;

    });
  });

  describe('loginController', function() {
    var $scope, $rootScope, ctrl

    beforeEach(function(){
      $scope = {};
      $rootScope = {};
      ctrl = $controller('loginController', {$scope: $scope, $rootScope: $rootScope});
    });

    it('should start with empty session', function() {
  
      expect($rootScope.session).not.toBeDefined();
  
    });
    
    describe('loginRoutine', function() {

      beforeEach(function() {
        $scope.loginRoutine('foo','bar');
      });

      it('should fill session', function (){
        
        expect($rootScope.session).toBeDefined();
      });

      it('session should contain userID and userPass', function() {

        expect($rootScope.session.userID).toBeDefined();
        expect($rootScope.session.userPass).toBeDefined();
      });

    });
  });


});