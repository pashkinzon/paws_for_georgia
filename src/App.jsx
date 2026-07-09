import { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, CalendarDays, Car, Check, ChevronRight,
  Heart, House, Mail, MapPin, Menu, MessageCircle, PawPrint, Send,
  Share2, ShieldCheck, Sparkles, Syringe, X,
} from 'lucide-react'
import mainDogImage from '../main-dog.jpeg'

const telegramUrl = 'https://t.me/pashkinzon'
const whatsappUrl = 'https://wa.me/491623657459'
const emailUrl = 'mailto:pashkinzonch@gmail.com'
const contactPerson = 'Pavel Polishchuk'
const languages = [
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'ru', label: 'RU' },
]

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

const siteText = {
  en: {
    logoTagline: 'Bringing hearts home',
    nav: ['Home', 'About Us', 'Adoption Process', 'Dogs', 'How You Can Help', 'FAQ', 'Contact'],
    menuLabel: 'Toggle menu',
    heroEyebrow: 'Rescue. Care. Home.',
    heroTitle: <>A second chance<br/>can change<br/>everything.</>,
    heroText: 'We are a group of volunteers helping dogs from Georgia find loving homes in Europe, especially in Germany.',
    heroNote: 'We don’t profit. We just care.',
    meetDogs: 'Meet the Dogs',
    followStory: 'Follow a Dog’s Story',
    volunteerCard: <>Non-commercial<br/><b>100% volunteer</b><br/>All for the dogs</>,
    processTitle: 'The Adoption Process',
    steps: [
      ['Choose a Dog', 'Browse profiles and fall in love.'],
      ['Get in Touch', 'Contact us via Telegram or the contact form.'],
      ['Titer & Vaccination', 'We organize the titer test and vaccinations.'],
      ['90-Day Waiting Period', 'A required waiting period after the titer test.'],
      ['Transport to Europe', 'We organize safe transport by car.'],
      ['Home at Last', 'Welcome your new best friend!'],
    ],
    costs: [
      ['Titer & Vaccination', '(~150–200 EUR)'],
      ['Dog Mentoring / Pet Sitting', <>during the 90-day period<br/>(up to 300 EUR, can vary)</>],
      ['Transport by Car', <>around 500 EUR<br/>depending on location</>],
    ],
    noFee: <>No adoption fee.<br/>Just love.</>,
    dogsTitle: 'Dogs Looking for a Home',
    waiting: '4 waiting for love',
    meet: 'Meet',
    contactTitle: 'Have a Question or Want to Adopt?',
    contactText: 'You will reach Pavel Polishchuk, the volunteer who created this website and connects interested adopters with the volunteers in Georgia.',
    telegram: 'Text Pavel on Telegram',
    whatsappContact: 'Text Pavel on WhatsApp',
    emailContact: 'Email Pavel',
    openContact: 'Contact Pavel',
    modalTitle: 'You are reaching a volunteer',
    modalText: 'Pavel Polishchuk created this website to help find potential homes for dogs from Georgia. He does not accept adoption money and will connect you with the volunteers in Batumi who know the dogs and help with relocation.',
    modalHelpText: 'If you want to help directly, Pavel can share the contact details of the Georgian volunteers. They often need help with food, vet visits, parasite treatments, vaccinations, and daily care.',
    closeContact: 'Close contact options',
    volunteerTitle: '100% volunteer. No adoption profit.',
    volunteerText: 'We do not profit from adoption in any way. This website exists to connect future owners with volunteers in Georgia who care for the dogs and help with relocation. Those volunteers are also unpaid and do this out of love for dogs.',
    volunteerNote: 'No adoption fee is taken by us. Any relocation-related costs are discussed transparently with the volunteers who actually care for and transport the dog.',
    helpTitle: 'Want to help the dogs directly?',
    helpText: 'Volunteers in Georgia need practical support every day: food for street dogs and foster dogs, vet visits, treatments, vaccinations, and emergency care.',
    helpNote: 'We do not collect or accept money ourselves. Contact Pavel and he will share the details of the volunteers in Georgia so you can help directly.',
    footerText: 'Volunteer-powered dog rescue connecting Georgia with loving homes across Europe.',
    emailUs: 'Email Pavel',
    backToDogs: 'Back to all dogs',
    ready: 'Ready for adoption',
    profileEyebrow: 'Looking for a home',
    askAbout: 'Ask about',
    shareProfile: 'Share profile',
    shareOn: 'Share on',
    whatsapp: 'WhatsApp',
    messages: 'Messages',
    email: 'Email',
    openPhoto: 'Open photo',
    previousPhoto: 'Previous photo',
    nextPhoto: 'Next photo',
    closeViewer: 'Close viewer',
    linkCopied: 'Profile link copied!',
    profileNextTitle: name => `Could ${name} be your new best friend?`,
    profileNextText: 'Adoption has no fee. Our volunteers will guide you through every step.',
    seeProcess: 'See the adoption process',
    notFoundTitle: 'We wandered off the path.',
    notFoundText: 'This page doesn’t exist, but the dogs are still waiting.',
    backHome: 'Back home',
  },
  de: {
    logoTagline: 'Herzen nach Hause bringen',
    nav: ['Start', 'Über uns', 'Ablauf der Adoption', 'Hunde', 'So kannst du helfen', 'FAQ', 'Kontakt'],
    menuLabel: 'Menü umschalten',
    heroEyebrow: 'Rettung. Fürsorge. Zuhause.',
    heroTitle: <>Eine zweite Chance<br/>kann alles<br/>verändern.</>,
    heroText: 'Wir sind eine Gruppe von Freiwilligen, die Hunden aus Georgien helfen, liebevolle Zuhause in Europa zu finden, besonders in Deutschland.',
    heroNote: 'Wir arbeiten nicht gewinnorientiert. Wir kümmern uns einfach.',
    meetDogs: 'Hunde kennenlernen',
    followStory: 'Geschichte begleiten',
    volunteerCard: <>Nicht kommerziell<br/><b>100% freiwillig</b><br/>Alles für die Hunde</>,
    processTitle: 'Der Ablauf der Adoption',
    steps: [
      ['Hund auswählen', 'Profile ansehen und verlieben.'],
      ['Kontakt aufnehmen', 'Schreib uns über Telegram oder das Kontaktformular.'],
      ['Titer & Impfung', 'Wir organisieren Titer-Test und Impfungen.'],
      ['90 Tage Wartezeit', 'Nach dem Titer-Test ist diese Wartezeit vorgeschrieben.'],
      ['Transport nach Europa', 'Wir organisieren einen sicheren Transport mit dem Auto.'],
      ['Endlich Zuhause', 'Willkommen, neuer bester Freund!'],
    ],
    costs: [
      ['Titer & Impfung', '(~150–200 EUR)'],
      ['Betreuung / Pflegestelle', <>während der 90 Tage<br/>(bis 300 EUR, kann variieren)</>],
      ['Transport mit dem Auto', <>etwa 500 EUR<br/>je nach Zielort</>],
    ],
    noFee: <>Keine Schutzgebühr.<br/>Nur Liebe.</>,
    dogsTitle: 'Hunde suchen ein Zuhause',
    waiting: '4 warten auf Liebe',
    meet: 'Lerne',
    contactTitle: 'Fragen oder Interesse an einer Adoption?',
    contactText: 'Du erreichst Pavel Polishchuk, den Freiwilligen, der diese Website erstellt hat und Interessenten mit den Freiwilligen in Georgien verbindet.',
    telegram: 'Pavel auf Telegram schreiben',
    whatsappContact: 'Pavel auf WhatsApp schreiben',
    emailContact: 'Pavel per E-Mail kontaktieren',
    openContact: 'Pavel kontaktieren',
    modalTitle: 'Du kontaktierst einen Freiwilligen',
    modalText: 'Pavel Polishchuk hat diese Website erstellt, um für Hunde aus Georgien mögliche Zuhause zu finden. Er nimmt kein Geld für Adoptionen an und verbindet dich mit den Freiwilligen in Batumi, die die Hunde kennen und bei der Ausreise helfen.',
    modalHelpText: 'Wenn du direkt helfen möchtest, kann Pavel die Kontaktdaten der Freiwilligen in Georgien weitergeben. Sie brauchen oft Hilfe für Futter, Tierarztbesuche, Behandlungen, Impfungen und tägliche Versorgung.',
    closeContact: 'Kontaktoptionen schließen',
    volunteerTitle: '100% freiwillig. Kein Gewinn durch Adoption.',
    volunteerText: 'Wir profitieren in keiner Weise von Adoptionen. Diese Website verbindet zukünftige Besitzer mit Freiwilligen in Georgien, die die Hunde versorgen und bei der Ausreise helfen. Auch diese Freiwilligen werden nicht bezahlt und tun es aus Liebe zu Hunden.',
    volunteerNote: 'Wir nehmen keine Schutzgebühr an. Kosten im Zusammenhang mit der Ausreise werden transparent mit den Freiwilligen besprochen, die den Hund tatsächlich betreuen und transportieren.',
    helpTitle: 'Möchtest du direkt helfen?',
    helpText: 'Freiwillige in Georgien brauchen täglich praktische Hilfe: Futter für Straßen- und Pflegehunde, Tierarztbesuche, Behandlungen, Impfungen und Notfallversorgung.',
    helpNote: 'Wir sammeln und nehmen selbst kein Geld an. Kontaktiere Pavel, und er teilt die Daten der Freiwilligen in Georgien, damit du direkt helfen kannst.',
    footerText: 'Freiwillige Hundehilfe, die Georgien mit liebevollen Zuhause in Europa verbindet.',
    emailUs: 'Pavel per E-Mail',
    backToDogs: 'Zurück zu allen Hunden',
    ready: 'Bereit für die Adoption',
    profileEyebrow: 'Sucht ein Zuhause',
    askAbout: 'Fragen zu',
    shareProfile: 'Profil teilen',
    shareOn: 'Teilen über',
    whatsapp: 'WhatsApp',
    messages: 'Nachrichten',
    email: 'E-Mail',
    openPhoto: 'Foto öffnen',
    previousPhoto: 'Vorheriges Foto',
    nextPhoto: 'Nächstes Foto',
    closeViewer: 'Ansicht schließen',
    linkCopied: 'Profil-Link kopiert!',
    profileNextTitle: name => `Könnte ${name} dein neuer bester Freund sein?`,
    profileNextText: 'Die Adoption hat keine Gebühr. Unsere Freiwilligen begleiten dich Schritt für Schritt.',
    seeProcess: 'Ablauf ansehen',
    notFoundTitle: 'Wir sind vom Weg abgekommen.',
    notFoundText: 'Diese Seite gibt es nicht, aber die Hunde warten weiterhin.',
    backHome: 'Zur Startseite',
  },
  ru: {
    logoTagline: 'Помогаем сердцам найти дом',
    nav: ['Главная', 'О нас', 'Процесс усыновления', 'Собаки', 'Как помочь', 'FAQ', 'Контакты'],
    menuLabel: 'Открыть меню',
    heroEyebrow: 'Спасение. Забота. Дом.',
    heroTitle: <>Второй шанс<br/>может изменить<br/>всё.</>,
    heroText: 'Мы группа волонтёров, которые помогают собакам из Грузии найти любящие семьи в Европе, особенно в Германии.',
    heroNote: 'Мы не зарабатываем. Мы просто заботимся.',
    meetDogs: 'Познакомиться с собаками',
    followStory: 'Следить за историей',
    volunteerCard: <>Некоммерческий проект<br/><b>100% волонтёры</b><br/>Всё ради собак</>,
    processTitle: 'Процесс усыновления',
    steps: [
      ['Выберите собаку', 'Посмотрите анкеты и влюбитесь.'],
      ['Свяжитесь с нами', 'Напишите нам в Telegram или через форму.'],
      ['Титр и вакцинация', 'Мы организуем тест на титр и прививки.'],
      ['90 дней ожидания', 'Обязательный срок ожидания после теста на титр.'],
      ['Транспорт в Европу', 'Мы организуем безопасную перевозку на машине.'],
      ['Наконец дома', 'Встречайте нового лучшего друга!'],
    ],
    costs: [
      ['Титр и вакцинация', '(~150–200 EUR)'],
      ['Кураторство / передержка', <>во время 90 дней ожидания<br/>(до 300 EUR, может отличаться)</>],
      ['Транспорт на машине', <>около 500 EUR<br/>в зависимости от места</>],
    ],
    noFee: <>Без платы за усыновление.<br/>Только любовь.</>,
    dogsTitle: 'Собаки ищут дом',
    waiting: '4 ждут любви',
    meet: 'Познакомиться:',
    contactTitle: 'Есть вопросы или хотите забрать собаку?',
    contactText: 'Вы напишете Павлу Полищуку, волонтёру, который создал этот сайт и связывает заинтересованных людей с волонтёрами в Грузии.',
    telegram: 'Написать Павлу в Telegram',
    whatsappContact: 'Написать Павлу в WhatsApp',
    emailContact: 'Написать Павлу на e-mail',
    openContact: 'Связаться с Павлом',
    modalTitle: 'Вы связываетесь с волонтёром',
    modalText: 'Павел Полищук создал этот сайт, чтобы помочь собакам из Грузии найти потенциальные дома. Он не принимает деньги за усыновление и свяжет вас с волонтёрами в Батуми, которые знают собак и помогают с переездом.',
    modalHelpText: 'Если вы хотите помочь напрямую, Павел может поделиться контактами волонтёров в Грузии. Им часто нужна помощь с кормом, оплатой ветеринара, обработками, вакцинами и ежедневным уходом.',
    closeContact: 'Закрыть варианты контакта',
    volunteerTitle: '100% волонтёрский проект. Без прибыли от усыновления.',
    volunteerText: 'Мы никак не зарабатываем на усыновлении. Этот сайт связывает будущих хозяев с волонтёрами в Грузии, которые заботятся о собаках и помогают с переездом. Эти волонтёры тоже не получают оплату и делают всё из любви к собакам.',
    volunteerNote: 'Мы не берём плату за усыновление. Все расходы, связанные с переездом, обсуждаются прозрачно с волонтёрами, которые реально заботятся о собаке и организуют дорогу.',
    helpTitle: 'Хотите помочь собакам напрямую?',
    helpText: 'Волонтёрам в Грузии каждый день нужна практическая помощь: корм для уличных собак и собак на передержке, визиты к ветеринару, лечения, вакцины и срочная помощь.',
    helpNote: 'Мы сами не собираем и не принимаем деньги. Напишите Павлу, и он поделится контактами волонтёров в Грузии, чтобы вы могли помочь напрямую.',
    footerText: 'Волонтёрский проект, соединяющий собак из Грузии с любящими домами в Европе.',
    emailUs: 'E-mail Павла',
    backToDogs: 'Назад ко всем собакам',
    ready: 'Готова к усыновлению',
    profileEyebrow: 'Ищет дом',
    askAbout: 'Спросить про',
    shareProfile: 'Поделиться анкетой',
    shareOn: 'Поделиться через',
    whatsapp: 'WhatsApp',
    messages: 'Сообщения',
    email: 'E-mail',
    openPhoto: 'Открыть фото',
    previousPhoto: 'Предыдущее фото',
    nextPhoto: 'Следующее фото',
    closeViewer: 'Закрыть просмотр',
    linkCopied: 'Ссылка на анкету скопирована!',
    profileNextTitle: name => `${name} может стать вашим новым лучшим другом?`,
    profileNextText: 'Усыновление без платы. Наши волонтёры помогут на каждом шаге.',
    seeProcess: 'Посмотреть процесс',
    notFoundTitle: 'Мы немного сбились с пути.',
    notFoundText: 'Такой страницы нет, но собаки всё ещё ждут.',
    backHome: 'На главную',
  },
}

