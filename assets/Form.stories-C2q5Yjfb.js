import{j as e}from"./jsx-runtime-SwSI87LU.js";import{A as S,B as h,T as D}from"./AddressInput-B5vpJoHc.js";import{i as I}from"./international-BGf-XhuS.js";import{m as a}from"./addressInputMocks-DuXq-fMN.js";import{r as x}from"./index-C5e9SFkp.js";import{M as P}from"./MantineProvider-DldqwTQM.js";import{S as n,T as R,C as q}from"./utilities-C18YIimf.js";import"./index-Cl6Lk43g.js";import"./index-Dy23IbDT.js";const Q={component:S,title:"AddressInput/Usage",tags:["autodocs"],parameters:{docs:{description:{component:"Common integration patterns for **AddressInput**: controlled vs uncontrolled usage, form reset, and native form submission."}}},decorators:[r=>e.jsx(P,{children:e.jsx(r,{})})]},i={name:"With error state",args:{provider:a,label:"Address",placeholder:"Start typing…",error:"A valid street address is required."}};function z(){const[r,t]=x.useState(null);return e.jsxs(n,{gap:"md",style:{maxWidth:480},children:[e.jsx(S,{provider:a,label:"Address (controlled)",placeholder:"Select an address…",value:r,onChange:t}),e.jsxs(n,{gap:"xs",children:[e.jsxs(R,{size:"sm",c:"dimmed",children:["Current value: ",r?I.toString(r):"—"]}),e.jsx(h,{variant:"light",size:"xs",onClick:()=>t(null),children:"Clear"})]})]})}const c={name:"Controlled",render:()=>e.jsx(z,{})},m={name:"Uncontrolled",args:{provider:a,label:"Address (uncontrolled)",placeholder:"Select an address…",defaultValue:null}};function B(){const[r,t]=x.useState(""),[s,d]=x.useState(null),l=()=>{t(""),d(null)};return e.jsx("form",{onSubmit:o=>{o.preventDefault(),console.log("Submit:",{name:r,address:s})},children:e.jsxs(n,{gap:"md",style:{maxWidth:480},children:[e.jsx(D,{label:"Name",placeholder:"Your name",value:r,onChange:o=>t(o.currentTarget.value)}),e.jsx(S,{provider:a,label:"Address",placeholder:"Select an address…",value:s,onChange:d}),e.jsxs(n,{gap:"xs",children:[e.jsx(h,{type:"submit",children:"Submit"}),e.jsx(h,{type:"button",variant:"light",onClick:l,children:"Reset form"})]})]})})}const u={name:"With reset (Mantine form pattern)",render:()=>e.jsx(B,{})};function O(){const[r,t]=x.useState(null);return e.jsxs(n,{gap:"md",style:{maxWidth:480},children:[e.jsxs("form",{onSubmit:s=>{s.preventDefault();const d=s.currentTarget,l={};new FormData(d).forEach((o,U)=>{l[U]=String(o)}),t(l)},children:[e.jsx(S,{provider:a,name:"address",label:"Address",placeholder:"Select an address…"}),e.jsx(h,{type:"submit",mt:"md",children:"Submit (log FormData)"})]}),r!=null&&e.jsx(q,{block:!0,children:JSON.stringify(r,null,2)})]})}const p={name:"Native form (hidden inputs)",render:()=>e.jsx(O,{})};var g,v,f;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: 'With error state',
  args: {
    provider: mockProvider,
    label: 'Address',
    placeholder: 'Start typing…',
    error: 'A valid street address is required.'
  }
}`,...(f=(v=i.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var j,b,C;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: 'Controlled',
  render: () => <ControlledStory />
}`,...(C=(b=c.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};var y,A,W;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: 'Uncontrolled',
  args: {
    provider: mockProvider,
    label: 'Address (uncontrolled)',
    placeholder: 'Select an address…',
    defaultValue: null
  }
}`,...(W=(A=m.parameters)==null?void 0:A.docs)==null?void 0:W.source}}};var N,F,k;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  name: 'With reset (Mantine form pattern)',
  render: () => <MantineFormStory />
}`,...(k=(F=u.parameters)==null?void 0:F.docs)==null?void 0:k.source}}};var E,M,T;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: 'Native form (hidden inputs)',
  render: () => <NativeFormStory />
}`,...(T=(M=p.parameters)==null?void 0:M.docs)==null?void 0:T.source}}};const X=["WithError","Controlled","Uncontrolled","WithReset","NativeForm"];export{c as Controlled,p as NativeForm,m as Uncontrolled,i as WithError,u as WithReset,X as __namedExportsOrder,Q as default};
