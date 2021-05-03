const axios = require('axios');
const Config = require('../config.json');

const ENDPOINTS = {
    search: '/search'
};

class Jira
{
    async search(version) {
        const params = {
            'jql': 'project%20%3D%20SP%20AND%20status%20in%20(%22Claimed%20Fixed%22%2C%20%22In%20Pre-Testing%22)%20AND%20updated%20%3E%3D%20-24h%20ORDER%20BY%20created%20DESC',
            'maxResults': 100,
            'startAt': 0
        };

        if (version) {
            params.jql = `project%20%3D%20SP%20AND%20status%20in%20(%22Claimed%20Fixed%22%2C%20%22In%20Pre-Testing%22)%20AND%20%22Fixed%20In%20Version%5BNumber%5D%22%20%3D%20%22${version}%22%20ORDER%20BY%20created%20DESC`;
        }

        const issues = [];
        const httpParams = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
        const url = `${Config.jira.baseUrl}${ENDPOINTS.search}?${httpParams}`;
        let response = null;

        do {
            response = await axios(url);

            issues.push(...response.data.issues);
            params.startAt += 100;
        } while (response.data.issues.length > 99 && response.data.total > 100);

        return issues;
    }
}

module.exports = new Jira();