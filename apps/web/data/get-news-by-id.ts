import { NewsCardProps } from "@/components/shared/news-card/news-card";

const news = [
  {
    image:
      'https://ko77xaoqa4.ufs.sh/f/tCV5HvjhrFj7IdoJ5zuQoRFHJr4sv5UPGOuXKthkE83bW0i1',
    title:
      'SpaceX letter criticizes FAA for “systemic challenges” in launch licensing',
    publishedAt: '12 hours ago',
    reads: '43k',
    slug: 'spacex-letter-criticizes-faa-for-systemic-challenges-in-launch-licensing-2vg45',
    source: {
      name: 'CNN',
      image: '',
      url: 'https://www.cnn.com/',
    },
  },
  {
    image:
      'https://utfs.io/f/tCV5HvjhrFj78ppsNbrmDKZ6LVIqCe2WQuHiMNX41BYwsvEd',
    title: 'India eyes record year for space with 10 planned launches',
    publishedAt: '5 hours ago',
    source: {
      name: 'CNN',
      image: '',
      url: 'https://www.cnn.com/',
    },
    reads: '28k',
    slug: 'india-eyes-record-year-for-space-with-10-planned-launches-245626',
  },
  {
    image:
      'https://utfs.io/f/tCV5HvjhrFj7e9NgBZxqDOE9pI4s2uQrfZnahoL6R8vM03SV',
    title: 'Lockheed Martin challenges narrative on GPS vulnerability',
    publishedAt: '12 hours ago',
    source: {
      name: 'CNN',
      image: '',
      url: 'https://www.cnn.com/',
    },
    reads: '43k',
    slug: 'lockheed-martin-challenges-narrative-on-gps-vulnerability-2456256',
  },

  {
    image:
      'https://ko77xaoqa4.ufs.sh/f/tCV5HvjhrFj7IdoJ5zuQoRFHJr4sv5UPGOuXKthkE83bW0i1',
    title:
      'SpaceX letter criticizes FAA for “systemic challenges” in launch licensing',
    publishedAt: '12 hours ago',
    reads: '43k',
    slug: 'spacex-letter-criticizes-faa-for-systemic-challenges-in-launch-licensing-aegtaewq',
    source: {
      name: 'CNN',
      image: '',
      url: 'https://www.cnn.com/',
    },
  },
  {
    image:
      'https://utfs.io/f/tCV5HvjhrFj78ppsNbrmDKZ6LVIqCe2WQuHiMNX41BYwsvEd',
    title: 'India eyes record year for space with 10 planned launches',
    publishedAt: '5 hours ago',
    source: {
      name: 'CNN',
      image: '',
      url: 'https://www.cnn.com/',
    },
    reads: '28k',
    slug: 'india-eyes-record-year-for-space-with-10-planned-launches-j4h635ewA',
  },
  {
    image:
      'https://utfs.io/f/tCV5HvjhrFj7e9NgBZxqDOE9pI4s2uQrfZnahoL6R8vM03SV',
    title: 'Lockheed Martin challenges narrative on GPS vulnerability',
    publishedAt: '12 hours ago',
    source: {
      name: 'CNN',
      image: '',
      url: 'https://www.cnn.com/',
    },
    reads: '43k',
    slug: 'lockheed-martin-challenges-narrative-on-gps-vulnerability-4365rhj',
  },

  {
    image:
      'https://ko77xaoqa4.ufs.sh/f/tCV5HvjhrFj7IdoJ5zuQoRFHJr4sv5UPGOuXKthkE83bW0i1',
    title:
      'SpaceX letter criticizes FAA for “systemic challenges” in launch licensing',
    publishedAt: '12 hours ago',
    reads: '43k',
    slug: 'spacex-letter-criticizes-faa-for-systemic-challenges-in-launch-licensing-86759kbxz',
    source: {
      name: 'CNN',
      image: '',
      url: 'https://www.cnn.com/',
    },
  },
  {
    image:
      'https://utfs.io/f/tCV5HvjhrFj78ppsNbrmDKZ6LVIqCe2WQuHiMNX41BYwsvEd',
    title: 'India eyes record year for space with 10 planned launches',
    publishedAt: '5 hours ago',
    source: {
      name: 'CNN',
      image: '',
      url: 'https://www.cnn.com/',
    },
    reads: '28k',
    slug: 'india-eyes-record-year-for-space-with-10-planned-launches-q6879awtasikb',
  },
  {
    image:
      'https://utfs.io/f/tCV5HvjhrFj7e9NgBZxqDOE9pI4s2uQrfZnahoL6R8vM03SV',
    title: 'Lockheed Martin challenges narrative on GPS vulnerability',
    publishedAt: '12 hours ago',
    source: {
      name: 'CNN',
      image: '',
      url: 'https://www.cnn.com/',
    },
    reads: '43k',
    slug: 'lockheed-martin-challenges-narrative-on-gps-vulnerability-asdfafds',
  },

  {
    image:
      'https://ko77xaoqa4.ufs.sh/f/tCV5HvjhrFj7IdoJ5zuQoRFHJr4sv5UPGOuXKthkE83bW0i1',
    title:
      'SpaceX letter criticizes FAA for “systemic challenges” in launch licensing',
    publishedAt: '12 hours ago',
    reads: '43k',
    slug: 'spacex-letter-criticizes-faa-for-systemic-challenges-in-launch-licensing-q3tasdf',
    source: {
      name: 'CNN',
      image: '',
      url: 'https://www.cnn.com/',
    },
  },
  {
    image:
      'https://utfs.io/f/tCV5HvjhrFj78ppsNbrmDKZ6LVIqCe2WQuHiMNX41BYwsvEd',
    title: 'India eyes record year for space with 10 planned launches',
    publishedAt: '5 hours ago',
    source: {
      name: 'CNN',
      image: '',
      url: 'https://www.cnn.com/',
    },
    reads: '28k',
    slug: 'india-eyes-record-year-for-space-with-10-planned-launches-q6879ikb',
  },
  {
    image:
      'https://utfs.io/f/tCV5HvjhrFj7e9NgBZxqDOE9pI4s2uQrfZnahoL6R8vM03SV',
    title: 'Lockheed Martin challenges narrative on GPS vulnerability',
    publishedAt: '12 hours ago',
    source: {
      name: 'CNN',
      image: '',
      url: 'https://www.cnn.com/',
    },
    reads: '43k',
    slug: 'lockheed-martin-challenges-narrative-on-gps-vulnerability-q34t5',
  },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getNewsById = async (/*id: string,*/ topic: string, page: number = 1): Promise<NewsCardProps[]> => {
	const timeoutDelay = topic === 'for-you' ? 1500 : 100;

	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(
        news.map((news) => ({
          ...news,
          slug: news.slug + Math.random().toString(36).substring(2, 15),
        }))
      );
		}, timeoutDelay);
	});
};
