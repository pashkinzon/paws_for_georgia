import { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, CalendarDays, Car, Check, ChevronRight,
  Heart, House, Mail, MapPin, Menu, MessageCircle, PawPrint, Send,
  Share2, ShieldCheck, Sparkles, Syringe, X,
} from 'lucide-react'
import { googleFormsConfigured, submitToGoogleForms } from './googleForms'
import mainDogImage from '../main-dog.jpeg'

const telegramUrl = 'https://t.me/pashkinzon'

const dogPhotoModules = import.meta.glob('../dog-*/*.jpeg', { eager: true, query: '?url', import: 'default' })

function dogPhotos(folder, coverFile) {
  const folderPrefix = `../${folder}/`
  const photos = Object.entries(dogPhotoModules)
    .filter(([path]) => path.startsWith(folderPrefix))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, src]) => ({ src, filename: path.slice(folderPrefix.length) }))

  const coverIndex = photos.findIndex(photo => photo.filename === coverFile)
  if (coverIndex > 0) {
    const [cover] = photos.splice(coverIndex, 1)
    photos.unshift(cover)
  }

  return photos
}

const dogs = [
  {
    slug: 'vesta',
    name: 'Vesta',
    photos: dogPhotos('dog-vesta', 'vesta-1.jpeg'),
    age: '2 months',
    sex: 'Female',
    location: 'Georgia',
    tags: ['Vaccinated', 'Parasite treated', 'Puppy'],
    bio: 'A bright, playful baby with a mischievous spark and a big-dog future ahead of her.',
    longBio: 'Vesta was born on April 30 and has just turned two months old. She has already been treated against parasites and received her first vaccination; the remaining puppy vaccinations will follow on schedule. Like every happy youngster, she is cheerful, curious, playful, and wonderfully full of energy. Vesta is expected to grow into a large dog, as her mother is big and her father was likely large as well. There is even a chance her father was a Deutsch Drahthaar, judging by her expressive little face.'
  },
  {
    slug: 'puri',
    name: 'Puri',
    photos: dogPhotos('dog-puri', 'puri-1.jpeg'),
    age: 'About 5 years',
    sex: 'Female',
    location: 'Georgia',
    tags: ['Gentle', 'Loving', 'Good guardian'],
    bio: 'A tender, devoted girl who became a protective foster mother to tiny puppies.',
    longBio: 'Puri is simply wonderful: kind, soft, affectionate, and deeply caring. She appeared near the little puppies in February, when they were still very small, and immediately began to watch over them as if they were her own. She is often by their side, guarding and comforting them, though she also enjoys her independent walks along the boulevard. Puri has the calm, generous heart of a true family dog.'
  },
  {
    slug: 'odi',
    name: 'Odi',
    photos: dogPhotos('dog-odi', 'odi-1.jpeg'),
    age: '8-8.5 months',
    sex: 'Female',
    location: 'Georgia',
    tags: ['Vaccinated', 'Sterilized', 'Parasite treated'],
    bio: 'A sociable, active young girl who loves people and gets along well with other animals.',
    longBio: 'Odi appeared in early January together with Billie, when they looked about two months old. She is healthy, treated regularly against parasites and worms, vaccinated in puppyhood, and her next vaccination is due at one year of age. Odi has also recently been sterilized. She is the more outgoing and energetic of the two: lively, brave, very friendly, and loyal. She is strongly people-oriented, does well with other animals, and currently weighs around 20-22 kg.'
  },
  {
    slug: 'billie',
    name: 'Billie',
    photos: dogPhotos('dog-billie', 'billie-1.jpeg'),
    age: '8-8.5 months',
    sex: 'Female',
    location: 'Georgia',
    tags: ['Vaccinated', 'Sterilized', 'Parasite treated'],
    bio: 'A shy, gentle young girl with a tender heart and a calmer way of meeting the world.',
    longBio: 'Billie appeared in early January together with Odi, when they looked about two months old. She is healthy, treated regularly against parasites and worms, vaccinated in puppyhood, and her next vaccination is due at one year of age. Billie has also recently been sterilized. She is more modest, shy, and calm than Odi, though she can be a little talkative when she wants to be heard. Billie is very affectionate and delicate. She weighs around 14-15 kg and has an issue with one back leg, most likely connected to a joint problem from early puppyhood. It does not stop her from enjoying life, but she does limp.'
  },
]

const steps = [
  { title: 'Choose a Dog', text: 'Browse profiles and fall in love.', icon: PawPrint },
  { title: 'Get in Touch', text: 'Contact us via Telegram or the contact form.', icon: MessageCircle },
  { title: 'Titer & Vaccination', text: 'We organize the titer test and vaccinations.', icon: Syringe },
  { title: '90-Day Waiting Period', text: 'A required waiting period after the titer test.', icon: CalendarDays },
  { title: 'Transport to Europe', text: 'We organize safe transport by car.', icon: Car },
  { title: 'Home at Last', text: 'Welcome your new best friend!', icon: House },
]

