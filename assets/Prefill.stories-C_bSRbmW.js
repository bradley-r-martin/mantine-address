import{j as e}from"./jsx-runtime-BO8uF4Og.js";import{A as s}from"./AddressInput-CCE_VLyD.js";import{AUSTRALIA as n}from"./au-04nqxTGS.js";import{e as L}from"./addressInputMocks-DuXq-fMN.js";import{S as l}from"./utilities-CnYJyLXU.js";import{T as i}from"./Text-QktUTj9p.js";import{C as r}from"./Code-XShZHVSU.js";import"./index-D4H_InIO.js";import"./international-f5oHL28A.js";import"./iframe-gyinQnND.js";import"./MantineThemeProvider-BbaVGlrq.js";import"./index-dbwHFDAS.js";import"./index-Dd8bRu6S.js";import"./use-isomorphic-effect-CAh38g3c.js";const H={component:s,title:"AddressInput/Prefill",tags:["autodocs"],parameters:{docs:{description:{component:"Use the **prefill** prop to pre-fill the manual-entry form with constants (e.g. `AUSTRALIA`, `AUSTRALIA.NEW_SOUTH_WALES`). Prefer constants over string codes for type safety and consistency with the `accept` prop."}}}},t={name:"Country and region (constants)",render:()=>e.jsxs(l,{gap:"xs",style:{maxWidth:480},children:[e.jsxs(i,{size:"sm",c:"dimmed",children:[e.jsxs(r,{children:["prefill=","{{ country: AUSTRALIA, state: AUSTRALIA.NEW_SOUTH_WALES }}"]})," ","— open the manual modal to see Australia and New South Wales pre-filled."]}),e.jsx(s,{provider:null,prefill:{country:n,state:n.NEW_SOUTH_WALES},label:"Address",placeholder:"Click to enter address manually…"})]}),parameters:{docs:{description:{story:`Usage:

\`\`\`tsx
import { AddressInput, AUSTRALIA } from 'mantine-address';

<AddressInput
  provider={null}
  prefill={{ country: AUSTRALIA, state: AUSTRALIA.NEW_SOUTH_WALES }}
/>
\`\`\`
`}}}},o={name:"Country only",render:()=>e.jsxs(l,{gap:"xs",style:{maxWidth:480},children:[e.jsxs(i,{size:"sm",c:"dimmed",children:[e.jsxs(r,{children:["prefill=","{{ country: AUSTRALIA }}"]})," — only country is pre-filled; state and other fields are empty when the modal opens."]}),e.jsx(s,{provider:null,prefill:{country:n},label:"Address",placeholder:"Click to enter address manually…"})]}),parameters:{docs:{description:{story:`Usage:

\`\`\`tsx
import { AddressInput, AUSTRALIA } from 'mantine-address';

<AddressInput provider={null} prefill={{ country: AUSTRALIA }} />
\`\`\`
`}}}},a={name:"Prefill with accept",render:()=>e.jsxs(l,{gap:"xs",style:{maxWidth:480},children:[e.jsxs(i,{size:"sm",c:"dimmed",children:[e.jsx(r,{children:"prefill"})," and ",e.jsx(r,{children:"accept"})," both use constants. Only Australian addresses are accepted; manual form opens with NSW pre-filled."]}),e.jsx(s,{provider:null,prefill:{country:n,state:n.NEW_SOUTH_WALES},accept:{country:n,region:n.NEW_SOUTH_WALES},label:"Address",placeholder:"Click to enter address manually…"})]}),parameters:{docs:{description:{story:`Usage:

\`\`\`tsx
import { AddressInput, AUSTRALIA } from 'mantine-address';

<AddressInput
  provider={null}
  prefill={{ country: AUSTRALIA, state: AUSTRALIA.NEW_SOUTH_WALES }}
  accept={{ country: AUSTRALIA, region: AUSTRALIA.NEW_SOUTH_WALES }}
/>
\`\`\`
`}}}},d={name:"Prefill with provider (no results → Enter manually)",render:()=>e.jsxs(l,{gap:"xs",style:{maxWidth:480},children:[e.jsxs(i,{size:"sm",c:"dimmed",children:['With a provider that returns no results, choose "Enter manually" — the manual form opens with ',e.jsx(r,{children:"prefill"})," applied (e.g. AU + VIC)."]}),e.jsx(s,{provider:L,prefill:{country:n,state:n.VICTORIA},label:"Address",placeholder:"Type then choose Enter manually…"})]}),parameters:{docs:{description:{story:`Usage:

\`\`\`tsx
import { AddressInput, AUSTRALIA } from 'mantine-address';

<AddressInput
  provider={provider}
  prefill={{ country: AUSTRALIA, state: AUSTRALIA.VICTORIA }}
/>
\`\`\`
`}}}};var p,A,c;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: 'Country and region (constants)',
  render: () => <Stack gap="xs" style={{
    maxWidth: 480
  }}>
      <Text size="sm" c="dimmed">
        <Code>
          prefill=
          {'{{ country: AUSTRALIA, state: AUSTRALIA.NEW_SOUTH_WALES }}'}
        </Code>{' '}
        — open the manual modal to see Australia and New South Wales pre-filled.
      </Text>
      <AddressInput {...{
      provider: null
    } as unknown as ComponentProps<typeof AddressInput>} prefill={{
      country: AUSTRALIA,
      state: AUSTRALIA.NEW_SOUTH_WALES
    }} label="Address" placeholder="Click to enter address manually…" />
    </Stack>,
  parameters: {
    docs: {
      description: {
        story: "Usage:\\n\\n\`\`\`tsx\\nimport { AddressInput, AUSTRALIA } from 'mantine-address';\\n\\n<AddressInput\\n  provider={null}\\n  prefill={{ country: AUSTRALIA, state: AUSTRALIA.NEW_SOUTH_WALES }}\\n/>\\n\`\`\`\\n"
      }
    }
  }
}`,...(c=(A=t.parameters)==null?void 0:A.docs)==null?void 0:c.source}}};var m,u,S;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: 'Country only',
  render: () => <Stack gap="xs" style={{
    maxWidth: 480
  }}>
      <Text size="sm" c="dimmed">
        <Code>prefill={'{{ country: AUSTRALIA }}'}</Code> — only country is
        pre-filled; state and other fields are empty when the modal opens.
      </Text>
      <AddressInput {...{
      provider: null
    } as unknown as ComponentProps<typeof AddressInput>} prefill={{
      country: AUSTRALIA
    }} label="Address" placeholder="Click to enter address manually…" />
    </Stack>,
  parameters: {
    docs: {
      description: {
        story: "Usage:\\n\\n\`\`\`tsx\\nimport { AddressInput, AUSTRALIA } from 'mantine-address';\\n\\n<AddressInput provider={null} prefill={{ country: AUSTRALIA }} />\\n\`\`\`\\n"
      }
    }
  }
}`,...(S=(u=o.parameters)==null?void 0:u.docs)==null?void 0:S.source}}};var y,I,T;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: 'Prefill with accept',
  render: () => <Stack gap="xs" style={{
    maxWidth: 480
  }}>
      <Text size="sm" c="dimmed">
        <Code>prefill</Code> and <Code>accept</Code> both use constants. Only
        Australian addresses are accepted; manual form opens with NSW
        pre-filled.
      </Text>
      <AddressInput {...{
      provider: null
    } as unknown as ComponentProps<typeof AddressInput>} prefill={{
      country: AUSTRALIA,
      state: AUSTRALIA.NEW_SOUTH_WALES
    }} accept={{
      country: AUSTRALIA,
      region: AUSTRALIA.NEW_SOUTH_WALES
    }} label="Address" placeholder="Click to enter address manually…" />
    </Stack>,
  parameters: {
    docs: {
      description: {
        story: "Usage:\\n\\n\`\`\`tsx\\nimport { AddressInput, AUSTRALIA } from 'mantine-address';\\n\\n<AddressInput\\n  provider={null}\\n  prefill={{ country: AUSTRALIA, state: AUSTRALIA.NEW_SOUTH_WALES }}\\n  accept={{ country: AUSTRALIA, region: AUSTRALIA.NEW_SOUTH_WALES }}\\n/>\\n\`\`\`\\n"
      }
    }
  }
}`,...(T=(I=a.parameters)==null?void 0:I.docs)==null?void 0:T.source}}};var f,h,U;d.parameters={...d.parameters,docs:{...(f=d.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: 'Prefill with provider (no results → Enter manually)',
  render: () => <Stack gap="xs" style={{
    maxWidth: 480
  }}>
      <Text size="sm" c="dimmed">
        With a provider that returns no results, choose &quot;Enter
        manually&quot; — the manual form opens with <Code>prefill</Code> applied
        (e.g. AU + VIC).
      </Text>
      <AddressInput provider={emptyProvider} prefill={{
      country: AUSTRALIA,
      state: AUSTRALIA.VICTORIA
    }} label="Address" placeholder="Type then choose Enter manually…" />
    </Stack>,
  parameters: {
    docs: {
      description: {
        story: "Usage:\\n\\n\`\`\`tsx\\nimport { AddressInput, AUSTRALIA } from 'mantine-address';\\n\\n<AddressInput\\n  provider={provider}\\n  prefill={{ country: AUSTRALIA, state: AUSTRALIA.VICTORIA }}\\n/>\\n\`\`\`\\n"
      }
    }
  }
}`,...(U=(h=d.parameters)==null?void 0:h.docs)==null?void 0:U.source}}};const b=["CountryAndRegionConstants","CountryOnly","PrefillWithAccept","PrefillWithProvider"];export{t as CountryAndRegionConstants,o as CountryOnly,a as PrefillWithAccept,d as PrefillWithProvider,b as __namedExportsOrder,H as default};
