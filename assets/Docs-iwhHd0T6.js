import{j as e}from"./jsx-runtime-BO8uF4Og.js";import{useMDXComponents as M}from"./index-BqIVwv1J.js";import{S as z,c as U,e as h}from"./index-C3m8Jh0m.js";import{Autocomplete as $}from"./Overview.stories-CcfpWH4l.js";import{Controlled as F,Uncontrolled as B,NativeForm as G}from"./Form.stories-Cwta-VNe.js";import{CountryStateSelect as L,PreventManualEntry as D}from"./ManualEntry.stories-CPVWierZ.js";import{B as I,M as V,A as O}from"./Restrictions.stories-BwyhlJmL.js";import{CountryAndRegionConstants as W}from"./Prefill.stories-C_bSRbmW.js";import{Default as H}from"./GooglePlaces.stories-zSqVX4td.js";import{ViaMantineTheme as K}from"./GlobalDefaults.stories-DsSo-O3s.js";import{FullAddress as Y}from"./international.stories-Cjgz7-7r.js";import{FullAddress as X}from"./australian.stories-CwEAPEgh.js";import{r as x}from"./index-D4H_InIO.js";import{u as Q}from"./utilities-CnYJyLXU.js";import{T as C}from"./addressFixtures-BxFIIB4k.js";import{T as b}from"./Text-QktUTj9p.js";import{U as Z}from"./AddressInput-CCE_VLyD.js";import"./iframe-gyinQnND.js";import"./index-dbwHFDAS.js";import"./index-Dd8bRu6S.js";import"./index-DgH-xKnr.js";import"./index-DrFu-skq.js";import"./international-f5oHL28A.js";import"./addressInputMocks-DuXq-fMN.js";import"./Code-XShZHVSU.js";import"./MantineThemeProvider-BbaVGlrq.js";import"./use-isomorphic-effect-CAh38g3c.js";import"./au-04nqxTGS.js";import"./MantineProvider-CZsfIFy5.js";function J({timeout:t=2e3}={}){const[r,s]=x.useState(null),[n,o]=x.useState(!1),[d,p]=x.useState(null),a=i=>{window.clearTimeout(d),p(window.setTimeout(()=>o(!1),t)),o(i)};return{copy:i=>{"clipboard"in navigator?navigator.clipboard.writeText(i).then(()=>a(!0)).catch(c=>s(c)):s(new Error("useClipboard: navigator.clipboard is not supported"))},reset:()=>{o(!1),s(null),window.clearTimeout(d)},error:r,copied:n}}const ee={timeout:1e3};function j(t){const{children:r,timeout:s,value:n,...o}=Q("CopyButton",ee,t),d=J({timeout:s}),p=()=>d.copy(n);return e.jsx(e.Fragment,{children:r({copy:p,copied:d.copied,...o})})}j.displayName="@mantine/core/CopyButton";/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var te={outline:{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},filled:{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"currentColor",stroke:"none"}};/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=(t,r,s,n)=>{const o=x.forwardRef(({color:d="currentColor",size:p=24,stroke:a=2,title:l,className:g,children:i,...c},v)=>x.createElement("svg",{ref:v,...te[t],width:p,height:p,className:["tabler-icon",`tabler-icon-${r}`,g].join(" "),strokeWidth:a,stroke:d,...c},[l&&x.createElement("title",{key:"svg-title"},l),...n.map(([y,E])=>x.createElement(y,E)),...Array.isArray(i)?i:[i]]));return o.displayName=`${s}`,o};/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=[["path",{d:"M4 10a2 2 0 1 0 4 0a2 2 0 0 0 -4 0",key:"svg-0"}],["path",{d:"M6 4v4",key:"svg-1"}],["path",{d:"M6 12v8",key:"svg-2"}],["path",{d:"M10 16a2 2 0 1 0 4 0a2 2 0 0 0 -4 0",key:"svg-3"}],["path",{d:"M12 4v10",key:"svg-4"}],["path",{d:"M12 18v2",key:"svg-5"}],["path",{d:"M16 7a2 2 0 1 0 4 0a2 2 0 0 0 -4 0",key:"svg-6"}],["path",{d:"M18 4v1",key:"svg-7"}],["path",{d:"M18 9v11",key:"svg-8"}]],re=u("outline","adjustments","Adjustments",se);/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne=[["path",{d:"M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5",key:"svg-0"}]],oe=u("outline","brand-github","BrandGithub",ne);/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=[["path",{d:"M5 12l5 5l10 -10",key:"svg-0"}]],N=u("outline","check","Check",ie);/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=[["path",{d:"M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2",key:"svg-0"}],["path",{d:"M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2",key:"svg-1"}],["path",{d:"M9 12h6",key:"svg-2"}],["path",{d:"M9 16h6",key:"svg-3"}]],de=u("outline","clipboard-text","ClipboardText",ae);/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=[["path",{d:"M11 18.004h-4.343c-2.572 -.004 -4.657 -2.011 -4.657 -4.487c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99a3.468 3.468 0 0 1 3.307 2.444",key:"svg-0"}],["path",{d:"M20 21l2 -2l-2 -2",key:"svg-1"}],["path",{d:"M17 17l-2 2l2 2",key:"svg-2"}]],ce=u("outline","cloud-code","CloudCode",le);/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=[["path",{d:"M7 8l-4 4l4 4",key:"svg-0"}],["path",{d:"M17 8l4 4l-2.5 2.5",key:"svg-1"}],["path",{d:"M14 4l-1.201 4.805m-.802 3.207l-2 7.988",key:"svg-2"}],["path",{d:"M3 3l18 18",key:"svg-3"}]],me=u("outline","code-off","CodeOff",pe);/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=[["path",{d:"M7 8l-4 4l4 4",key:"svg-0"}],["path",{d:"M17 8l4 4l-4 4",key:"svg-1"}],["path",{d:"M14 4l-4 16",key:"svg-2"}]],T=u("outline","code","Code",ue);/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=[["path",{d:"M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666",key:"svg-0"}],["path",{d:"M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1",key:"svg-1"}]],k=u("outline","copy","Copy",he);/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=[["path",{d:"M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227",key:"svg-0"}]],ge=u("outline","filter","Filter",xe);/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe=[["path",{d:"M12 3a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3",key:"svg-0"}],["path",{d:"M6 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3",key:"svg-1"}],["path",{d:"M13 7h7a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-7",key:"svg-2"}],["path",{d:"M5 7h-1a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h1",key:"svg-3"}],["path",{d:"M17 12h.01",key:"svg-4"}],["path",{d:"M13 12h.01",key:"svg-5"}]],ve=u("outline","forms","Forms",fe);/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const be=[["path",{d:"M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0",key:"svg-0"}],["path",{d:"M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0",key:"svg-1"}]],P=u("outline","map-pin","MapPin",be);/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=[["path",{d:"M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3",key:"svg-0"}],["path",{d:"M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3",key:"svg-1"}],["path",{d:"M14 9a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",key:"svg-2"}]],je=u("outline","rocket","Rocket",ye);/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const we=[["path",{d:"M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065",key:"svg-0"}],["path",{d:"M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0",key:"svg-1"}]],Ne=u("outline","settings","Settings",we);/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=[["path",{d:"M4 5a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1l0 -2",key:"svg-0"}],["path",{d:"M4 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -6",key:"svg-1"}],["path",{d:"M14 12l6 0",key:"svg-2"}],["path",{d:"M14 16l6 0",key:"svg-3"}],["path",{d:"M14 20l6 0",key:"svg-4"}]],Ae=u("outline","template","Template",ke);function w(t){const{code:r,language:s="tsx",variants:n,compact:o}=t,[d,p]=x.useState(0),a=n&&n.length>1,l=a?n[d].code:r??"",g=a?n[d].language??"tsx":s;return o?e.jsxs("div",{className:"inline-flex items-center rounded-lg bg-white/5 border border-white/8",children:[a&&e.jsx("div",{className:"flex border-r border-white/8",children:n.map((i,c)=>e.jsx("button",{onClick:()=>p(c),className:`px-2.5 py-1.5 text-[11px] font-medium transition-colors cursor-pointer border-0 bg-transparent first:rounded-l-lg ${c===d?"bg-white/10 text-white":"text-white/40 hover:text-white/70"}`,children:i.label},i.label))}),e.jsx("code",{className:"px-3 py-1.5 text-[13px] font-mono text-violet-300",children:l}),e.jsx(j,{value:l,children:({copied:i,copy:c})=>e.jsx("button",{onClick:c,className:"px-2.5 py-1.5 border-0 bg-transparent cursor-pointer text-white/30 hover:text-white/70 transition-colors border-l border-white/8",children:i?e.jsx(N,{size:13,stroke:1.5,className:"text-emerald-400"}):e.jsx(k,{size:13,stroke:1.5})})})]}):e.jsxs("div",{className:"rounded-lg overflow-hidden bg-docs-code-bg",children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-2 bg-docs-code-surface border-b border-white/6",children:[a?e.jsx("div",{className:"flex gap-1",children:n.map((i,c)=>e.jsx("button",{onClick:()=>p(c),className:`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer border-0 bg-transparent ${c===d?"bg-white/10 text-white":"text-white/50 hover:text-white/80"}`,children:i.label},i.label))}):e.jsx("span",{className:"text-xs font-medium text-white/40 uppercase tracking-wider",children:g}),e.jsx(j,{value:l,children:({copied:i,copy:c})=>e.jsx("button",{onClick:c,className:"flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-colors bg-transparent border-0 p-0 cursor-pointer",children:i?e.jsxs(e.Fragment,{children:[e.jsx(N,{size:14,stroke:1.5}),e.jsx("span",{children:"Copied"})]}):e.jsxs(e.Fragment,{children:[e.jsx(k,{size:14,stroke:1.5}),e.jsx("span",{children:"Copy"})]})})})]}),e.jsx("div",{className:"docs-source-override",children:e.jsx(z,{code:l,language:g,dark:!0})})]})}w.__docgenInfo={description:"",methods:[],displayName:"CodeBlock",props:{code:{required:!1,tsType:{name:"string"},description:""},language:{required:!1,tsType:{name:"string"},description:""},variants:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  label: string;
  code: string;
  language?: string;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"code",value:{name:"string",required:!0}},{key:"language",value:{name:"string",required:!1}}]}}],raw:"CodeVariant[]"},description:""},compact:{required:!1,tsType:{name:"boolean"},description:""}}};function Me(){return e.jsxs("div",{className:"relative w-full h-full min-h-[280px] flex items-center justify-center",children:[e.jsx("div",{className:"absolute inset-0 flex items-center justify-center",children:e.jsx("div",{className:"w-48 h-48 rounded-full bg-violet-500/20 blur-3xl"})}),e.jsxs("div",{className:"relative w-64",children:[e.jsxs("div",{className:"rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 space-y-3 shadow-2xl",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx("div",{className:"w-5 h-5 rounded-md bg-violet-500/30 flex items-center justify-center shrink-0",children:e.jsx(P,{size:12,stroke:2,className:"text-violet-300"})}),e.jsx("div",{className:"h-3 rounded-full bg-white/15 flex-1"})]}),e.jsx("div",{className:"border-t border-white/6"}),e.jsxs("div",{className:"space-y-2.5",children:[e.jsxs("div",{className:"flex gap-2",children:[e.jsx("div",{className:"h-2.5 rounded-full bg-white/8 flex-2"}),e.jsx("div",{className:"h-2.5 rounded-full bg-white/8 flex-1"})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("div",{className:"h-2.5 rounded-full bg-white/8 flex-1"}),e.jsx("div",{className:"h-2.5 rounded-full bg-violet-400/15 flex-1"}),e.jsx("div",{className:"h-2.5 rounded-full bg-white/8 flex-[0.6]"})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("div",{className:"h-2.5 rounded-full bg-white/8 flex-1"}),e.jsx("div",{className:"h-2.5 rounded-full bg-white/8 flex-[1.5]"})]})]}),e.jsx("div",{className:"border-t border-white/6"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"px-2 py-0.5 rounded bg-violet-500/20 text-[10px] font-medium text-violet-300",children:"AU"}),e.jsx("div",{className:"h-2 rounded-full bg-white/6 flex-1"})]})]}),e.jsxs("div",{className:"absolute -right-4 top-4 w-48 rounded-lg border border-white/8 bg-white/4 backdrop-blur-sm p-2.5 space-y-1.5 shadow-xl",children:[e.jsxs("div",{className:"flex items-center gap-2 px-2 py-1.5 rounded-md bg-violet-500/10",children:[e.jsx("div",{className:"w-1.5 h-1.5 rounded-full bg-violet-400"}),e.jsx("div",{className:"h-2 rounded-full bg-white/20 flex-1"})]}),e.jsxs("div",{className:"flex items-center gap-2 px-2 py-1.5",children:[e.jsx("div",{className:"w-1.5 h-1.5 rounded-full bg-white/20"}),e.jsx("div",{className:"h-2 rounded-full bg-white/8 flex-1"})]}),e.jsxs("div",{className:"flex items-center gap-2 px-2 py-1.5",children:[e.jsx("div",{className:"w-1.5 h-1.5 rounded-full bg-white/20"}),e.jsx("div",{className:"h-2 rounded-full bg-white/8 flex-[0.7]"})]})]})]})]})}function _(t){const{title:r,tagline:s,badges:n}=t;return e.jsx("div",{className:"relative overflow-hidden rounded-2xl bg-linear-to-br from-docs-gradient-from via-docs-gradient-via to-docs-gradient-to p-px",children:e.jsxs("div",{className:"rounded-[calc(1rem-1px)] relative overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-[#0f0b1f]"}),e.jsx("div",{className:"absolute inset-0 bg-linear-to-br from-violet-950/80 via-[#0f0b1f] to-fuchsia-950/40"}),e.jsx("div",{className:"absolute top-0 left-0 w-full h-full bg-linear-to-b from-violet-500/[0.07] to-transparent"}),e.jsx("div",{className:"absolute bottom-0 right-0 w-1/2 h-1/2 bg-linear-to-tl from-fuchsia-500/6 to-transparent"}),e.jsx("div",{className:"absolute inset-0 opacity-[0.03]",style:{backgroundImage:"linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",backgroundSize:"40px 40px"}}),e.jsx("div",{className:"relative z-10 px-8 py-12 sm:px-12 sm:py-16",children:e.jsxs("div",{className:"grid lg:grid-cols-[1fr_340px] gap-8 lg:gap-12 items-center",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-3 mb-6",children:[e.jsx("div",{className:"flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/25",children:e.jsx(P,{size:20,stroke:1.5,className:"text-white"})}),n&&n.length>0&&e.jsx("div",{className:"flex gap-2",children:n.map(o=>e.jsx(I,{variant:"light",color:"violet",size:"sm",radius:"sm",children:o},o))})]}),e.jsxs("a",{href:"https://github.com/bradley-r-martin/mantine-address",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors no-underline mb-3",children:[e.jsx(oe,{size:14,stroke:1.5}),"bradley-r-martin/mantine-address"]}),e.jsx("h1",{className:"text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3",children:r}),e.jsx("p",{className:"text-base sm:text-lg text-white/55 leading-relaxed mb-8 max-w-xl",children:s}),e.jsx(w,{compact:!0,variants:[{label:"npm",code:"npm install mantine-address",language:"bash"},{label:"yarn",code:"yarn add mantine-address",language:"bash"},{label:"pnpm",code:"pnpm add mantine-address",language:"bash"}]})]}),e.jsx("div",{className:"hidden lg:block",children:e.jsx(Me,{})})]})})]})})}_.__docgenInfo={description:"",methods:[],displayName:"DocsHero",props:{title:{required:!0,tsType:{name:"string"},description:""},tagline:{required:!0,tsType:{name:"ReactNode"},description:""},badges:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""}}};function q(t){var p;const{items:r}=t,[s,n]=x.useState(((p=r[0])==null?void 0:p.id)??""),o=x.useRef(null);x.useEffect(()=>{var g;(g=o.current)==null||g.disconnect();const a=r.map(i=>document.getElementById(i.id)).filter(Boolean);if(a.length===0)return;const l=new IntersectionObserver(i=>{const c=i.filter(v=>v.isIntersecting).sort((v,y)=>v.boundingClientRect.top-y.boundingClientRect.top);c.length>0&&n(c[0].target.id)},{rootMargin:"-80px 0px -60% 0px",threshold:0});return a.forEach(i=>l.observe(i)),o.current=l,()=>l.disconnect()},[r]);const d=a=>{const l=document.getElementById(a);l&&(l.scrollIntoView({behavior:"smooth",block:"start"}),n(a))};return e.jsxs("nav",{className:"hidden lg:block sticky top-8 self-start",children:[e.jsx("p",{className:"text-[11px] font-semibold uppercase tracking-widest text-violet-400/70 mb-3 px-3",children:"On this page"}),e.jsx("ul",{className:"space-y-0.5",children:r.map(a=>{const l=a.id===s,g=a.icon;return e.jsx("li",{children:e.jsxs("button",{onClick:()=>d(a.id),className:`flex items-center gap-2 w-full text-left px-3 py-1.5 text-[13px] rounded-md transition-all duration-150 cursor-pointer border-0 bg-transparent ${l?"text-violet-600 font-medium bg-violet-50":"text-gray-500 hover:text-violet-600 hover:bg-violet-50/50"}`,children:[g&&e.jsx(g,{size:15,stroke:l?2:1.5,className:l?"text-violet-500":"text-gray-400"}),a.label]})},a.id)})})]})}q.__docgenInfo={description:"",methods:[],displayName:"DocsNav",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  label: string;
  id: string;
  icon?: ComponentType<{ size?: number; stroke?: number; className?: string }>;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"id",value:{name:"string",required:!0}},{key:"icon",value:{name:"ComponentType",elements:[{name:"signature",type:"object",raw:"{ size?: number; stroke?: number; className?: string }",signature:{properties:[{key:"size",value:{name:"number",required:!1}},{key:"stroke",value:{name:"number",required:!1}},{key:"className",value:{name:"string",required:!1}}]}}],raw:"ComponentType<{ size?: number; stroke?: number; className?: string }>",required:!1}}]}}],raw:"NavItem[]"},description:""}}};function S(t){const{title:r,tagline:s,badges:n,sections:o,children:d}=t;return e.jsx("div",{className:"sb-unstyled min-h-screen bg-docs-bg",children:e.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12",children:[e.jsx(_,{title:r,tagline:s,badges:n}),e.jsxs("div",{className:"mt-10 lg:mt-14 lg:grid lg:grid-cols-[1fr_200px] lg:gap-10",children:[e.jsx("main",{className:"min-w-0 space-y-14",children:d}),e.jsx("aside",{className:"hidden lg:block",children:e.jsx(q,{items:o})})]})]})})}S.__docgenInfo={description:"",methods:[],displayName:"DocsLayout",props:{title:{required:!0,tsType:{name:"string"},description:""},tagline:{required:!0,tsType:{name:"ReactNode"},description:""},badges:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},sections:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  label: string;
  id: string;
  icon?: ComponentType<{ size?: number; stroke?: number; className?: string }>;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"id",value:{name:"string",required:!0}},{key:"icon",value:{name:"ComponentType",elements:[{name:"signature",type:"object",raw:"{ size?: number; stroke?: number; className?: string }",signature:{properties:[{key:"size",value:{name:"number",required:!1}},{key:"stroke",value:{name:"number",required:!1}},{key:"className",value:{name:"string",required:!1}}]}}],raw:"ComponentType<{ size?: number; stroke?: number; className?: string }>",required:!1}}]}}],raw:"NavItem[]"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""}}};function Ie(t){return t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")}function f(t){const{title:r,description:s,children:n}=t,o=t.id??Ie(r);return e.jsxs("section",{id:o,className:"scroll-mt-8",children:[e.jsxs("div",{className:"mb-6",children:[e.jsx(C,{order:2,className:"text-xl font-semibold tracking-tight mb-1",children:e.jsx("a",{href:`#${o}`,className:"text-inherit no-underline hover:underline decoration-docs-accent/40 underline-offset-4",children:r})}),s&&e.jsx(b,{size:"sm",c:"dimmed",className:"leading-relaxed max-w-2xl",children:s})]}),e.jsx("div",{className:"space-y-5",children:n})]})}f.__docgenInfo={description:"",methods:[],displayName:"DocsSection",props:{title:{required:!0,tsType:{name:"string"},description:""},id:{required:!1,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"ReactNode"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""}}};function m(t){const{title:r,description:s,preview:n,snippet:o}=t,[d,p]=x.useState(!1);return e.jsxs("div",{className:"rounded-xl border border-docs-border bg-docs-surface overflow-hidden",children:[e.jsxs("div",{className:"px-5 pt-5 pb-4",children:[e.jsx(C,{order:4,className:"text-sm font-semibold",children:r}),s&&e.jsx(b,{size:"sm",c:"dimmed",mt:4,children:s})]}),e.jsx("div",{className:"mx-5 mb-4 rounded-lg border border-docs-border bg-docs-bg p-6",children:n}),o&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"border-t border-docs-border px-5 py-2.5 flex items-center justify-between bg-docs-bg/50",children:e.jsxs(Z,{onClick:()=>p(a=>!a),className:"flex items-center gap-1.5 text-xs font-medium text-docs-muted hover:text-docs-accent transition-colors",children:[d?e.jsx(me,{size:15,stroke:1.5}):e.jsx(T,{size:15,stroke:1.5}),d?"Hide code":"Show code"]})}),d&&e.jsx("div",{className:"border-t border-docs-border",children:e.jsx(w,{code:o})})]})]})}m.__docgenInfo={description:"",methods:[],displayName:"ExampleBlock",props:{title:{required:!0,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"ReactNode"},description:""},preview:{required:!0,tsType:{name:"ReactNode"},description:""},snippet:{required:!1,tsType:{name:"string"},description:""}}};function R(t){const{items:r}=t;return e.jsx("div",{className:"rounded-xl border border-docs-border overflow-hidden",children:e.jsxs("table",{className:"w-full text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-docs-bg text-left",children:[e.jsx("th",{className:"px-4 py-3 font-semibold text-xs uppercase tracking-wider text-docs-muted/70",children:"Prop"}),e.jsx("th",{className:"px-4 py-3 font-semibold text-xs uppercase tracking-wider text-docs-muted/70",children:"Type"}),e.jsx("th",{className:"px-4 py-3 font-semibold text-xs uppercase tracking-wider text-docs-muted/70 hidden sm:table-cell",children:"Default"}),e.jsx("th",{className:"px-4 py-3 font-semibold text-xs uppercase tracking-wider text-docs-muted/70",children:"Description"})]})}),e.jsx("tbody",{className:"divide-y divide-docs-border",children:r.map(s=>e.jsxs("tr",{className:"bg-docs-surface hover:bg-docs-bg/50 transition-colors",children:[e.jsx("td",{className:"px-4 py-3 whitespace-nowrap",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("code",{className:"text-[13px] font-semibold text-docs-accent",children:s.name}),s.required&&e.jsx(I,{size:"xs",variant:"light",color:"red",radius:"sm",children:"required"})]})}),e.jsx("td",{className:"px-4 py-3",children:e.jsx("code",{className:"text-xs px-1.5 py-0.5 rounded bg-docs-bg text-docs-muted font-mono",children:s.type})}),e.jsx("td",{className:"px-4 py-3 hidden sm:table-cell",children:s.defaultValue?e.jsx("code",{className:"text-xs text-docs-muted font-mono",children:s.defaultValue}):e.jsx(b,{size:"xs",c:"dimmed",children:"—"})}),e.jsx("td",{className:"px-4 py-3",children:e.jsx(b,{size:"xs",c:"dimmed",className:"leading-relaxed",children:s.description})})]},s.name))})]})})}R.__docgenInfo={description:"",methods:[],displayName:"PropsTable",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  name: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
  description: string;
}`,signature:{properties:[{key:"name",value:{name:"string",required:!0}},{key:"type",value:{name:"string",required:!0}},{key:"required",value:{name:"boolean",required:!1}},{key:"defaultValue",value:{name:"string",required:!1}},{key:"description",value:{name:"string",required:!0}}]}}],raw:"PropDef[]"},description:""}}};const Ce=[{label:"Quick start",id:"quick-start",icon:je},{label:"Core usage",id:"core-usage",icon:T},{label:"Manual entry",id:"manual-entry",icon:ve},{label:"Restrictions",id:"restrictions",icon:ge},{label:"Prefill",id:"prefill",icon:de},{label:"Providers",id:"providers",icon:ce},{label:"Global defaults",id:"global-defaults",icon:Ne},{label:"Formatting",id:"formatting",icon:Ae},{label:"Props API",id:"props-api",icon:re}];function A(t){const r={p:"p",...M(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(U,{title:"Docs"}),`
`,`
`,e.jsxs(S,{title:"mantine-address",tagline:"A complete address input component for Mantine. Autocomplete-first with provider-based lookups, manual entry fallback, country/region restrictions, and address formatting utilities.",badges:["Mantine 7+","TypeScript","MIT"],sections:Ce,children:[e.jsx(f,{title:"Quick start",description:"Get up and running in under a minute. AddressInput is an autocomplete-first address field — you supply a lookup provider (like Google Places) and the component handles suggestions, selection, and structured address output.",children:e.jsx(m,{title:"Minimal setup",description:"The simplest way to add an address field. Pass a provider and optional label/placeholder.",preview:e.jsx(h,{of:$}),snippet:`import { AddressInput, GooglePlacesProvider } from 'mantine-address';