const dogData = [
  {
    slug: 'vesta',
    name: 'Vesta',
    photos: dogPhotos('dog-vesta', 'vesta-1.jpeg'),
    en: {
      age: '2 months',
      sex: 'Female',
      location: 'Batumi, Georgia',
      tags: ['Vaccinated', 'Parasite treated', 'Puppy'],
      bio: 'A bright, playful baby with a mischievous spark and a big-dog future ahead of her.',
      longBio: 'Vesta was born on April 30 and has just turned two months old. She has already been treated against parasites and received her first vaccination; the remaining puppy vaccinations will follow on schedule. Like every happy youngster, she is cheerful, curious, playful, and wonderfully full of energy. Vesta is expected to grow into a large dog, as her mother is big and her father was likely large as well. There is even a chance her father was a Deutsch Drahthaar, judging by her expressive little face.'
    },
    de: {
      age: '2 Monate',
      sex: 'Hündin',
      location: 'Batumi, Georgien',
      tags: ['Geimpft', 'Entwurmt & behandelt', 'Welpe'],
      bio: 'Ein fröhliches, verspieltes Hundekind mit frechem Blick und der Aussicht, einmal groß zu werden.',
      longBio: 'Vesta wurde am 30. April geboren und ist nun zwei Monate alt. Sie wurde bereits gegen Parasiten behandelt und hat ihre erste Impfung erhalten; die weiteren Welpenimpfungen folgen planmäßig. Wie alle glücklichen Hundekinder ist sie fröhlich, neugierig, verspielt und voller Energie. Vesta wird voraussichtlich eine große Hündin, denn ihre Mutter ist groß und auch ihr Vater war vermutlich groß. Ihrem ausdrucksstarken Gesicht nach könnte ihr Vater sogar ein Deutsch Drahthaar gewesen sein.'
    },
    ru: {
      age: '2 месяца',
      sex: 'Девочка',
      location: 'Батуми, Грузия',
      tags: ['Вакцинирована', 'Обработана от паразитов', 'Щенок'],
      bio: 'Яркая, игривая малышка с озорным характером и будущим большой собаки.',
      longBio: 'Веста родилась 30 апреля, ей уже два месяца. Она обработана от паразитов и получила первую вакцину; остальные прививки будут сделаны по сроку. Как все малыши, она весёлая, любопытная, игривая и полная энергии. Во взрослом возрасте Веста, скорее всего, будет крупной собакой: её мама большая, и папа, вероятно, тоже был крупным. Есть шанс, что папа был породы дратхаар — уж очень Веста похожа мордочкой.'
    },
  },
  {
    slug: 'puri',
    name: 'Puri',
    photos: dogPhotos('dog-puri', 'puri-1.jpeg'),
    en: {
      age: 'About 5 years',
      sex: 'Female',
      location: 'Batumi, Georgia',
      tags: ['Gentle', 'Loving', 'Good guardian'],
      bio: 'A tender, devoted girl who became a protective foster mother to tiny puppies.',
      longBio: 'Puri is simply wonderful: kind, soft, affectionate, and deeply caring. She appeared near the little puppies in February, when they were still very small, and immediately began to watch over them as if they were her own. She is often by their side, guarding and comforting them, though she also enjoys her independent walks along the boulevard. Puri has the calm, generous heart of a true family dog.'
    },
    de: {
      age: 'Etwa 5 Jahre',
      sex: 'Hündin',
      location: 'Batumi, Georgien',
      tags: ['Sanft', 'Liebevoll', 'Beschützend'],
      bio: 'Eine zarte, treue Hündin, die für kleine Welpen zur liebevollen Pflegemama wurde.',
      longBio: 'Puri ist einfach wunderbar: freundlich, weich, zärtlich und sehr fürsorglich. Im Februar kam sie zu den kleinen Welpen, als sie noch winzig waren, und begann sofort, auf sie aufzupassen, als wären es ihre eigenen. Sie ist oft an ihrer Seite, beschützt und beruhigt sie, genießt aber auch ihre eigenen Spaziergänge am Boulevard. Puri hat das ruhige, großzügige Herz einer echten Familienhündin.'
    },
    ru: {
      age: 'Примерно 5 лет',
      sex: 'Девочка',
      location: 'Батуми, Грузия',
      tags: ['Нежная', 'Ласковая', 'Заботливая'],
      bio: 'Очень добрая и преданная девочка, которая стала приёмной мамой для маленьких щенков.',
      longBio: 'Пури просто чудесная: добрая, нежная, ласковая и очень заботливая. Она пришла к малышам в феврале, когда они были ещё совсем крошками, и сразу начала охранять и оберегать их, будто они её собственные. Чаще всего она рядом с ними, но при этом любит и свои прогулки по бульвару. У Пури спокойное, большое сердце настоящей семейной собаки.'
    },
  },
  {
    slug: 'odi',
    name: 'Odi',
    photos: dogPhotos('dog-odi', 'odi-1.jpeg'),
    en: {
      age: '8-8.5 months',
      sex: 'Female',
      location: 'Batumi, Georgia',
      tags: ['Vaccinated', 'Sterilized', 'Parasite treated'],
      bio: 'A sociable, active young girl who loves people and gets along well with other animals.',
      longBio: 'Odi appeared in early January together with Billie, when they looked about two months old. She is healthy, treated regularly against parasites and worms, vaccinated in puppyhood, and her next vaccination is due at one year of age. Odi has also recently been sterilized. She is the more outgoing and energetic of the two: lively, brave, very friendly, and loyal. She is strongly people-oriented, does well with other animals, and currently weighs around 20-22 kg.'
    },
    de: {
      age: '8-8,5 Monate',
      sex: 'Hündin',
      location: 'Batumi, Georgien',
      tags: ['Geimpft', 'Sterilisiert', 'Entwurmt & behandelt'],
      bio: 'Eine offene, aktive junge Hündin, die Menschen liebt und gut mit anderen Tieren auskommt.',
      longBio: 'Odi tauchte Anfang Januar zusammen mit Billie auf; damals wirkten die beiden etwa zwei Monate alt. Sie ist gesund, wird regelmäßig gegen Parasiten und Würmer behandelt, wurde als Welpe geimpft und ihre nächste Impfung ist mit einem Jahr fällig. Odi wurde vor Kurzem sterilisiert. Sie ist die kontaktfreudigere und aktivere der beiden: lebhaft, mutig, sehr freundlich und treu. Sie orientiert sich stark am Menschen, kommt gut mit anderen Tieren zurecht und wiegt aktuell etwa 20-22 kg.'
    },
    ru: {
      age: '8-8,5 месяцев',
      sex: 'Девочка',
      location: 'Батуми, Грузия',
      tags: ['Вакцинирована', 'Стерилизована', 'Обработана от паразитов'],
      bio: 'Общительная и активная молодая девочка, которая любит людей и хорошо ладит с другими животными.',
      longBio: 'Оди появилась в первых числах января вместе с Билли; на вид им тогда было около двух месяцев. Она здорова, регулярно обрабатывается от паразитов и глистов, была привита в детском возрасте, следующая вакцинация нужна в 1 год. Недавно Оди стерилизовали. По характеру она более компанейская и активная: живая, смелая, очень добрая и верная. Она сильно ориентирована на человека, хорошо ладит с другими животными и сейчас весит примерно 20-22 кг.'
    },
  },
  {
    slug: 'billie',
    name: 'Billie',
    photos: dogPhotos('dog-billie', 'billie-1.jpeg'),
    en: {
      age: '8-8.5 months',
      sex: 'Female',
      location: 'Batumi, Georgia',
      tags: ['Vaccinated', 'Sterilized', 'Parasite treated'],
      bio: 'A shy, gentle young girl with a tender heart and a calmer way of meeting the world.',
      longBio: 'Billie appeared in early January together with Odi, when they looked about two months old. She is healthy, treated regularly against parasites and worms, vaccinated in puppyhood, and her next vaccination is due at one year of age. Billie has also recently been sterilized. She is more modest, shy, and calm than Odi, though she can be a little talkative when she wants to be heard. Billie is very affectionate and delicate. She weighs around 14-15 kg and has an issue with one back leg, most likely connected to a joint problem from early puppyhood. It does not stop her from enjoying life, but she does limp.'
    },
    de: {
      age: '8-8,5 Monate',
      sex: 'Hündin',
      location: 'Batumi, Georgien',
      tags: ['Geimpft', 'Sterilisiert', 'Entwurmt & behandelt'],
      bio: 'Eine schüchterne, sanfte junge Hündin mit zartem Herzen und ruhiger Art.',
      longBio: 'Billie tauchte Anfang Januar zusammen mit Odi auf; damals wirkten die beiden etwa zwei Monate alt. Sie ist gesund, wird regelmäßig gegen Parasiten und Würmer behandelt, wurde als Welpe geimpft und ihre nächste Impfung ist mit einem Jahr fällig. Billie wurde vor Kurzem sterilisiert. Sie ist zurückhaltender, schüchterner und ruhiger als Odi, kann aber auch ein wenig gesprächig sein, wenn sie gehört werden möchte. Billie ist sehr verschmust und feinfühlig. Sie wiegt etwa 14-15 kg und hat ein Problem mit einem Hinterbein, vermutlich seit früher Welpenzeit am Gelenk. Es hält sie nicht davon ab, ihr Leben zu genießen, aber sie humpelt.'
    },
    ru: {
      age: '8-8,5 месяцев',
      sex: 'Девочка',
      location: 'Батуми, Грузия',
      tags: ['Вакцинирована', 'Стерилизована', 'Обработана от паразитов'],
      bio: 'Скромная и нежная молодая девочка с мягким сердцем и спокойным характером.',
      longBio: 'Билли появилась в первых числах января вместе с Оди; на вид им тогда было около двух месяцев. Она здорова, регулярно обрабатывается от паразитов и глистов, была привита в детском возрасте, следующая вакцинация нужна в 1 год. Недавно Билли стерилизовали. Она более стеснительная, скромная и спокойная, чем Оди, но при этом может быть довольно гавкучей, когда хочет, чтобы её услышали. Билли очень ласковая и нежная. Она весит примерно 14-15 кг. Есть проблема с задней лапкой, скорее всего с суставом с детства. Это не мешает ей радоваться жизни, но она хромает.'
    },
  },
]

