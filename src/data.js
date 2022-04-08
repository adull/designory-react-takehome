const headerData = {
  links: [
    {
      title: `Portfolio`,
      href: `#`
    },
    {
      title: `Process`,
      href: `#`
    },
    {
      title: `Journal`,
      href: `#`
    },
    {
      title: `Contact Info`,
      href: `#`
    }
  ]
}

const heroData = {
  greeting: `Well, Hello there`,
  message: `This is where your message should go.`,
  button: {
    bgColor: `#000`,
    color: `#fff`,
    text: `Download now`
  }
}

const articleSummary = `Claritas est etiam processus dynamicus, qui sequitur mutationem conuetudium lectorum. Mirum est notare quam littera gothica, quam.`

const articlesData = {
  articles: [
    {
      color: `#E6E6E6`,
      title: `Article 1`,
      date: `Aug 8, 2013`,
      summary: articleSummary
    },
    {
      color: `#BBBBBB`,
      title: `Article 2`,
      date: `Aug 14, 2013`,
      summary: articleSummary
    },
    {
      color: `#6C6C6C`,
      title: `Article 3`,
      date: `Aug 21, 2013`,
      summary: articleSummary
    },
  ]
}

const bodyData = {
  fiftyFifty: {
    desktopDirection: `row`,
    mobileDirection: `column`,
    blocks: [
      {
        type: `image`,
        href: null,
        color: `#7D7D7D`,
        desktopPos: 1,
        mobilePos: 3,
        alignSelf: null
      },

      {
        type: `html`,
        content: `<h2>Get the New Razda template</h2>`,
        desktopPos: 2,
        mobilePos: 1,
        alignSelf: null
      },
      {
        type: `html`,
        content: `<h3>The best way to showcase your work</h3>`,
        desktopPos: 3,
        mobilePos: 2,
        alignSelf: null
      },
      {
        type: `html`,
        content: `<div><b><span class="body-outline">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectore</span>s legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectoru</b></div>`,
        desktopPos: 4,
        mobilePos: 4,
        alignSelf: null
      },
      {
        type: `component`,
        name: `Button`,
        props: [
          { key: `bgColor`, value: `#000` }, 
          { key: `color`, value: `#fff` },
          { key: `text`, value: `Download now`}
        ],
        desktopPos: 5,
        mobilePos: 5,
        alignSelf: `flex-end`,
      }
    ]
  }
}

const footerData = {
  phoneNumber: `<div><span>PHONE: </span><b>885.827.1938</b></div>`,
  copyright: `<div><span>Ⓒ Copyright 2013 </span><a href="https://www.designory.com/"><b>DESIGNORY.COM</b></a>`
}

export { headerData, heroData, articlesData, bodyData, footerData }