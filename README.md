# Use Case: Customer Overview

## Context

Vaillant is implementing an app for heating installers that enables them to manage their customers. Each heating system comprises a heat generator, a control device, and a gateway device connected to the customer's WLAN. The gateway collects messages between devices and transmits them to Vaillant's backends, where the data is processed for remote diagnostic use cases.

## Description

As a Vaillant installer, I want to have a comprehensive overview of all my customers.

To plan trips to my customers, I need to view the address of each customer. Additionally, it is crucial to know if the customer's heating appliances have a stable internet connection. This information is vital for early detection of error messages. The connection status should be indicated by a 'connectivity marker' next to each customer's representation in the list.

## Acceptance Criteria

- The contact information of every customer is displayed in a list.
- The avatar of every customer is visible.
- Each entry in the list should include a green marker if connected and a red marker otherwise.
- The code is refactored and well structured according to a concept of your choice.
- The ACs here are the bare minimum. Feel free to interpret more if you think it fits in the case.

## Technical Background

To start the app just install the necessary packages by running `npm install` and afterwards call `npx expo start`.

The backend endpoints are available as mock services within the app. So there is no need to implement any backend service for that.

In the [App.tsx](./App.tsx) file, you can find an example as a reference on how to call these endpoints.

The list of existing customers will be served by the endpoint `/customers`. To retrieve a report on those customers' connection states, use the endpoint `/connectivity-report`.

### REST Endpoints

#### Customer Overview

**GET /customers**

Sample Responses:

```json
[
  {
    "_id": 20000,
    "avatar": "https://avatars.githubusercontent.com/u/22803726",
    "birthday": "1985-09-02T14:18:22.796Z",
    "email": "Maryann.Dicki@yahoo.com",
    "firstName": "Maryann",
    "lastName": "Dicki",
    "sex": "female",
    "subscriptionTier": "business",
    "address": {
      "street": "50181 Vivian Ville",
      "zipCode": "82860",
      "city": "Lake Jacinthefurt",
      "country": "Haiti"
    }
  }
  // ... (similar entries)
]
```

#### Connectivity Report

**POST /connectivity-report**

Sample Payload:

```json
{
  "customerIds": [20000, 20001, 20002]
}
```

Sample Responses:

```json
[
  {
    "id": 20000,
    "isConnected": true
  },
  {
    "id": 20001,
    "isConnected": true
  },
  {
    "id": 20002,
    "isConnected": false
  }
]
```
