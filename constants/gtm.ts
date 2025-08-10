const gtmEvents = {
  //header
  header: {
    logo: 'GTM-header_click_logo',
    search: 'GTM-header_click_search',
    newsTicker: 'GTM-header_click_flash_news',
    LINE: 'GTM-header_click_LINE_icon',
    Facebook: 'GTM-header_click_Facebook_icon',
    Instagram: 'GTM-header_click_Instagram_icon',
    Threads: 'GTM-header_click_Threads_icon',
    YouTube: 'GTM-header_click_YouTube_icon',
  },
  //footer
  footer: {
    LINE: 'GTM-footer_click_LINE_icon',
    Facebook: 'GTM-footer_click_Facebook_icon',
    Instagram: 'GTM-footer_click_Instagram_icon',
    Threads: 'GTM-footer_click_Threads_icon',
    YouTube: 'GTM-footer_click_yt_icon',
    mirrormedia: 'GTM-footer_click_mirrormedia',
    mirrorfiction: 'GTM-footer_click_mirrorfiction',
    mnews: 'GTM-footer_click_mnews',
  },
  //首頁
  homepage: {
    editorChoice: 'GTM-home_click_editor_choice',
    editorChoiceButton: 'GTM-home_click_editor_choice_button',
    liveStream: 'GTM-home_click_live',
    latestArticle: 'GTM-home_click_latest_article',
    popularArticle: 'GTM-home_click_popular_article',
    shortNews: 'GTM-home_click_short_news',
    shortNewsButton: 'GTM-home_click_short_news_button',
    weather: 'GTM-home_click_weather',
    toTopic: 'GTM-home_click_to_topic',
    toTopicArticle: 'GTM-home_click_to_topic_article',
    moreTopicButton: 'GTM-home_click_to_topic_page_button',
    shortCreativity: 'GTM-home_click_short_creativity',
    shortCreativityButton: 'GTM-home_click_short_creativity_button',
    shortCreativitySubmitButton: 'GTM-home_click_creativity_submit_button',
    latest: 'GTM-home_click_latest_down',
    loadmore: 'GTM-home_click_loadmore_latest',
  },
  //大分類頁
  section: {
    article: 'GTM-section_click_article',
    firstArticleImg: 'GTM-section_click_first_article_img',
    firstArticleTitle: 'GTM-section_click_first_article_title',
    popularArticle: 'GTM-section_click_popular_article',
    loadmore: 'GTM-section_click_loadmore_button',
  },
  //小分類頁
  category: {
    article: 'GTM-category_click_article',
    firstArticleImg: 'GTM-category_click_first_article_img',
    firstArticleTitle: 'GTM-category_click_first_article_title',
    popularArticle: 'GTM-category_click_popular_article',
    loadmore: 'GTM-category_click_more_button',
  },
  //文章頁
  article: {
    relatedArticle: 'GTM-article_click_related_article',
    tag: 'GTM-article_click_tag',
    latestArticle: 'GTM-article_click_latest_article',
    popularArticle: 'GTM-article_click_popular_article',
  },
  //標籤頁
  tag: {
    click: {
      article: 'GTM-tag_click_article',
      popularArticle: 'GTM-tag_click_popular_article',
      loadmore: 'GTM-tag_click_loadmore_button',
    },
  },
  //記者頁
  author: {
    click: {
      article: 'GTM-author_click_article',
      popularArticle: 'GTM-author_click_popular_article',
      loadmore: 'GTM-author_click_loadmore_button',
    },
  },
  //專題列表頁
  topicListing: {
    topic: 'GTM-topicListing_click_topic',
  },
  //專題頁
  singleTopic: {
    topicArticle: 'GTM-topic_click_article',
  },
  //搜尋頁
  search: {
    article: 'GTM-search_click_article',
  },
} as const

const homepageGtmEvents = gtmEvents.homepage
const sectionGtmEvents = gtmEvents.section
const categoryGtmEvents = gtmEvents.category
const storyGtmEvents = gtmEvents.article
const topicListingGtmEvents = gtmEvents.topicListing
const topicGtmEvents = gtmEvents.singleTopic
const tagClickGtmEvents = gtmEvents.tag.click
const authorClickGtmEvents = gtmEvents.author.click
const headerGtmEvents = gtmEvents.header
const footerGtmEvents = gtmEvents.footer
const searchGtmEvents = gtmEvents.search

export {
  gtmEvents,
  homepageGtmEvents,
  sectionGtmEvents,
  categoryGtmEvents,
  storyGtmEvents,
  topicListingGtmEvents,
  topicGtmEvents,
  tagClickGtmEvents,
  authorClickGtmEvents,
  headerGtmEvents,
  footerGtmEvents,
  searchGtmEvents,
}
