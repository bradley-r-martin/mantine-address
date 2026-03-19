import{j as s}from"./jsx-runtime-BO8uF4Og.js";import{d as I,g as D,C as L,G as k,S as T,A as B,a as V}from"./AddressInput-CCE_VLyD.js";import{r as p}from"./index-D4H_InIO.js";import{p as z,u as F,a as G,B as Y,c as H,e as J,h as j,S as K}from"./utilities-CnYJyLXU.js";import{g as Q}from"./MantineThemeProvider-BbaVGlrq.js";import{T as X}from"./Text-QktUTj9p.js";import{m as Z}from"./addressInputMocks-DuXq-fMN.js";var E={root:"m_347db0ec","root--dot":"m_fbd81e3d",label:"m_5add502a",section:"m_91fdda9b"};const $={},ee=H((e,{radius:l,color:r,gradient:c,variant:a,size:t,autoContrast:g})=>{const n=e.variantColorResolver({color:r||e.primaryColor,theme:e,gradient:c,variant:a||"filled",autoContrast:g});return{root:{"--badge-height":j(t,"badge-height"),"--badge-padding-x":j(t,"badge-padding-x"),"--badge-fz":j(t,"badge-fz"),"--badge-radius":l===void 0?void 0:J(l),"--badge-bg":r||a?n.background:void 0,"--badge-color":r||a?n.color:void 0,"--badge-bd":r||a?n.border:void 0,"--badge-dot-color":a==="dot"?Q(r,e):void 0}}}),w=z((e,l)=>{const r=F("Badge",$,e),{classNames:c,className:a,style:t,styles:g,unstyled:n,vars:f,radius:S,color:m,gradient:x,leftSection:d,rightSection:i,children:C,variant:v,fullWidth:o,autoContrast:u,circle:R,mod:b,...q}=r,A=G({name:"Badge",props:r,classes:E,className:a,style:t,classNames:c,styles:g,unstyled:n,vars:f,varsResolver:ee});return s.jsxs(Y,{variant:v,mod:[{block:o,circle:R,"with-right-section":!!i,"with-left-section":!!d},b],...A("root",{variant:v}),ref:l,...q,children:[d&&s.jsx("span",{...A("section"),"data-position":"left",children:d}),s.jsx("span",{...A("label"),children:C}),i&&s.jsx("span",{...A("section"),"data-position":"right",children:i})]})});w.classes=E;w.displayName="@mantine/core/Badge";const te=[{value:"",label:"Any"},...V().map(e=>({value:e.code,label:e.name}))];function U({provider:e=null,label:l="Address",placeholder:r="Click to enter address…",debounce:c,onChange:a}){const[t,g]=p.useState(""),[n,f]=p.useState(""),[S,m]=p.useState([]),[x,d]=p.useState(!1);p.useEffect(()=>{let o=!1;if(!t||!I.regions){m([]),d(!1);return}return d(!0),I.regions(t).then(u=>{if(o)return;if(!u){m([]),d(!1);return}const R=D(u);m([{value:"",label:"Any region"},...R.map(b=>({value:b.code,label:b.name}))]),d(!1)}).catch(()=>{o||(m([]),d(!1))}),()=>{o=!0}},[t]);const i=S.length>0,C=p.useMemo(()=>{if(!t)return;const u={country:L[t]??t};return n&&t?{...u,region:n}:u},[t,n]),v={provider:e,accept:C,label:l,placeholder:r,...c!=null&&{debounce:c},onChange:a};return s.jsxs(K,{gap:"md",style:{maxWidth:480},children:[s.jsxs(k,{children:[s.jsx(w,{color:"violet",variant:"light",children:"TIP"}),s.jsx(X,{size:"xs",c:"dimmed",children:"Select Australia or United States to see region (state) restrictions."})]}),s.jsxs(k,{wrap:"nowrap",align:"flex-end",gap:"sm",children:[s.jsx(T,{label:"Restrict to country",placeholder:"Any",data:te,value:t||null,onChange:o=>{g(o??""),f("")},clearable:!0,searchable:!0,style:{flex:1}}),s.jsx(T,{label:"Restrict to region (state)",placeholder:"Any region",data:i?S:x?[{value:"",label:"Loading…"}]:[{value:"",label:"—"}],value:i&&n||null,onChange:o=>f(o??""),clearable:!0,searchable:!0,disabled:!i&&!x,style:{flex:1}})]}),s.jsx(B,{...v})]})}U.__docgenInfo={description:"",methods:[],displayName:"RestrictionsDemo",props:{provider:{required:!1,tsType:{name:"union",raw:"AddressLookupProvider | null",elements:[{name:"AddressLookupProvider"},{name:"null"}]},description:"",defaultValue:{value:"null",computed:!1}},label:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Address'",computed:!1}},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Click to enter address…'",computed:!1}},debounce:{required:!1,tsType:{name:"number"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(address: import('@/types').Address | null) => void",signature:{arguments:[{type:{name:"union",raw:"import('@/types').Address | null",elements:[{name:"unknown"},{name:"null"}]},name:"address"}],return:{name:"void"}}},description:""}}};const se={component:B,title:"AddressInput/Restrictions",tags:["autodocs"],parameters:{docs:{description:{component:'Restrict which addresses are accepted via the `accept` prop (single country, optional single region). Use the **country** and **region** selects above to try different combinations (e.g. "Australia only", "NSW only", "US + California") without editing code. Manual entry and autocomplete both validate against the selected restriction.'}}}},y={name:"Manual entry with country/region select",render:()=>s.jsx(U,{provider:null,label:"Address",placeholder:"Click to enter address…",onChange:e=>console.log("Address:",e)}),parameters:{docs:{description:{story:`Manual entry only (no provider). Change the country and region dropdowns to restrict accepted addresses.

Usage:

\`\`\`tsx
import { AddressInput } from 'mantine-address';

<AddressInput provider={null} accept={{ country: 'AU', region: 'NSW' }} />
\`\`\`
`}}}},h={name:"Autocomplete with country/region select",render:()=>s.jsx(U,{provider:Z,label:"Address",placeholder:'Type "123 Main" — mock returns US address; set country to AU to see selection rejected',debounce:300,onChange:e=>e!=null&&console.log("Accepted:",e)}),parameters:{docs:{description:{story:`With a provider, selecting a suggestion validates the resolved address against the chosen country/region.

Usage:

\`\`\`tsx
import { AddressInput } from 'mantine-address';

<AddressInput provider={provider} accept={{ country: 'AU' }} />
\`\`\`
`}}}};var _,M,P;y.parameters={...y.parameters,docs:{...(_=y.parameters)==null?void 0:_.docs,source:{originalSource:`{
  name: 'Manual entry with country/region select',
  render: () => <RestrictionsDemo provider={null as unknown as ComponentProps<typeof AddressInput>['provider']} label="Address" placeholder="Click to enter address…" onChange={address => console.log('Address:', address)} />,
  parameters: {
    docs: {
      description: {
        story: "Manual entry only (no provider). Change the country and region dropdowns to restrict accepted addresses.\\n\\nUsage:\\n\\n\`\`\`tsx\\nimport { AddressInput } from 'mantine-address';\\n\\n<AddressInput provider={null} accept={{ country: 'AU', region: 'NSW' }} />\\n\`\`\`\\n"
      }
    }
  }
}`,...(P=(M=y.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var W,N,O;h.parameters={...h.parameters,docs:{...(W=h.parameters)==null?void 0:W.docs,source:{originalSource:`{
  name: 'Autocomplete with country/region select',
  render: () => <RestrictionsDemo provider={mockProvider} label="Address" placeholder='Type "123 Main" — mock returns US address; set country to AU to see selection rejected' debounce={300} onChange={(address: Address | null) => address != null && console.log('Accepted:', address)} />,
  parameters: {
    docs: {
      description: {
        story: "With a provider, selecting a suggestion validates the resolved address against the chosen country/region.\\n\\nUsage:\\n\\n\`\`\`tsx\\nimport { AddressInput } from 'mantine-address';\\n\\n<AddressInput provider={provider} accept={{ country: 'AU' }} />\\n\`\`\`\\n"
      }
    }
  }
}`,...(O=(N=h.parameters)==null?void 0:N.docs)==null?void 0:O.source}}};const re=["ManualEntryWithCountryRegionSelect","AutocompleteWithCountryRegionSelect"],ue=Object.freeze(Object.defineProperty({__proto__:null,AutocompleteWithCountryRegionSelect:h,ManualEntryWithCountryRegionSelect:y,__namedExportsOrder:re,default:se},Symbol.toStringTag,{value:"Module"}));export{h as A,w as B,y as M,ue as R};
