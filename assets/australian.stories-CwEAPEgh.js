import{j as e}from"./jsx-runtime-BO8uF4Og.js";import{b as O,n as l,S as i}from"./utilities-CnYJyLXU.js";import{T as c,D as A,f as V,m as z,u as I,w as B}from"./addressFixtures-BxFIIB4k.js";import{T as d}from"./Text-QktUTj9p.js";import{C as h}from"./Code-XShZHVSU.js";import"./index-D4H_InIO.js";import"./MantineThemeProvider-BbaVGlrq.js";const P=["NSW","VIC","QLD","SA","WA","TAS","NT","ACT"],R={"New South Wales":"NSW",Victoria:"VIC",Queensland:"QLD","South Australia":"SA","Western Australia":"WA",Tasmania:"TAS","Northern Territory":"NT","Australian Capital Territory":"ACT"};function Q(s){var r;const t=(r=s.state)==null?void 0:r.trim();if(!t)return;const a=t.toUpperCase();return P.includes(a)?a:R[t]??t}function q(s){const t=O(s),a=Q(s),r=[];l(s.suburb)&&r.push(s.suburb.trim()),a&&r.push(a),l(s.postcode)&&r.push(s.postcode.trim());const o=r.join(" ").trim(),S=l(s.country)?s.country.trim():"";return[t,o,S].filter(Boolean).join(", ")}function G(s,t){const a=O(s),r=Q(s),o=[];l(s.suburb)&&o.push(s.suburb.trim()),r&&o.push(r),l(s.postcode)&&o.push(s.postcode.trim());const S=o.join(" ").trim(),b=l(s.country)?s.country.trim():"",j=[a,S,b].filter(Boolean).join(`
`);return t!=null&&t.uppercase?j.toUpperCase():j}const g={toString:q,toEnvelope:G},se={title:"Formatting/Australian",tags:["autodocs"],parameters:{docs:{description:{component:"The **australian** formatter converts an Address to single-line or envelope text using Australian conventions: state as code (e.g. VIC), comma-separated locality. Optional fields are omitted."}}}};function n({address:s,label:t}){const a=g.toString(s),r=g.toEnvelope(s),o=g.toEnvelope(s,{uppercase:!0});return e.jsxs(i,{gap:"md",children:[e.jsx(d,{size:"sm",fw:500,c:"dimmed",children:t}),e.jsxs(i,{gap:"xs",children:[e.jsx(d,{size:"sm",fw:600,children:"formatter.toString(address)"}),e.jsx(h,{block:!0,children:a||"(empty)"})]}),e.jsxs(i,{gap:"xs",children:[e.jsx(d,{size:"sm",fw:600,children:"formatter.toEnvelope(address)"}),e.jsx(h,{block:!0,children:r||"(empty)"})]}),e.jsxs(i,{gap:"xs",children:[e.jsxs(d,{size:"sm",fw:600,children:["formatter.toEnvelope(address, ","{ uppercase: true }",")"]}),e.jsx(h,{block:!0,children:o||"(empty)"})]})]})}const m={name:"Full address (all fields)",render:()=>e.jsxs(i,{gap:"xl",children:[e.jsx(c,{order:3,children:"Formatting a full address"}),e.jsx(n,{address:V,label:"Address with unit, building, level, street components, suburb, state (VIC), postcode, country."})]})},u={name:"Minimal address",render:()=>e.jsxs(i,{gap:"xl",children:[e.jsx(c,{order:3,children:"Minimal address"}),e.jsx(n,{address:z,label:"Only street name and suburb; optional fields omitted."})]})},p={name:"US-style address",render:()=>e.jsxs(i,{gap:"xl",children:[e.jsx(c,{order:3,children:"US address"}),e.jsx(n,{address:I,label:"Australian formatter applied to a US address; state/country shown as-is."})]})},f={name:"With street suffix",render:()=>e.jsxs(i,{gap:"xl",children:[e.jsx(c,{order:3,children:"Address with street suffix"}),e.jsx(n,{address:B,label:"street_suffix (e.g. N, S, E, W) included in street line."})]})},x={name:"All variants side by side",render:()=>e.jsxs(i,{gap:"xl",children:[e.jsx(c,{order:3,children:"Australian formatter"}),e.jsx(d,{size:"sm",c:"dimmed",children:"toString() and toEnvelope() with Australian conventions (state as code, comma-separated). Optional fields are omitted."}),e.jsx(A,{}),e.jsx(n,{address:V,label:"Full (AU)"}),e.jsx(A,{}),e.jsx(n,{address:z,label:"Minimal"}),e.jsx(A,{}),e.jsx(n,{address:I,label:"US"})]})};var T,y,v;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: 'Full address (all fields)',
  render: () => <Stack gap="xl">
      <Title order={3}>Formatting a full address</Title>
      <FormattingDemo address={fullAddress} label="Address with unit, building, level, street components, suburb, state (VIC), postcode, country." />
    </Stack>
}`,...(v=(y=m.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var F,D,E;u.parameters={...u.parameters,docs:{...(F=u.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: 'Minimal address',
  render: () => <Stack gap="xl">
      <Title order={3}>Minimal address</Title>
      <FormattingDemo address={minimalAddress} label="Only street name and suburb; optional fields omitted." />
    </Stack>
}`,...(E=(D=u.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};var U,w,k;p.parameters={...p.parameters,docs:{...(U=p.parameters)==null?void 0:U.docs,source:{originalSource:`{
  name: 'US-style address',
  render: () => <Stack gap="xl">
      <Title order={3}>US address</Title>
      <FormattingDemo address={usAddress} label="Australian formatter applied to a US address; state/country shown as-is." />
    </Stack>
}`,...(k=(w=p.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};var C,W,_;f.parameters={...f.parameters,docs:{...(C=f.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: 'With street suffix',
  render: () => <Stack gap="xl">
      <Title order={3}>Address with street suffix</Title>
      <FormattingDemo address={withSuffix} label="street_suffix (e.g. N, S, E, W) included in street line." />
    </Stack>
}`,...(_=(W=f.parameters)==null?void 0:W.docs)==null?void 0:_.source}}};var L,M,N;x.parameters={...x.parameters,docs:{...(L=x.parameters)==null?void 0:L.docs,source:{originalSource:`{
  name: 'All variants side by side',
  render: () => <Stack gap="xl">
      <Title order={3}>Australian formatter</Title>
      <Text size="sm" c="dimmed">
        toString() and toEnvelope() with Australian conventions (state as code,
        comma-separated). Optional fields are omitted.
      </Text>
      <Divider />
      <FormattingDemo address={fullAddress} label="Full (AU)" />
      <Divider />
      <FormattingDemo address={minimalAddress} label="Minimal" />
      <Divider />
      <FormattingDemo address={usAddress} label="US" />
    </Stack>
}`,...(N=(M=x.parameters)==null?void 0:M.docs)==null?void 0:N.source}}};const te=["FullAddress","MinimalAddress","USAddress","WithStreetSuffix","AllVariants"];export{x as AllVariants,m as FullAddress,u as MinimalAddress,p as USAddress,f as WithStreetSuffix,te as __namedExportsOrder,se as default};
