import{j as e}from"./jsx-runtime-BO8uF4Og.js";import{A as a}from"./AddressInput-CCE_VLyD.js";import{i as D}from"./international-f5oHL28A.js";import{e as w}from"./addressInputMocks-DuXq-fMN.js";import{r as T}from"./index-D4H_InIO.js";import{S as t}from"./utilities-CnYJyLXU.js";import{T as r}from"./Text-QktUTj9p.js";import{C as n}from"./Code-XShZHVSU.js";import"./iframe-gyinQnND.js";import"./MantineThemeProvider-BbaVGlrq.js";import"./index-dbwHFDAS.js";import"./index-Dd8bRu6S.js";import"./use-isomorphic-effect-CAh38g3c.js";const Q={component:a,title:"AddressInput/Manual entry",tags:["autodocs"],parameters:{docs:{description:{component:"Manual-entry behaviours for **AddressInput**: pre-filling the form, handling no-results, and controlling whether users can enter manually."}}}};function P(){const[s,k]=T.useState(null),c=s?D.toString(s):null;return e.jsxs(t,{gap:"md",style:{maxWidth:480},children:[e.jsx(r,{size:"sm",c:"dimmed",children:"Choose Country (e.g. Australia, United States); State is a dropdown for AU/US, text input for others. Submit to see the address below."}),e.jsx(a,{provider:null,label:"Address",placeholder:"Click to enter address manually…",value:s,onChange:k}),s!=null&&e.jsxs(t,{gap:"xs",children:[e.jsx(r,{size:"sm",fw:500,children:"Submitted address:"}),e.jsx(n,{block:!0,children:JSON.stringify(s,null,2)}),c!=null&&e.jsxs(e.Fragment,{children:[e.jsx(r,{size:"sm",fw:500,children:"Formatted:"}),e.jsx(n,{block:!0,children:c})]})]})]})}const d={name:"Country & State (select vs text)",render:()=>e.jsx(P,{}),parameters:{docs:{description:{story:`Usage:

\`\`\`tsx
import { AddressInput } from 'mantine-address';

<AddressInput provider={null} />
\`\`\`
`}}}},o={name:"defaultAddress (form pre-fill)",render:()=>e.jsxs(t,{gap:"xs",style:{maxWidth:480},children:[e.jsxs(r,{size:"sm",c:"dimmed",children:[e.jsxs(n,{children:["defaultAddress=","{{ country: 'AU', state: 'NSW' }}"]})," — open the manual modal to see Country and State pre-filled."]}),e.jsx(a,{provider:null,defaultAddress:{country:"AU",state:"NSW"},label:"Address",placeholder:"Click to enter address manually…",onChange:s=>console.log("Manual address:",s)})]}),parameters:{docs:{description:{story:`Usage:

\`\`\`tsx
import { AddressInput } from 'mantine-address';

<AddressInput
  provider={null}
  defaultAddress={{ country: 'AU', state: 'NSW' }}
/>
\`\`\`
`}}}},i={name:"No results (Enter manually option)",args:{provider:w,label:"Address",placeholder:'Type something — no suggestions; then choose "Enter manually"…',debounce:300,onChange:s=>s!=null&&console.log("Manual address:",s)},parameters:{docs:{description:{story:`Usage:

\`\`\`tsx
import { AddressInput } from 'mantine-address';

<AddressInput
  provider={provider}
  preventManualEntry={false}
  nothingFoundMessage='No results found'
/>
\`\`\`
`}}}},l={name:"preventManualEntry true",render:()=>e.jsxs(t,{gap:"xs",style:{maxWidth:480},children:[e.jsxs(r,{size:"sm",c:"dimmed",children:["Provider returns no results + ",e.jsx(n,{children:"preventManualEntry"}),' true. No "Enter manually" option.']}),e.jsx(a,{provider:w,preventManualEntry:!0,label:"Address",placeholder:"Type anything…",nothingFoundMessage:"No results found"})]}),parameters:{docs:{description:{story:`Usage:

\`\`\`tsx
import { AddressInput } from 'mantine-address';

<AddressInput provider={provider} preventManualEntry />
\`\`\`
`}}}},u={name:"data prop (custom countries + regions)",render:()=>e.jsxs(t,{gap:"xs",style:{maxWidth:480},children:[e.jsxs(r,{size:"sm",c:"dimmed",children:["Demonstrates ",e.jsx(n,{children:"data"})," prop. Country list is limited to Australia, and State options come from a custom async"," ",e.jsx(n,{children:"regions"})," resolver."]}),e.jsx(a,{provider:null,label:"Address",placeholder:"Click to enter address manually…",data:{countries:[{code:"AU",name:"Australia"}],regions:async s=>s.trim().toUpperCase()==="AU"?{NEW_SOUTH_WALES:{name:"New South Wales",abbreviation:"NSW",location:{latitude:-33.8688,longitude:151.2093,radius:1e3}}}:void 0}})]}),parameters:{docs:{description:{story:`Usage:

\`\`\`tsx
import { AddressInput, type AddressData } from 'mantine-address';

const data: AddressData = {
  countries: [{ code: 'AU', name: 'Australia' }],
  regions: async (code) =>
    code.toUpperCase() === 'AU'
      ? {
          NEW_SOUTH_WALES: {
            name: 'New South Wales',
            abbreviation: 'NSW',
            location: { latitude: -33.8688, longitude: 151.2093, radius: 1000 },
          },
        }
      : undefined,
};

<AddressInput provider={null} data={data} />
\`\`\`
`}}}},p={name:"data prop (suburbs + postcodes autocomplete)",render:()=>e.jsxs(t,{gap:"xs",style:{maxWidth:480},children:[e.jsxs(r,{size:"sm",c:"dimmed",children:["Demonstrates ",e.jsx(n,{children:"data"})," prop with async ",e.jsx(n,{children:"suburbs"})," and"," ",e.jsx(n,{children:"postcodes"}),". When provided, Suburb/Postcode become autocomplete inputs for the selected country."]}),e.jsx(a,{provider:null,label:"Address",placeholder:"Click to enter address manually…",data:{countries:[{code:"AU",name:"Australia"}],suburbs:async s=>s.trim().toUpperCase()==="AU"?["Sydney","Surry Hills","Newtown","Parramatta"]:void 0,postcodes:async s=>s.trim().toUpperCase()==="AU"?["2000","2010","2042","2150"]:void 0}})]}),parameters:{docs:{description:{story:`Usage:

\`\`\`tsx
import { AddressInput, type AddressData } from 'mantine-address';

const data: AddressData = {
  countries: [{ code: 'AU', name: 'Australia' }],
  suburbs: async (code) => (code.toUpperCase() === 'AU' ? ['Sydney'] : undefined),
  postcodes: async (code) => (code.toUpperCase() === 'AU' ? ['2000'] : undefined),
};

<AddressInput provider={null} data={data} />
\`\`\`
`}}}};var m,y,A;d.parameters={...d.parameters,docs:{...(m=d.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: 'Country & State (select vs text)',
  render: () => <CountryStateDisplayStory />,
  parameters: {
    docs: {
      description: {
        story: "Usage:\\n\\n\`\`\`tsx\\nimport { AddressInput } from 'mantine-address';\\n\\n<AddressInput provider={null} />\\n\`\`\`\\n"
      }
    }
  }
}`,...(A=(y=d.parameters)==null?void 0:y.docs)==null?void 0:A.source}}};var h,g,x;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
    </Stack>,
  parameters: {
    docs: {
      description: {
        story: "Usage:\\n\\n\`\`\`tsx\\nimport { AddressInput } from 'mantine-address';\\n\\n<AddressInput\\n  provider={null}\\n  defaultAddress={{ country: 'AU', state: 'NSW' }}\\n/>\\n\`\`\`\\n"
      }
    }
  }
}`,...(x=(g=o.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var S,f,v;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: 'No results (Enter manually option)',
  args: {
    provider: emptyProvider,
    label: 'Address',
    placeholder: 'Type something — no suggestions; then choose "Enter manually"…',
    debounce: 300,
    onChange: (address: Address | null) => address != null && console.log('Manual address:', address)
  },
  parameters: {
    docs: {
      description: {
        story: "Usage:\\n\\n\`\`\`tsx\\nimport { AddressInput } from 'mantine-address';\\n\\n<AddressInput\\n  provider={provider}\\n  preventManualEntry={false}\\n  nothingFoundMessage='No results found'\\n/>\\n\`\`\`\\n"
      }
    }
  }
}`,...(v=(f=i.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var U,C,b;l.parameters={...l.parameters,docs:{...(U=l.parameters)==null?void 0:U.docs,source:{originalSource:`{
  name: 'preventManualEntry true',
  render: () => <Stack gap="xs" style={{
    maxWidth: 480
  }}>
      <Text size="sm" c="dimmed">
        Provider returns no results + <Code>preventManualEntry</Code> true. No
        &quot;Enter manually&quot; option.
      </Text>
      <AddressInput provider={emptyProvider} preventManualEntry label="Address" placeholder="Type anything…" nothingFoundMessage="No results found" />
    </Stack>,
  parameters: {
    docs: {
      description: {
        story: "Usage:\\n\\n\`\`\`tsx\\nimport { AddressInput } from 'mantine-address';\\n\\n<AddressInput provider={provider} preventManualEntry />\\n\`\`\`\\n"
      }
    }
  }
}`,...(b=(C=l.parameters)==null?void 0:C.docs)==null?void 0:b.source}}};var W,I,j;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:`{
  name: 'data prop (custom countries + regions)',
  render: () => <Stack gap="xs" style={{
    maxWidth: 480
  }}>
      <Text size="sm" c="dimmed">
        Demonstrates <Code>data</Code> prop. Country list is limited to
        Australia, and State options come from a custom async{' '}
        <Code>regions</Code> resolver.
      </Text>
      <AddressInput {...{
      provider: null
    } as unknown as ComponentProps<typeof AddressInput>} label="Address" placeholder="Click to enter address manually…" data={{
      countries: [{
        code: 'AU',
        name: 'Australia'
      }],
      regions: async code => code.trim().toUpperCase() === 'AU' ? {
        NEW_SOUTH_WALES: {
          name: 'New South Wales',
          abbreviation: 'NSW',
          location: {
            latitude: -33.8688,
            longitude: 151.2093,
            radius: 1000
          }
        }
      } : undefined
    }} />
    </Stack>,
  parameters: {
    docs: {
      description: {
        story: "Usage:\\n\\n\`\`\`tsx\\nimport { AddressInput, type AddressData } from 'mantine-address';\\n\\nconst data: AddressData = {\\n  countries: [{ code: 'AU', name: 'Australia' }],\\n  regions: async (code) =>\\n    code.toUpperCase() === 'AU'\\n      ? {\\n          NEW_SOUTH_WALES: {\\n            name: 'New South Wales',\\n            abbreviation: 'NSW',\\n            location: { latitude: -33.8688, longitude: 151.2093, radius: 1000 },\\n          },\\n        }\\n      : undefined,\\n};\\n\\n<AddressInput provider={null} data={data} />\\n\`\`\`\\n"
      }
    }
  }
}`,...(j=(I=u.parameters)==null?void 0:I.docs)==null?void 0:j.source}}};var E,N,M;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: 'data prop (suburbs + postcodes autocomplete)',
  render: () => <Stack gap="xs" style={{
    maxWidth: 480
  }}>
      <Text size="sm" c="dimmed">
        Demonstrates <Code>data</Code> prop with async <Code>suburbs</Code> and{' '}
        <Code>postcodes</Code>. When provided, Suburb/Postcode become
        autocomplete inputs for the selected country.
      </Text>
      <AddressInput {...{
      provider: null
    } as unknown as ComponentProps<typeof AddressInput>} label="Address" placeholder="Click to enter address manually…" data={{
      countries: [{
        code: 'AU',
        name: 'Australia'
      }],
      suburbs: async code => code.trim().toUpperCase() === 'AU' ? ['Sydney', 'Surry Hills', 'Newtown', 'Parramatta'] : undefined,
      postcodes: async code => code.trim().toUpperCase() === 'AU' ? ['2000', '2010', '2042', '2150'] : undefined
    }} />
    </Stack>,
  parameters: {
    docs: {
      description: {
        story: "Usage:\\n\\n\`\`\`tsx\\nimport { AddressInput, type AddressData } from 'mantine-address';\\n\\nconst data: AddressData = {\\n  countries: [{ code: 'AU', name: 'Australia' }],\\n  suburbs: async (code) => (code.toUpperCase() === 'AU' ? ['Sydney'] : undefined),\\n  postcodes: async (code) => (code.toUpperCase() === 'AU' ? ['2000'] : undefined),\\n};\\n\\n<AddressInput provider={null} data={data} />\\n\`\`\`\\n"
      }
    }
  }
}`,...(M=(N=p.parameters)==null?void 0:N.docs)==null?void 0:M.source}}};const V=["CountryStateSelect","DefaultAddress","NoResultsEnterManually","PreventManualEntry","BringYourOwnData","BringYourOwnDataWithSuburbsAndPostcodes"];export{u as BringYourOwnData,p as BringYourOwnDataWithSuburbsAndPostcodes,d as CountryStateSelect,o as DefaultAddress,i as NoResultsEnterManually,l as PreventManualEntry,V as __namedExportsOrder,Q as default};
