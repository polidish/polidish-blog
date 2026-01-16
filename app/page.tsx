'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from './lib/supabaseClient';

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
'Polidish: the Outpost where luxury partners meet High Worth While Individuals (HWWI).',
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

/* ---------------- TYPES ---------------- */

type Vine = {
id: string;
content: string | null;
created_at: string;
author_display: string;
};

/* ---------------- PAGE ---------------- */

export default function Page() {
const [email, setEmail] = useState('');
const [sent, setSent] = useState(false);
const [sending, setSending] = useState(false);
const [session, setSession] = useState<any>(null);

const [draft, setDraft] = useState('');
const [vines, setVines] = useState<Vine[]>([]);
const [posting, setPosting] = useState(false);

const verified = !!session;

/* ---------------- AUTH ---------------- */

useEffect(() => {
(async () => {
await supabase.auth.refreshSession();
const { data } = await supabase.auth.getSession();
setSession(data.session);
loadVines();
})();

const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
setSession(s);
});

return () => {
sub?.subscription.unsubscribe();
};
}, []);

/* ---------------- DATA ---------------- */

async function loadVines() {
const { data } = await supabase
.from('vines')
.select('id, content, created_at, author_display')
.order('created_at', { ascending: true });

if (data) setVines(data);
}

async function handleJoin() {
if (!email) return;

setSending(true);

const { error } = await supabase.auth.signInWithOtp({
email,
options: { emailRedirectTo: 'https://polidish.com' },
});

if (!error) {
setSent(true);
}

setSending(false);
}

async function postVine() {
if (!verified || !draft.trim()) return;

setPosting(true);

const display =
session.user.email?.slice(0, 5).toLowerCase() + '••';

await supabase.from('vines').insert({
content: draft.trim(),
author_display: display,
author_id: session.user.id,
});

setDraft('');
setPosting(false);
loadVines();
}

/* ---------------- RENDER ---------------- */

return (
<main style={{ fontFamily: 'serif', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'white' }}>

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
THE VENUE FOR UNCENSORED POLITICAL DISCOURSE. 18+
</div>
</header>

{/* BODY */}
<section className="grid">
<aside className="ads">
<AdFrame startIndex={0} />
<AdFrame startIndex={1} />
<AdFrame startIndex={2} />

<div className="outpost-links">
<a href="https://polidish.blog">POLIDISH.BLOG</a>
<a href="https://polidish.store">POLIDISH.STORE</a>
</div>
</aside>

<section className="jungle">
<h2>
<strong>Politely dishing politics.</strong>{' '}
<em><strong>May the best mind win.</strong></em>
</h2>

{/* SIGN UP */}
<div className="signup">
<input
type="email"
placeholder="Please enter email for member sign-up"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
<button onClick={handleJoin}>
{sending ? 'Sending…' : 'Join'}
</button>
</div>

{sent && <div>Magic link sent.</div>}

{/* STATUS */}
<div className="jungle-rules">
{verified ? (
<>
<strong>
You are a verified author. Only when you choose to post will you appear publicly.
</strong>
<div>Add your vine below.</div>
</>
) : (
<strong>
You're invited to join the discussion. Please type your email address and select join above, then click the Magic-link inside your email.
</strong>
)}
</div>

{/* JUNGLE THREAD */}
<div className="scroll">
{verified && (
<>
<textarea
value={draft}
onChange={(e) => setDraft(e.target.value)}
placeholder="Add your vine…"
rows={18}
style={{
width: '100%',
height: '420px',
padding: '16px',
fontSize: '16px',
lineHeight: '1.6',
marginBottom: 12,
resize: 'vertical',
boxSizing: 'border-box',
}}
/>
<button onClick={postVine} disabled={posting}>
Post
</button>
</>
)}

<div className="jungle-marker">
<em>The Jungle keeps growing and growing.</em>
</div>

{vines.map((v) => (
<div key={v.id} className="vine">
<div className="author">{v.author_display}</div>
<div className="content">{v.content ?? 'deleted'}</div>
</div>
))}
</div>
</section>
</section>

{/* FOOTER */}
<footer className="footer">
<div>
Polidish LLC is not legally responsible for your poor judgment.
If you endanger children, threaten terrorism, or break the law, you reveal yourself.
Two-Factor Authentication.
</div>
<div>© 2025 Polidish LLC. All rights reserved. — 127 Minds Day One</div>
</footer>

{/* STYLES */}
<style jsx>{`
.grid {
display: grid;
grid-template-columns: 320px 1fr;
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
.signup {
display: flex;
gap: 8px;
margin: 12px 0;
}
.signup input {
flex: 1;
padding: 8px;
}
.jungle-rules {
margin: 12px 0;
padding: 12px;
border: 1px solid #bbb;
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
.vine {
margin-bottom: 16px;
}
.author {
font-weight: 700;
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
