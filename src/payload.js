module.exports={
    inventory_view: context => {
        return {
            "trigger_id": context.trigger_id,
        "view": {
          "callback_id": "modal-identifier",
      "title": {
        "type": "plain_text",
        "text": "Odinbot"
      },
      "submit": {
        "type": "plain_text",
        "text": "Submit"
      },
      "blocks": [
        {
          "type": "input",
          "block_id": "section1",
          "element": {
            "type": "plain_text_input",
            "action_id": "sl_input",
            "placeholder": {
              "type": "plain_text",
              "text": "Enter location with BBY_ Prefix"
            }
          },
          "label": {
            "type": "plain_text",
            "text": "Get inventory At location"
          },
          "hint": {
            "type": "plain_text",
            "text": "Hint text"
          }
        },
        {
          "type": "input",
          "block_id": "section2",
          "element": {
            "type": "static_select",
            "action_id": "s2_input",
            "placeholder": {
              "type": "plain_text",
              "text": "Select swimlane",
              "emoji": true
            },
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": "QA1-SFT",
                  "emoji": true
                },
                "value": "value-0"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "QA2-SFT",
                  "emoji": true
                },
                "value": "value-1"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "QA3-SFT",
                  "emoji": true
                },
                "value": "value-2"
              }
            ]
          },
          "label": {
            "type": "plain_text",
            "text": "Swimlane",
            "emoji": true
          }
        }
      ],
      "type": "modal"
    }
        }
    },
    greeting_page: context => {
        return {
            "channel":context.channel,"text":"I hope the tour went well, Mr. Wonka.","thread_ts":context.thread_ts,"attachments": [{
                "fallback": "Plain-text summary of the attachment.",
                "callback_id":"woopr_game",
                "color": "#2eb886",
                "text": "Please select options",
                "attachment_type":"default",
                "actions": [
                    {
                        "name": "inventory",
                        "text": "Get Inventory",
                        "type": "button",
                        "value": "get_inventory"
                   },
                   {
                       "name": "inventory",
                       "text": "Set Inventory",
                       "type": "button",
                       "value": "set_inventory"
                  }
                ]
            }]
        }
    },
     inventory_view_submission: context=> {
        return {
            "response_action": "update",
        "view": {
          "type": "modal",
          "title": {
            "type": "plain_text",
            "text": "Submitted!!"
          },
          "blocks": [
            {
              "type": "section",
              "text": {
                "type": "plain_text",
                "text": "The form has been submitted successfully"
              }
            }
          ]
        }
        }

}
}