function Logo() {
  return <Link className="logo" to="/" aria-label="Paws from Georgia home">
    <span className="logo-mark"><Heart /><PawPrint /></span>
    <span><strong>Paws from Georgia</strong><small>Bringing hearts home</small></span>
  </Link>
}

function Header() {
  const [open, setOpen] = useState(false)
  const navigate = (id) => {
    setOpen(false)
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 20)
  }
  return <header className="header">
    <Logo />
    <button className="menu-button" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav className={open ? 'nav open' : 'nav'}>
      <Link to="/" onClick={() => navigate('home')}>Home</Link>
      <Link to="/" onClick={() => navigate('about')}>About Us</Link>
      <Link to="/" onClick={() => navigate('process')}>Adoption Process</Link>
      <Link to="/" onClick={() => navigate('dogs')}>Dogs</Link>
      <Link to="/" onClick={() => navigate('help')}>How You Can Help</Link>
      <Link to="/" onClick={() => navigate('faq')}>FAQ</Link>
      <Link to="/" onClick={() => navigate('contact')}>Contact</Link>
    </nav>
    <a className="button outline header-telegram" href={telegramUrl} target="_blank" rel="noreferrer"><Send size={17}/> Telegram</a>
  </header>
}

function Hero() {
  return <section className="hero" id="home" style={{ '--hero-image': `url(${mainDogImage})` }}>
    <div className="hero-content">
      <span className="eyebrow"><Sparkles size={16}/> Rescue. Care. Home.</span>
      <h1>A second chance<br/>can change<br/>everything.<Heart className="hero-heart" /></h1>
      <p>We are a group of volunteers helping dogs from Georgia find loving homes in Europe, especially in Germany.</p>
      <strong className="hero-note">We don’t profit. We just care.</strong>
      <div className="hero-actions">
        <a className="button primary" href="#dogs"><PawPrint size={19}/> Meet the Dogs</a>
        <a className="button outline" href="#follow"><Heart size={19}/> Follow a Dog’s Story</a>
      </div>
    </div>
    <div className="hero-image" role="img" aria-label="A rescued dog resting on a blanket">
      <div className="hero-photo-crop" aria-hidden="true"><img src={mainDogImage} alt="" /></div>
      <div className="volunteer-card"><Heart/><span>Non-commercial<br/><b>100% volunteer</b><br/>All for the dogs</span><PawPrint className="tiny-paw"/></div>
    </div>
  </section>
}

function AdoptionProcess() {
  return <section className="section process-section" id="process">
    <div className="section-title"><h2>The Adoption Process</h2><Heart /></div>
    <div className="steps">
      {steps.map(({ title, text, icon: Icon }, index) => <div className="step-wrap" key={title}>
        <article className="step-card">
          <span className="step-number">{index + 1}</span><Icon className="step-icon" />
          <h3>{title}</h3><p>{text}</p>
        </article>
        {index < steps.length - 1 && <ArrowRight className="step-arrow" />}
      </div>)}
    </div>
    <div className="cost-strip">
      <div><Syringe/><span><b>Titer & Vaccination</b><small>(~150–200 EUR)</small></span></div>
      <div><PawPrint/><span><b>Dog Mentoring / Pet Sitting</b><small>during the 90-day period<br/>(up to 300 EUR, can vary)</small></span></div>
      <div><Car/><span><b>Transport by Car</b><small>around 500 EUR<br/>depending on location</small></span></div>
      <div className="love-only"><Heart/><b>No adoption fee.<br/>Just love.</b></div>
    </div>
  </section>
}

