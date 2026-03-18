import { getPublicAssetUrl } from "@/lib/supabase/env";

export type DownloadKind = "general-introduction" | "session-booklet";

export type DownloadResource = {
  id: string;
  label: string;
  kind: DownloadKind;
  fileName: string;
  storagePath: string;
  publicUrl: string;
  sharedResourceKey: string;
};

export type BonusDownload = {
  id: string;
  title: string;
  description: string;
  fileName: string;
  storagePath: string;
  publicUrl: string;
};

export type Session = {
  id: string;
  slug: string;
  title: string;
  pageTitle: string;
  speaker: string;
  eventDay: string;
  sessionCode: string;
  audioFileName: string;
  audioStoragePath: string;
  audioPublicUrl: string;
  coverCopy: string;
  teaser: string;
  artworkFileName: string | null;
  artworkPublicUrl: string | null;
  downloads: [DownloadResource, DownloadResource];
  sortOrder: number;
  published: boolean;
};

const SPEAKER = "Dr. Samuel Donkor";
const PAGE_TITLE_SUFFIX = " | Dr. Samuel Donkor | Leader's Retreat 2026";

function createPageTitle(title: string) {
  return `${title}${PAGE_TITLE_SUFFIX}`;
}

function createBonusDownload(
  id: string,
  title: string,
  description: string,
  fileName: string,
  storagePath: string
): BonusDownload {
  return {
    id,
    title,
    description,
    fileName,
    storagePath,
    publicUrl: getPublicAssetUrl("booklets", fileName, storagePath),
  };
}

const generalIntroduction: DownloadResource = {
  id: "general-introduction",
  label: "Download General Introduction",
  kind: "general-introduction",
  fileName: "General Introduction.pdf",
  storagePath: "booklets/general-introduction.pdf",
  publicUrl: getPublicAssetUrl(
    "booklets",
    "General Introduction.pdf",
    "booklets/general-introduction.pdf"
  ),
  sharedResourceKey: "general-introduction",
};

const bookletResources = {
  day1NightSession: {
    id: "booklet-day-1-night-session",
    label: "Download Session Booklet",
    kind: "session-booklet" as const,
    fileName: "Day 1 Night Session.pdf",
    storagePath: "booklets/day-1-night-session.pdf",
    publicUrl: getPublicAssetUrl(
      "booklets",
      "Day 1 Night Session.pdf",
      "booklets/day-1-night-session.pdf"
    ),
    sharedResourceKey: "day-1-night-session",
  },
  day2EveningSession10: {
    id: "booklet-day-2-evening-session-10",
    label: "Download Session Booklet",
    kind: "session-booklet" as const,
    fileName: "Day 2 Evening Session 10.pdf",
    storagePath: "booklets/day-2-evening-session-10.pdf",
    publicUrl: getPublicAssetUrl(
      "booklets",
      "Day 2 Evening Session 10.pdf",
      "booklets/day-2-evening-session-10.pdf"
    ),
    sharedResourceKey: "day-2-evening-session-10",
  },
  day2MorningSession1: {
    id: "booklet-day-2-morning-session-1",
    label: "Download Session Booklet",
    kind: "session-booklet" as const,
    fileName: "Day 2 Morning Session 1.pdf",
    storagePath: "booklets/day-2-morning-session-1.pdf",
    publicUrl: getPublicAssetUrl(
      "booklets",
      "Day 2 Morning Session 1.pdf",
      "booklets/day-2-morning-session-1.pdf"
    ),
    sharedResourceKey: "day-2-morning-session-1",
  },
  day2MorningSession2And5: {
    id: "booklet-day-2-morning-session-2-and-session-5",
    label: "Download Session Booklet",
    kind: "session-booklet" as const,
    fileName: "Day 2 Morning Session 2 & Day 2 Session 5.pdf",
    storagePath: "booklets/day-2-morning-session-2-and-session-5.pdf",
    publicUrl: getPublicAssetUrl(
      "booklets",
      "Day 2 Morning Session 2 & Day 2 Session 5.pdf",
      "booklets/day-2-morning-session-2-and-session-5.pdf"
    ),
    sharedResourceKey: "day-2-morning-session-2-and-session-5",
  },
  day2MorningSession3And4: {
    id: "booklet-day-2-morning-session-3-and-session-4",
    label: "Download Session Booklet",
    kind: "session-booklet" as const,
    fileName: "Day 2 Morning Session 3 & Day 2 Session 4.pdf",
    storagePath: "booklets/day-2-morning-session-3-and-session-4.pdf",
    publicUrl: getPublicAssetUrl(
      "booklets",
      "Day 2 Morning Session 3 & Day 2 Session 4.pdf",
      "booklets/day-2-morning-session-3-and-session-4.pdf"
    ),
    sharedResourceKey: "day-2-morning-session-3-and-session-4",
  },
  day2MorningSession6And7: {
    id: "booklet-day-2-morning-session-6-and-session-7",
    label: "Download Session Booklet",
    kind: "session-booklet" as const,
    fileName: "Day 2 Morning Session 6 & Day 2 Session 7.pdf",
    storagePath: "booklets/day-2-morning-session-6-and-session-7.pdf",
    publicUrl: getPublicAssetUrl(
      "booklets",
      "Day 2 Morning Session 6 & Day 2 Session 7.pdf",
      "booklets/day-2-morning-session-6-and-session-7.pdf"
    ),
    sharedResourceKey: "day-2-morning-session-6-and-session-7",
  },
  day3MorningSession1AndAfternoonSession2: {
    id: "booklet-day-3-morning-session-1-and-afternoon-session-2",
    label: "Download Session Booklet",
    kind: "session-booklet" as const,
    fileName: "Day 3 Morning Session 1 & Day 3 Afternoon Session 2.pdf",
    storagePath: "booklets/day-3-morning-session-1-and-afternoon-session-2.pdf",
    publicUrl: getPublicAssetUrl(
      "booklets",
      "Day 3 Morning Session 1 & Day 3 Afternoon Session 2.pdf",
      "booklets/day-3-morning-session-1-and-afternoon-session-2.pdf"
    ),
    sharedResourceKey: "day-3-morning-session-1-and-afternoon-session-2",
  },
};

