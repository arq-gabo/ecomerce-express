const assert = require("assert");
const isRequireAjaxOrApi = require("../utils/isRequestAjaxOrApi");

describe("utils - isRequestAjaxOrApi", function(){
    describe("when req accepts html and is not xhr", function(){
        it("Should return false", function(){
            const req = {
                accepts: () => true,
                xhr: false
            };

            const result = isRequireAjaxOrApi(req);
            const expected = false;

            assert.strictEqual(result, expected);
        });
    });

    describe("When req doesn't accept html and is not an XMLHttpRequest", function(){
        it("Should return true", function(){
            const req = {
                accepts: () => false,
                xhr: false
            };

            const result = isRequireAjaxOrApi(req);
            const expected = true;

            assert.strictEqual(result, expected);
        });
    });

    describe("When req accepts html and is an XMLHttpRequest", function(){
        it("should return true", function(){
            const req = {
                accepts: () => true,
                xhr: true
            };

        const result = isRequireAjaxOrApi(req);
        const expected = true;

        assert.strictEqual(result, expected);
        });
    });
});