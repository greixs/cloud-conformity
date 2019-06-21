// var jsdom = require('mocha-jsdom');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var chai = require('chai');

const assert = chai.assert;
const expect = chai.expect;
const { compare, createSortedIncludedData, createLists, createSubLists } = require('../js/main.JS');
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

describe('createLists(arrayDict)', () => {
    // create mock browser window
    const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body>
                            <div id="links" class="split container my-5"></div>
                        </body></html>`);

    global.window = dom.window;
    global.document = dom.window.document;

    // attach elements to the document
    createLists(testData);

    // get the html after calling the function
    let result = global.document.body.innerHTML;

    it('contains correct ACM title and link', function () {
        expect(result).to.be.a('string')
            .that.contains('https://www.cloudconformity.com/conformity-rules/ACM')
            .and.contains("ACM");
    })
})

describe('createSubLists(items, headerUrl)', () => {
    // create mock browser window
    const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body>
                            <div id="links" class="split container my-5"></div>
                        </body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;

    // test input and expected output
    let testItem = [{ "type": "rules", "id": "ACM-001", "attributes": { "name": "CertificateExpired", "description": "Ensure expired SSL/TLS certificates are removed from AWS Certificate Manager", "title": "ACM Certificate Expired", "categories": ["security", "operational-excellence"], "compliances": ["AWAF", "PCI", "APRA", "MAS"], "risk-level": "HIGH", "slug": "expired-certificate", "package": "security", "rtm": false, "level": "resource", "release-date": "2017-01-01", "update-date": "2019-06-03", "provider": "aws" } }, { "type": "rules", "id": "ACM-002", "attributes": { "name": "CertificateExpiry7Days", "description": "Ensure Amazon Certificate Manager (ACM) certificates are renewed before their expiration", "title": "AWS ACM Certificates Renewal (7 days before expiration)", "categories": ["security"], "compliances": ["AWAF", "PCI", "APRA", "MAS"], "risk-level": "HIGH", "slug": "certificate-expires-in-7-days", "package": "security", "rtm": false, "level": "resource", "release-date": "2017-01-01", "update-date": "2019-06-03", "provider": "aws" } }, { "type": "rules", "id": "ACM-003", "attributes": { "name": "CertificateExpiry30Days", "description": "Ensure Amazon Certificate Manager (ACM) certificates are renewed before their expiration", "title": "AWS ACM Certificates Renewal (30 days before expiration)", "categories": ["security"], "compliances": ["AWAF", "PCI", "APRA", "MAS"], "risk-level": "MEDIUM", "slug": "certificate-expires-in-30-days", "package": "security", "rtm": false, "level": "resource", "release-date": "2017-01-01", "update-date": "2019-06-03", "provider": "aws" } }, { "type": "rules", "id": "ACM-004", "attributes": { "name": "CertificateExpiry45Days", "description": "Ensure Amazon Certificate Manager (ACM) certificates are renewed before their expiration", "title": "AWS ACM Certificates Renewal (45 days before expiration)", "categories": ["security"], "compliances": ["AWAF", "PCI", "APRA", "MAS"], "risk-level": "LOW", "slug": "certificate-expires-in-45-days", "package": "security", "rtm": false, "level": "resource", "release-date": "2017-01-01", "update-date": "2019-06-03", "provider": "aws" } }, { "type": "rules", "id": "ACM-005", "attributes": { "name": "CertificateValidity", "description": "Ensure that the requests for Amazon Certificate Manager (ACM) certificates are validated", "title": "AWS ACM Certificates Validity", "categories": ["security", "operational-excellence"], "compliances": ["AWAF", "PCI", "APRA", "MAS"], "risk-level": "MEDIUM", "slug": "certificate-validity", "package": "security", "rtm": false, "level": "resource", "release-date": "2017-01-01", "update-date": "2019-06-03", "provider": "aws" } }, { "type": "rules", "id": "ACM-006", "attributes": { "name": "CertificatesWithWildcardDomainNames", "description": "Ensure that ACM single domain name certificates are used instead of wildcard certificates", "title": "AWS ACM Certificates with Wildcard Domain Names", "categories": ["security", "operational-excellence"], "compliances": ["AWAF", "APRA", "MAS"], "risk-level": "LOW", "slug": "wildcard-domain-name", "package": "security", "rtm": false, "level": "resource", "release-date": "2018-04-09", "update-date": "2019-06-03", "provider": "aws" } }]
    let testUrl = "https://www.cloudconformity.com/conformity-rules/ACM"
    let expectedTitle = "ACM Certificate Expired"
    let expectedUrl = "https://www.cloudconformity.com/conformity-rules/ACM/expired-certificate.html"

    // create sublists
    let result = createSubLists(testItem, testUrl).innerHTML

    it('contains correct name and link', () => {
        expect(result).to.be.a('string')
            .that.contains(expectedUrl)
            .and.contains(expectedTitle);
    })
})