function DogCard({ dog }) {
  return <article className="dog-card">
    <Link to={`/dogs/${dog.slug}`} className="dog-image-link"><img src={dog.photos[0].src} alt={dog.name}/><span>Meet {dog.name} <ChevronRight/></span></Link>
    <div className="dog-card-body">
      <h3>{dog.name}</h3><div className="dog-meta"><span>{dog.age}</span><i/> <span>{dog.sex}</span></div>
      <div className="tags">{dog.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <p>{dog.bio}</p><small className="location"><MapPin size={14}/>{dog.location}</small>
    </div>
  </article>
}

function DogsSection() {
  return <section className="section dogs-section" id="dogs">
    <div className="dogs-heading"><div className="section-title left"><h2>Dogs Looking for a Home</h2><Heart/></div><span className="available"><i/> 4 waiting for love</span></div>
    <div className="dog-grid">{dogs.map(dog => <DogCard key={dog.slug} dog={dog}/>)}</div>
  </section>
}

function FormsSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const submit = async (event) => {
    event.preventDefault()
    if (!googleFormsConfigured) { setStatus('Almost ready — add your Google Form IDs in .env to collect signups.'); return }
    try { await submitToGoogleForms({ email }); setStatus('Thank you! We’ll keep you updated.'); setEmail('') }
    catch { setStatus('Something went wrong. Please try again.') }
  }
  return <section className="section action-grid" id="contact">
    <article className="action-card" id="about"><Heart/><div><h2>Have a Question or Want to Adopt?</h2><p>We’re here to help and answer all your questions.</p><div className="action-buttons"><a className="button primary" href={telegramUrl} target="_blank" rel="noreferrer"><Send/> Chat with us on Telegram</a><a className="button outline" href="mailto:hello@pawsfromgeorgia.org"><Mail/> Contact Form</a></div></div><PawPrint className="watermark"/></article>
    <article className="action-card" id="follow"><Heart/><div><h2>Want to Follow a Dog’s Story?</h2><p>Leave your email and we’ll keep you updated on your favorite dog.</p><form onSubmit={submit}><label className="sr-only" htmlFor="email">Your email address</label><input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address"/><button className="button primary" type="submit"><Heart/> Keep Me Updated</button></form><small className="form-status">{status || 'You can unsubscribe anytime.'}</small></div><PawPrint className="watermark"/></article>
  </section>
}

function Footer() {
  return <footer id="help"><Logo/><p>Volunteer-powered dog rescue connecting Georgia with loving homes across Europe.</p><div><a href={telegramUrl} target="_blank" rel="noreferrer">Telegram</a><a id="faq" href="mailto:hello@pawsfromgeorgia.org">Email us</a></div><small>© {new Date().getFullYear()} Paws from Georgia</small></footer>
}

function HomePage() {
  return <><Header/><main><Hero/><AdoptionProcess/><DogsSection/><FormsSection/></main><Footer/></>
}

function DogProfile() {
  const { pathname } = useLocation()
  const dog = dogs.find(item => pathname.endsWith(item.slug))
  useEffect(() => window.scrollTo(0, 0), [pathname])
  if (!dog) return <NotFound />
  const share = async () => {
    const data = { title: `${dog.name} — Paws from Georgia`, text: `Meet ${dog.name}, looking for a loving home.`, url: window.location.href }
    if (navigator.share) await navigator.share(data)
    else { await navigator.clipboard.writeText(window.location.href); alert('Profile link copied!') }
  }
  return <><Header/><main className="profile-page">
    <Link className="back-link" to="/#dogs"><ArrowLeft/> Back to all dogs</Link>
    <div className="profile-layout">
      <div className="profile-image"><img src={dog.photos[0].src} alt={dog.name}/><span><ShieldCheck/> Ready for adoption</span></div>
      <div className="profile-copy"><span className="eyebrow"><PawPrint/> Looking for a home</span><h1>{dog.name}</h1><div className="profile-meta"><span>{dog.age}</span><i/><span>{dog.sex}</span><i/><span><MapPin/>{dog.location}</span></div><div className="tags large">{dog.tags.map(tag => <span key={tag}><Check/>{tag}</span>)}</div><p className="lead">{dog.bio}</p><p>{dog.longBio}</p><div className="profile-actions"><a className="button primary" href={`${telegramUrl}?text=${encodeURIComponent(`Hi! I would love to learn more about ${dog.name}.`)}`} target="_blank" rel="noreferrer"><Send/> Ask about {dog.name}</a><button className="button outline" onClick={share}><Share2/> Share profile</button></div></div>
    </div>
    {dog.photos.length > 1 && <section className="profile-gallery" aria-label={`${dog.name} photo gallery`}>
      {dog.photos.slice(1).map(photo => <img key={photo.filename} src={photo.src} alt={`${dog.name} ${photo.filename}`} />)}
    </section>}
    <section className="profile-next"><Heart/><div><h2>Could {dog.name} be your new best friend?</h2><p>Adoption has no fee. Our volunteers will guide you through every step.</p></div><a className="button outline" href="/#process">See the adoption process</a></section>
  </main><Footer/></>
}

function NotFound() { return <main className="not-found"><PawPrint/><h1>We wandered off the path.</h1><p>This page doesn’t exist, but the dogs are still waiting.</p><Link className="button primary" to="/">Back home</Link></main> }

export default function App() {
  return <div className="site-shell"><ScrollToHash/><Routes><Route path="/" element={<HomePage/>}/><Route path="/dogs/:slug" element={<DogProfile/>}/><Route path="*" element={<NotFound/>}/></Routes></div>
}

function ScrollToHash() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const timer = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 60)
      return () => window.clearTimeout(timer)
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])
  return null
}