const provider = new GooglePlacesProvider({ apiKey: 'YOUR_API_KEY' });

function MyForm() {
return (

<AddressInput
      provider={provider}
      label="Address"
      placeholder="Start typing…"
    />
);
}`})}),e.jsxs(f,{title:"Core usage",description:"AddressInput supports both controlled and uncontrolled patterns, just like native Mantine inputs. It also integrates with native HTML forms via hidden inputs.",children:[e.jsx(m,{title:"Controlled",description:"Manage the address value with React state. The onChange callback receives the full structured address object.",preview:e.jsx(h,{of:F}),snippet:`import { useState } from 'react';
import { AddressInput } from 'mantine-address';

const [value, setValue] = useState(null);

<AddressInput
  provider={provider}
  value={value}
  onChange={setValue}
/>`}),e.jsx(m,{title:"Uncontrolled",description:"Let the component manage its own state internally. Use defaultValue for an initial value.",preview:e.jsx(h,{of:B}),snippet:`import { AddressInput } from 'mantine-address';

<AddressInput
  provider={provider}
  defaultValue={null}
/>`}),e.jsx(m,{title:"Native form (hidden inputs)",description:"When you set the name prop, AddressInput renders hidden inputs for each address field — making it compatible with traditional form submissions.",preview:e.jsx(h,{of:G}),snippet:`import { AddressInput } from 'mantine-address';