export const bonusDownloads: BonusDownload[] = [
  createBonusDownload(
    "bonus-abiding-presence",
    "The Abiding Presence",
    "A beginner's guide to walking with the Holy Spirit in daily life.",
    "Bonus - The Abiding Presence - A Beginner’s Guide to Walking with the Holy Spirit.pdf",
    "booklets/bonus-abiding-presence.pdf"
  ),
  createBonusDownload(
    "bonus-holistic-restoration-protocol",
    "Holistic Restoration Protocol",
    "A practical restoration guide for mind, body, and spirit.",
    "Bonus - Holistic Restoration Protocol.pdf",
    "booklets/bonus-holistic-restoration-protocol.pdf"
  ),
  createBonusDownload(
    "bonus-resident-not-visitor",
    "The Resident, Not the Visitor",
    "Five surprising shifts for living in continuous spiritual presence.",
    "Bonus - The Resident, Not the Visitor - 5 Surprising Shifts for Living in Continuous Spiritual Presence.pdf",
    "booklets/bonus-resident-not-the-visitor.pdf"
  ),
  createBonusDownload(
    "bonus-full-learning-framework",
    "Full 2026 Leaders Retreat Teaching Learning Framework",
    "A complete framework for reviewing the full retreat journey.",
    "Bonus - Full 2026 Leaders Retreat Teaching Learning Framework.pdf",
    "booklets/bonus-full-2026-leaders-retreat-teaching-learning-framework.pdf"
  ),
];

function withGeneralIntroduction(
  sessionBooklet: DownloadResource
): [DownloadResource, DownloadResource] {
  return [{ ...generalIntroduction }, { ...sessionBooklet }];
}

