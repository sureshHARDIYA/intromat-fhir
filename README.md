# Introduction

`Intromat-FHIR` is a [`HL7 FHIR`](http://hl7.org/fhir/resourcelist.html) compliant [Resource server](http://hl7.org/fhir/smart-app-launch/0.8.0/) using `nodejs`, `express`, `mongoDB`, `GraphQL` and `mongoose`. 

- [`nodejs`](https://nodejs.org/en/)
- [`express`](https://expressjs.com/)
- [`mongoDB`](https://www.mongodb.com/)
- [`MONGOOSE`](https://mongoosejs.com/)
- [`GraphQL`](https://graphql.org/learn/)


# Motivation
There are several reasons why `GraphQL` based API is getting popular and can be found easily by simple Goole search. However, we have tried to formulate some of the empirical evidence supporting use of `GRAPHQL` in healthcare context. More can be found from the paper given below:

> Mukhiya, S. K., Rabbi, F., I Pun, V. K., Rutle, A., & Lamo, Y. (2019). A GraphQL approach to Healthcare Information Exchange with HL7 FHIR. Procedia Computer Science, 160, 338-345.   10.1016/j.procs.2019.11.082

Interoperability is accepted as a fundamental necessity for the successful realization of Healthcare Information Systems. It can be achieved by utilizing consistent standards defining syntactic and semantic meaning of the information being exchanged. HL7 FHIR is one of such open standards for Health Information Exchange (HIE). While HL7 FHIR supports Representational State Transfer (REST) architecture and Service-oriented Architecture (SOA) for seamless information exchange, it inherits the inflexibility and complexity associated with the RESTful approach. GraphQL is a query language developed by Facebook that provides promising techniques to overcome these issues. In this paper, we exploit the use of GraphQL and HL7 FHIR for HIE; present an algorithm to map HL7 FHIR resources to a GraphQL schema, and created a prototype implementation of the approach and compare it with a RESTful approach. Our experimental results indicate that the combination of GraphQL and HL7 FHIR-based web APIs for HIE is performant, cost-effective, scalable and flexible to meet web and mobile clients requirements.

# Roadmaps

- Create all HL7 FHIR resources. 
- Create synthetic data factory for the resources and make the data open source for all users. 
- Create comprehensive authentication server.
- Release mobile application supporting HL7 FHIR observation for sensors data

# Supporters

- [INTROMAT](https://intromat.no/)
- [muzima](https://www.muzima.org/)

# Become supporter
We are a team of dedicated developers/researchers willing to make healthcare system better. We are always looking for ways where we can collaborate and help. Email <a href="mailto:skmu@hvl.no"><skmu@hvl.no> </a> for further details. 
