import{j as r}from"./jsx-runtime-BO8uF4Og.js";import{r as f}from"./index-D4H_InIO.js";import{B as T,A as z,d as w,g as B,C as W,G as V,S as G,a as N}from"./AddressInput-CCE_VLyD.js";import{i as $}from"./international-f5oHL28A.js";import{S as v}from"./utilities-CnYJyLXU.js";import{T as h}from"./Text-QktUTj9p.js";import{C as D}from"./Code-XShZHVSU.js";import"./iframe-gyinQnND.js";import"./MantineThemeProvider-BbaVGlrq.js";import"./index-dbwHFDAS.js";import"./index-Dd8bRu6S.js";import"./use-isomorphic-effect-CAh38g3c.js";function I(){var e,a;if(typeof window>"u"||!((a=(e=window.google)==null?void 0:e.maps)!=null&&a.places))throw new Error(`[GooglePlacesProvider] Google Maps JavaScript API is not loaded. Add the following script to your HTML before using this provider:
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&libraries=places"><\/script>`)}function q(e,a,t,c){const n=l=>{var d;return((d=e.find(p=>p.types.includes(l)))==null?void 0:d.long_name)||void 0},o=l=>{var d;return((d=e.find(p=>p.types.includes(l)))==null?void 0:d.short_name)||void 0},s=e.find(l=>l.types.includes("administrative_area_level_1")),i=(s==null?void 0:s.short_name)??(s==null?void 0:s.long_name)??void 0;return{place_id:a,street_number:n("street_number"),street_name:n("route"),street_type:void 0,street_suffix:void 0,suburb:n("locality")??n("administrative_area_level_3"),state:i,postcode:n("postal_code"),country:o("country")??n("country"),latitude:t,longitude:c}}class C{constructor({apiKey:a}){this.apiKey=a}async getSuggestions(a,t){if(I(),!a)return[];const c=new google.maps.places.AutocompleteService,n={input:a,types:["address"]},o=t==null?void 0:t.accept;if(o!=null&&o.country){const i=(typeof o.country=="string"?o.country:o.country.code).trim().toLowerCase();i&&(n.componentRestrictions={country:[i]})}const s=o==null?void 0:o.region;return s&&typeof s=="object"&&s.location&&(n.location=new google.maps.LatLng(s.location.latitude,s.location.longitude),n.radius=s.location.radius),new Promise((i,g)=>{c.getPlacePredictions(n,(l,d)=>{if(d===google.maps.places.PlacesServiceStatus.ZERO_RESULTS){i([]);return}if(d!==google.maps.places.PlacesServiceStatus.OK||!l){g(new Error(`[GooglePlacesProvider] Autocomplete error: ${d}`));return}i(l.map(p=>{var u;return{id:p.place_id??p.description,label:p.description,matchedSubstrings:(u=p.matched_substrings)==null?void 0:u.map(m=>({offset:m.offset,length:m.length}))}}))})})}async getDetails(a){I();const t=document.createElement("div"),c=new google.maps.places.PlacesService(t);return new Promise((n,o)=>{c.getDetails({placeId:a,fields:["address_components","geometry","place_id"]},(s,i)=>{var m;if(i!==google.maps.places.PlacesServiceStatus.OK||!(s!=null&&s.address_components)){o(new Error(`[GooglePlacesProvider] Place Details error: ${i}`));return}const g=(m=s.geometry)==null?void 0:m.location,l=g==null?void 0:g.lat,d=g==null?void 0:g.lng,p=typeof l=="number"?l:typeof l=="function"?l():void 0,u=typeof d=="number"?d:typeof d=="function"?d():void 0;n(q(s.address_components,s.place_id??a,p,u))})})}}const F={},b=F.STORYBOOK_GOOGLE_MAPS_API_KEY,H=[{value:"",label:"Any"},...N().map(e=>({value:e.code,label:e.name}))],y={state:"idle",key:null};function _({apiKey:e,...a}){const[t,c]=f.useState(()=>y.state==="loaded"&&y.key===e?"loaded":"idle"),n=f.useRef(null);return f.useEffect(()=>{if(!e){c("idle");return}if(y.state==="loaded"&&y.key===e){c("loaded"),n.current=new C({apiKey:e});return}if(y.state==="loaded"&&y.key!==e){c("error");return}c("loading"),y.state="loading",y.key=e;const o=document.createElement("script");o.src=`https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(e)}&libraries=places`,o.async=!0,o.addEventListener("load",()=>{y.state="loaded",n.current=new C({apiKey:e}),c("loaded")}),o.addEventListener("error",()=>{y.state="error",c("error")}),document.head.appendChild(o)},[e]),e?t==="loading"?r.jsx(v,{gap:"xs",p:"md",children:r.jsx(h,{size:"sm",children:"Loading Google Maps…"})}):t==="error"&&y.key!==e?r.jsxs(v,{gap:"xs",p:"md",children:[r.jsx(h,{size:"sm",c:"red",children:"The Google Maps script was already loaded with a different API key. Reload the page and enter the new key."}),r.jsx(T,{size:"xs",variant:"light",onClick:()=>window.location.reload(),children:"Reload page"})]}):t==="error"?r.jsx(v,{gap:"xs",p:"md",children:r.jsxs(h,{size:"sm",c:"red",children:["Failed to load Google Maps. Ensure your API key is valid and the"," ",r.jsx("strong",{children:"Places API"})," is enabled."]})}):t==="loaded"&&n.current?r.jsx(z,{provider:n.current,label:a.label??"Address",placeholder:a.placeholder??"Start typing an address…",onChange:o=>o!=null&&console.log("[GooglePlaces] selected:",o),style:{maxWidth:520},...a}):null:r.jsxs(v,{gap:"xs",p:"md",style:{maxWidth:520},children:[r.jsxs(h,{size:"sm",c:"dimmed",children:["Paste your Google Maps API key in the ",r.jsx("strong",{children:"Controls"})," panel to test live lookup."]}),r.jsxs(h,{size:"xs",c:"dimmed",children:["Restrict the key to ",r.jsx(D,{children:"http://localhost:*"})," and your Storybook URL in Google Cloud Console."]})]})}function J({apiKey:e,debounce:a=300}){const[t,c]=f.useState(""),[n,o]=f.useState(""),[s,i]=f.useState([]),[g,l]=f.useState(!1);f.useEffect(()=>{let u=!1;if(!t||!w.regions){i([]),l(!1);return}return l(!0),w.regions(t).then(m=>{if(u)return;if(!m){i([]),l(!1);return}const Y=B(m);i([{value:"",label:"Any region"},...Y.map(A=>({value:A.code,label:A.name}))]),l(!1)}).catch(()=>{u||(i([]),l(!1))}),()=>{u=!0}},[t]);const d=s.length>0,p=f.useMemo(()=>{if(!t)return;const m={country:W[t]??t};return n&&t?{...m,region:n}:m},[t,n]);return r.jsxs(v,{gap:"md",style:{maxWidth:520},children:[r.jsxs(V,{wrap:"nowrap",align:"flex-end",gap:"sm",children:[r.jsx(G,{label:"Restrict to country",placeholder:"Any",data:H,value:t||null,onChange:u=>{c(u??""),o("")},clearable:!0,searchable:!0,style:{flex:1}}),r.jsx(G,{label:"Restrict to region (state)",placeholder:"Any region",data:d?s:g?[{value:"",label:"Loading…"}]:[{value:"",label:"—"}],value:d&&n||null,onChange:u=>o(u??""),clearable:!0,searchable:!0,disabled:!d&&!g,style:{flex:1}})]}),p&&r.jsxs(h,{size:"sm",c:"dimmed",children:["accept=","{{"," country: ",t,n&&`, region: ${n}`," ","}}"]}),r.jsx(_,{apiKey:e,debounce:a,label:"Address",placeholder:"Start typing an address…",accept:p})]})}const ce={component:_,title:"Providers/Google Places",tags:["autodocs"],parameters:{docs:{description:{component:"Canonical examples for using **AddressInput** with **GooglePlacesProvider**. Requires a Google Maps API key with the Places API enabled."}}},argTypes:{apiKey:{name:"Google Maps API Key",description:"API key with Places API enabled. Can be set via STORYBOOK_GOOGLE_MAPS_API_KEY at build time.",control:{type:"text"},table:{type:{summary:"string"}}},debounce:{name:"Debounce (ms)",control:{type:"number",min:0,max:2e3,step:50},table:{defaultValue:{summary:"300"}}},label:{control:"text"},placeholder:{control:"text"}}},P={name:"Setup + default",args:{apiKey:b??"",debounce:300,label:"Address",placeholder:"Start typing a real address…"},parameters:{docs:{description:{story:`Usage:

\`\`\`tsx
import { AddressInput, GooglePlacesProvider } from 'mantine-address';

const provider = new GooglePlacesProvider({ apiKey: '...' });

<AddressInput provider={provider} />
\`\`\`
`}}}},x={name:"Accept: country/region select",render:e=>r.jsx(J,{apiKey:e.apiKey??b??"",debounce:e.debounce??300}),args:{apiKey:b??"",debounce:300},parameters:{docs:{description:{story:`Use the country and region dropdowns to restrict which addresses are accepted.

Usage:

\`\`\`tsx
import { AddressInput, GooglePlacesProvider } from 'mantine-address';

const provider = new GooglePlacesProvider({ apiKey: '...' });

<AddressInput
  provider={provider}
  accept={{ country: 'AU', region: 'NSW' }}
/>
\`\`\`
`}}}};function Z(){const[e,a]=f.useState(null);return r.jsxs(v,{gap:"md",style:{maxWidth:520},children:[r.jsx(_,{apiKey:b??"",debounce:300,label:"Address (controlled)",placeholder:"Select an address…",value:e,onChange:a}),e!=null&&r.jsxs(v,{gap:"xs",children:[r.jsx(h,{size:"sm",fw:500,children:"Selected:"}),r.jsx(D,{block:!0,children:$.toString(e)}),r.jsx(T,{variant:"light",size:"xs",onClick:()=>a(null),children:"Clear"})]})]})}const S={name:"Controlled",render:()=>r.jsx(Z,{}),parameters:{docs:{description:{story:`Usage:

\`\`\`tsx
import { AddressInput, GooglePlacesProvider } from 'mantine-address';

const provider = new GooglePlacesProvider({ apiKey: '...' });

function Example() {
  const [value, setValue] = useState(null);
  return <AddressInput provider={provider} value={value} onChange={setValue} />;
}
\`\`\`
`}}}};var j,E,R;P.parameters={...P.parameters,docs:{...(j=P.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: 'Setup + default',
  args: {
    apiKey: BUILD_TIME_KEY ?? '',
    debounce: 300,
    label: 'Address',
    placeholder: 'Start typing a real address…'
  },
  parameters: {
    docs: {
      description: {
        story: "Usage:\\n\\n\`\`\`tsx\\nimport { AddressInput, GooglePlacesProvider } from 'mantine-address';\\n\\nconst provider = new GooglePlacesProvider({ apiKey: '...' });\\n\\n<AddressInput provider={provider} />\\n\`\`\`\\n"
      }
    }
  }
}`,...(R=(E=P.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var O,k,L;x.parameters={...x.parameters,docs:{...(O=x.parameters)==null?void 0:O.docs,source:{originalSource:`{
  name: 'Accept: country/region select',
  render: args => <GooglePlacesWithRestrictionSelects apiKey={args.apiKey ?? BUILD_TIME_KEY ?? ''} debounce={args.debounce ?? 300} />,
  args: {
    apiKey: BUILD_TIME_KEY ?? '',
    debounce: 300
  },
  parameters: {
    docs: {
      description: {
        story: "Use the country and region dropdowns to restrict which addresses are accepted.\\n\\nUsage:\\n\\n\`\`\`tsx\\nimport { AddressInput, GooglePlacesProvider } from 'mantine-address';\\n\\nconst provider = new GooglePlacesProvider({ apiKey: '...' });\\n\\n<AddressInput\\n  provider={provider}\\n  accept={{ country: 'AU', region: 'NSW' }}\\n/>\\n\`\`\`\\n"
      }
    }
  }
}`,...(L=(k=x.parameters)==null?void 0:k.docs)==null?void 0:L.source}}};var U,K,M;S.parameters={...S.parameters,docs:{...(U=S.parameters)==null?void 0:U.docs,source:{originalSource:`{
  name: 'Controlled',
  render: () => <ControlledStory />,
  parameters: {
    docs: {
      description: {
        story: "Usage:\\n\\n\`\`\`tsx\\nimport { AddressInput, GooglePlacesProvider } from 'mantine-address';\\n\\nconst provider = new GooglePlacesProvider({ apiKey: '...' });\\n\\nfunction Example() {\\n  const [value, setValue] = useState(null);\\n  return <AddressInput provider={provider} value={value} onChange={setValue} />;\\n}\\n\`\`\`\\n"
      }
    }
  }
}`,...(M=(K=S.parameters)==null?void 0:K.docs)==null?void 0:M.source}}};const pe=["Default","AcceptCountryRegionSelect","Controlled"];export{x as AcceptCountryRegionSelect,S as Controlled,P as Default,pe as __namedExportsOrder,ce as default};
