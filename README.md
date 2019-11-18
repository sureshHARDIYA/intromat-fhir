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
    contact: [
    {

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
      address: [
        {
          type: "postal"
          line: ["3300 Washtenaw Avenue, Suite 227"]
          city: "Ann Arbor"
          state: "MI"
          postalCode: "48104"
          country: "USA"
        }
      ],
    identifier: [
      {
        use: "usual",
        type: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
              code: "MR"
            }
          ]
        },
        system: "urn:oid:1.2.36.146.595.217.0.1",
        value: "12345",
        period: {
          start: "2001-05-06"
        },
        assigner: {
          display: "Acme Healthcare"
        }
      }
    ],
    }
  ) {
    id
    resourceType
    name { family }
    address {
      id
      line
      type
    }
    identifier {
      use,
      assigner {
        display
      }
    }
    identifier {
      use,
      assigner {
        display
      }
    }
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

# Questionnaire

## Mutation Create

```
mutation QuestionnaireCreate {
  QuestionnaireCreate(resource: {
		resourceType: Questionnaire
    text: {
    status: "generated",
    div: "<div xmlns=\"http://www.w3.org/1999/xhtml\">\n      <pre>\n        <b>Birth details - To be completed by health professional</b>\n  Name of child: ____________________________________\n            Sex: __\n            \n  Neonatal Information\n    Birth Weight (kg): ___________\n    Birth Length (cm): ___________\n    Vitamin K given  : __\n             1st dose: ___________\n             2nd dose: ___________\n    Hep B given      : __\n      Date given     : ___________\n    Abnormalities noted at birth:\n      _______________________________________________\n      </pre>\n    </div>"
  },
  url: "http://hl7.org/fhir/Questionnaire/bb",
  title: "NSW Government My Personal Health Record",
  status: "draft",
  subjectType: [
    "Patient"
  ],
  date: "2013-02-19",
  publisher: "New South Wales Department of Health",
  jurisdiction: [
    {
      coding: [
        {
          system: "urn:iso:std:iso:3166",
          code: "AU"
        }
      ]
    }
  ],
  item: [
    {
      linkId: "birthDetails",
      text: "Birth details - To be completed by health professional",
      type: "group",
      item: [
        {
          linkId: "group",
          type: "group",
          item: [
            {
              linkId: "nameOfChild",
              text: "Name of child",
              type: "string"
            },
            {
              linkId: "sex",
              text: "Sex",
              type: "choice",
              answerOption: [
                {
                  valueCoding: {
                    code: "F"
                  }
                },
                {
                  valueCoding: {
                    code: "M"
                  }
                }
              ]
            }
          ]
        },
        {
          linkId: "neonatalInformation",
          text: "Neonatal Information",
          type: "group",
          item: [
            {
              linkId: "birthWeight",
              text: "Birth weight (kg)",
              type: "decimal"
            },
            {
              linkId: "birthLength",
              text: "Birth length (cm)",
              type: "decimal"
            },
            {
              linkId: "vitaminKgiven",
              text: "Vitamin K given",
              type: "choice",
              answerOption: [
                {
                  valueCoding: {
                    code: "INJECTION"
                  }
                },
                {
                  valueCoding: {
                    code: "INTRAVENOUS"
                  }
                },
                {
                  valueCoding: {
                    code: "ORAL"
                  }
                }
              ],
              item: [
                {
                  linkId: "vitaminKgivenDoses",
                  type: "group",
                  enableWhen: [
                    {
                      question: "vitaminKgiven",
                      operator: "exists",
                      answerBoolean: true
                    }
                  ],
                  item: [
                    {
                      linkId: "vitaminiKDose1",
                      text: "1st dose",
                      type: "dateTime"
                    },
                    {
                      linkId: "vitaminiKDose2",
                      text: "2nd dose",
                      type: "dateTime"
                    }
                  ]
                }
              ]
            },
            {
              linkId: "hepBgiven",
              text: "Hep B given y / n",
              type: "boolean",
              item: [
                {
                  linkId: "hepBgivenDate",
                  text: "Date given",
                  type: "date"
                }
              ]
            },
            {
              linkId: "abnormalitiesAtBirth",
              text: "Abnormalities noted at birth",
              type: "string"
            }
          ]
        }
      ]
    }
  ]
  })
  {
    id
  }
}
```

## Mutation Update

```
mutation QuestionnaireUpdate {
  QuestionnaireUpdate(id: "5cd41ba9cc13bd6fa4965bb0", resource: {
		resourceType: Questionnaire
    text: {
    status: "generated",
    div: "<div xmlns=\"http://www.w3.org/1999/xhtml\">\n      <pre>Lifelines Questionnaire 1 part 1\n  1. Do you have allergies?\n  2. General Questions:\n    2.a) What is your gender?\n    2.b) What is your date of birth?\n    2.c) What is your country of birth?\n    2.d) What is your marital status?\n    3. Intoxications:\n      3.a) Do you smoke?\n      3.b) Do you drink alcohol?</pre>\n    </div>"
  },
  url: "http://hl7.org/fhir/Questionnaire/f201",
  status: "active",
  subjectType: [
    "Patient"
  ],
  date: "2010",
  code: [
    {
      system: "http://example.org/system/code/lifelines/nl",
      code: "VL 1-1, 18-65_1.2.2",
      display: "Lifelines Questionnaire 1 part 1"
    }
  ],
  item: [
    {
      linkId: "1",
      text: "Do you have allergies?",
      type: "boolean"
    },
    {
      linkId: "2",
      text: "General questions",
      type: "group",
      item: [
        {
          linkId: "2.1",
          text: "What is your gender?",
          type: "string"
        },
        {
          linkId: "2.2",
          text: "What is your date of birth?",
          type: "date"
        },
        {
          linkId: "2.3",
          text: "What is your country of birth?",
          type: "string"
        },
        {
          linkId: "2.4",
          text: "What is your marital status?",
          type: "string"
        }
      ]
    },
    {
      linkId: "3",
      text: "Intoxications",
      type: "group",
      item: [
        {
          linkId: "3.1",
          text: "Do you smoke?",
          type: "boolean"
        },
        {
          linkId: "3.2",
          text: "Do you drink alchohol?",
          type: "boolean"
        }
      ]
    }
  ]
  })
  {
    id
  }
}
```

## Mutation Delete

```
mutation deletQuestionnaire {
 	QuestionnaireRemove(id: "5cee8e42d77e8d5b06e24ce0")  {
    id
  }
}
```

# ValueSet

## Query ValueSet

```
query ValueSet {
          ValueSet(_id: "5cee8e42d77e8d5b06e24cd7") {
            id
            resourceType
            url
            identifier {
              system
              value
            }
            version
            name
            title
            status
            publisher
            description
  					compose {
              include {
                concept {
                  display
                  extension {
                    valueDecimal
                  }
                }
              }
            }
        }
}

```

## Mutation DELETE valueSet

```
mutation removeValueSet {
  ValueSetRemove(id: "5cee8e42d77e8d5b06e24cd7") {
    id
  }
}
```


# Observation

## Query Observation (single)
```
query Observation {
    Observation(_id: "5dcc0734d39e0045d82b6eae") {
        id
        status
    }
}
```

## Query Observation (list)
```
query ObservationList {
  ObservationList {
    entry {
      resource {
        ...on Observation {
          id
          resourceType
        }
      }
    }
  }
}
```

## Mutation Create Observation
```
mutation ObservationCreate {
    ObservationCreate(resource: {

  resourceType: Observation,
  status: "final",
  category: [
    {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/observation-category",
          code: "vital-signs",
          display: "Vital Signs"
        }
      ]
    }
  ],
  code: {
    coding: [
      {
        system: "http://loinc.org",
        code: "29463-7",
        display: "Body Weight"
      },
      {
        system: "http://loinc.org",
        code: "3141-9",
        display: "Body weight Measured"
      },
      {
        system: "http://snomed.info/sct",
        code: "27113001",
        display: "Body weight"
      },
      {
        system: "http://acme.org/devices/clinical-codes",
        code: "body-weight",
        display: "Body Weight"
      }
    ]
  },
  effectiveDateTime: "2016-03-28",
  valueQuantity: {
    value: 185,
    unit: "lbs",
    system: "http://unitsofmeasure.org",
    code: "[lb_av]"
  }
}
) {
    id
    resourceType
}
}

```

## Mutation Update Observation
```

mutation ObservationUpdate {
    ObservationUpdate(id: "5dcc015778507e0ad027830d", resource: {
  resourceType: Observation,
  status: "final",
  category: [
    {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/observation-category",
          code: "vital-signs",
          display: "Vital Signs"
        }
      ]
    }
  ],
  code: {
    coding: [
      {
        system: "http://loinc.org",
        code: "29463-7",
        display: "Body Weight"
      },
      {
        system: "http://loinc.org",
        code: "3141-9",
        display: "Body weight Measured"
      },
      {
        system: "http://snomed.info/sct",
        code: "27113001",
        display: "Body weight"
      },
      {
        system: "http://acme.org/devices/clinical-codes",
        code: "body-weight",
        display: "Body Weight"
      }
    ]
  },
  effectiveDateTime: "2019-03-28",
  valueQuantity: {
    value: 185,
    unit: "lbs",
    system: "http://unitsofmeasure.org",
    code: "[lb_av]"
  }
}
) {
    id
    resourceType
    effectiveDateTime
}
}

```

## Mutation Delete Observation

```
mutation ObservationRemove {
    ObservationRemove(id: "5dcc015778507e0ad027830d") {
      id  
    }
}
```

# Practitioner

## Query Practitioner (single)
```
query Practitioner {
    Practitioner(_id: "5dca8d90dc0abf364025c245") {
        id
    }
}

```

## Query Practitioner (list)
```
query PractitionerList {
  PractitionerList {
    entry {
      resource {
        ...on Practitioner {
          id
          resourceType
          name { family }
        }
      }
    }
  }
}
```

## Mutation Create Practitioner
```

mutation PractitionerCreate {
  PractitionerCreate(resource: {
  resourceType: Practitioner,
  identifier: [
    {
      system: "http://www.acme.org/practitioners",
      value: "23"
    }
  ],
  active: true,
  name: [
    {
      family: "Careful",
      given: [
        "Adam"
      ],
      prefix: [
        "Dr"
      ]
    }
  ],
  address: [
    {
      use: "home",
      line: [
        "534 Erewhon St"
      ],
      city: "PleasantVille",
      state: "Vic",
      postalCode: "3999"
    }
  ],
  qualification: [
    {
      code: {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/v2-0360/2.7",
            code: "BS",
            display: "Bachelor of Science"
          }
        ],
        text: "Bachelor of Science"
      },
      period: {
        start: "1995"
      }
    }
  ]
}
  ) {
    id
    resourceType
    name { family }
  }
}

```

## Mutation Update Practitioner
```
mutation PractitionerUpdate {
  PractitionerUpdate(id: "5dcbc549e51df012c84ff716", resource: {
  resourceType: Practitioner,
  name: [
    {
      family: "Namesen",
      given: [
        "Namie"
      ],
      prefix: [
        "Dr"
      ]
    }
  ],
}
  ) {
    id
    resourceType
    name { family }
  }
}

```

## Mutation Delete Practitioner
```
mutation PractitionerRemove {
    PractitionerRemove(id: "5dcbc549e51df012c84ff716") {
      id  
    }
}

# Person

## QUERY Person

```
query Person {
    Person(_id: "5dcaa7f02eb0b70e90761396"){
        name {
            use
            text
            family
        }
        birthDate
        gender
        active
        address {
            line
        }
    }
}
```

## Mutation CREATE

```
mutation PersonCreate {
    PersonCreate(
            resource: {
              resourceType: Person,
              identifier: [
                {
                  use: "usual",
                  type: {
                    coding: [
                      {
                        system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                        code: "MR"
                      }
                    ]
                  },
                  system: "urn:oid:1.2.36.146.595.217.0.1",
                  value: "12345",
                  period: {
                    start: "2001-05-06"
                  },
                  assigner: {
                    display: "Acme Healthcare"
                  }
                }
              ],
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
                }
              ],
              telecom: [
                {
                  use: "home"
                },
                {
                  system: "phone",
                  value: "(03) 5555 6473",
                  use: "work"
                },
                {
                  system: "email",
                  value: "Jim@example.org",
                  use: "home"
                }
              ],
              gender: "male",
              birthDate: "1974-12-25",
              address: [
                {
                  use: "home",
                  line: [
                    "534 Erewhon St"
                  ],
                  city: "PleasantVille",
                  state: "Vic",
                  postalCode: "3999"
                }
              ],
              active: true,
            }
    ),
    {
        id
    }
}
```

## Mutation UPDATE

```
mutation PersonUpdate {
    PersonUpdate(
            id: "5dcaa7f02eb0b70e90761396"
            resource: {
              resourceType: Person,
              identifier: [
                {
                  use: "usual",
                  type: {
                    coding: [
                      {
                        system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                        code: "MR"
                      }
                    ]
                  },
                  system: "urn:oid:1.2.36.146.595.217.0.1",
                  value: "12345",
                  period: {
                    start: "2001-05-06"
                  },
                  assigner: {
                    display: "Acme Healthcare"
                  }
                }
              ],
              name: [
                {
                  use: "official",
                  family: "Johnson",
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
                }
              ],
              telecom: [
                {
                  use: "home"
                },
                {
                  system: "phone",
                  value: "(99) 5555 9999",
                  use: "work"
                },
                {
                  system: "email",
                  value: "Jim@example.org",
                  use: "home"
                }
              ],
              gender: "male",
              birthDate: "1974-12-25",
              address: [
                {
                  use: "home",
                  line: [
                    "534 Erewhon St"
                  ],
                  city: "PeasantVille",
                  state: "Vic",
                  postalCode: "3999"
                }
              ],
              active: true,
            }
    ),
    {
        id
    }
}
```

## Mutation DELETE

```
mutation deletePerson {
 	PersonRemove(id: "5dcbfe0d863b3f04e46ebbb6")  {
    id
  }
}
```
