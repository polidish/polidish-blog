'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

/* ---------------- ADS ---------------- */

const ADS = [
{
src: '/pier.jpeg',
caption: 'Visualize your ad copy right here, to the left, or in the center.',
duration: 15000,
},
{
src: '/decanter.jpeg',
caption: 'Advertisements are uncurated for your continued privacy.',
duration: 30000,
},
{
src: '/peacock.jpeg',
caption:
'Polidish: the Outpost where pensive partners meet High Worth While Individuals (HWWI).',
duration: 60000,
},
];

function AdFrame({ startIndex }: { startIndex: number }) {
const [index, setIndex] = useState(startIndex);
const [visible, setVisible] = useState(true);

useEffect(() => {
const hold = ADS[index].duration;
const transition = 15000;

const t1 = setTimeout(() => setVisible(false), hold);
const t2 = setTimeout(() => {
setIndex((i) => (i + 1) % ADS.length);
setVisible(true);
}, hold + transition);

return () => {
clearTimeout(t1);
clearTimeout(t2);
};
}, [index]);

return (
<div style={{ border: '3px solid black', padding: 8, position: 'relative' }}>
<div style={{ opacity: visible ? 1 : 0, transition: 'opacity 15s linear' }}>
<Image
src={ADS[index].src}
alt="Advertisement"
width={600}
height={900}
style={{ width: '100%', height: 'auto' }}
/>
<div
style={{
position: 'absolute',
bottom: 16,
left: 16,
right: 16,
color: 'gold',
fontWeight: 700,
fontStyle: 'italic',
fontSize: 14,
}}
>
{ADS[index].caption}
</div>
</div>
</div>
);
}

/* ---------------- PAGE ---------------- */

export default function Page() {
return (
<main
style={{
fontFamily: 'serif',
minHeight: '100vh',
display: 'flex',
flexDirection: 'column',
background: 'white',
}}
>
{/* HEADER */}
<header
style={{
background: 'black',
padding: '12px 24px',
display: 'flex',
alignItems: 'center',
justifyContent: 'space-between',
}}
>
<Image
src="/_logo polidish.png"
alt="Polidish"
width={96}
height={96}
style={{ width: 48, height: 48 }}
priority
/>
<div
style={{
color: '#d07a3a',
fontSize: 'clamp(14px, 1.6vw, 20px)',
letterSpacing: '0.05em',
textTransform: 'uppercase',
fontWeight: 700,
}}
>
POLIDISH BLOG
</div>
</header>

{/* BODY */}
<section className="grid">
{/* MAIN CONTENT */}
<section className="jungle">
<h2>
<strong>The Polidish Blog   Politely dishing politics.</strong>{' '}
<em>
<strong>May the best mind win. Turnabout is fair play.</strong>
</em>
</h2>

<div className="scroll">
<div className="jungle-marker">
<em>
Polidish does not sell, share or distribute user identity data to advertisers or third parties. Political
viewpoints are not moderated, verified, endorsed, or censored by Polidish LLC. Please submit extended viewpoints to info@polidish.com to be considered for the blog. 
</em>
</div>
</div>
</section>

{/* OUTPOST (RIGHT SIDE) */}
<aside className="ads">
<AdFrame startIndex={0} />
<AdFrame startIndex={1} />
<AdFrame startIndex={2} />

<div className="outpost-links">
<a href="https://polidish.com">POLIDISH.COM</a>
<a href="https://polidish.store">POLIDISH.STORE</a>
</div>
</aside>
</section>

{/* FOOTER */}
<footer className="footer">
<div>
Polidish LLC is not legally responsible for your poor judgment. If you
endanger children, threaten terrorism, or break the law, you reveal
yourself. Two-Factor Authentication.
</div>
<div>© 2025 Polidish LLC. All rights reserved. — 127 Minds Day One</div>
</footer>

{/* STYLES */}
<style jsx>{`
.grid {
display: grid;
grid-template-columns: 1fr 320px;
gap: 24px;
padding: 24px;
flex: 1;
}
.ads {
display: flex;
flex-direction: column;
gap: 16px;
}
.outpost-links {
display: flex;
gap: 12px;
margin-top: 8px;
}
.outpost-links a {
background: black;
color: gold;
padding: 8px 12px;
text-decoration: none;
font-weight: 700;
border: 2px solid gold;
}
.jungle {
border: 3px solid black;
padding: 24px;
display: flex;
flex-direction: column;
background: white;
}
.scroll {
border: 1px solid #ddd;
padding: 12px;
flex: 1;
overflow-y: auto;
}
.jungle-marker {
text-align: center;
margin: 16px 0;
}
.footer {
padding: 16px 24px;
font-size: 12px;
border-top: 2px solid black;
}
@media (max-width: 768px) {
.grid {
grid-template-columns: 1fr;
}
}
`}</style>
</main>
);
}