<form>
  <AddressInput provider={provider} name="address" />
  <button type="submit">Submit</button>
</form>`})]}),e.jsxs(f,{title:"Manual entry",description:"Not every use case needs autocomplete. Set provider to null for a manual-only address form, or use preventManualEntry to lock users into autocomplete.",children:[e.jsx(m,{title:"Manual-only mode",description:"Pass provider={null} to show the full manual address form with country and state selectors — no autocomplete needed.",preview:e.jsx(h,{of:L}),snippet:`import { AddressInput } from 'mantine-address';

<AddressInput provider={null} />`}),e.jsx(m,{title:"Prevent manual entry",description:"Force users to select an address from autocomplete suggestions. The 'Enter manually' fallback link is hidden.",preview:e.jsx(h,{of:D}),snippet:`import { AddressInput } from 'mantine-address';

<AddressInput
  provider={provider}
  preventManualEntry
/>`})]}),e.jsxs(f,{title:"Restrictions",description:"Use the accept prop to restrict which addresses are valid. You can limit by country, region/state, or both — works with both autocomplete and manual entry.",children:[e.jsx(m,{title:"Manual entry with restrictions",description:"Restricting to a specific country and region filters the selectors in the manual entry form.",preview:e.jsx(h,{of:V}),snippet:`import { AddressInput } from 'mantine-address';

