"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var os = require("os");
var request = require("request");
console.log('session');
var arg0 = process.argv[2];
initSession(arg0);
function initSession(initParam) {
    // var comps = initParam.split('@');
    // var jwtToken = comps[0];
    // var endpoint = comps[1];
    console.log('initSession');
    // console.log(endpoint);
    // console.log(jwtToken);
    var filename = getDxUserConfiguration();
    saveConfig(filename, endpoint, jwtToken);
    var config = loadConfig(filename);
    //testSession(endpoint, jwtToken);
    var jwtToken = config.token;
    var endpoint = config.endpoint;
    // console.log(endpoint);
    // console.log(jwtToken);    
    // testSession(endpoint, jwtToken);
}
function getDxConfigHomeDir() {
    // if Windows
    if (process.env.LOCALAPPDATA) {
        return path.join(process.env.LOCALAPPDATA, 'DXConfig');
    }
    // if Unix    
    return path.join(os.homedir(), '.dxconfig');
}
function getDxUserConfiguration() {
    var filename = 'configserver.json';
    // if Windows
    if (process.env.LOCALAPPDATA) {
        return path.join(process.env.LOCALAPPDATA, 'DXConfig', filename);
    }
    // if Unix    
    return path.join(os.homedir(), '.dxconfig', filename);
}
function hasConfig(filename) {
    return fs.existsSync(filename);
}
function saveConfig(filename, endpoint, jwtToken) {
    if (hasConfig(filename)) {
        console.log('file already exists');
        return;
    }
    var data = JSON.stringify({ endpoint: endpoint, token: jwtToken });
    fs.writeFileSync(filename, data);
}
function logoutConfig(filename) {
    fs.unlinkSync(filename);
}
function loadConfig(filename) {
    var data = fs.readFileSync(filename, 'utf8');
    return JSON.parse(data);
}
function testSession(endpoint, jwtToken) {
    console.log('endpoint: ' + endpoint);
    var authOptions = {
        auth: { bearer: jwtToken }
    };
    console.dir(authOptions);
    request
        .get(endpoint, authOptions)
        .on('error', function (err) {
        console.log(err);
    })
        .on('complete', function (r) { console.log('initSession:complete'); });
}
