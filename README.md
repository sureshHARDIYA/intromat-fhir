# GraphQL-FHIR

# Patients

## Query

```
query PatientList {
  PatientList {
    entry {
      resource {
        ...on Patient {
          id
          resourceType
          name { family }
        }
      }
    }
  }
}
```

## Mutation

```
mutation PatientCreate {
  PatientCreate(resource: {
      resourceType: Patient
      name: [
    {
      use: "official",
      family: "Chalmers",
      given: [
        "Peter",
        "James"
      ]
    },
    {
      use: "usual",
      given: [
        "Jim"
      ]
    },
    {
      use: "maiden",
      family: "Windsor",
      given: [
        "Peter",
        "James"
      ],
      period: {
        end: "2002"
      }
    }
  ]
    gender: "male"
    telecom: [
    {
      use: "home"
    },
    {
      system: "phone",
      value: "(03) 5555 6473",
      use: "work",
      rank: "1"
    },
    {
      system: "phone",
      value: "(03) 3410 5613",
      use: "mobile",
      rank: "2"
    },
    {
      system: "phone",
      value: "(03) 5555 8834",
      use: "old",
      period: {
        end: "2014"
      }
    }
  ]
    active: true

    }
  ) {
    id
  }
}
```

# Organization

## Mutation update

```
mutation OrganizationUpdate {
  OrganizationUpdate(id: "5cd2a75e04ac7d154a5f1872",   resource: {
      resourceType: Organization
      name: "INTROMAT"
    	active: true

    telecom: [
    {
      use: "home"
    },
    {
      system: "phone",
      value: "(03) 5555 6473",
      use: "work",
      rank: "1"
    },
    {
      system: "phone",
      value: "(03) 3410 5613",
      use: "mobile",
      rank: "2"
    },
    {
      system: "phone",
      value: "(03) 5555 8834",
      use: "old",
      period: {
        end: "2014"
      }
    }
  ]

    }
  )
    {
    id
  }
}
```
