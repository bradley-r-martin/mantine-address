import{j as e}from"./jsx-runtime-BO8uF4Og.js";import{i as c}from"./international-f5oHL28A.js";import{T as a,D as p,f as U,m as E,u as M,w as I}from"./addressFixtures-BxFIIB4k.js";import{S as s}from"./utilities-CnYJyLXU.js";import{T as t}from"./Text-QktUTj9p.js";import{C as u}from"./Code-XShZHVSU.js";import"./index-D4H_InIO.js";import"./MantineThemeProvider-BbaVGlrq.js";const J={title:"Formatting/International",tags:["autodocs"],parameters:{docs:{description:{component:"The **international** formatter converts an Address to single-line (toString) or envelope (toEnvelope) text. Region-agnostic; optional fields are omitted."}}}};function r({address:m,label:z}){const W=c.toString(m),O=c.toEnvelope(m),_=c.toEnvelope(m,{uppercase:!0});return e.jsxs(s,{gap:"md",children:[e.jsx(t,{size:"sm",fw:500,c:"dimmed",children:z}),e.jsxs(s,{gap:"xs",children:[e.jsx(t,{size:"sm",fw:600,children:"formatter.toString(address)"}),e.jsx(u,{block:!0,children:W||"(empty)"})]}),e.jsxs(s,{gap:"xs",children:[e.jsx(t,{size:"sm",fw:600,children:"formatter.toEnvelope(address)"}),e.jsx(u,{block:!0,children:O||"(empty)"})]}),e.jsxs(s,{gap:"xs",children:[e.jsxs(t,{size:"sm",fw:600,children:["formatter.toEnvelope(address, ","{ uppercase: true }",")"]}),e.jsx(u,{block:!0,children:_||"(empty)"})]})]})}const d={name:"Full address (all fields)",render:()=>e.jsxs(s,{gap:"xl",children:[e.jsx(a,{order:3,children:"Formatting a full address"}),e.jsx(r,{address:U,label:"Address with unit, building, level, street components, suburb, state, postcode, country."})]})},i={name:"Minimal address",render:()=>e.jsxs(s,{gap:"xl",children:[e.jsx(a,{order:3,children:"Minimal address"}),e.jsx(r,{address:E,label:"Only street name and suburb; optional fields omitted."})]})},o={name:"US-style address",render:()=>e.jsxs(s,{gap:"xl",children:[e.jsx(a,{order:3,children:"US address"}),e.jsx(r,{address:M,label:"Uniform Address works for any region; formatting is region-agnostic."})]})},n={name:"With street suffix",render:()=>e.jsxs(s,{gap:"xl",children:[e.jsx(a,{order:3,children:"Address with street suffix"}),e.jsx(r,{address:I,label:"street_suffix (e.g. N, S, E, W) included in street line."})]})},l={name:"All variants side by side",render:()=>e.jsxs(s,{gap:"xl",children:[e.jsx(a,{order:3,children:"International formatter"}),e.jsx(t,{size:"sm",c:"dimmed",children:"toString() and toEnvelope() on the uniform Address type. Optional fields are omitted."}),e.jsx(p,{}),e.jsx(r,{address:U,label:"Full (AU)"}),e.jsx(p,{}),e.jsx(r,{address:E,label:"Minimal"}),e.jsx(p,{}),e.jsx(r,{address:M,label:"US"})]})};var x,f,g;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: 'Full address (all fields)',
  render: () => <Stack gap="xl">
      <Title order={3}>Formatting a full address</Title>
      <FormattingDemo address={fullAddress} label="Address with unit, building, level, street components, suburb, state, postcode, country." />
    </Stack>
}`,...(g=(f=d.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var S,h,j;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: 'Minimal address',
  render: () => <Stack gap="xl">
      <Title order={3}>Minimal address</Title>
      <FormattingDemo address={minimalAddress} label="Only street name and suburb; optional fields omitted." />
    </Stack>
}`,...(j=(h=i.parameters)==null?void 0:h.docs)==null?void 0:j.source}}};var A,b,v;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: 'US-style address',
  render: () => <Stack gap="xl">
      <Title order={3}>US address</Title>
      <FormattingDemo address={usAddress} label="Uniform Address works for any region; formatting is region-agnostic." />
    </Stack>
}`,...(v=(b=o.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var F,T,k;n.parameters={...n.parameters,docs:{...(F=n.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: 'With street suffix',
  render: () => <Stack gap="xl">
      <Title order={3}>Address with street suffix</Title>
      <FormattingDemo address={withSuffix} label="street_suffix (e.g. N, S, E, W) included in street line." />
    </Stack>
}`,...(k=(T=n.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};var y,w,D;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(D=(w=l.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};const K=["FullAddress","MinimalAddress","USAddress","WithStreetSuffix","AllVariants"];export{l as AllVariants,d as FullAddress,i as MinimalAddress,o as USAddress,n as WithStreetSuffix,K as __namedExportsOrder,J as default};
