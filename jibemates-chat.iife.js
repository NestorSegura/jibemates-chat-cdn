(function(){"use strict";const G=`
  :host {
    all: initial;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  #bubble {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #1a56db;
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(26, 86, 219, 0.4);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    pointer-events: auto;
    z-index: 50; // add index to ensure it's above other elements'
  }

  #bubble:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 20px rgba(26, 86, 219, 0.5);
  }

  #bubble svg {
    width: 24px;
    height: 24px;
    fill: none;
    stroke: white;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  #panel {
    position: fixed;
    bottom: 96px;
    right: 24px;
    width: 380px;
    max-width: calc(100vw - 32px);
    height: 520px;
    max-height: calc(100dvh - 120px);
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
    display: none;
    flex-direction: column;
    overflow: hidden;
    pointer-events: auto;
    z-index: 50;
  }

  #panel.open {
    display: flex;
  }

  #panel-header {
    background: #1a56db;
    color: white;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 16px 16px 0 0;
    flex-shrink: 0;
  }

  #panel-title {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  #close-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  #close-btn:hover {
    opacity: 1;
  }

  #close-btn svg {
    width: 20px;
    height: 20px;
    stroke: white;
    stroke-width: 2.5;
    stroke-linecap: round;
    fill: none;
  }

  #messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    scroll-behavior: smooth;
  }

  #messages::-webkit-scrollbar {
    width: 4px;
  }

  #messages::-webkit-scrollbar-track {
    background: transparent;
  }

  #messages::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
  }

  .message {
    max-width: 80%;
    padding: 10px 14px;
    border-radius: 16px;
    word-wrap: break-word;
    font-size: 14px;
    line-height: 1.5;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  .user-message {
    align-self: flex-end;
    background: #1a56db;
    color: white;
    border-bottom-right-radius: 4px;
  }

  .bot-message {
    align-self: flex-start;
    background: #f0f0f0;
    color: #1a1a1a;
    border-bottom-left-radius: 4px;
  }

  #input-area {
    display: flex;
    align-items: center;
    padding: 12px;
    border-top: 1px solid #e5e5e5;
    gap: 8px;
    flex-shrink: 0;
  }

  #chat-input {
    flex: 1;
    border: 1px solid #d1d5db;
    border-radius: 24px;
    padding: 10px 16px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    outline: none;
    transition: border-color 0.2s;
    background: white;
    color: #1a1a1a;
  }

  #chat-input:focus {
    border-color: #1a56db;
  }

  #chat-input::placeholder {
    color: #9ca3af;
  }

  #send-btn {
    width: 40px;
    height: 40px;
    min-width: 40px;
    border-radius: 50%;
    background: #1a56db;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, opacity 0.2s;
  }

  #send-btn:hover:not(:disabled) {
    background: #1447c0;
  }

  #send-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  #send-btn svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: white;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .typing-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 12px 14px;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #999;
    animation: bounce 1.2s infinite;
  }

  .dot:nth-child(1) { animation-delay: 0s; }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes bounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-6px); }
  }

  /* Consent screen styles */
  .consent-screen {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 32px 24px;
    text-align: center;
    height: 100%;
    flex: 1;
  }

  .consent-screen h2 {
    font-size: 18px;
    margin: 0 0 12px 0;
    color: #1a1a1a;
    font-weight: 600;
  }

  .consent-screen p {
    font-size: 14px;
    line-height: 1.6;
    color: #555;
    margin: 0 0 24px 0;
  }

  .consent-policy-link {
    margin-bottom: 24px !important;
  }

  .consent-screen a {
    color: #1a56db;
    text-decoration: underline;
  }

  .consent-btn-accept {
    width: 100%;
    padding: 12px;
    background: #1a56db;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    cursor: pointer;
    margin-bottom: 8px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    transition: background 0.2s;
  }

  .consent-btn-accept:hover {
    background: #1447c0;
  }

  .consent-btn-decline {
    width: 100%;
    padding: 12px;
    background: transparent;
    color: #666;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    transition: border-color 0.2s, color 0.2s;
  }

  .consent-btn-decline:hover {
    border-color: #9ca3af;
    color: #444;
  }

  @media (max-width: 420px) {
    #panel {
      right: 8px;
      left: 8px;
      width: auto;
      bottom: 80px;
    }

    #bubble {
      bottom: 16px;
      right: 16px;
      width: 48px;
      height: 48px;
    }
  }

  @media (max-width: 320px) {
    #panel {
      right: 4px;
      left: 4px;
      width: auto;
      bottom: 72px;
    }

    #bubble {
      bottom: 12px;
      right: 12px;
      width: 44px;
      height: 44px;
    }
  }

  /* Language selector in panel header */
  .lang-selector {
    display: flex;
    gap: 4px;
    margin: 0 auto 0 12px;
  }

  .lang-btn {
    width: 24px;
    height: 18px;
    padding: 0;
    border: 2px solid transparent;
    border-radius: 3px;
    cursor: pointer;
    background: none;
    opacity: 0.6;
    transition: opacity 0.2s, border-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .lang-btn:hover {
    opacity: 1;
  }

  .lang-btn.active {
    opacity: 1;
    border-color: rgba(255, 255, 255, 0.8);
  }

  .lang-btn svg {
    width: 100%;
    height: 100%;
  }

  /* Language detection toast */
  .lang-toast {
    position: fixed;
    bottom: calc(96px + 520px - 60px);
    right: 44px;
    background: rgba(0, 0, 0, 0.75);
    color: white;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 13px;
    z-index: 10;
    transition: opacity 0.4s ease;
    pointer-events: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    opacity: 1;
  }

  .lang-toast--fade {
    opacity: 0;
  }

  @media (max-width: 420px) {
    .lang-toast {
      right: 16px;
      bottom: calc(80px + 100vw);
    }
  }

  /* Message timestamps */
  .message-time {
    font-size: 10px;
    opacity: 0.6;
    display: block;
    margin-top: 2px;
  }

  .user-message .message-time {
    text-align: right;
  }

  .bot-message .message-time {
    text-align: left;
  }

  /* System notices (connection lost, etc.) */
  .system-notice {
    background: none !important;
    text-align: center;
    font-style: italic;
    color: #999;
    font-size: 12px;
    padding: 4px 8px;
    align-self: center;
    max-width: 100%;
  }

  /* Quick reply buttons */
  .quick-replies {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
    align-self: flex-start;
    max-width: 80%;
  }

  .quick-reply-btn {
    padding: 6px 14px;
    border: 1.5px solid #1a56db;
    border-radius: 20px;
    background: white;
    color: #1a56db;
    font-size: 13px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    white-space: nowrap;
  }

  .quick-reply-btn:hover {
    background: #1a56db;
    color: white;
  }

  /* Lead consent re-confirmation card */
  .lead-consent-card {
    align-self: flex-start;
    max-width: 85%;
    background: #f8f9ff;
    border: 1.5px solid #1a56db;
    border-radius: 12px;
    padding: 16px;
    margin-top: 8px;
  }

  .lead-consent-card h4 {
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 8px 0;
  }

  .lead-consent-card p {
    font-size: 13px;
    line-height: 1.5;
    color: #555;
    margin: 0 0 12px 0;
  }

  .lead-consent-card a {
    color: #1a56db;
    text-decoration: underline;
    font-size: 12px;
  }

  .lead-consent-actions {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }

  .lead-consent-confirm {
    flex: 1;
    padding: 8px 16px;
    background: #1a56db;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 13px;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    transition: background 0.2s;
  }

  .lead-consent-confirm:hover:not(:disabled) {
    background: #1447c0;
  }

  .lead-consent-confirm:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .lead-consent-decline {
    flex: 1;
    padding: 8px 16px;
    background: transparent;
    color: #666;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 13px;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    transition: border-color 0.2s, color 0.2s;
  }

  .lead-consent-decline:hover {
    border-color: #9ca3af;
    color: #444;
  }
`,v="jibemates_lang",B={de:{"chat.title":"JibeMates","chat.placeholder":"Nachricht eingeben...","chat.send":"Senden","chat.open":"Chat öffnen","chat.close":"Chat schließen","chat.typing":"Tippt...","chat.error":"Etwas ist schiefgelaufen. Bitte versuche es erneut.","chat.no_response":"Keine Antwort erhalten.","chat.greeting":"Hallo! Wie kann ich dir bei JibeMates helfen?","chat.greeting_returning":"Hallo {name}, kann ich dir bei etwas anderem helfen?","chat.connection_lost":"Verbindung verloren. Bitte prüfe deine Internetverbindung.","consent.title":"Datenschutzhinweis","consent.body":"Dieser Chatbot verarbeitet deine Nachrichten, um Fragen zu JibeMates-Diensten zu beantworten. Deine Gesprächsdaten werden sicher gespeichert. Mit der Fortsetzung stimmst du unserer Datenverarbeitung zu.","consent.policy":"Datenschutzrichtlinie","consent.accept":"Akzeptieren","consent.decline":"Ablehnen","lang.detected":"Sprache erkannt: Deutsch","lang.switched":"Sprache gewechselt zu: Deutsch","lang.switch_message":"[System: Der Benutzer hat die Sprache auf Deutsch umgestellt. Bitte antworte ab jetzt ausschließlich auf Deutsch.]","lead.consent_title":"Kontaktdaten speichern","lead.consent_body":"Damit unser Team dich kontaktieren kann, speichern wir deinen Namen, deine Telefonnummer und deine E-Mail-Adresse. Dies dient ausschließlich der persönlichen Kontaktaufnahme.","lead.consent_policy":"Datenschutzrichtlinie","lead.confirm":"Bestätigen & Weiter","lead.decline":"Nein, danke","lead.submitted":"Vielen Dank! Deine Daten wurden gespeichert. Ein Spezialist aus unserem Team wird sich bald bei dir melden.","lead.declined":"Kein Problem! Deine Kontaktdaten werden nicht gespeichert. Du kannst uns jederzeit über unsere Website erreichen.","lead.submitting":"Daten werden gespeichert...","lead.error":"Beim Speichern ist ein Fehler aufgetreten. Bitte versuche es erneut."},en:{"chat.title":"JibeMates","chat.placeholder":"Type a message...","chat.send":"Send","chat.open":"Open chat","chat.close":"Close chat","chat.typing":"Typing...","chat.error":"Something went wrong. Please try again.","chat.no_response":"No response received.","chat.greeting":"Hello! How can I help you with JibeMates today?","chat.greeting_returning":"Hi {name}, do you need help with something else?","chat.connection_lost":"Connection lost. Please check your internet connection.","consent.title":"Privacy Notice","consent.body":"This chatbot processes your messages to answer questions about JibeMates' services. Your conversation data is stored securely. By continuing, you agree to our data processing.","consent.policy":"Privacy Policy","consent.accept":"Accept","consent.decline":"Decline","lang.detected":"Language detected: English","lang.switched":"Language switched to: English","lang.switch_message":"[System: The user has switched language to English. Please respond exclusively in English from now on.]","lead.consent_title":"Save contact details","lead.consent_body":"To have our team contact you, we will store your name, phone number, and email address. This is solely for personal follow-up.","lead.consent_policy":"Privacy Policy","lead.confirm":"Confirm & Continue","lead.decline":"No, thanks","lead.submitted":"Thank you! Your details have been saved. A specialist from our team will contact you soon.","lead.declined":"No problem! Your contact details will not be stored. You can always reach us through our website.","lead.submitting":"Saving your details...","lead.error":"Something went wrong while saving. Please try again."},es:{"chat.title":"JibeMates","chat.placeholder":"Escribe un mensaje...","chat.send":"Enviar","chat.open":"Abrir chat","chat.close":"Cerrar chat","chat.typing":"Escribiendo...","chat.error":"Algo salió mal. Por favor, inténtalo de nuevo.","chat.no_response":"No se recibió respuesta.","chat.greeting":"¡Hola! ¿En qué puedo ayudarte con JibeMates hoy?","chat.greeting_returning":"Hola {name}, necesitas ayuda con algo mas?","chat.connection_lost":"Conexión perdida. Por favor, verifica tu conexión a internet.","consent.title":"Aviso de Privacidad","consent.body":"Este chatbot procesa tus mensajes para responder preguntas sobre los servicios de JibeMates. Tus datos de conversación se almacenan de forma segura. Al continuar, aceptas nuestro procesamiento de datos.","consent.policy":"Política de Privacidad","consent.accept":"Aceptar","consent.decline":"Rechazar","lang.detected":"Idioma detectado: Español","lang.switched":"Idioma cambiado a: Español","lang.switch_message":"[System: El usuario ha cambiado el idioma a español. Por favor responde exclusivamente en español a partir de ahora.]","lead.consent_title":"Guardar datos de contacto","lead.consent_body":"Para que nuestro equipo pueda contactarte, guardaremos tu nombre, numero de telefono y direccion de correo electronico. Esto es exclusivamente para contacto personal.","lead.consent_policy":"Política de Privacidad","lead.confirm":"Confirmar y continuar","lead.decline":"No, gracias","lead.submitted":"¡Gracias! Tus datos han sido guardados. Un especialista de nuestro equipo se pondrá en contacto contigo pronto.","lead.declined":"¡Sin problema! Tus datos de contacto no serán almacenados. Siempre puedes contactarnos a través de nuestro sitio web.","lead.submitting":"Guardando tus datos...","lead.error":"Ocurrió un error al guardar. Por favor, inténtalo de nuevo."}};let f="de";function y(){return f}function U(e){f=e,localStorage.setItem(v,e)}function q(){const e=localStorage.getItem(v);if(e&&T(e))return f=e,f;const o=navigator.language.split("-")[0].toLowerCase();return f=T(o)?o:"de",localStorage.setItem(v,f),f}function T(e){return e==="de"||e==="en"||e==="es"}function a(e){return B[f][e]??B.de[e]??e}function H(e){const t={de:"de-DE",en:"en-GB",es:"es-ES"}[f];return new Intl.DateTimeFormat(t,{hour:"2-digit",minute:"2-digit"}).format(new Date(e))}const A="jibemates_session_id",N="jibemates_gdpr_consent",M="jibemates_lead_submitted",z="jibemates_visitor_name";function w(){let e=localStorage.getItem(A);return e||(e=crypto.randomUUID(),localStorage.setItem(A,e)),e}function J(){return localStorage.getItem(N)==="true"}function Y(){localStorage.setItem(N,"true")}function D(){return localStorage.getItem(M)==="true"}function K(){localStorage.setItem(M,"true")}function V(){return localStorage.getItem(z)}function R(e){localStorage.setItem(z,e)}const k={webhookUrl:"https://n8n.srv983964.hstgr.cloud/webhook/chatbot"};function W(e){const o=e.getElementById("chat-input"),t=e.getElementById("send-btn");!o||!t||(o.addEventListener("keydown",n=>{n.key==="Enter"&&!n.shiftKey&&(n.preventDefault(),C(e,o.value))}),t.addEventListener("click",()=>{C(e,o.value)}),window.addEventListener("offline",()=>{o&&(o.disabled=!0),t&&(t.disabled=!0),g(e,"bot",a("chat.connection_lost"),"system-notice")}),window.addEventListener("online",()=>{o&&(o.disabled=!1),t&&(t.disabled=!1)}),Z(e))}async function C(e,o){const t=e.getElementById("chat-input"),n=e.getElementById("send-btn"),r=o.trim();if(!r)return;P(e),g(e,"user",r),t&&(t.value="",t.disabled=!0),n&&(n.disabled=!0);const l=L(e);x(e);try{const i=await S(r);l.remove();const c=i.output??a("chat.no_response"),s=Array.isArray(i.buttons)&&i.buttons.length>0?i.buttons:void 0;g(e,"bot",c,void 0,s),i.leadReady===!0&&Q(e)}catch{l.remove(),g(e,"bot",a("chat.error"))}finally{t&&(t.disabled=!1,t.focus()),n&&(n.disabled=!1),x(e)}}async function S(e){const o={action:"sendMessage",sessionId:w(),chatInput:e,metadata:{locale:y(),page:window.location.pathname,consentGiven:!0}},t=await fetch(k.webhookUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!t.ok)throw new Error(`Webhook error: ${t.status}`);return await t.json()}async function $(e){g(e,"bot",a("lang.switched"),"system-notice");const o=L(e);x(e);try{const t=await S(a("lang.switch_message"));o.remove(),g(e,"bot",t.output??a("chat.no_response"))}catch{o.remove()}finally{x(e)}}function Q(e){const o=e.getElementById("messages");if(!o)return;const t=document.createElement("div");t.className="lead-consent-card";const n=document.createElement("h4");n.textContent=a("lead.consent_title"),t.appendChild(n);const r=document.createElement("p");r.textContent=a("lead.consent_body"),t.appendChild(r);const l=document.createElement("a");l.href="https://jibemates.de/datenschutz",l.target="_blank",l.rel="noopener noreferrer",l.textContent=a("lead.consent_policy"),t.appendChild(l);const i=document.createElement("div");i.className="lead-consent-actions";const c=document.createElement("button");c.type="button",c.className="lead-consent-confirm",c.textContent=a("lead.confirm");const s=document.createElement("button");s.type="button",s.className="lead-consent-decline",s.textContent=a("lead.decline"),c.addEventListener("click",()=>{c.disabled=!0,c.textContent=a("lead.submitting"),s.disabled=!0,t.remove(),X(e)}),s.addEventListener("click",()=>{t.remove(),g(e,"bot",a("lead.declined")),S("[System: The visitor declined the GDPR consent to store their contact details. If they change their mind and ask to be contacted, output [LEAD_READY] again.]")}),i.appendChild(c),i.appendChild(s),t.appendChild(i),o.appendChild(t),x(e)}async function X(e){const o=L(e);x(e);try{const t={action:"submitLead",sessionId:w(),metadata:{locale:y(),page:window.location.pathname,consentGiven:!0,leadConsentTimestamp:new Date().toISOString()}},n=await fetch(k.webhookUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(o.remove(),!n.ok)throw new Error(`HTTP ${n.status}`);const r=await n.json();g(e,"bot",r.output??a("lead.submitted")),K(),r.visitorName&&R(r.visitorName),setTimeout(()=>{e.dispatchEvent(new CustomEvent("lead-submitted"))},3500)}catch{o.remove(),g(e,"bot",a("lead.error"))}}function P(e){e.querySelectorAll(".quick-replies").forEach(o=>o.remove())}function g(e,o,t,n,r){const l=e.getElementById("messages");if(!l)return;const i=document.createElement("div");i.className=`message ${o}-message${n?" "+n:""}`,i.textContent=t;const c=document.createElement("span");if(c.className="message-time",c.textContent=H(Date.now()),i.appendChild(c),l.appendChild(i),o==="bot"&&r&&r.length>0){P(e);const s=document.createElement("div");s.className="quick-replies",r.slice(0,5).forEach(p=>{const u=document.createElement("button");u.type="button",u.className="quick-reply-btn",u.textContent=p,u.setAttribute("aria-label",p),u.addEventListener("click",()=>{s.remove(),C(e,p)}),s.appendChild(u)}),l.appendChild(s)}x(e)}function L(e){const o=e.getElementById("messages"),t=document.createElement("div");t.className="message bot-message typing-indicator";for(let n=0;n<3;n++){const r=document.createElement("span");r.className="dot",t.appendChild(r)}return o&&(o.appendChild(t),x(e)),t}function x(e){const o=e.getElementById("messages");o&&(o.scrollTop=o.scrollHeight)}async function Z(e){if(D())return;const o={action:"loadPreviousSession",sessionId:w(),metadata:{locale:y(),page:window.location.pathname,consentGiven:!0}};try{const t=await fetch(k.webhookUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!t.ok)return;const n=await t.json();if(Array.isArray(n.messages)&&n.messages.length>0){const r=e.getElementById("messages");if(r){const l=r.querySelector('[data-greeting="true"]');l&&l.remove()}for(const l of n.messages)try{const i=JSON.parse(l.message),c=i.type==="human"?"user":"bot",s=i.data?.content??"";s&&g(e,c,s)}catch{}}}catch{}}const ee={webhookUrl:"https://n8n.srv983964.hstgr.cloud/webhook/chatbot"};function te(e,o){const t=e.getElementById("panel");if(!t)return;const n=document.createElement("div");n.className="consent-screen",n.id="consent-screen";const r=document.createElement("h2");r.textContent=a("consent.title");const l=document.createElement("p");l.textContent=a("consent.body");const i=document.createElement("a");i.href="https://jibemates.de/privacy",i.target="_blank",i.rel="noopener",i.textContent=a("consent.policy");const c=document.createElement("p");c.className="consent-policy-link",c.appendChild(i);const s=document.createElement("button");s.className="consent-btn-accept",s.type="button",s.textContent=a("consent.accept");const p=document.createElement("button");p.className="consent-btn-decline",p.type="button",p.textContent=a("consent.decline"),n.appendChild(r),n.appendChild(l),n.appendChild(c),n.appendChild(s),n.appendChild(p),t.appendChild(n),s.addEventListener("click",()=>{Y(),fetch(ee.webhookUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"recordConsent",sessionId:w(),metadata:{consentTimestamp:new Date().toISOString(),privacyPolicyVersion:"1.0",mechanism:"click_accept_button",locale:y(),page:window.location.pathname,consentGiven:!0}})}).catch(()=>{}),n.remove(),o()}),p.addEventListener("click",()=>{t.classList.remove("open"),t.setAttribute("aria-hidden","true");const u=new CustomEvent("panel-closed",{bubbles:!1});t.dispatchEvent(u)})}const I=`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
</svg>`,j=`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <line x1="18" y1="6" x2="6" y2="18"/>
  <line x1="6" y1="6" x2="18" y2="18"/>
</svg>`,ne=`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <line x1="22" y1="2" x2="11" y2="13"/>
  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
</svg>`,oe=[{lang:"de",svg:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3"><rect width="5" height="3" y="0" fill="#000"/><rect width="5" height="2" y="1" fill="#D00"/><rect width="5" height="1" y="2" fill="#FFCE00"/></svg>',label:"Deutsch"},{lang:"en",svg:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30"><clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath><path d="M0,0 v30 h60 v-30 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></svg>',label:"English"},{lang:"es",svg:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="3" height="2" fill="#c60b1e"/><rect width="3" height="1" y=".5" fill="#ffc400"/></svg>',label:"Español"}];function ae(e,o){const t=document.createElement("div");t.className="lang-toast",t.textContent=o,e.appendChild(t),setTimeout(()=>{t.classList.add("lang-toast--fade"),setTimeout(()=>t.remove(),400)},2600)}function ie(e){const o=y(),t=e.getElementById("panel-title");t&&(t.textContent=a("chat.title"));const n=e.getElementById("chat-input");n&&(n.placeholder=a("chat.placeholder"));const r=e.getElementById("bubble"),l=e.getElementById("panel");if(r&&l){const c=l.classList.contains("open");r.setAttribute("aria-label",a(c?"chat.close":"chat.open"))}const i=e.getElementById("consent-screen");if(i){const c=i.querySelector("h2");c&&(c.textContent=a("consent.title"));const s=i.querySelectorAll("p");s[0]&&(s[0].textContent=a("consent.body"));const p=i.querySelector(".consent-policy-link a");p&&(p.textContent=a("consent.policy"));const u=i.querySelector(".consent-btn-accept");u&&(u.textContent=a("consent.accept"));const E=i.querySelector(".consent-btn-decline");E&&(E.textContent=a("consent.decline"))}e.querySelectorAll(".lang-btn").forEach(c=>{const s=c;s.dataset.lang===o?s.classList.add("active"):s.classList.remove("active")})}function se(e,o=!1){const t=document.createElement("button");t.id="bubble",t.setAttribute("aria-label",a("chat.open")),t.innerHTML=I;const n=document.createElement("div");n.id="panel",n.setAttribute("aria-hidden","true");const r=document.createElement("div");r.id="panel-header";const l=document.createElement("span");l.id="panel-title",l.textContent=a("chat.title");const i=document.createElement("div");i.className="lang-selector",oe.forEach(({lang:d,svg:h,label:m})=>{const b=document.createElement("button");b.className="lang-btn"+(d===y()?" active":""),b.dataset.lang=d,b.setAttribute("aria-label",m),b.innerHTML=h,i.appendChild(b)});const c=document.createElement("button");c.id="close-btn",c.setAttribute("aria-label",a("chat.close")),c.innerHTML=j,r.appendChild(l),r.appendChild(i),r.appendChild(c),n.appendChild(r),e.appendChild(t),e.appendChild(n);let s=!1,p=!1;i.addEventListener("click",d=>{const h=d.target.closest(".lang-btn");if(!h)return;const m=h.dataset.lang;if(!m)return;const b=y();m!==b&&(U(m),ie(e),s&&$(e))}),e.addEventListener("lead-submitted",()=>{_();const d=e.getElementById("messages");d&&d.remove();const h=e.getElementById("input-area");h&&h.remove(),s=!1});function u(){if(s)return;s=!0;const d=document.createElement("div");d.id="messages",d.setAttribute("aria-live","polite"),d.setAttribute("aria-atomic","false");const h=document.createElement("div");h.id="input-area";const m=document.createElement("input");m.id="chat-input",m.type="text",m.placeholder=a("chat.placeholder"),m.setAttribute("aria-label",a("chat.placeholder")),m.autocomplete="off";const b=document.createElement("button");b.id="send-btn",b.setAttribute("aria-label",a("chat.send")),b.innerHTML=ne,h.appendChild(m),h.appendChild(b),n.appendChild(d),n.appendChild(h);const O=V();if(D()&&O){const re=a("chat.greeting_returning").replace("{name}",O);g(e,"bot",re,"greeting-message")}else g(e,"bot",a("chat.greeting"),"greeting-message");const F=d.lastElementChild;F&&F.setAttribute("data-greeting","true"),W(e),m.focus()}function E(){if(n.classList.add("open"),n.setAttribute("aria-hidden","false"),t.setAttribute("aria-label",a("chat.close")),t.innerHTML=j,o&&!p&&(p=!0,ae(e,a("lang.detected"))),J()){u();const d=e.getElementById("chat-input");d&&d.focus()}else te(e,()=>{u()})}function _(){n.classList.remove("open"),n.setAttribute("aria-hidden","true"),t.setAttribute("aria-label",a("chat.open")),t.innerHTML=I}n.addEventListener("panel-closed",()=>{t.setAttribute("aria-label",a("chat.open")),t.innerHTML=I}),t.addEventListener("click",()=>{n.classList.contains("open")?_():E()}),c.addEventListener("click",()=>{_()})}if(!document.getElementById("jibemates-chat-host")){const e=!localStorage.getItem(v);q();const o=document.createElement("div");o.id="jibemates-chat-host",o.style.cssText="position:static;z-index:50;pointer-events:none;",document.body.appendChild(o);const t=o.attachShadow({mode:"open"}),n=document.createElement("style");n.textContent=G,t.appendChild(n),se(t,e)}})();
