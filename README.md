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

## Query

```
query Organzation {
  Organization(_id: "5cd3ee0b5883c03fe4522436") {
    resourceType
    name
    active
    address {
      line
    }
    type {
      coding {
        system
        code
      }
    }
    id
  }
}
```

## Mutation Create

```
mutation OrganizationCreate {
  OrganizationCreate(resource: {
      resourceType: Organization

			text: {
    status: "generated",
    div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: f003</p><p><b>active</b>: true</p><p><b>type</b>: Hospital Department <span>(Details : {http://terminology.hl7.org/CodeSystem/organization-type code 'dept' = 'Hospital Department', given as 'Hospital Department'})</span></p><p><b>name</b>: Burgers UMC Ear,Nose,Throat unit</p><p><b>telecom</b>: ph: 022-655 6780</p><p><b>address</b>: West Wing, floor 5 </p><p><b>partOf</b>: <a>Organization/f001</a></p><h3>Contacts</h3><table><tr><td>-</td><td><b>Purpose</b></td><td><b>Name</b></td><td><b>Telecom</b></td><td><b>Address</b></td></tr><tr><td>*</td><td>Administrative <span>(Details : {http://terminology.hl7.org/CodeSystem/contactentity-type code 'ADMIN' = 'Administrative)</span></td><td>mr. F. de Hond</td><td>ph: 022-655 7654</td><td>West Wing, floor 5 </td></tr></table></div>"
  },
  active: true,
  type: [
    {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/organization-type",
          code: "dept",
          display: "Hospital Department"
        }
      ]
    }
  ],
  name: "Burgers UMC Ear,Nose,Throat unit",
  telecom: [
    {
      system: "phone",
      value: "022-655 6780"
    }
  ],
  address: [
    {
      line: [
        "West Wing, floor 5"
      ]
    }
  ],
  partOf:"5cd2a75e04ac7d154a5f1872",
  contact: [
    {
      purpose: {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/contactentity-type",
            code: "ADMIN"
          }
        ]
      },
      name: {
        text: "mr. F. de Hond"
      },
      telecom: [
        {
          system: "phone",
          value: "022-655 7654"
        },
        {
          system: "email",
          value: "KNO@burgersumc.nl"
        },
        {
          system: "fax",
          value: "022-655 0998"
        }
      ],
      address: {
        line: [
          "West Wing, floor 5"
        ]
      }
    }
  ]
    }
  ) {
    id
  }
}
```

## Mutation update

```
mutation OrganizationUpdate {
  OrganizationUpdate(id: "5cd2a75e04ac7d154a5f1872",   resource: {
      resourceType: Organization
      name: "INTROMAT"
    	active: true
			identifier: [
      {
        system: "http://michigan.gov/state-dept-ids",
        value: "25"
      }
    ]
    partOf: "5cd2a75e04ac7d154a5f1872"
    contact: [
    {
      purpose: {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/contactentity-type",
            code: "ADMIN"
          }
        ]
      },
      name: {
        text: "mevr. D. de Haan"
      },
      telecom: [
        {
          system: "phone",
          value: "022-655 2321"
        },
        {
          system: "email",
          value: "cardio@burgersumc.nl"
        },
        {
          system: "fax",
          value: "022-655 2322"
        }
      ],
      address: {
        line: [
          "South Wing, floor 2"
        ]
      }
    }
  ]
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
