/**
 * API RESTful for OSSEC
 * Copyright (C) 2015-2016 Wazuh, Inc.All rights reserved.
 * Wazuh.com
 *
 * This program is a free software; you can redistribute it
 * and/or modify it under the terms of the GNU General Public
 * License (version 2) as published by the FSF - Free Software
 * Foundation.
 */


var router = require('express').Router();

/**
 * @api {get} /agents Get all agents
 * @apiName GetAgents
 * @apiGroup Info
 *
 * @apiParam {Number} [offset] First element to return in the collection.
 * @apiParam {Number} [limit=500] Maximum number of elements to return.
 * @apiParam {String} [sort] Sorts the collection by a field or fields (separated by comma). Use +/- at the begining to ascending or descending order.
 * @apiParam {String} [search] Looks for elements with the specified string.
 * @apiParam {string="active","never connected", "disconnected"} [status] Filters by agent status.
 *
 * @apiDescription Returns a list with the available agents.
 *
 * @apiExample {curl} Example usage:
 *     curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents?pretty&offset=0&limit=5&sort=-ip,name"
 *
 */
router.get('/', cache(), function(req, res) {
    logger.debug(req.connection.remoteAddress + " GET /agents");

    req.apicacheGroup = "agents";

    var data_request = {'function': '/agents', 'arguments': {}};
    var filters = {'offset': 'numbers', 'limit': 'numbers', 'sort':'sort_param', 'search':'search_param', 'status':'alphanumeric_param'};

    if (!filter.check(req.query, filters, req, res))  // Filter with error
        return;

    if ('offset' in req.query)
        data_request['arguments']['offset'] = req.query.offset;
    if ('limit' in req.query)
        data_request['arguments']['limit'] = req.query.limit;
    if ('sort' in req.query)
        data_request['arguments']['sort'] = filter.sort_param_to_json(req.query.sort);
    if ('search' in req.query)
        data_request['arguments']['search'] = filter.search_param_to_json(req.query.search);
    if ('status' in req.query)
        data_request['arguments']['status'] = req.query.status;

    execute.exec(python_bin, [wazuh_control], data_request, function (data) { res_h.send(req, res, data); });
})

/**
 * @api {get} /agents/summary Get agents summary
 * @apiName GetAgentsSummary
 * @apiGroup Info
 *
 *
 * @apiDescription Returns a summary of the available agents.
 *
 * @apiExample {curl} Example usage:
 *     curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/summary?pretty"
 *
 */
router.get('/summary', cache(), function(req, res) {
    logger.debug(req.connection.remoteAddress + " GET /agents/summary");

    req.apicacheGroup = "agents";

    var data_request = {'function': '/agents/summary', 'arguments': {}};
    execute.exec(python_bin, [wazuh_control], data_request, function (data) { res_h.send(req, res, data); });
})

/**
 * @api {get} /profiles Get profiles
 * @apiName GetAgentProfiles
 * @apiGroup Profiles
 *
 * @apiParam {Number} [offset] First element to return in the collection.
 * @apiParam {Number} [limit=500] Maximum number of elements to return.
 * @apiParam {String} [sort] Sorts the collection by a field or fields (separated by comma). Use +/- at the begining to ascending or descending order.
 * @apiParam {String} [search] Looks for elements with the specified string.
 *
 * @apiDescription Returns a list with the existing profiles.
 *
 * @apiExample {curl} Example usage:
 *     curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/profiles?pretty"
 *
 */
router.get('/profiles', cache(), function(req, res) {
    logger.debug(req.connection.remoteAddress + " GET /agents/profiles");

    req.apicacheGroup = "agents";

    var data_request = {'function': '/agents/profiles', 'arguments': {}};
    var filters = {'offset': 'numbers', 'limit': 'numbers', 'sort':'sort_param', 'search':'search_param'};

    if (!filter.check(req.query, filters, req, res))  // Filter with error
        return;

    if ('offset' in req.query)
        data_request['arguments']['offset'] = req.query.offset;
    if ('limit' in req.query)
        data_request['arguments']['limit'] = req.query.limit;
    if ('sort' in req.query)
        data_request['arguments']['sort'] = filter.sort_param_to_json(req.query.sort);
    if ('search' in req.query)
        data_request['arguments']['search'] = filter.search_param_to_json(req.query.search);

    execute.exec(python_bin, [wazuh_control], data_request, function (data) { res_h.send(req, res, data); });
})

