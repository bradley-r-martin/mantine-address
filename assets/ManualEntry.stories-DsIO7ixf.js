import{j as e}from"./jsx-runtime-SwSI87LU.js";import{A as u}from"./AddressInput-B5vpJoHc.js";import{i as E}from"./international-BGf-XhuS.js";import{e as j}from"./addressInputMocks-DuXq-fMN.js";import{r as b}from"./index-C5e9SFkp.js";import{S as d,T as s,C as l}from"./utilities-C18YIimf.js";import{M as N}from"./MantineProvider-DldqwTQM.js";import"./index-Cl6Lk43g.js";import"./index-Dy23IbDT.js";const R={component:u,title:"AddressInput/Manual entry",tags:["autodocs"],parameters:{docs:{description:{component:"Manual-entry behaviours for **AddressInput**: pre-filling the form, handling no-results, and controlling whether users can enter manually."}}},decorators:[r=>e.jsx(N,{children:e.jsx(r,{})})]};function k(){const[r,M]=b.useState(null),i=r?E.toString(r):null;return e.jsxs(d,{gap:"md",style:{maxWidth:480},children:[e.jsx(s,{size:"sm",c:"dimmed",children:"Choose Country (e.g. Australia, United States); State is a dropdown for AU/US, text input for others. Submit to see the address below."}),e.jsx(u,{provider:null,label:"Address",placeholder:"Click to enter address manually…",value:r,onChange:M}),r!=null&&e.jsxs(d,{gap:"xs",children:[e.jsx(s,{size:"sm",fw:500,children:"Submitted address:"}),e.jsx(l,{block:!0,children:JSON.stringify(r,null,2)}),i!=null&&e.jsxs(e.Fragment,{children:[e.jsx(s,{size:"sm",fw:500,children:"Formatted:"}),e.jsx(l,{block:!0,children:i})]})]})]})}const t={name:"Country & State (select vs text)",render:()=>e.jsx(k,{})},a={name:"defaultAddress (form pre-fill)",render:()=>e.jsxs(d,{gap:"xs",style:{maxWidth:480},children:[e.jsxs(s,{size:"sm",c:"dimmed",children:[e.jsxs(l,{children:["defaultAddress=","{{ country: 'AU', state: 'NSW' }}"]})," — open the manual modal to see Country and State pre-filled."]}),e.jsx(u,{provider:null,defaultAddress:{country:"AU",state:"NSW"},label:"Address",placeholder:"Click to enter address manually…",onChange:r=>console.log("Manual address:",r)})]})},n={name:"No results (Enter manually option)",args:{provider:j,label:"Address",placeholder:'Type something — no suggestions; then choose "Enter manually"…',debounce:300,onChange:r=>r!=null&&console.log("Manual address:",r)}},o={name:"preventManualEntry true",render:()=>e.jsxs(d,{gap:"xs",style:{maxWidth:480},children:[e.jsxs(s,{size:"sm",c:"dimmed",children:["Provider returns no results + ",e.jsx(l,{children:"preventManualEntry"}),' true. No "Enter manually" option.']}),e.jsx(u,{provider:j,preventManualEntry:!0,label:"Address",placeholder:"Type anything…",nothingFoundMessage:"No results found"})]})};var m,c,p;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: 'Country & State (select vs text)',
  render: () => <CountryStateDisplayStory />
}`,...(p=(c=t.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var y,h,x;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: 'defaultAddress (form pre-fill)',
  render: () => <Stack gap="xs" style={{
    maxWidth: 480
  }}>
      <Text size="sm" c="dimmed">
        <Code>defaultAddress={"{{ country: 'AU', state: 'NSW' }}"}</Code> — open
        the manual modal to see Country and State pre-filled.
      </Text>
      <AddressInput {...{
      provider: null
    } as unknown as ComponentProps<typeof AddressInput>} defaultAddress={{
      country: 'AU',
      state: 'NSW'
    }} label="Address" placeholder="Click to enter address manually…" onChange={address => console.log('Manual address:', address)} />
    </Stack>
}`,...(x=(h=a.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var g,f,S;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: 'No results (Enter manually option)',
  args: {
    provider: emptyProvider,
    label: 'Address',
    placeholder: 'Type something — no suggestions; then choose "Enter manually"…',
    debounce: 300,
    onChange: (address: Address | null) => address != null && console.log('Manual address:', address)
  }
}`,...(S=(f=n.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var A,v,C;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: 'preventManualEntry true',
  render: () => <Stack gap="xs" style={{
    maxWidth: 480
  }}>
      <Text size="sm" c="dimmed">
        Provider returns no results + <Code>preventManualEntry</Code> true. No
        &quot;Enter manually&quot; option.
      </Text>
      <AddressInput provider={emptyProvider} preventManualEntry label="Address" placeholder="Type anything…" nothingFoundMessage="No results found" />
    </Stack>
}`,...(C=(v=o.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};const q=["CountryStateSelect","DefaultAddress","NoResultsEnterManually","PreventManualEntry"];export{t as CountryStateSelect,a as DefaultAddress,n as NoResultsEnterManually,o as PreventManualEntry,q as __namedExportsOrder,R as default};