<AddressInput
  provider={null}
  accept={{ country: 'AU', region: 'NSW' }}
/>`}),e.jsx(m,{title:"Autocomplete with restrictions",description:"Country restrictions are forwarded to the provider, so suggestions only come from the specified country.",preview:e.jsx(h,{of:O}),snippet:`import { AddressInput } from 'mantine-address';

<AddressInput
  provider={provider}
  accept={{ country: 'AU' }}
/>`})]}),e.jsx(f,{title:"Prefill",description:"Pre-populate the manual entry form with known values using the prefill prop. Use exported constants for type-safe country and region references.",children:e.jsx(m,{title:"Prefill with constants",description:"Import AUSTRALIA (or other country constants) for type-safe prefill values.",preview:e.jsx(h,{of:W}),snippet:`import { AddressInput, AUSTRALIA } from 'mantine-address';

<AddressInput
  provider={null}
  prefill={{
    country: AUSTRALIA,
    state: AUSTRALIA.NEW_SOUTH_WALES,
  }}
/>`})}),e.jsxs(f,{title:"Providers",description:"Autocomplete is powered by provider adapters. Each provider encapsulates its own setup (API keys, scripts) so the component stays clean.",children:[e.jsx(m,{title:"Google Places",description:"The Google Places provider handles script loading, session tokens, and place detail resolution.",preview:e.jsx(h,{of:H}),snippet:`import { AddressInput, GooglePlacesProvider } from 'mantine-address';

