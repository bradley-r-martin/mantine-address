import{j as e}from"./jsx-runtime-SwSI87LU.js";import{A as h}from"./AddressInput-B5vpJoHc.js";import{i as x}from"./international-BGf-XhuS.js";import{m as y}from"./addressInputMocks-DuXq-fMN.js";import{r as v}from"./index-C5e9SFkp.js";import{M as S}from"./MantineProvider-DldqwTQM.js";import{S as t,T as a,C as d}from"./utilities-C18YIimf.js";import"./index-Cl6Lk43g.js";import"./index-Dy23IbDT.js";const E={component:h,title:"AddressInput/Overview",tags:["autodocs"],parameters:{docs:{description:{component:"Canonical examples for **AddressInput**. Start here to understand the two primary modes: autocomplete with a provider, and manual-only mode (no provider)."}}},decorators:[r=>e.jsx(S,{children:e.jsx(r,{})})]},o={name:"Autocomplete (mock provider)",args:{provider:y,label:"Shipping address",placeholder:"Start typing an address…",debounce:300,onChange:r=>console.log("onChange:",r)}};function j(){const[r,g]=v.useState(null),s=r?x.toString(r):null;return e.jsxs(t,{gap:"md",style:{maxWidth:480},children:[e.jsx(a,{size:"sm",c:"dimmed",children:"No provider — manual-only. Click the input to open the manual-entry modal and submit an address."}),e.jsx(h,{provider:null,label:"Address",placeholder:"Click to enter address manually…",value:r,onChange:g}),r!=null&&e.jsxs(t,{gap:"xs",children:[e.jsx(a,{size:"sm",fw:500,children:"Submitted address:"}),e.jsx(d,{block:!0,children:JSON.stringify(r,null,2)}),s!=null&&e.jsxs(e.Fragment,{children:[e.jsx(a,{size:"sm",fw:500,children:"Formatted:"}),e.jsx(d,{block:!0,children:s})]})]})]})}const n={name:"Manual-only (no provider)",render:()=>e.jsx(j,{})};var l,i,m;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: 'Autocomplete (mock provider)',
  args: {
    provider: mockProvider,
    label: 'Shipping address',
    placeholder: 'Start typing an address…',
    debounce: 300,
    onChange: address => console.log('onChange:', address)
  }
}`,...(m=(i=o.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var c,p,u;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: 'Manual-only (no provider)',
  render: () => <ManualOnlyStory />
}`,...(u=(p=n.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};const I=["Autocomplete","ManualOnly"];export{o as Autocomplete,n as ManualOnly,I as __namedExportsOrder,E as default};