const stepIcons = [PawPrint, MessageCircle, Syringe, CalendarDays, Car, House]

function localizeDog(dog, lang) {
  return { ...dog, ...(dog[lang] || dog.en) }
}

function dogProfileUrl(slug) {
  return new URL(`/dogs/${slug}`, window.location.origin).toString()
}

function shareMessage(dog, text) {
  return `${text.meet} ${dog.name} — Paws from Georgia`
}

function Logo({ text }) {
  return <Link className="logo" to="/" aria-label="Paws from Georgia home">
    <span className="logo-mark"><Heart /><PawPrint /></span>
    <span><strong>Paws from Georgia</strong><small>{text.logoTagline}</small></span>
  </Link>
}

function LanguageToggle({ lang, setLang }) {
  return <div className="language-toggle" aria-label="Language selector">
    {languages.map(item => <button
      className={lang === item.code ? 'active' : ''}
      key={item.code}
      onClick={() => setLang(item.code)}
      type="button"
    >
      {item.label}
    </button>)}
  </div>
}

function Header({ lang, setLang, text, openContact }) {
  const [open, setOpen] = useState(false)
  const navigate = (id) => {
    setOpen(false)
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 20)
  }
  const navIds = ['home', 'about', 'process', 'dogs', 'help', 'faq', 'contact']
  return <header className="header">
    <Logo text={text} />
    <button className="menu-button" aria-label={text.menuLabel} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav className={open ? 'nav open' : 'nav'}>
      {text.nav.map((label, index) => <Link key={label} to="/" onClick={() => navigate(navIds[index])}>{label}</Link>)}
    </nav>
    <LanguageToggle lang={lang} setLang={setLang} />
    <button className="button outline header-telegram" type="button" onClick={openContact}><Send size={17}/> Telegram</button>
  </header>
}

