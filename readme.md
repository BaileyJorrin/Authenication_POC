# Authenicatin and Authorization POC

## Introduction 

This project is a template for:

* Settup up AD Authenication beside a custom Authenication provider
* Retrieving Azure AD users in C# code (_Process is different for a on premise AD deployment_)
* Creating Custom JWT in .NET
* Setting up Control Points and Functional Abilities

## Project Structure

The project has been broken into two seperate solutions.   The **React_UI** folder contains a React 18 UI that contains an implemenation of MSAL and a custom login method.  This project also contains a all of the screens for managing users, assigning roles, functional abilities, and control points.   There is a sample CRUD screen for a client entity that permissions can be applied to to demonstrate permissioning.

The **WebAPI** project is a .NET Core 6.0 solution that consists of the following projects:

* **Kingsmen.WebAPI** - Contains the API for the React UI and the setup for creating a custom JWT.
* **Kingsmen.Infrastructure** - EF Core Context and migrations. 
* **Kingsmen.Domain** - EF Core Entities and DTO objects

## Running the Project

These instructions assume you know the basics of setting up .NET API project and running a React UI project.

### Prerequisites

* You will need access to a SQL Server instance to create the database
* You will need the application registration information for this application in the  Kingsmen AD instance
* EF Core Tools installed to run the database migrations
  + More information [here](https://learn.microsoft.com/en-us/ef/core/cli/dotnet)
* The .NET solution uses User Secrets to manage AD information and database connection strings.
  + More information [here](https://dotnetcoretutorials.com/2022/04/28/using-user-secrets-configuration-in-net/)

#### Secrets File Template
 
``` 
{
  "AzureAd": {
      "Instance": "https://login.microsoftonline.com/",
      "Domain": "kingsmensoftware.com",
      "ClientId": "APPLICATION_CLIENT_ID",
      "ClientSecret":"SECRET",
      "TenantId": "KINGSMEN_TENNANT_ID_IN_AZUREAD"
    },
  "ConnectionStrings": {
    "KingsmenDbConnectionString": "CONNECTION_TO_YOUR_SQL_SERVER"
  }
} 
```

#### Database Migrations

To create your database run the command below from within the Kingsmen.WebApi project folder

```
    dotnet ef database update  --project ../Kingsmen.Infrastructure 
```

#### Populating the User Table from Azure

Calling this endpoint will retrieve all users from Azure Active Directory and add them to the User table

```
https://localhost:5001/api/Users/UpdateUsers
```
