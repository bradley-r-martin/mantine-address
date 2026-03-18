import{j as e}from"./jsx-runtime-SwSI87LU.js";import{C as a,A as l,R as x}from"./AddressInput-B5vpJoHc.js";import{m as U}from"./addressInputMocks-DuXq-fMN.js";import{S as n,T as i,C as w}from"./utilities-C18YIimf.js";import{M as E}from"./MantineProvider-DldqwTQM.js";import"./index-C5e9SFkp.js";import"./international-BGf-XhuS.js";import"./index-Cl6Lk43g.js";import"./index-Dy23IbDT.js";const _={component:l,title:"AddressInput/Restrictions",tags:["autodocs"],parameters:{docs:{description:{component:"Examples of restricting which addresses are accepted (country/region/state/postcode). These stories are provider-agnostic (manual-only or mock provider)."}}},decorators:[s=>e.jsx(E,{children:e.jsx(s,{})})]},o={name:"Australia only",render:()=>e.jsxs(n,{gap:"xs",style:{maxWidth:480},children:[e.jsxs(i,{size:"sm",c:"dimmed",children:[e.jsxs(w,{children:["restrictions=","{{ allowedCountries: [COUNTRIES.AU] }}"]})," — Country dropdown shows only Australia. Manual submit validated on submit."]}),e.jsx(l,{provider:null,restrictions:{allowedCountries:[a.AU]},label:"Address (Australia only)",placeholder:"Click to enter address…",onChange:s=>console.log("Address:",s)})]})},r={name:"allowedRegions (REGIONS.NEW_SOUTH_WALES)",render:()=>e.jsxs(n,{gap:"xs",style:{maxWidth:480},children:[e.jsxs(i,{size:"sm",c:"dimmed",children:[e.jsxs(w,{children:["restrictions=","{{ allowedCountries: [COUNTRIES.AU], allowedRegions: [REGIONS.NEW_SOUTH_WALES] }}"]})," ","— only NSW. With a provider, location bias uses the region's lat/lng/radius."]}),e.jsx(l,{provider:null,restrictions:{allowedCountries:[a.AU],allowedRegions:[x.NEW_SOUTH_WALES]},defaultAddress:{country:"AU",state:"NSW"},label:"Address (NSW only)",placeholder:"Click to enter address…",onChange:s=>console.log("Address:",s)})]})},t={name:"State + postcode (NSW, 2000, 2001)",render:()=>e.jsxs(n,{gap:"xs",style:{maxWidth:480},children:[e.jsx(i,{size:"sm",c:"dimmed",children:"Only NSW addresses with postcode 2000 or 2001 accepted."}),e.jsx(l,{provider:null,restrictions:{allowedCountries:[a.AU],allowedStates:["NSW"],allowedPostcodes:["2000","2001"]},defaultAddress:{country:"AU",state:"NSW"},label:"Address (NSW 2000/2001 only)",placeholder:"Click to enter address…",onChange:s=>console.log("Address:",s)})]})},d={name:"Autocomplete (mock, Australia only)",args:{provider:U,restrictions:{allowedCountries:[a.AU]},label:"Address (Australia only)",placeholder:'Type "123 Main" — selection rejected (mock returns US)',debounce:300,onChange:s=>s!=null&&console.log("Accepted:",s)},parameters:{docs:{description:{story:"With restrictions, selecting a suggestion validates the resolved address. Mock returns US; only AU allowed, so selection shows an error."}}}};var c,p,u;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: 'Australia only',
  render: () => <Stack gap="xs" style={{
    maxWidth: 480
  }}>
      <Text size="sm" c="dimmed">
        <Code>restrictions={'{{ allowedCountries: [COUNTRIES.AU] }}'}</Code> —
        Country dropdown shows only Australia. Manual submit validated on
        submit.
      </Text>
      <AddressInput {...{
      provider: null
    } as unknown as ComponentProps<typeof AddressInput>} restrictions={{
      allowedCountries: [COUNTRIES.AU]
    }} label="Address (Australia only)" placeholder="Click to enter address…" onChange={address => console.log('Address:', address)} />
    </Stack>
}`,...(u=(p=o.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var m,A,S;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: 'allowedRegions (REGIONS.NEW_SOUTH_WALES)',
  render: () => <Stack gap="xs" style={{
    maxWidth: 480
  }}>
      <Text size="sm" c="dimmed">
        <Code>
          restrictions=
          {'{{ allowedCountries: [COUNTRIES.AU], allowedRegions: [REGIONS.NEW_SOUTH_WALES] }}'}
        </Code>{' '}
        — only NSW. With a provider, location bias uses the region&apos;s
        lat/lng/radius.
      </Text>
      <AddressInput {...{
      provider: null
    } as unknown as ComponentProps<typeof AddressInput>} restrictions={{
      allowedCountries: [COUNTRIES.AU],
      allowedRegions: [REGIONS.NEW_SOUTH_WALES]
    }} defaultAddress={{
      country: 'AU',
      state: 'NSW'
    }} label="Address (NSW only)" placeholder="Click to enter address…" onChange={address => console.log('Address:', address)} />
    </Stack>
}`,...(S=(A=r.parameters)==null?void 0:A.docs)==null?void 0:S.source}}};var g,h,C;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: 'State + postcode (NSW, 2000, 2001)',
  render: () => <Stack gap="xs" style={{
    maxWidth: 480
  }}>
      <Text size="sm" c="dimmed">
        Only NSW addresses with postcode 2000 or 2001 accepted.
      </Text>
      <AddressInput {...{
      provider: null
    } as unknown as ComponentProps<typeof AddressInput>} restrictions={{
      allowedCountries: [COUNTRIES.AU],
      allowedStates: ['NSW'],
      allowedPostcodes: ['2000', '2001']
    }} defaultAddress={{
      country: 'AU',
      state: 'NSW'
    }} label="Address (NSW 2000/2001 only)" placeholder="Click to enter address…" onChange={address => console.log('Address:', address)} />
    </Stack>
}`,...(C=(h=t.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};var y,W,N;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: 'Autocomplete (mock, Australia only)',
  args: {
    provider: mockProvider,
    restrictions: {
      allowedCountries: [COUNTRIES.AU]
    },
    label: 'Address (Australia only)',
    placeholder: 'Type "123 Main" — selection rejected (mock returns US)',
    debounce: 300,
    onChange: (address: Address | null) => address != null && console.log('Accepted:', address)
  },
  parameters: {
    docs: {
      description: {
        story: 'With restrictions, selecting a suggestion validates the resolved address. Mock returns US; only AU allowed, so selection shows an error.'
      }
    }
  }
}`,...(N=(W=d.parameters)==null?void 0:W.docs)==null?void 0:N.source}}};const P=["AustraliaOnly","AllowedRegionsNSW","StateAndPostcode","AutocompleteWithRestrictions"];export{r as AllowedRegionsNSW,o as AustraliaOnly,d as AutocompleteWithRestrictions,t as StateAndPostcode,P as __namedExportsOrder,_ as default};