const provider = new GooglePlacesProvider({
apiKey: 'YOUR_GOOGLE_API_KEY',
});

<AddressInput provider={provider} />`}),e.jsx("div",{className:"rounded-xl border border-docs-border bg-docs-bg/50 px-5 py-4",children:e.jsx("p",{className:"text-sm text-docs-muted leading-relaxed",children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-gray-700",children:"Building a custom provider?"})," ",`
Implement the `,e.jsx("code",{className:"text-xs px-1.5 py-0.5 rounded bg-docs-bg text-docs-accent font-mono",children:"AddressLookupProvider"}),` interface
with `,e.jsx("code",{className:"text-xs px-1.5 py-0.5 rounded bg-docs-bg text-docs-accent font-mono",children:"getSuggestions()"})," and"," ",`
`,e.jsx("code",{className:"text-xs px-1.5 py-0.5 rounded bg-docs-bg text-docs-accent font-mono",children:"getDetails()"}),` methods.
See the Google Places source for a reference implementation.`]})})})]}),e.jsx(f,{title:"Global defaults",description:"AddressInput uses Mantine’s factory + useProps, so you can set a shared provider and other defaults once on MantineProvider. Props you pass on each AddressInput still override theme defaultProps.",children:e.jsx(m,{title:"Provider and props via theme",description:"Create a theme with components.AddressInput.defaultProps (e.g. provider, debounce, label, placeholder, format, nothingFoundMessage). Wrap your app in MantineProvider — individual fields only need props when they differ from the defaults.",preview:e.jsx(h,{of:K}),snippet:`import { MantineProvider, createTheme } from '@mantine/core';
import { AddressInput, GooglePlacesProvider } from 'mantine-address';

