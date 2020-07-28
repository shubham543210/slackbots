// XMLHttpRequest is used to POST the requests. Alternative -fetch
const jsonPayloads =require('./payload.js')
const express = require('express');
const app = express();
// config variables
var config= require('../config/config.js')
// starting server
app.listen(global.gConfig.node_port, function () {
    console.log('App listening on port 3000!');
  });
// environment variables set to development
process.env.NODE_ENV = 'development';

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//request is another alternative of XMLHttpRequest.
 const bodyParser = require('body-parser');
//@slack/interactive-messages is used to respond to actions on interactions.
 const { createMessageAdapter } = require('@slack/interactive-messages');
 const slackSigningSecret = global.gConfig.signing_secret;
 const slackInteractions = createMessageAdapter(slackSigningSecret);
 /* Handling events */
const rawBodyBuffer = (req, res, buf, encoding) => {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  };
  
app.use('/slack/actions', slackInteractions.requestListener());
app.use(bodyParser.urlencoded({verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));

// Once event is triggered.
 app.post('/events', (req, res) => {
    console.log(req.body)
    if (req.body.type === 'url_verification') {
      res.send(req.body.challenge);
    }
    
    if (req.body.type === 'event_callback') {
      if(req.body.event.type=='message'){
         
        if (req.body.event.bot_id) return res.status(200).send();
            handleMessage(req.body.event);
            return res.status(200).send();        
      }   
    } 
  });

slackInteractions.action({ type: 'button' }, (payload, respond) => {
    var body=jsonPayloads.inventory_view({ trigger_id: payload.trigger_id})
try{
  // https://slack.com/api/views.open This is predefined api endpoint. Used to open view(Model) for the first time.
  var xhr = new XMLHttpRequest();
  console.log('sending request1');
var url = "https://slack.com/api/views.open";
console.log('sending request12');
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Authorization","Bearer "+global.gConfig.bot_token)
}
catch(e){
  console.log(e)
}
try{
xhr.send(JSON.stringify(body))

xhr.onload = function() {
  let responseObj = xhr.response;
  console.log('responseObj'+responseObj); 
};
}catch(e)
{
  console.log(e)
}  
    });
//This will work once view gets submitted.
    slackInteractions.viewSubmission('modal-identifier', (payload) => {
      debugger
      try{
      console.log(payload.view.state.values);
      console.log(payload.view.state.values.section1.sl_input.value);
      console.log(payload.view.state.values.section2.s2_input.selected_option);
      }
      catch(e){
        console.log(e)
      }
      // Validate the inputs (errors is of the shape in https://api.slack.com/surfaces/modals/using#displaying_errors)
      //const errors = validate(payload.view.state);
     
      // Return validation errors if there were errors in the inputs
      //if (errors) {
      //  return errors;
      //}
     try{
      return jsonPayloads.inventory_view_submission({payload:payload})
     }
     catch(e)
     {
       console.log(e)
     }
      // Process the submission
    });

    // Note: Respond to any interaction has to be send within 3 seconds.If it is not possible atleast reply 
    // with temperorary message which can be replaced once final message is ready to be sent. 
    // temperory message like - processing,we are working on it etc. with 200 ok .Please refer documents.

// Respons to Data. This method is called once message is received.
const handleMessage = async (data) => {
//function handleMessage(message,data) {
  console.log('message'+data.text)
    if(data.text != undefined){
      //web hook code is currently commented out.
  if (data.text.includes('hi channel')) {
    console.log('hi channelmessage received');
  // webHook();
  }
if (data.text.includes('hi')) {
  console.log('hi bot message received');
  try{
// To reply in a thread ,channel should be same as channel of message for which reply is done.thread_ts should
// be same to timestamp of the message for which reply is being done. here reply is being done for hi bot message.
    var body= jsonPayloads.greeting_page({channel:data.channel,thread_ts:data.ts})
      
     
      //"blocks":[{"type": "section", "text": {"type": "plain_text", "text": "Hello world"}}]

// Url-https://slack.com/api/chat.postMessage is a predefined api endpoint.It can handle interactions.
    var xhr = new XMLHttpRequest();
    console.log('sending request1');
  var url = "https://slack.com/api/chat.postMessage";
  console.log('sending request12');
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  //xhr.setRequestHeader("Authorization","Bearer xoxb-1159574297270-1167195985637-COTl66Y12OIlHs5XHs38vM9H")
  xhr.setRequestHeader("Authorization","Bearer "+global.gConfig.bot_token)
  console.log('response'+xhr.response)  
}
  catch(e){
    console.log(e)
  }
  try{
  xhr.send(JSON.stringify(body))
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        alert(xhr.responseText);
        console.log('response'+xhr.responseText) 
    }
}
  xhr.onload = function() {
    console.log('responseObj'+xhr.status); 
  };
  }catch(e)
  {
    console.log(e)
  }
}}
}
// code for webhook is currently commented out for later use.
// function webHook(){
// const slackBody={
//     mkdown:true,
//     as_user:true,
//       attachments: [
//          {
//              "fallback": "Plain-text summary of the attachment.",
//              "callback_id":"woopr_game",
//              "color": "#2eb886",
//              "text": "Please select options",
//              "attachment_type":"default",
//              "actions": [
//                  {
//                      "name": "inventory",
//                      "text": "Get Inventory",
//                      "type": "button",
//                      "value": "get_inventory"
//                 },
//                 {
//                     "name": "inventory",
//                     "text": "Set Inventory",
//                     "type": "button",
//                     "value": "set_inventory"
//                }
//              ]
//          }
//      ]    
// }
// var resOption=  {
//     // This is a webhook url.It will be pointing to particular channel.Message posted here will appear in 
//     //this channel.This url can be found in app dashboard under Incoming Webhooks section 
//     url:'https://hooks.slack.com/services/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',
//     method:'POST',
//     body:slackBody,
//     json: true }


// request(resOption, (error, response, body) => {
//     if (error){
//         console.log(error)
//     }
//     else{
//         console.log('response--'+response)
        
//         console.log('body--'+body)
  
//     }
// })
// }
// will work once button is pressed.