function Hero({ text }) {
  return <section className="hero" id="home" style={{ '--hero-image': `url(${mainDogImage})` }}>
    <div className="hero-content">
      <span className="eyebrow"><Sparkles size={16}/> {text.heroEyebrow}</span>
      <h1>{text.heroTitle}<Heart className="hero-heart" /></h1>
      <p>{text.heroText}</p>
      <strong className="hero-note">{text.heroNote}</strong>
      <div className="hero-actions">
        <a className="button primary" href="#dogs"><PawPrint size={19}/> {text.meetDogs}</a>
        <a className="button outline" href="#follow"><Heart size={19}/> {text.followStory}</a>
      </div>
    </div>
    <div className="hero-image" role="img" aria-label="A rescued dog resting on a blanket">
      <div className="hero-photo-crop" aria-hidden="true"><img src={mainDogImage} alt="" /></div>
      <div className="volunteer-card"><Heart/><span>{text.volunteerCard}</span><PawPrint className="tiny-paw"/></div>
    </div>
  </section>
}

function AdoptionProcess({ text }) {
  return <section className="section process-section" id="process">
    <div className="section-title"><h2>{text.processTitle}</h2><Heart /></div>
    <div className="steps">
      {text.steps.map(([title, body], index) => {
        const Icon = stepIcons[index]
        return <div className="step-wrap" key={title}>
          <article className="step-card">
            <span className="step-number">{index + 1}</span><Icon className="step-icon" />
            <h3>{title}</h3><p>{body}</p>
          </article>
          {index < text.steps.length - 1 && <ArrowRight className="step-arrow" />}
        </div>
      })}
    </div>
    <div className="cost-strip">
      <div><Syringe/><span><b>{text.costs[0][0]}</b><small>{text.costs[0][1]}</small></span></div>
      <div><PawPrint/><span><b>{text.costs[1][0]}</b><small>{text.costs[1][1]}</small></span></div>
      <div><Car/><span><b>{text.costs[2][0]}</b><small>{text.costs[2][1]}</small></span></div>
      <div className="love-only"><Heart/><b>{text.noFee}</b></div>
    </div>
  </section>
}

