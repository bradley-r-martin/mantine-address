import{j as e}from"./jsx-runtime-BO8uF4Og.js";import{A as S,B as h,T as I}from"./AddressInput-CCE_VLyD.js";import{i as M}from"./international-f5oHL28A.js";import{m as a}from"./addressInputMocks-DuXq-fMN.js";import{r as x}from"./index-D4H_InIO.js";import{S as n}from"./utilities-CnYJyLXU.js";import{T as R}from"./Text-QktUTj9p.js";import{C as P}from"./Code-XShZHVSU.js";import"./iframe-gyinQnND.js";import"./MantineThemeProvider-BbaVGlrq.js";import"./index-dbwHFDAS.js";import"./index-Dd8bRu6S.js";import"./use-isomorphic-effect-CAh38g3c.js";const $={component:S,title:"AddressInput/Usage",tags:["autodocs"],parameters:{docs:{description:{component:"Common integration patterns for **AddressInput**: controlled vs uncontrolled usage, form reset, and native form submission."}}}},i={name:"With error state",args:{provider:a,label:"Address",placeholder:"Start typing…",error:"A valid street address is required."}};function q(){const[r,t]=x.useState(null);return e.jsxs(n,{gap:"md",style:{maxWidth:480},children:[e.jsx(S,{provider:a,label:"Address (controlled)",placeholder:"Select an address…",value:r,onChange:t}),e.jsxs(n,{gap:"xs",children:[e.jsxs(R,{size:"sm",c:"dimmed",children:["Current value: ",r?M.toString(r):"—"]}),e.jsx(h,{variant:"light",size:"xs",onClick:()=>t(null),children:"Clear"})]})]})}const m={name:"Controlled",render:()=>e.jsx(q,{})},c={name:"Uncontrolled",args:{provider:a,label:"Address (uncontrolled)",placeholder:"Select an address…",defaultValue:null}};function z(){const[r,t]=x.useState(""),[s,d]=x.useState(null),l=()=>{t(""),d(null)};return e.jsx("form",{onSubmit:o=>{o.preventDefault(),console.log("Submit:",{name:r,address:s})},children:e.jsxs(n,{gap:"md",style:{maxWidth:480},children:[e.jsx(I,{label:"Name",placeholder:"Your name",value:r,onChange:o=>t(o.currentTarget.value)}),e.jsx(S,{provider:a,label:"Address",placeholder:"Select an address…",value:s,onChange:d}),e.jsxs(n,{gap:"xs",children:[e.jsx(h,{type:"submit",children:"Submit"}),e.jsx(h,{type:"button",variant:"light",onClick:l,children:"Reset form"})]})]})})}const p={name:"With reset (Mantine form pattern)",render:()=>e.jsx(z,{})};function B(){const[r,t]=x.useState(null);return e.jsxs(n,{gap:"md",style:{maxWidth:480},children:[e.jsxs("form",{onSubmit:s=>{s.preventDefault();const d=s.currentTarget,l={};new FormData(d).forEach((o,D)=>{l[D]=String(o)}),t(l)},children:[e.jsx(S,{provider:a,name:"address",label:"Address",placeholder:"Select an address…"}),e.jsx(h,{type:"submit",mt:"md",children:"Submit (log FormData)"})]}),r!=null&&e.jsx(P,{block:!0,children:JSON.stringify(r,null,2)})]})}const u={name:"Native form (hidden inputs)",render:()=>e.jsx(B,{})};var g,f,v;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: 'With error state',
  args: {
    provider: mockProvider,
    label: 'Address',
    placeholder: 'Start typing…',
    error: 'A valid street address is required.'
  }
}`,...(v=(f=i.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var j,b,C;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: 'Controlled',
  render: () => <ControlledStory />
}`,...(C=(b=m.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};var y,A,W;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: 'Uncontrolled',
  args: {
    provider: mockProvider,
    label: 'Address (uncontrolled)',
    placeholder: 'Select an address…',
    defaultValue: null
  }
}`,...(W=(A=c.parameters)==null?void 0:A.docs)==null?void 0:W.source}}};var N,F,k;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`{
  name: 'With reset (Mantine form pattern)',
  render: () => <MantineFormStory />
}`,...(k=(F=p.parameters)==null?void 0:F.docs)==null?void 0:k.source}}};var E,T,U;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: 'Native form (hidden inputs)',
  render: () => <NativeFormStory />
}`,...(U=(T=u.parameters)==null?void 0:T.docs)==null?void 0:U.source}}};const ee=["WithError","Controlled","Uncontrolled","WithReset","NativeForm"];export{m as Controlled,u as NativeForm,c as Uncontrolled,i as WithError,p as WithReset,ee as __namedExportsOrder,$ as default};
