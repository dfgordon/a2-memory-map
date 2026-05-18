import Ajv from "ajv";
import * as assert from 'assert';
import * as memmap from "../../map.json";
import * as memmap_schema from "../../map.schema.json";

const ajv = new Ajv();

describe("json_schema", async function () {
    
    it("validate", async function () {
        if (!ajv.validate(memmap_schema, memmap)) {
            let report = "";
            if (ajv.errors) {
                for (const err of ajv.errors) {
                    report += err.message;
                    report += "\n";
                }
            }
            assert.fail(report)
        }
    });
});