/**
 * @api {get} /profiles/:profile_id Get agents in the profile
 * @apiName GetAgentProfileID
 * @apiGroup Profiles
 *
 * @apiParam {String} profile_id Profile ID.
 * @apiParam {Number} [offset] First element to return in the collection.
 * @apiParam {Number} [limit=500] Maximum number of elements to return.
 * @apiParam {String} [sort] Sorts the collection by a field or fields (separated by comma). Use +/- at the begining to ascending or descending order.
 * @apiParam {String} [search] Looks for elements with the specified string.
 *
 * @apiDescription Returns a list of agents with the profile specified
 *
 * @apiExample {curl} Example usage:
 *     curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/profiles/myprofile?pretty"
 *
 */
router.get('/profiles/:profile_id', cache(), function(req, res) {
    logger.debug(req.connection.remoteAddress + " GET /agents/profiles/:profile_id");

    req.apicacheGroup = "agents";

    var data_request = {'function': '/agents/profiles/:profile_id', 'arguments': {}};
    var filters = {'offset': 'numbers', 'limit': 'numbers', 'sort':'sort_param', 'search':'search_param'};

    if (!filter.check(req.params, {'profile_id':'names'}, req, res))  // Filter with error
        return;

    data_request['arguments']['profile_id'] = req.params.profile_id;


    if (!filter.check(req.query, filters, req, res))  // Filter with error
        return;

    if ('offset' in req.query)
        data_request['arguments']['offset'] = req.query.offset;
    if ('limit' in req.query)
        data_request['arguments']['limit'] = req.query.limit;
    if ('sort' in req.query)
        data_request['arguments']['sort'] = filter.sort_param_to_json(req.query.sort);
    if ('search' in req.query)
        data_request['arguments']['search'] = filter.search_param_to_json(req.query.search);

    execute.exec(python_bin, [wazuh_control], data_request, function (data) { res_h.send(req, res, data); });
})

/**
 * @api {get} /profiles/:profile_id/configuration Get profile configuration
 * @apiName GetAgentProfileConfiguration
 * @apiGroup Profiles
 *
 * @apiParam {String} profile_id Profile ID.
 *
 * @apiDescription Returns the profile configuration (agent.conf)
 *
 * @apiExample {curl} Example usage:
 *     curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/profiles/myprofile/configuration?pretty"
 *
 */
router.get('/profiles/:profile_id/configuration', cache(), function(req, res) {
    logger.debug(req.connection.remoteAddress + " GET /agents/profiles/:profile_id/configuration");

    req.apicacheGroup = "agents";

    var data_request = {'function': '/agents/profiles/:profile_id/configuration', 'arguments': {}};

    if (!filter.check(req.params, {'profile_id':'names'}, req, res))  // Filter with error
        return;

    data_request['arguments']['profile_id'] = req.params.profile_id;

    execute.exec(python_bin, [wazuh_control], data_request, function (data) { res_h.send(req, res, data); });
})

/**
 * @api {get} /profiles/:profile_id/files Get profile files
 * @apiName GetAgentProfileFiles
 * @apiGroup Profiles
 *
 * @apiParam {String} profile_id Profile ID.
 *
 * @apiDescription Returns the profile files
 *
 * @apiExample {curl} Example usage:
 *     curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/profiles/myprofile/files?pretty"
 *
 */
router.get('/profiles/:profile_id/files', cache(), function(req, res) {
    logger.debug(req.connection.remoteAddress + " GET /agents/profiles/:profile_id/files");

    req.apicacheGroup = "agents";

    var data_request = {'function': '/agents/profiles/:profile_id/files', 'arguments': {}};

    if (!filter.check(req.params, {'profile_id':'names'}, req, res))  // Filter with error
        return;

    data_request['arguments']['profile_id'] = req.params.profile_id;

    execute.exec(python_bin, [wazuh_control], data_request, function (data) { res_h.send(req, res, data); });
})

/**
 * @api {get} /agents/:agent_id Get an agent
 * @apiName GetAgentsID
 * @apiGroup Info
 *
 * @apiParam {Number} agent_id Agent ID.
 *
 * @apiDescription Returns the information of an agent.
 *
 * @apiExample {curl} Example usage:
 *     curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/000?pretty"
 *
 */