const provider = new GooglePlacesProvider({ apiKey: 'YOUR_API_KEY' });

const theme = createTheme({
components: {
AddressInput: {
defaultProps: {
provider,
debounce: 400,
label: 'Address',
placeholder: 'Start typing…',
},
},
},
});

function App() {
return (

<MantineProvider theme={theme}>
<AddressInput />
<AddressInput label="Billing address" />
</MantineProvider>
);
}`})}),e.jsxs(f,{title:"Formatting",description:"Format structured addresses into readable strings or postal envelope formats. Formatters are tree-shakeable and independent of the component.",children:[e.jsx(m,{title:"International formatter",description:"The international formatter handles addresses from any country with a sensible default layout.",preview:e.jsx(h,{of:Y}),snippet:`import { international } from 'mantine-address';

// Single-line string
international.toString(address);

// Multi-line envelope format
international.toEnvelope(address);`}),e.jsx(m,{title:"Australian formatter",description:"Australia-specific formatting that follows AS/NZS 4819 conventions.",preview:e.jsx(h,{of:X}),snippet:`import { australian } from 'mantine-address';

// Single-line string
australian.toString(address);

// Multi-line envelope format
australian.toEnvelope(address);`})]}),e.jsx(f,{title:"Props API",description:"Complete reference for the AddressInput component props.",children:e.jsx(R,{items:[{name:"provider",type:"AddressLookupProvider | null",required:!0,description:"Autocomplete provider instance (e.g. GooglePlacesProvider). Set to null for manual-only mode."},{name:"value",type:"Address | null",description:"Controlled address value. Use with onChange for full control."},{name:"defaultValue",type:"Address | null",description:"Initial address for uncontrolled mode."},{name:"onChange",type:"(value: Address | null) => void",description:"Callback fired when the address value changes."},{name:"accept",type:"{ country?: string; region?: string }",description:"Restrict valid addresses by country and/or region. Applied to both autocomplete and manual entry."},{name:"prefill",type:"{ country?: Country; state?: Region }",description:"Pre-populate manual entry form fields. Use exported constants (e.g. AUSTRALIA) for type safety."},{name:"preventManualEntry",type:"boolean",defaultValue:"false",description:'Hide the "Enter manually" fallback. Users must select from autocomplete suggestions.'},{name:"name",type:"string",description:"Renders hidden inputs for native form submission. Each address field gets a hidden input with name prefix."},{name:"label",type:"ReactNode",description:"Label displayed above the input. Passed through to the underlying Mantine TextInput."},{name:"placeholder",type:"string",description:"Placeholder text for the autocomplete input."},{name:"disabled",type:"boolean",defaultValue:"false",description:"Disable the entire address input."},{name:"error",type:"ReactNode",description:"Error message displayed below the input. Passed through to the underlying Mantine TextInput."}]})})]})]})}function nt(t={}){const{wrapper:r}={...M(),...t.components};return r?e.jsx(r,{...t,children:e.jsx(A,{...t})}):A(t)}export{nt as default,Ce as sections};
