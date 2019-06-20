var chai = require('chai');

const assert = chai.assert;
const { compare, createSortedIncludedData } = require('../js/mainNode');
const testData = require('./testData.json')


describe('Compare(a, b): -1 == a < b || 1 == a > b ', () => {
    it('EC2 & EBS = 1', () => {
        let testData1 = { id: "EC2" }
        let testData2 = { id: "EBS" }
        let result = compare(testData1, testData2);
        assert.equal(result, 1)
    })

    it('S3 & VPC = -1', () => {
        let testData1 = { id: "S3" }
        let testData2 = { id: "VPC" }
        let result = compare(testData1, testData2);
        assert.equal(result, -1)
    })

    it('azure-storage & AWS = 1', () => {
        let testData1 = { id: "azure-storage" }
        let testData2 = { id: "AWS" }
        let result = compare(testData1, testData2);
        assert.equal(result, 1)
    })
})

describe('createSortedIncludedData(includedData)', () => {
    let includedData = testData.included
    let result = createSortedIncludedData(includedData);
    it('sorted contains correct id', () => {
        chai.expect(result).to.have.nested.include({ "EC2[0].id": "EC2-001" })
    })
    it('sorted contains correct attribute', () => {
        chai.expect(result).to.have.nested.include({ "EC2[0].attributes.title": "Security Group Port Range" })
    })
})

describe('', () => {
    
})
