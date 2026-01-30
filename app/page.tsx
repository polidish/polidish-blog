'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/* ---------------- OUTPOST IMAGE POOLS ---------------- */

// SLOT ONE — TOP
const SLOT_ONE = [
'/pier.jpeg',
'/Venicelightning19.jpeg',
'/regatta.jpeg',
];

// SLOT TWO — MIDDLE
const SLOT_TWO = [
'/butterfly.jpeg',
'/decanter.jpeg',
'/KayakDec25.jpeg',
];

// SLOT THREE — BOTTOM
const SLOT_THREE = [
'/shell.jpeg',
'/peacock.jpeg',
'/grills.jpeg',
];

/* ---------------- STABLE OUTPOST SLOT ---------------- */

function OutpostSlot({
images,
caption,
interval,
}: {
images: string[];
caption: string;
interval: number;
}) {
const [index, setIndex] = useState(0);
const indexRef = useRef(0);

useEffect(() => {
const id = setInterval(() => {
indexRef.current = (indexRef.current + 1) % images.length;
setIndex(indexRef.current);
}, interval);

return () => clearInterval(id);
}, [images.length, interval]);

return (
<div style={{ border: '3px solid black', padding: 8, position: 'relative' }}>
<Image
src={images[index]}
alt="Outpost image"
width={600}
height={900}
priority
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
{caption}
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
Polidish.blog: The Official POLIDISH Blog
</div>
</header>

{/* BODY */}
<section className="grid">
{/* MAIN CONTENT */}
<section className="jungle">
<h2>
<strong>The Polidish Blog: Politely Dishing Politics</strong>{' '}
<em>
<strong>May the best mind win. Turnabout is fair play.</strong>
</em>
</h2>

<div className="scroll">
{/* Blog content will live here */}
</div>
</section>

{/* OUTPOST */}
<aside className="ads">
<OutpostSlot
images={SLOT_ONE}
interval={15000}
caption="Visualize your ad copy right here, to the left, or in the center."
/>
<OutpostSlot
images={SLOT_TWO}
interval={30000}
caption="Advertisements are uncurated for your continued privacy."
/>
<OutpostSlot
images={SLOT_THREE}
interval={60000}
caption="Polidish: the Outpost where pensive partners meet High Worth While Individuals (HWWI)."
/>

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
endanger children, threaten terrorism or break the law, you reveal
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
.footer {
padding: 16px 24px;
font-size: 12px;
border-top: 2px solid black;
}

/* ✅ MOBILE BLOG HEIGHT FIX */
@media (max-width: 768px) {
.grid {
grid-template-columns: 1fr;
}
.scroll {
min-height: 2in;
}
}
`}</style>
</main>
);
}