export const sessions: Session[] = [
  {
    id: "day-1-night-session",
    slug: "day-1-night-session",
    title: "Day 1 Night Session",
    pageTitle: createPageTitle("Day 1 Night Session"),
    speaker: SPEAKER,
    eventDay: "Day 1",
    sessionCode: "Night Session",
    audioFileName: "Day 1 Night Session - Dr. Samuel Donkor.mp3",
    audioStoragePath: "audio/day-1-night-session.mp3",
    audioPublicUrl: getPublicAssetUrl(
      "audio",
      "Day 1 Night Session - Dr. Samuel Donkor.mp3",
      "audio/day-1-night-session.mp3"
    ),
    coverCopy:
      "Discover the life-changing truth that the Holy Spirit is not a temporary visitor, but your constant companion and internal GPS. Learn to shift your faith from fleeting emotions to the unchanging truth of God's Word, and master the art of spiritual breathing to stay constantly refreshed in His presence. Stop chasing experiences and start cultivating a daily relationship - listen now to awaken your spiritual awareness!",
    teaser:
      "Discover the life-changing truth that the Holy Spirit is not a temporary visitor, but your constant companion and internal GPS.",
    artworkFileName: null,
    artworkPublicUrl: null,
    downloads: withGeneralIntroduction(bookletResources.day1NightSession),
    sortOrder: 1,
    published: true,
  },
  {
    id: "day-2-evening-session-10",
    slug: "day-2-evening-session-10",
    title: "Day 2 Evening Session 10",
    pageTitle: createPageTitle("Day 2 Evening Session 10"),
    speaker: SPEAKER,
    eventDay: "Day 2",
    sessionCode: "Evening Session 10",
    audioFileName: "Day 2 Evening Session 10 - Dr. Samuel Donkor.mp3",
    audioStoragePath: "audio/day-2-evening-session-10.mp3",
    audioPublicUrl: getPublicAssetUrl(
      "audio",
      "Day 2 Evening Session 10 - Dr. Samuel Donkor.mp3",
      "audio/day-2-evening-session-10.mp3"
    ),
    coverCopy:
      "Experience complete restoration for your mind, body, and spirit. This session reveals how total surrender and sincere prayer invite the ultimate Comforter into your deepest wounds. Uncover the hidden obstacles to your breakthrough - such as unforgiveness, doubt, and fear - and learn how to overcome them by faith. Lay down your burdens and step into God's perfect healing - press play to begin your journey to wholeness!",
    teaser: "Experience complete restoration for your mind, body, and spirit.",
    artworkFileName: null,
    artworkPublicUrl: null,
    downloads: withGeneralIntroduction(bookletResources.day2EveningSession10),
    sortOrder: 9,
    published: true,
  },
  {
    id: "day-2-morning-session-1",
    slug: "day-2-morning-session-1",
    title: "Day 2 Morning Session 1",
    pageTitle: createPageTitle("Day 2 Morning Session 1"),
    speaker: SPEAKER,
    eventDay: "Day 2",
    sessionCode: "Morning Session 1",
    audioFileName: "Day 2 Morning Session 1 - Dr. Samuel Donkor.mp3",
    audioStoragePath: "audio/day-2-morning-session-1.mp3",
    audioPublicUrl: getPublicAssetUrl(
      "audio",
      "Day 2 Morning Session 1 - Dr. Samuel Donkor.mp3",
      "audio/day-2-morning-session-1.mp3"
    ),
    coverCopy:
      "You were never meant to simply be filled with the Holy Spirit; you were designed to overflow. Discover how to become a powerful conduit of God's presence and unlock greater spiritual encounters through the secret of small obedience to His daily nudges. Release the flow of God's power in your life - listen now to discover how your everyday choices can transform the world around you!",
    teaser:
      "You were never meant to simply be filled with the Holy Spirit; you were designed to overflow.",
    artworkFileName: null,
    artworkPublicUrl: null,
    downloads: withGeneralIntroduction(bookletResources.day2MorningSession1),
    sortOrder: 2,
    published: true,
  },
  {
    id: "day-2-morning-session-2",
    slug: "day-2-morning-session-2",
    title: "Day 2 Morning Session 2",
    pageTitle: createPageTitle("Day 2 Morning Session 2"),
    speaker: SPEAKER,
    eventDay: "Day 2",
    sessionCode: "Morning Session 2",
    audioFileName: "Day 2 Morning Session 2 - Dr. Samuel Donkor.mp3",
    audioStoragePath: "audio/day-2-morning-session-2.mp3",
    audioPublicUrl: getPublicAssetUrl(
      "audio",
      "Day 2 Morning Session 2 - Dr. Samuel Donkor.mp3",
      "audio/day-2-morning-session-2.mp3"
    ),
    coverCopy:
      "Are you exhausted from striving for God's presence? Learn how to shift from a performance mindset to resting completely in an intimate relationship with the Father. This message equips you to create a life where the Holy Spirit loves to dwell by filtering out toxic thoughts and making stillness a daily habit. Stop striving and start abiding - stream this session to transform your mind and guard your peace!",
    teaser:
      "Are you exhausted from striving for God's presence? Learn how to shift from a performance mindset to resting completely in an intimate relationship with the Father.",
    artworkFileName: null,
    artworkPublicUrl: null,
    downloads: withGeneralIntroduction(bookletResources.day2MorningSession2And5),
    sortOrder: 3,
    published: true,
  },
  {
    id: "day-2-morning-session-3",
    slug: "day-2-morning-session-3",
    title: "Day 2 Morning Session 3",
    pageTitle: createPageTitle("Day 2 Morning Session 3"),
    speaker: SPEAKER,
    eventDay: "Day 2",
    sessionCode: "Morning Session 3",
    audioFileName: "Day 2 Morning Session 3 - Dr. Samuel Donkor.mp3",
    audioStoragePath: "audio/day-2-morning-session-3.mp3",
    audioPublicUrl: getPublicAssetUrl(
      "audio",
      "Day 2 Morning Session 3 - Dr. Samuel Donkor.mp3",
      "audio/day-2-morning-session-3.mp3"
    ),
    coverCopy:
      "Break free from the frustrating cycle of spiritual highs and lows. Learn the transformative power of waking up with a holy expectation of God's presence and discover how to establish daily spiritual rhythms that sustain your connection even in the driest seasons. Anchor your faith and expect the supernatural today - listen now to build unbreakable spiritual consistency!",
    teaser:
      "Break free from the frustrating cycle of spiritual highs and lows.",
    artworkFileName: null,
    artworkPublicUrl: null,
    downloads: withGeneralIntroduction(bookletResources.day2MorningSession3And4),
    sortOrder: 4,
    published: true,
  },
  {
    id: "day-2-morning-session-4",
    slug: "day-2-morning-session-4",
    title: "Day 2 Morning Session 4",
    pageTitle: createPageTitle("Day 2 Morning Session 4"),
    speaker: SPEAKER,
    eventDay: "Day 2",
    sessionCode: "Morning Session 4",
    audioFileName: "Day 2 Morning Session 4 - Dr. Samuel Donkor.mp3",
    audioStoragePath: "audio/day-2-morning-session-4.mp3",
    audioPublicUrl: getPublicAssetUrl(
      "audio",
      "Day 2 Morning Session 4 - Dr. Samuel Donkor.mp3",
      "audio/day-2-morning-session-4.mp3"
    ),
    coverCopy:
      "God's presence is dependent on your pursuit, not your perfection. When distractions pull you away, you do not need to wait for a convenient time to return. Discover the power of realigning yourself with the Holy Spirit immediately and drawing near to God with confidence. Come back to the Father's embrace without delay - press play to reconnect your heart with God right now!",
    teaser:
      "God's presence is dependent on your pursuit, not your perfection.",
    artworkFileName: null,
    artworkPublicUrl: null,
    downloads: withGeneralIntroduction(bookletResources.day2MorningSession3And4),
    sortOrder: 5,
    published: true,
  },
  {
    id: "day-2-morning-session-5",
    slug: "day-2-morning-session-5",
    title: "Day 2 Morning Session 5",
    pageTitle: createPageTitle("Day 2 Morning Session 5"),
    speaker: SPEAKER,
    eventDay: "Day 2",
    sessionCode: "Morning Session 5",
    audioFileName: "Day 2 Morning Session 5 - Dr. Samuel Donkor.mp3",
    audioStoragePath: "audio/day-2-morning-session-5.mp3",
    audioPublicUrl: getPublicAssetUrl(
      "audio",
      "Day 2 Morning Session 5 - Dr. Samuel Donkor.mp3",
      "audio/day-2-morning-session-5.mp3"
    ),
    coverCopy:
      "The battle for your spiritual awareness is won or lost in your mind. Uncover how to actively cast down negative thoughts, replace the spirit of fear with unwavering faith, and expect the Holy Spirit to guide your steps before your feet even hit the floor every morning. Take back your peace and guard your thoughts - listen now to turn your daily routine into a divine encounter!",
    teaser:
      "The battle for your spiritual awareness is won or lost in your mind.",
    artworkFileName: null,
    artworkPublicUrl: null,
    downloads: withGeneralIntroduction(bookletResources.day2MorningSession2And5),
    sortOrder: 6,
    published: true,
  },
  {
    id: "day-2-morning-session-6",
    slug: "day-2-morning-session-6",
    title: "Day 2 Morning Session 6",
    pageTitle: createPageTitle("Day 2 Morning Session 6"),
    speaker: SPEAKER,
    eventDay: "Day 2",
    sessionCode: "Morning Session 6",
    audioFileName: "Day 2 Morning Session 6 - Dr. Samuel Donkor.mp3",
    audioStoragePath: "audio/day-2-morning-session-6.mp3",
    audioPublicUrl: getPublicAssetUrl(
      "audio",
      "Day 2 Morning Session 6 - Dr. Samuel Donkor.mp3",
      "audio/day-2-morning-session-6.mp3"
    ),
    coverCopy:
      "The greatest evidence of the Holy Spirit in your life is not just miracles or prophetic words - it is radical, supernatural love. Learn how to let go of offense, love beyond your human strength, and become a true reflection of Jesus' character in a broken world. Break down the barriers of bitterness and let love flow freely - stream this session to revolutionize your relationships!",
    teaser:
      "The greatest evidence of the Holy Spirit in your life is not just miracles or prophetic words - it is radical, supernatural love.",
    artworkFileName: null,
    artworkPublicUrl: null,
    downloads: withGeneralIntroduction(bookletResources.day2MorningSession6And7),
    sortOrder: 7,
    published: true,
  },
  {
    id: "day-2-morning-session-7",
    slug: "day-2-morning-session-7",
    title: "Day 2 Morning Session 7",
    pageTitle: createPageTitle("Day 2 Morning Session 7"),
    speaker: SPEAKER,
    eventDay: "Day 2",
    sessionCode: "Morning Session 7",
    audioFileName: "Day 2 Morning Session 7 - Dr. Samuel Donkor.mp3",
    audioStoragePath: "audio/day-2-morning-session-7.mp3",
    audioPublicUrl: getPublicAssetUrl(
      "audio",
      "Day 2 Morning Session 7 - Dr. Samuel Donkor.mp3",
      "audio/day-2-morning-session-7.mp3"
    ),
    coverCopy:
      "Transform your entire life into a continuous, walking prayer. Instead of limiting God to scheduled moments, learn to invite the Holy Spirit into every detail of your day through constant communion, active listening, and immediate obedience. Commit to a lifestyle of unceasing prayer - listen now to walk in step with the Holy Spirit every single moment!",
    teaser:
      "Transform your entire life into a continuous, walking prayer.",
    artworkFileName: null,
    artworkPublicUrl: null,
    downloads: withGeneralIntroduction(bookletResources.day2MorningSession6And7),
    sortOrder: 8,
    published: true,
  },
  {
    id: "day-3-morning-session-1",
    slug: "day-3-morning-session-1",
    title: "Day 3 Morning Session 1",
    pageTitle: createPageTitle("Day 3 Morning Session 1"),
    speaker: SPEAKER,
    eventDay: "Day 3",
    sessionCode: "Morning Session 1",
    audioFileName: "Day 3 Morning Session 1 - Dr. Samuel Donkor.mp3",
    audioStoragePath: "audio/day-3-morning-session-1.mp3",
    audioPublicUrl: getPublicAssetUrl(
      "audio",
      "Day 3 Morning Session 1 - Dr. Samuel Donkor.mp3",
      "audio/day-3-morning-session-1.mp3"
    ),
    coverCopy:
      "The Holy Spirit is closer than the breath you breathe. Build an unbreakable relationship with Him through daily acknowledgment, expectant reading of the Word, and a humble heart. Discover how His gentle voice speaks through unexplainable peace to guide your every step. Awaken your spiritual sensitivity today - listen now to encounter the living Word and be led by His perfect peace!",
    teaser: "The Holy Spirit is closer than the breath you breathe.",
    artworkFileName: null,
    artworkPublicUrl: null,
    downloads: withGeneralIntroduction(
      bookletResources.day3MorningSession1AndAfternoonSession2
    ),
    sortOrder: 10,
    published: true,
  },
  {
    id: "day-3-afternoon-session-2",
    slug: "day-3-afternoon-session-2",
    title: "Day 3 Afternoon Session 2",
    pageTitle: createPageTitle("Day 3 Afternoon Session 2"),
    speaker: SPEAKER,
    eventDay: "Day 3",
    sessionCode: "Afternoon Session 2",
    audioFileName: "Day 3 Afternoon Session 2 - Dr. Samuel Donkor.mp3",
    audioStoragePath: "audio/day-3-afternoon-session-2.mp3",
    audioPublicUrl: getPublicAssetUrl(
      "audio",
      "Day 3 Afternoon Session 2 - Dr. Samuel Donkor.mp3",
      "audio/day-3-afternoon-session-2.mp3"
    ),
    coverCopy:
      "Deepen your intimacy with the Holy Spirit by bringing your will into perfect alignment with His wisdom. Explore how quick obedience and two-way prayer - where you actually pause to listen - unlock quiet strength, divine peace, and supernatural guidance for your life's toughest decisions. Tune your spiritual ears to His gentle whisper - press play to elevate your fellowship with God!",
    teaser:
      "Deepen your intimacy with the Holy Spirit by bringing your will into perfect alignment with His wisdom.",
    artworkFileName: null,
    artworkPublicUrl: null,
    downloads: withGeneralIntroduction(
      bookletResources.day3MorningSession1AndAfternoonSession2
    ),
    sortOrder: 11,
    published: true,
  },
];

export function getPublishedSessions() {
  return sessions
    .filter((session) => session.published)
    .sort((left, right) => left.sortOrder - right.sortOrder);
}

export function getSessionBySlug(slug: string) {
  return sessions.find((session) => session.slug === slug && session.published);
}