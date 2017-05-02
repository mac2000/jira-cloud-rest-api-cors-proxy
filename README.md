# Jira API

There is [feature request](https://jira.atlassian.com/browse/JRASERVER-30371) from 2012 asking Atlassian to do something about CORS support.

This repository demonstrates simplest possible workaround

We are hosting simple express application which works as proxy to jira api

Main idea here is that backend should be as simple as possible

Basic example may be found [here](https://developer.atlassian.com/jiradev/jira-apis/jira-rest-apis/jira-rest-api-tutorials/jira-rest-api-example-cookie-based-authentication)

Usage example is in `index.html` file, points of interests are authorization stuff and few samples of how to get data

## Authorization

Backend expects `Authorization` header which **should** contain `cloud.session.token` which may be retrieved from `/rest/auth/1/session`

More details about authorization may be found [here](https://docs.atlassian.com/jira/REST/cloud/#auth/1/session)
