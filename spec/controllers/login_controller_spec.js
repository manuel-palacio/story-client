describe("controller: LoginController ($httpBackend.expect().respond, vanilla jasmine, javascript)", function () {

    beforeEach(function () {
        module("app");
    });

    beforeEach(inject(function ($controller, $rootScope, $location, AuthenticationService, $httpBackend) {
        this.$location = $location;
        this.$httpBackend = $httpBackend;
        this.scope = $rootScope.$new();
        this.redirect = spyOn($location, 'path');
        $controller('LoginCtrl', {
            $scope: this.scope,
            AuthenticationService: AuthenticationService
        });
    }));

    afterEach(function () {
        this.$httpBackend.verifyNoOutstandingRequest();
        this.$httpBackend.verifyNoOutstandingExpectation();
    });

    describe("successfully logging in", function () {
        it("should redirect you to /story", function () {
            this.$httpBackend.expectPOST('/TrelloLiteGrails/auth/logIn', {credentials: {username: "", password: ""}}).respond(200);
            this.scope.login();
            this.$httpBackend.flush();
            expect(this.redirect).toHaveBeenCalledWith('/story');
        });
    });

    describe("could not log in", function () {
        it("should redirect you to /login", function () {
            this.$httpBackend.expectPOST('/TrelloLiteGrails/auth/logIn', {credentials: {username: "", password: ""}}).respond(401);
            this.scope.login();
            this.$httpBackend.flush();
            expect(this.redirect).toHaveBeenCalledWith('/login');
        });
    });
});