router.get('/:agent_id', cache(), function(req, res) {
    logger.debug(req.connection.remoteAddress + " GET /agents/:agent_id");

    req.apicacheGroup = "agents";

    var data_request = {'function': '/agents/:agent_id', 'arguments': {}};

    if (!filter.check(req.params, {'agent_id':'numbers'}, req, res))  // Filter with error
        return;

    data_request['arguments']['agent_id'] = req.params.agent_id;

    execute.exec(python_bin, [wazuh_control], data_request, function (data) { res_h.send(req, res, data); });

})

/**
 * @api {get} /agents/:agent_id/key Get agent key
 * @apiName GetAgentsKey
 * @apiGroup Key
 *
 * @apiParam {Number} agent_id Agent ID.
 *
 * @apiDescription Returns the key of an agent.
 *
 * @apiExample {curl} Example usage:
 *     curl -u foo:bar -k -X GET "https://127.0.0.1:55000/agents/001/key?pretty"
 *
 */
router.get('/:agent_id/key', function(req, res) {
    logger.debug(req.connection.remoteAddress + " GET /agents/:agent_id/key");

    var data_request = {'function': '/agents/:agent_id/key', 'arguments': {}};

    if (!filter.check(req.params, {'agent_id':'numbers'}, req, res))  // Filter with error
        return;

    data_request['arguments']['agent_id'] = req.params.agent_id;

    execute.exec(python_bin, [wazuh_control], data_request, function (data) { res_h.send(req, res, data); });
})

/**
 * @api {put} /agents/restart Restart all agents
 * @apiName PutAgentsRestart
 * @apiGroup Restart
 *
 * @apiDescription Restarts all agents.
 *
 * @apiExample {curl} Example usage*:
 *     curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/agents/restart?pretty"
 *
 */
router.put('/restart', function(req, res) {
    logger.debug(req.connection.remoteAddress + " PUT /agents/restart");

    var data_request = {'function': 'PUT/agents/restart', 'arguments': {}};

    data_request['arguments']['restart_all'] = 'True';

    execute.exec(python_bin, [wazuh_control], data_request, function (data) { res_h.send(req, res, data); });
})


/**
 * @api {put} /agents/:agent_id/restart Restart an agent
 * @apiName PutAgentsRestartId
 * @apiGroup Restart
 *
 * @apiParam {Number} agent_id Agent unique ID.
 *
 * @apiDescription Restarts the agent.
 *
 * @apiExample {curl} Example usage*:
 *     curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/agents/000/restart?pretty"
 *
 */
router.put('/:agent_id/restart', function(req, res) {
    logger.debug(req.connection.remoteAddress + " PUT /agents/:agent_id/restart");

    var data_request = {'function': 'PUT/agents/:agent_id/restart', 'arguments': {}};

    if (!filter.check(req.params, {'agent_id':'numbers'}, req, res))  // Filter with error
        return;

    data_request['arguments']['agent_id'] = req.params.agent_id;

    execute.exec(python_bin, [wazuh_control], data_request, function (data) { res_h.send(req, res, data); });
})

/**
 * @api {put} /agents/:agent_name Add agent (quick method)
 * @apiName PutAddAgentName
 * @apiGroup Add
 *
 * @apiParam {String} agent_name Agent name.
 *
 * @apiDescription Adds a new agent with name :agent_name. This agent will use ANY as IP.
 *
 * @apiExample {curl} Example usage:
 *     curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/agents/myNewAgent?pretty"
 *
 */
router.put('/:agent_name', function(req, res) {
    logger.debug(req.connection.remoteAddress + " PUT /agents/:agent_name");

    var data_request = {'function': 'PUT/agents/:agent_name', 'arguments': {}};

    if (!filter.check(req.params, {'agent_name':'names'}, req, res))  // Filter with error
        return;

    data_request['arguments']['name'] = req.params.agent_name;

    execute.exec(python_bin, [wazuh_control], data_request, function (data) { res_h.send(req, res, data); });
})

/**
 * @api {put} /agents/:agent_id/profiles/:profile_id Assign profile to agent
 * @apiName PutProfileAgent
 * @apiGroup Profiles
 *
 * @apiParam {Number} agent_id Agent unique ID.
 * @apiParam {String} profile_id Pofile ID.
 *
 * @apiDescription Assing the profile :profile_id to the agent.
 *
 * @apiExample {curl} Example usage:
 *     curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/agents/001/profiles/newProfile?pretty"
 *
 */
