import fs = require('fs');
import os = require('os');
import path = require('path');

const GLOBALCONFIGSERVER = 'configserver.json';
const DXCONFIG_WINDOWS = 'DXConfig';
const DXCONFIG_LINUX = '.dxconfig';
const LOCALCONFIG = 'dxconfig.json';


export function readJson(filename) {
    var data = fs.readFileSync(filename, 'utf8');
    return JSON.parse(data);
}

export function writeJson(filename, json) {
    var data = JSON.stringify(json, null, ' ');
    fs.writeFileSync(filename, data);
}

export function readFile(filename) {
    var data = fs.readFileSync(filename, 'utf8');
    return data;
}

export function writeFile(filename, data) {
    fs.writeFileSync(filename, data);
}

export function existFile(filename) {
    return fs.existsSync(filename);
}

export function deleteFile(filename) {
    fs.unlinkSync(filename);
}

export function getGlobalConfigPath() {    
    if( process.env.LOCALAPPDATA ) {
        // Windows
        // path = %APPDATA%\DXConfig\configserver.json
        return path.join(process.env.LOCALAPPDATA, DXCONFIG_WINDOWS, GLOBALCONFIGSERVER);
    } else {
        // Linux
        // path = /home/<user>/.dxconfig/configserver.json
        return path.join(os.homedir(), DXCONFIG_LINUX, GLOBALCONFIGSERVER);        
    }    
}
export function getLocalConfigPath() {
    // load dxconfig.json in the current folder
    return LOCALCONFIG;
}

export function getDxConfigHomeDir() {
    // if Windows
    if( process.env.LOCALAPPDATA ) {
        return path.join(process.env.LOCALAPPDATA, 'DXConfig');
    } 
    
    // if Unix    
    return path.join(os.homedir(), '.dxconfig');    
}

export function getDxUserConfiguration() {
    var filename = 'configserver.json';
    // if Windows
    if( process.env.LOCALAPPDATA ) {
        return path.join(process.env.LOCALAPPDATA, 'DXConfig', filename);
    } 
    
    // if Unix    
    return path.join(os.homedir(), '.dxconfig', filename);    
}

function hasConfig(filename) {
    return fs.existsSync(filename);
}

export function saveConfig(filename, endpoint, jwtToken) {

    if(hasConfig(filename)) {
        console.log('file already exists')
        return;
    }

    var data = JSON.stringify({ endpoint: endpoint, token: jwtToken });
    fs.writeFileSync(filename, data);
}

function logoutConfig(filename) {
    fs.unlinkSync(filename);
}

export function loadConfig(filename) {
    var data = fs.readFileSync(filename, 'utf8');
    return JSON.parse(data);
}
