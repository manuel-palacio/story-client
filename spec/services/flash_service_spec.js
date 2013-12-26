describe("service: FlashService", function () {

    beforeEach(function () {
        module("app");
    });

    beforeEach(inject(function ($controller, $rootScope, FlashService) {
        this.rootScope = $rootScope;
        this.flashService = FlashService;
    }));


    describe("can set flash message", function () {
        it("should set a message", function () {
            this.flashService.show("hello");
            expect(this.rootScope.alert).toBe('hello');
        });
    });

    describe("can clear flash message", function () {
        it("should clear a message", function () {
            this.flashService.clear();
            expect(this.rootScope.alert).toBe(null);
        });
    });
});