router.put('/:agent_id/profile/:profile_id', function(req, res) {
    logger.debug(req.connection.remoteAddress + " PUT /agents/:agent_id/profile/:profile_id");

    var data_request = {'function': 'PUT/agents/:agent_id/profile/:profile_id', 'arguments': {}};
    var filters = {'agent_id':'numbers', 'profile_id':'names'};

    if (!filter.check(req.params, filters, req, res))  // Filter with error
        return;

    data_request['arguments']['agent_id'] = req.params.agent_id;
    data_request['arguments']['profile_id'] = req.params.profile_id;

    execute.exec(python_bin, [wazuh_control], data_request, function (data) { res_h.send(req, res, data); });
})


/**
 * @api {delete} /agents/:agent_id Delete an agent
 * @apiName DeleteAgentId
 * @apiGroup Delete
 *
 * @apiParam {Number} agent_id Agent ID.
 *
 * @apiDescription Removes an agent. You must restart OSSEC after removing an agent.
 *
 * @apiExample {curl} Example usage:
 *     curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/agents/002?pretty"
 *
 */
router.delete('/:agent_id', function(req, res) {
    logger.debug(req.connection.remoteAddress + " DELETE /agents/:agent_id");

    var data_request = {'function': 'DELETE/agents/:agent_id', 'arguments': {}};

    if (!filter.check(req.params, {'agent_id':'numbers'}, req, res))  // Filter with error
        return;

    data_request['arguments']['agent_id'] = req.params.agent_id;

    execute.exec(python_bin, [wazuh_control], data_request, function (data) { res_h.send(req, res, data); });
})

/**
 * @api {delete} /agents/:agent_id/profile Delete the profile of the agent
 * @apiName DeleteProfileAgent
 * @apiGroup Profiles
 *
 * @apiParam {Number} agent_id Agent ID.
 *
 * @apiDescription Remove the profile of the agent. The profile will be 'default'.
 *
 * @apiExample {curl} Example usage:
 *     curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/agents/002/profile?pretty"
 *
 */
router.delete('/:agent_id/profile', function(req, res) {
    logger.debug(req.connection.remoteAddress + " DELETE /agents/:agent_id/profile");

    var data_request = {'function': 'DELETE/agents/:agent_id/profile', 'arguments': {}};

    if (!filter.check(req.params, {'agent_id':'numbers'}, req, res))  // Filter with error
        return;

    data_request['arguments']['agent_id'] = req.params.agent_id;

    execute.exec(python_bin, [wazuh_control], data_request, function (data) { res_h.send(req, res, data); });
})

/**
 * @api {delete} /agents/profiles/:profile_id Delete profile in every agent
 * @apiName DeleteProfileAgents
 * @apiGroup Profiles
 *
 * @apiParam {Number} profile_id Profile ID.
 *
 * @apiDescription Deletes the profile in every agent. Agents will have 'default' profile.
 *
 * @apiExample {curl} Example usage:
 *     curl -u foo:bar -k -X DELETE "https://127.0.0.1:55000/agents/profiles/profile_name?pretty"
 *
 */
router.delete('/profiles/:profile_id', function(req, res) {
    logger.debug(req.connection.remoteAddress + " DELETE /agents/profiles/:profile_id");

    var data_request = {'function': 'DELETE/agents/profiles/:profile_id', 'arguments': {}};

    if (!filter.check(req.params, {'profile_id':'names'}, req, res))  // Filter with error
        return;

    data_request['arguments']['profile_id'] = req.params.profile_id;

    execute.exec(python_bin, [wazuh_control], data_request, function (data) { res_h.send(req, res, data); });
})


/**
 * @api {post} /agents Add agent
 * @apiName PostAddAgentId
 * @apiGroup Add
 *
 * @apiParam {String} name Agent name.
 * @apiParam {String="IP","IP/NET", "ANY"} [ip] If you do not include this param, the API will get the IP automatically. If you are behind a proxy, you must set the option config.BehindProxyServer to yes at config.js.
 * @apiParam {Number} [force] Remove old agent with same IP if disconnected since <force> seconds.
 *
 * @apiDescription Add a new agent.
 *
 * @apiExample {curl} Example usage:
 *     curl -u foo:bar -k -X POST -d '{"name":"NewHost","ip":"10.0.0.9"}' -H 'Content-Type:application/json' "https://127.0.0.1:55000/agents?pretty"
 *
 */