function VolunteerSection({ text, openContact }) {
  return <section className="section volunteer-section" id="about">
    <div className="volunteer-copy">
      <span className="eyebrow"><Heart/> {text.heroNote}</span>
      <h2>{text.volunteerTitle}</h2>
      <p>{text.volunteerText}</p>
      <strong>{text.volunteerNote}</strong>
    </div>
    <div className="help-direct" id="help">
      <PawPrint/>
      <h3>{text.helpTitle}</h3>
      <p>{text.helpText}</p>
      <small>{text.helpNote}</small>
      <button className="button primary" type="button" onClick={openContact}><MessageCircle/> {text.openContact}</button>
    </div>
  </section>
}

function DogCard({ dog, text }) {
  return <article className="dog-card">
    <Link to={`/dogs/${dog.slug}`} className="dog-image-link"><img src={dog.photos[0].src} alt={dog.name}/><span>{text.meet} {dog.name} <ChevronRight/></span></Link>
    <div className="dog-card-body">
      <h3>{dog.name}</h3><div className="dog-meta"><span>{dog.age}</span><i/> <span>{dog.sex}</span></div>
      <div className="tags">{dog.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <p>{dog.bio}</p><small className="location"><MapPin size={14}/>{dog.location}</small>
    </div>
  </article>
}

function DogsSection({ dogs, text }) {
  return <section className="section dogs-section" id="dogs">
    <div className="dogs-heading"><div className="section-title left"><h2>{text.dogsTitle}</h2><Heart/></div><span className="available"><i/> {text.waiting}</span></div>
    <div className="dog-grid">{dogs.map(dog => <DogCard key={dog.slug} dog={dog} text={text}/>)}</div>
  </section>
}

function ContactModal({ text, onClose }) {
  return <div className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
    <button className="contact-backdrop" type="button" onClick={onClose} aria-label={text.closeContact} />
    <article className="contact-panel">
      <button className="contact-close" type="button" onClick={onClose} aria-label={text.closeContact}><X/></button>
      <span className="eyebrow"><MessageCircle/> {contactPerson}</span>
      <h2 id="contact-modal-title">{text.modalTitle}</h2>
      <p>{text.modalText}</p>
      <p>{text.modalHelpText}</p>
      <div className="contact-options">
        <a className="button primary" href={telegramUrl} target="_blank" rel="noreferrer"><Send/> {text.telegram}</a>
        <a className="button outline" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle/> {text.whatsappContact}</a>
        <a className="button outline" href={emailUrl}><Mail/> {text.emailContact}</a>
      </div>
    </article>
  </div>
}

function ContactSection({ text, openContact }) {
  return <section className="section action-grid" id="contact">
    <article className="action-card"><Heart/><div><h2>{text.contactTitle}</h2><p>{text.contactText}</p><div className="action-buttons"><button className="button primary" type="button" onClick={openContact}><Send/> {text.openContact}</button><a className="button outline" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle/> WhatsApp</a></div></div><PawPrint className="watermark"/></article>
    <article className="action-card"><PawPrint/><div><h2>{text.helpTitle}</h2><p>{text.helpNote}</p><div className="action-buttons"><button className="button primary" type="button" onClick={openContact}><Heart/> {text.openContact}</button><a className="button outline" href={emailUrl}><Mail/> {text.emailContact}</a></div></div><PawPrint className="watermark"/></article>
  </section>
}

function Footer({ text }) {
  return <footer><Logo text={text}/><p>{text.footerText}</p><div><a href={telegramUrl} target="_blank" rel="noreferrer">Telegram</a><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a><a id="faq" href={emailUrl}>{text.emailUs}</a></div><small>© {new Date().getFullYear()} Paws from Georgia</small></footer>
}

function HomePage({ lang, setLang, text, dogs }) {
  const [contactOpen, setContactOpen] = useState(false)
  return <><Header lang={lang} setLang={setLang} text={text} openContact={() => setContactOpen(true)}/><main><Hero text={text}/><AdoptionProcess text={text}/><VolunteerSection text={text} openContact={() => setContactOpen(true)}/><DogsSection dogs={dogs} text={text}/><ContactSection text={text} openContact={() => setContactOpen(true)}/></main><Footer text={text}/>{contactOpen && <ContactModal text={text} onClose={() => setContactOpen(false)}/>}</>
}

function DogProfile({ lang, setLang, text, dogs }) {
  const { pathname } = useLocation()
  const dog = dogs.find(item => pathname.endsWith(item.slug))
  const photoCount = dog?.photos.length || 0
  const [viewerIndex, setViewerIndex] = useState(null)
  const [contactOpen, setContactOpen] = useState(false)
  useEffect(() => window.scrollTo(0, 0), [pathname])
  useEffect(() => {
    if (viewerIndex === null || photoCount === 0) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setViewerIndex(null)
      if (event.key === 'ArrowLeft') setViewerIndex(index => (index + photoCount - 1) % photoCount)
      if (event.key === 'ArrowRight') setViewerIndex(index => (index + 1) % photoCount)
    }
    document.body.classList.add('viewer-open')
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.classList.remove('viewer-open')
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [photoCount, viewerIndex])
  if (!dog) return <NotFound text={text} />
  const profileUrl = dogProfileUrl(dog.slug)
  const message = shareMessage(dog, text)
  const encodedMessage = encodeURIComponent(`${message}\n${profileUrl}`)
  const encodedSubject = encodeURIComponent(`${dog.name} — Paws from Georgia`)
  const share = async () => {
    const data = { title: `${dog.name} — Paws from Georgia`, text: message, url: profileUrl }
    if (navigator.share) await navigator.share(data)
    else { await navigator.clipboard.writeText(profileUrl); alert(text.linkCopied) }
  }
  return <><Header lang={lang} setLang={setLang} text={text} openContact={() => setContactOpen(true)}/><main className="profile-page">
    <Link className="back-link" to="/#dogs"><ArrowLeft/> {text.backToDogs}</Link>
    <div className="profile-layout">
      <button className="profile-image image-button" type="button" onClick={() => setViewerIndex(0)} aria-label={`${text.openPhoto}: ${dog.name}`}>
        <img src={dog.photos[0].src} alt={dog.name}/><span><ShieldCheck/> {text.ready}</span>
      </button>
      <div className="profile-copy"><span className="eyebrow"><PawPrint/> {text.profileEyebrow}</span><h1>{dog.name}</h1><div className="profile-meta"><span>{dog.age}</span><i/><span>{dog.sex}</span><i/><span><MapPin/>{dog.location}</span></div><div className="tags large">{dog.tags.map(tag => <span key={tag}><Check/>{tag}</span>)}</div><p className="lead">{dog.bio}</p><p>{dog.longBio}</p><div className="profile-actions"><button className="button primary" type="button" onClick={() => setContactOpen(true)}><Send/> {text.askAbout} {dog.name}</button><button className="button outline" onClick={share}><Share2/> {text.shareProfile}</button></div><div className="share-row" aria-label={`${text.shareOn} ${dog.name}`}><span>{text.shareOn}</span><a href={`https://wa.me/?text=${encodedMessage}`} target="_blank" rel="noreferrer">{text.whatsapp}</a><a href={`https://t.me/share/url?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">Telegram</a><a href={`sms:?body=${encodedMessage}`}>{text.messages}</a><a href={`mailto:?subject=${encodedSubject}&body=${encodedMessage}`}>{text.email}</a></div></div>
    </div>
    {dog.photos.length > 1 && <section className="profile-gallery" aria-label={`${dog.name} photo gallery`}>
      {dog.photos.slice(1).map((photo, index) => <button className="gallery-thumb" key={photo.filename} type="button" onClick={() => setViewerIndex(index + 1)} aria-label={`${text.openPhoto}: ${dog.name}`}>
        <img src={photo.src} alt={`${dog.name} ${photo.filename}`} />
      </button>)}
    </section>}
    {viewerIndex !== null && <div className="image-viewer" role="dialog" aria-modal="true" aria-label={`${dog.name} photo viewer`}>
      <button className="viewer-backdrop" type="button" onClick={() => setViewerIndex(null)} aria-label={text.closeViewer} />
      <div className="viewer-panel">
        <button className="viewer-close" type="button" onClick={() => setViewerIndex(null)} aria-label={text.closeViewer}><X/></button>
        {dog.photos.length > 1 && <button className="viewer-nav prev" type="button" onClick={() => setViewerIndex((viewerIndex + dog.photos.length - 1) % dog.photos.length)} aria-label={text.previousPhoto}><ArrowLeft/></button>}
        <img src={dog.photos[viewerIndex].src} alt={`${dog.name} ${viewerIndex + 1}`} />
        {dog.photos.length > 1 && <button className="viewer-nav next" type="button" onClick={() => setViewerIndex((viewerIndex + 1) % dog.photos.length)} aria-label={text.nextPhoto}><ArrowRight/></button>}
        <small>{viewerIndex + 1} / {dog.photos.length}</small>
      </div>
    </div>}
    <section className="profile-next"><Heart/><div><h2>{text.profileNextTitle(dog.name)}</h2><p>{text.profileNextText}</p></div><a className="button outline" href="/#process">{text.seeProcess}</a></section>
  </main><Footer text={text}/>{contactOpen && <ContactModal text={text} onClose={() => setContactOpen(false)}/>}</>
}

function NotFound({ text }) {
  return <main className="not-found"><PawPrint/><h1>{text.notFoundTitle}</h1><p>{text.notFoundText}</p><Link className="button primary" to="/">{text.backHome}</Link></main>
}

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('pfg-language') || 'en')
  const safeLang = siteText[lang] ? lang : 'en'
  const text = siteText[safeLang]
  const dogs = dogData.map(dog => localizeDog(dog, safeLang))

  useEffect(() => {
    localStorage.setItem('pfg-language', safeLang)
    document.documentElement.lang = safeLang
  }, [safeLang])

  return <div className="site-shell"><ScrollToHash/><Routes><Route path="/" element={<HomePage lang={safeLang} setLang={setLang} text={text} dogs={dogs}/>}/><Route path="/dogs/:slug" element={<DogProfile lang={safeLang} setLang={setLang} text={text} dogs={dogs}/>}/><Route path="*" element={<NotFound text={text}/>}/></Routes></div>
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
