export const registration = {
  _key: "deviceRegistration",
  name: "Device Registration",
  isActive: true,
  icon: "device-registration",
  surveyJson: {
    pages: [
      {
        name: "Registration",
        elements: [
          {
            type: "text",
            name: "Name",
            title: "Name",
            isRequired: true
        ***REMOVED***,
          {
            type: "radiogroup",
            name: "Role",
            title: "Role",
            isRequired: true,
            choices: [
              {
                value: "AEDO",
                text: "AEDO"
            ***REMOVED***,
              {
                value: "AEDC",
                text: "AEDC"
            ***REMOVED***,
              {
                value: "Other",
                text: "Other"
            ***REMOVED***
            ]
        ***REMOVED***,
          {
            type: "text",
            name: "OtherRole",
            visibleIf: "{Role} = 'Other'",
            title: "Please specify"
        ***REMOVED***,
          {
            type: "checkbox",
            name: "Gender",
            title: "Gender",
            choices: [
              {
                value: "item1",
                text: "Male"
            ***REMOVED***,
              {
                value: "item2",
                text: "Female"
            ***REMOVED***
            ]
        ***REMOVED***
        ],
        title: "Device Registration"
    ***REMOVED***
    ]
***REMOVED***
***REMOVED***