router.post('/', function(req, res) {
    logger.debug(req.connection.remoteAddress + " POST /agents");

    // If not IP set, we will use source IP.
    var ip = req.body.ip;
    if ( !ip ){
        // If we hare behind a proxy server, use headers.
        if (config.BehindProxyServer.toLowerCase() == "yes")
            if (!req.headers.hasOwnProperty('x-forwarded-for')){
                res_h.bad_request(req, res, 800);
                return;
            }
            else
                ip = req.headers['x-forwarded-for'];
        else
            ip = req.connection.remoteAddress;

        // Extract IPv4 from IPv6 hybrid notation
        if (ip.indexOf("::ffff:") > -1) {
            var ipFiltered = ip.split(":");
            ip = ipFiltered[ipFiltered.length-1];
            logger.debug("Hybrid IPv6 IP filtered: " + ip);
        }
        logger.debug("Add agent with automatic IP: " + ip);
    }
    req.body.ip = ip;

    var data_request = {'function': 'POST/agents', 'arguments': {}};
    var filters = {'name':'names', 'ip':'ips', 'force':'numbers'};

    if (!filter.check(req.body, filters, req, res))  // Filter with error
        return;

    data_request['arguments']['ip'] = req.body.ip;

    if ('name' in req.body){
        data_request['arguments']['name'] = req.body.name;
        if ('force' in req.body){
            data_request['arguments']['force'] = req.body.force;
        }
        execute.exec(python_bin, [wazuh_control], data_request, function (data) { res_h.send(req, res, data); });
    }else
        res_h.bad_request(req, res, 604, "Missing field: 'name'");
})


/**
 * @api {post} /agents/insert Insert agent
 * @apiName PostInsertAgent
 * @apiGroup Add
 *
 * @apiParam {String} name Agent name.
 * @apiParam {String="IP","IP/NET", "ANY"} [ip] If you do not include this param, the API will get the IP automatically. If you are behind a proxy, you must set the option config.BehindProxyServer to yes at config.js.
 * @apiParam {String} id Agent ID.
 * @apiParam {String} key Agent key. Minimum length: 64 characters. Allowed values: ^[a-zA-Z0-9]+$
 * @apiParam {Number} [force] Remove old agent with same IP if disconnected since <force> seconds.
 *
 * @apiDescription Insert an agent with an existing id and key.
 *
 * @apiExample {curl} Example usage:
 *     curl -u foo:bar -k -X POST -d '{"name":"NewHost_2","ip":"10.0.10.10","id":"123","key":"1abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghi64"}' -H 'Content-Type:application/json' "https://127.0.0.1:55000/agents/insert?pretty"
 *
 */
router.post('/insert', function(req, res) {
    logger.debug(req.connection.remoteAddress + " POST /agents/insert");

    // If not IP set, we will use source IP.
    var ip = req.body.ip;
    if ( !ip ){
        // If we hare behind a proxy server, use headers.
        if (config.BehindProxyServer.toLowerCase() == "yes")
            if (!req.headers.hasOwnProperty('x-forwarded-for')){
                res_h.bad_request(req, res, 800);
                return;
            }
            else
                ip = req.headers['x-forwarded-for'];
        else
            ip = req.connection.remoteAddress;

        // Extract IPv4 from IPv6 hybrid notation
        if (ip.indexOf("::ffff:") > -1) {
            var ipFiltered = ip.split(":");
            ip = ipFiltered[ipFiltered.length-1];
            logger.debug("Hybrid IPv6 IP filtered: " + ip);
        }
        logger.debug("Add agent with automatic IP: " + ip);
    }
    req.body.ip = ip;

    var data_request = {'function': 'POST/agents/insert', 'arguments': {}};
    var filters = {'name':'names', 'ip':'ips', 'id':'numbers', 'key': 'ossec_key', 'force':'numbers'};

    if (!filter.check(req.body, filters, req, res))  // Filter with error
        return;

    data_request['arguments']['id'] = req.body.id;
    data_request['arguments']['name'] = req.body.name;
    data_request['arguments']['ip'] = req.body.ip;
    data_request['arguments']['key'] = req.body.key;
    if ('force' in req.body){
        data_request['arguments']['force'] = req.body.force;
    }

    if ('id' in req.body && 'name' in req.body && 'ip' in req.body && 'key' in req.body){
        execute.exec(python_bin, [wazuh_control], data_request, function (data) { res_h.send(req, res, data); });
    }else
        res_h.bad_request(req, res, 604, "Missing fields. Mandatory fields: id, name, ip, key");
})



module.exports = router;
