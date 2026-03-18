import{j as e}from"./jsx-runtime-SwSI87LU.js";import{i as c}from"./international-BGf-XhuS.js";import{T as d,D as p,f as U,m as E,u as M,w as I}from"./addressFixtures-UYsLNKlb.js";import{S as s,T as a,C as u}from"./utilities-C18YIimf.js";import{M as C}from"./MantineProvider-DldqwTQM.js";import"./index-C5e9SFkp.js";const G={title:"Formatting/International",tags:["autodocs"],parameters:{docs:{description:{component:"The **international** formatter converts an Address to single-line (toString) or envelope (toEnvelope) text. Region-agnostic; optional fields are omitted."}}},decorators:[t=>e.jsx(C,{children:e.jsx(t,{})})]};function r({address:t,label:z}){const W=c.toString(t),O=c.toEnvelope(t),_=c.toEnvelope(t,{uppercase:!0});return e.jsxs(s,{gap:"md",children:[e.jsx(a,{size:"sm",fw:500,c:"dimmed",children:z}),e.jsxs(s,{gap:"xs",children:[e.jsx(a,{size:"sm",fw:600,children:"formatter.toString(address)"}),e.jsx(u,{block:!0,children:W||"(empty)"})]}),e.jsxs(s,{gap:"xs",children:[e.jsx(a,{size:"sm",fw:600,children:"formatter.toEnvelope(address)"}),e.jsx(u,{block:!0,children:O||"(empty)"})]}),e.jsxs(s,{gap:"xs",children:[e.jsxs(a,{size:"sm",fw:600,children:["formatter.toEnvelope(address, ","{ uppercase: true }",")"]}),e.jsx(u,{block:!0,children:_||"(empty)"})]})]})}const i={name:"Full address (all fields)",render:()=>e.jsxs(s,{gap:"xl",children:[e.jsx(d,{order:3,children:"Formatting a full address"}),e.jsx(r,{address:U,label:"Address with unit, building, level, street components, suburb, state, postcode, country."})]})},o={name:"Minimal address",render:()=>e.jsxs(s,{gap:"xl",children:[e.jsx(d,{order:3,children:"Minimal address"}),e.jsx(r,{address:E,label:"Only street name and suburb; optional fields omitted."})]})},n={name:"US-style address",render:()=>e.jsxs(s,{gap:"xl",children:[e.jsx(d,{order:3,children:"US address"}),e.jsx(r,{address:M,label:"Uniform Address works for any region; formatting is region-agnostic."})]})},l={name:"With street suffix",render:()=>e.jsxs(s,{gap:"xl",children:[e.jsx(d,{order:3,children:"Address with street suffix"}),e.jsx(r,{address:I,label:"street_suffix (e.g. N, S, E, W) included in street line."})]})},m={name:"All variants side by side",render:()=>e.jsxs(s,{gap:"xl",children:[e.jsx(d,{order:3,children:"International formatter"}),e.jsx(a,{size:"sm",c:"dimmed",children:"toString() and toEnvelope() on the uniform Address type. Optional fields are omitted."}),e.jsx(p,{}),e.jsx(r,{address:U,label:"Full (AU)"}),e.jsx(p,{}),e.jsx(r,{address:E,label:"Minimal"}),e.jsx(p,{}),e.jsx(r,{address:M,label:"US"})]})};var x,f,g;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: 'Full address (all fields)',
  render: () => <Stack gap="xl">
      <Title order={3}>Formatting a full address</Title>
      <FormattingDemo address={fullAddress} label="Address with unit, building, level, street components, suburb, state, postcode, country." />
    </Stack>
}`,...(g=(f=i.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var S,h,j;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: 'Minimal address',
  render: () => <Stack gap="xl">
      <Title order={3}>Minimal address</Title>
      <FormattingDemo address={minimalAddress} label="Only street name and suburb; optional fields omitted." />
    </Stack>
}`,...(j=(h=o.parameters)==null?void 0:h.docs)==null?void 0:j.source}}};var A,b,v;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: 'US-style address',
  render: () => <Stack gap="xl">
      <Title order={3}>US address</Title>
      <FormattingDemo address={usAddress} label="Uniform Address works for any region; formatting is region-agnostic." />
    </Stack>
}`,...(v=(b=n.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var F,T,k;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: 'With street suffix',
  render: () => <Stack gap="xl">
      <Title order={3}>Address with street suffix</Title>
      <FormattingDemo address={withSuffix} label="street_suffix (e.g. N, S, E, W) included in street line." />
    </Stack>
}`,...(k=(T=l.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};var y,w,D;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: 'All variants side by side',
  render: () => <Stack gap="xl">
      <Title order={3}>International formatter</Title>
      <Text size="sm" c="dimmed">
        toString() and toEnvelope() on the uniform Address type. Optional fields
        are omitted.
      </Text>
      <Divider />
      <FormattingDemo address={fullAddress} label="Full (AU)" />
      <Divider />
      <FormattingDemo address={minimalAddress} label="Minimal" />
      <Divider />
      <FormattingDemo address={usAddress} label="US" />
    </Stack>
}`,...(D=(w=m.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};const H=["FullAddress","MinimalAddress","USAddress","WithStreetSuffix","AllVariants"];export{m as AllVariants,i as FullAddress,o as MinimalAddress,n as USAddress,l as WithStreetSuffix,H as __namedExportsOrder,G as default};
